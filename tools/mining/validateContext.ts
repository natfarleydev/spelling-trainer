// Validate the context score with the hand-labelled set in contextLabels.ts.
// Run from tools/mining: npx tsx validateContext.ts
// The script prints the rank agreement (1 is perfect, 0.5 is chance) for three scores:
// - context: the fill-mask guesses, weighted by their similarity to the word (the score that the mining uses).
// - exact: only the probability of the word itself.
// - clue: the old check, the best word vector similarity of a content word in the sentence.

import { readFileSync } from 'node:fs'
import { env, pipeline } from '@huggingface/transformers'
import { FUNCTION_WORDS } from '../../src/sentences/functionWords'
import { contextScore, maskSentence, rankAgreement, type Guess } from '../../src/sentences/mining/context'
import { cosineSimilarity, decodeWordVectors } from '../../src/sentences/wordVectors'
import { CONTEXT_LABELS } from './contextLabels'

const TOP_K = 50

env.cacheDir = '../../.cache/models'
const fill = await pipeline('fill-mask', 'Xenova/roberta-base', { dtype: 'q8' })
const vectors = decodeWordVectors(new Uint8Array(readFileSync('../../public/data/word-vectors.bin')))

const similarity = (a: string, b: string): number => {
  const va = vectors.vector(a)
  const vb = vectors.vector(b)
  return va && vb ? cosineSimilarity(va, vb) : 0
}

const guessesFor = async (sentence: string, word: string): Promise<readonly Guess[]> => {
  const masked = maskSentence(sentence, word, '<mask>')
  if (masked === null) throw new Error(`"${sentence}" does not have "${word}"`)
  const output = (await fill(masked, { top_k: TOP_K })) as { token_str: string; score: number }[]
  return output.map(({ token_str, score }) => ({ token: token_str, score }))
}

const clueScore = (sentence: string, word: string): number =>
  sentence
    .split(/[^A-Za-z]+/)
    .map((token) => token.toLowerCase())
    .filter((token) => token !== '' && token !== word && !FUNCTION_WORDS.has(token))
    .reduce((best, token) => Math.max(best, similarity(token, word)), 0)

const exactScore = (guesses: readonly Guess[], word: string): number =>
  guesses.filter((guess) => guess.token.trim().toLowerCase() === word).reduce((sum, guess) => sum + guess.score, 0)

type Scores = { readonly context: number; readonly exact: number; readonly clue: number }
const scoresFor = async (sentence: string, word: string): Promise<Scores> => {
  const guesses = await guessesFor(sentence, word)
  return { context: contextScore(guesses, word, similarity), exact: exactScore(guesses, word), clue: clueScore(sentence, word) }
}

const rows: { word: string; good: Scores; poor: Scores; hardPoor: Scores }[] = []
for (const { word, good, poor, hardPoor } of CONTEXT_LABELS) {
  rows.push({
    word,
    good: await scoresFor(good, word),
    poor: await scoresFor(poor, word),
    hardPoor: await scoresFor(hardPoor, word),
  })
}

const fixed = (value: number) => value.toFixed(3).padStart(6)
console.log('word'.padEnd(12), 'context good/hard', '  exact good/hard', '   clue good/hard')
for (const { word, good, hardPoor } of rows) {
  const mark = good.context > hardPoor.context ? ' ' : '!'
  console.log(
    `${mark}${word.padEnd(11)}`,
    fixed(good.context),
    fixed(hardPoor.context),
    '  ',
    fixed(good.exact),
    fixed(hardPoor.exact),
    '  ',
    fixed(good.clue),
    fixed(hardPoor.clue),
  )
}
for (const set of ['poor', 'hardPoor'] as const) {
  for (const key of ['context', 'exact', 'clue'] as const) {
    const agreement = rankAgreement(
      rows.map((row) => row.good[key]),
      rows.map((row) => row[set][key]),
    )
    // The pairs where the good sentence has the higher score. This is the important number for choosing sentences per word.
    const wins = rows.filter((row) => row.good[key] > row[set][key]).length
    console.log(`${set.padEnd(8)} ${key.padEnd(7)} rank agreement ${agreement.toFixed(3)}, pairs correct ${wins} of ${rows.length}`)
  }
}
