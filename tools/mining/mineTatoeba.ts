// Find, filter and score Tatoeba sentences for the words of the sentence bank.
// Run from tools/mining: node node_modules/tsx/dist/cli.mjs mineTatoeba.ts --from 0 --to 300
//
// Input: ../../.cache/tatoeba/eng_sentences_detailed.tsv, from
// https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences_detailed.tsv.bz2 (CC BY 2.0 FR).
// Unpack it with: bunzip2 -k eng_sentences_detailed.tsv.bz2
//
// Stage 1 (no model): expand the contractions, apply the hard filters, and keep the best candidates by the GDEX score.
// Stage 2 (model): add the context score. The final score is the GDEX score multiplied by the context score.
// Output: ../../.cache/mining/candidates-<from>-<to>.json and a text file to read.

import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { env, pipeline } from '@huggingface/transformers'
import nlp from 'compromise/three'
import { FUNCTION_WORDS } from '../../src/sentences/functionWords'
import { bankSentences } from '../../src/sentences/bank'
import { CONCRETE_WORDS } from '../../src/sentences/mining/concreteWords'
import { contextScore, maskSentence, type Guess } from '../../src/sentences/mining/context'
import { expandContractions } from '../../src/sentences/mining/contractions'
import { makeCommonness } from '../../src/sentences/mining/commonness'
import { pickDiverse } from '../../src/sentences/mining/diversity'
import { gdexScore, tokenize } from '../../src/sentences/mining/gdex'
import { hardFilterReason, MAXIMUM_WORDS, MINIMUM_WORDS, NAMES } from '../../src/sentences/mining/hardFilter'
import { NGSL_WORDS } from '../../src/sentences/ngsl'
import { AMERICAN_WORDS } from '../../src/sentences/simpleWords'
import { YEAR_1_COMMON_EXCEPTION_WORDS, YEAR_2_COMMON_EXCEPTION_WORDS } from '../../src/sentences/testing/commonExceptionWords'
import { CYPLEX_WORDS } from '../../src/sentences/testing/cyplexWords'
import { candidateBases, isKnownWord } from '../../src/sentences/testing/knownWords'
import { YEARS_3_AND_4, YEARS_5_AND_6 } from '../../src/sentences/testing/ks2StatutoryWords'
import { ALL_PATTERN_WORDS } from '../../src/sentences/testing/patternWords'
import { cosineSimilarity, decodeWordVectors } from '../../src/sentences/wordVectors'

const SOURCE = '../../.cache/tatoeba/eng_sentences_detailed.tsv'
const OUTPUT_FOLDER = '../../.cache/mining'
// The number of candidates for each word after stage 1. Each candidate costs one model call in stage 2.
const GDEX_CANDIDATES = 120
// The number of candidates for each word in the output.
const OUTPUT_CANDIDATES = 12
const TOP_K = 50

const argument = (name: string, fallback: number): number => {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? fallback : Number(process.argv[index + 1])
}

if (!existsSync(SOURCE)) {
  console.error(`The file ${SOURCE} does not exist. Download and unpack the Tatoeba file (see the comment at the top).`)
  process.exit(1)
}

// A function word has no meaning of its own, so it gets no sentences.
// An American spelling, for example "toward", also gets no sentences, because the rule for British English does not
// allow it in a sentence. The British word is "towards".
// A word that already has 3 bank sentences does not go in a "todo" list. Thus a todo list becomes shorter after each
// new bank file, and the numbers of --from and --to then point to different words. Mine the next batch before you
// commit the batch before it.
const NGSL_ORDER = new Map(NGSL_WORDS.map((word, index) => [word.toLowerCase(), index]))
const listIndex = process.argv.indexOf('--list')
const listName = listIndex === -1 ? 'concrete' : process.argv[listIndex + 1]
const todo = (words: readonly string[]): readonly string[] =>
  [...new Set(words.map((word) => word.toLowerCase()))].filter(
    (word) => !FUNCTION_WORDS.has(word) && !AMERICAN_WORDS.has(word) && bankSentences(word).length < 3,
  )

const LISTS: Record<string, readonly string[]> = {
  // The concrete words, most frequent first.
  concrete: [...CONCRETE_WORDS].sort((a, b) => (NGSL_ORDER.get(a) ?? Infinity) - (NGSL_ORDER.get(b) ?? Infinity)),
  // The spelling pattern words that still need sentences, in the order of the year groups.
  pattern: todo(ALL_PATTERN_WORDS),
  // The CYP-LEX book words that still need sentences, the words in the most books first.
  cyplex: todo(CYPLEX_WORDS),
  // All the bank words.
  all: [
    ...new Set(
      [...NGSL_WORDS, ...YEAR_1_COMMON_EXCEPTION_WORDS, ...YEAR_2_COMMON_EXCEPTION_WORDS, ...YEARS_3_AND_4, ...YEARS_5_AND_6]
        .map((word) => word.toLowerCase())
        .filter((word) => !FUNCTION_WORDS.has(word)),
    ),
  ],
}
const ALL_WORDS = LISTS[listName] ?? LISTS.concrete
const from = argument('from', 0)
const to = argument('to', ALL_WORDS.length)
const words = ALL_WORDS.slice(from, to)
const wordSet = new Set(words)
console.log(`list ${listName}: words ${from} to ${to} of ${ALL_WORDS.length}: ${words.length} words`)

// isKnownWord with the compromise root is slow, and the sentences repeat the same words. Keep each result.
const knownCache = new Map<string, boolean>()
const rootOf = (word: string): string => {
  const doc = nlp(word)
  doc.compute('root')
  return doc.json()[0]?.terms[0]?.root ?? word.toLowerCase()
}
const isKnown = (word: string): boolean => {
  const key = word.toLowerCase()
  const cached = knownCache.get(key)
  if (cached !== undefined) return cached
  const known = isKnownWord(key, () => key) || isKnownWord(key, rootOf)
  knownCache.set(key, known)
  return known
}

type Candidate = {
  readonly id: number
  readonly username: string
  readonly text: string
  readonly original: string
  readonly changed: boolean
  readonly gdex: number
}

// The NGSL rank of each word. GDEX prefers the words that a young child knows best.
const NGSL_RANK = new Map(NGSL_WORDS.map((word, index) => [word.toLowerCase(), index + 1]))
const commonness = makeCommonness({ rankOf: (word) => NGSL_RANK.get(word), bases: candidateBases, names: NAMES })

// Stage 1.
const candidates = new Map<string, Candidate[]>(words.map((word) => [word, []]))
const seen = new Map<string, Set<string>>(words.map((word) => [word, new Set()]))
// Two sentences that are the same except for a name are duplicates. Example: "Tom likes food." and "Mary likes food."
const duplicateKey = (text: string): string =>
  tokenize(text)
    .map((token) => (NAMES.has(token) ? 'NAME' : token.toLowerCase()))
    .join(' ')

const keepBest = (list: Candidate[]): Candidate[] => list.sort((a, b) => b.gdex - a.gdex).slice(0, GDEX_CANDIDATES)

let lines = 0
const started = Date.now()
const reader = createInterface({ input: createReadStream(SOURCE, 'utf8'), crlfDelay: Infinity })
for await (const line of reader) {
  lines += 1
  if (lines % 250_000 === 0) console.log(`stage 1: ${lines} lines, ${Math.round((Date.now() - started) / 1000)} s`)
  const [id, , original, username] = line.split('\t')
  if (original === undefined) continue
  const tokens = tokenize(original)
  if (tokens.length < MINIMUM_WORDS || tokens.length > MAXIMUM_WORDS + 2) continue
  const targets = [...new Set(tokens.map((token) => token.toLowerCase()))].filter((token) => wordSet.has(token))
  if (targets.length === 0) continue
  const expansion = expandContractions(original)
  if (expansion === null) continue
  for (const word of targets) {
    if (hardFilterReason(expansion.text, word, { isKnown, bases: candidateBases }) !== null) continue
    const key = duplicateKey(expansion.text)
    const wordSeen = seen.get(word)!
    if (wordSeen.has(key)) continue
    wordSeen.add(key)
    const list = candidates.get(word)!
    list.push({
      id: Number(id),
      username,
      text: expansion.text,
      original,
      changed: expansion.changed,
      gdex: gdexScore(expansion.text, word, { commonness }),
    })
    if (list.length > GDEX_CANDIDATES * 4) candidates.set(word, keepBest(list))
  }
}
console.log(`stage 1 done: ${lines} lines in ${Math.round((Date.now() - started) / 1000)} s`)

// Stage 2.
env.cacheDir = '../../.cache/models'
const fill = await pipeline('fill-mask', 'Xenova/roberta-base', { dtype: 'q8' })
const vectors = decodeWordVectors(new Uint8Array(readFileSync('../../public/data/word-vectors.bin')))
const similarity = (a: string, b: string): number => {
  const va = vectors.vector(a)
  const vb = vectors.vector(b)
  return va && vb ? cosineSimilarity(va, vb) : 0
}

type Scored = Candidate & { readonly context: number; readonly score: number }
const results: { word: string; available: number; candidates: Scored[] }[] = []
for (const [index, word] of words.entries()) {
  const best = keepBest(candidates.get(word)!)
  const scored: Scored[] = []
  for (const candidate of best) {
    const masked = maskSentence(candidate.text, word, '<mask>')
    if (masked === null) continue
    const output = (await fill(masked, { top_k: TOP_K })) as { token_str: string; score: number }[]
    const guesses: Guess[] = output.map(({ token_str, score }) => ({ token: token_str, score }))
    const context = contextScore(guesses, word, similarity)
    scored.push({ ...candidate, context, score: candidate.gdex * context })
  }
  scored.sort((a, b) => b.score - a.score)
  results.push({ word, available: seen.get(word)!.size, candidates: [...pickDiverse(scored, OUTPUT_CANDIDATES)] })
  if ((index + 1) % 25 === 0) console.log(`stage 2: ${index + 1} of ${words.length} words, ${Math.round((Date.now() - started) / 1000)} s`)
}

mkdirSync(OUTPUT_FOLDER, { recursive: true })
const base = `${OUTPUT_FOLDER}/candidates-${listName}-${from}-${to}`
writeFileSync(`${base}.json`, JSON.stringify(results, null, 1))
const NEWLINE = String.fromCharCode(10)
writeFileSync(
  `${base}.txt`,
  results
    .map(({ word, available, candidates: list }) =>
      [
        `## ${word} (${available} passed the filters)`,
        ...list.map(
          (c) => `${c.score.toFixed(2)} g${c.gdex.toFixed(2)} c${c.context.toFixed(2)} #${c.id}${c.changed ? '*' : ''} ${c.text}`,
        ),
      ].join(NEWLINE),
    )
    .join(NEWLINE + NEWLINE),
)
console.log(`wrote ${base}.json and ${base}.txt in ${Math.round((Date.now() - started) / 1000)} s`)
