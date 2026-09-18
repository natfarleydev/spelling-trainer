// Help Claude to write bank sentences for the words that Tatoeba does not cover.
// Run from tools/mining:
//   node node_modules/tsx/dist/cli.mjs checkWritten.ts --clues merriment,thistle
//   node node_modules/tsx/dist/cli.mjs checkWritten.ts --check <file.json>
//
// --clues gives the known words with the highest word vector similarity. Use them to write a sentence that shows the
// meaning. --check reads a file of { "<word>": ["<sentence>", ...] } and applies the rules of src/sentences/bank.test.ts,
// so that a draft is correct before it goes into a bank file.

import { readFileSync } from 'node:fs'
import nlp from 'compromise/three'
import { FUNCTION_WORDS } from '../../src/sentences/functionWords'
import { bankSentences } from '../../src/sentences/bank'
import { splitSentence } from '../../src/sentences/highlight'
import { NAMES } from '../../src/sentences/mining/hardFilter'
import { AMERICAN_WORDS } from '../../src/sentences/simpleWords'
import { isKnownWord } from '../../src/sentences/testing/knownWords'
import { needsMeaningCheck } from '../../src/sentences/testing/meaningExceptions'
import { cosineSimilarity, decodeWordVectors } from '../../src/sentences/wordVectors'

const MEANING_THRESHOLD = 0.4
const MAXIMUM_WORDS = 15
const CLUE_COUNT = 30

const vectors = decodeWordVectors(new Uint8Array(readFileSync('../../public/data/word-vectors.bin')))

const rootOf = (word: string): string => {
  const doc = nlp(word)
  doc.compute('root')
  return doc.json()[0]?.terms[0]?.root ?? word.toLowerCase()
}
const vectorOf = (word: string) => vectors.vector(word) ?? vectors.vector(rootOf(word))
const wordsOf = (sentence: string): readonly string[] => sentence.split(/[^A-Za-z]+/).filter((word) => word !== '')
const known = (word: string): boolean => isKnownWord(word, rootOf)

const argument = (name: string): string | undefined => {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}

const similar = (word: string): readonly { readonly word: string; readonly similarity: number }[] => {
  const target = vectorOf(word)
  if (!target) return []
  return vectors.words
    .filter((other) => other !== word.toLowerCase() && !FUNCTION_WORDS.has(other) && known(other))
    .map((other) => ({ word: other, similarity: cosineSimilarity(target, vectorOf(other) ?? new Float32Array()) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, CLUE_COUNT)
}

const problems = (word: string, sentence: string): readonly string[] => {
  const words = wordsOf(sentence)
  const unknown = words.filter((other) => other.toLowerCase() !== word.toLowerCase() && !NAMES.has(other) && !known(other))
  const american = words.filter((other) => AMERICAN_WORDS.has(other.toLowerCase()))
  const clues = words
    .map((other) => other.toLowerCase())
    .filter((other) => other !== word.toLowerCase() && !FUNCTION_WORDS.has(other))
    .flatMap((other) => {
      const vector = vectorOf(other)
      const target = vectorOf(word)
      return vector && target ? [{ word: other, similarity: cosineSimilarity(target, vector) }] : []
    })
    .sort((a, b) => b.similarity - a.similarity)
  const best = clues[0]
  return [
    ...(splitSentence(sentence, word).some((part) => part.isWord) ? [] : ['it does not have the word']),
    ...(/^[A-Z]/.test(sentence) && /[.?!]$/.test(sentence) ? [] : ['it is not a sentence']),
    ...(words.length <= MAXIMUM_WORDS ? [] : [`it has ${words.length} words`]),
    ...(/['’]/.test(sentence) ? ['it has an apostrophe'] : []),
    ...(unknown.length === 0 ? [] : [`unknown words: ${unknown.join(', ')}`]),
    ...(american.length === 0 ? [] : [`American words: ${american.join(', ')}`]),
    ...(!needsMeaningCheck(word) || (best?.similarity ?? 0) >= MEANING_THRESHOLD
      ? []
      : [`the best clue is ${best ? `"${best.word}" (${best.similarity.toFixed(2)})` : 'none'}`]),
  ]
}

const clueWords = argument('clues')
if (clueWords !== undefined) {
  for (const word of clueWords.split(',')) {
    const matches = similar(word.trim())
    console.log(`${word.trim()} (${vectorOf(word.trim()) ? 'vector' : 'NO VECTOR'}, ${bankSentences(word.trim()).length} sentences)`)
    console.log(`  ${matches.map(({ word: other, similarity }) => `${other} ${similarity.toFixed(2)}`).join(', ')}`)
  }
}

const checkFile = argument('check')
if (checkFile !== undefined) {
  const drafts = JSON.parse(readFileSync(checkFile, 'utf8')) as Record<string, readonly string[]>
  let bad = 0
  for (const [word, sentences] of Object.entries(drafts)) {
    const total = bankSentences(word).length + sentences.length
    if (!vectorOf(word)) console.log(`${word}: NO VECTOR`)
    if (total < 3) console.log(`${word}: only ${total} sentences`)
    for (const sentence of sentences) {
      const found = problems(word, sentence)
      if (found.length > 0) {
        bad += 1
        console.log(`${word}: ${JSON.stringify(sentence)}`)
        for (const problem of found) console.log(`  - ${problem}`)
      }
    }
  }
  console.log(bad === 0 ? 'All the sentences obey the rules.' : `${bad} sentences have a problem.`)
}

if (clueWords === undefined && checkFile === undefined) console.log('Give --clues <words> or --check <file.json>.')
