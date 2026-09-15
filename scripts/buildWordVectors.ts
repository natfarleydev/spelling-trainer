// Make public/data/word-vectors.bin from the GloVe 6B vectors with 50 dimensions.
//
// Source: glove.6B.50d.zip from https://zenodo.org/records/4925376 (public domain).
// It is a copy of the Stanford GloVe 6B vectors (https://nlp.stanford.edu/projects/glove/), Public Domain Dedication and License v1.0.
// MD5 of the zip file: a6c8d6e1e52401e913e5f6fa137b1d53. The zip file has one file, "glove.6B.50d", in the word2vec binary format.
//
// Run: npm run build:vectors
// The script keeps the most frequent words and all the words of the spelling lists, so that the file stays small.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { NGSL_FIRST_1000 } from '../src/sentences/ngslFirst1000.ts'
import { YEAR_1_COMMON_EXCEPTION_WORDS, YEAR_2_COMMON_EXCEPTION_WORDS } from '../src/sentences/testing/commonExceptionWords.ts'
import { YEARS_3_AND_4, YEARS_5_AND_6 } from '../src/sentences/testing/ks2StatutoryWords.ts'
import { encodeWordVectors, type WordVectorEntry } from '../src/sentences/wordVectors.ts'

const SOURCE = '.cache/glove/glove.6B.50d'
const OUTPUT = 'public/data/word-vectors.bin'
const MOST_FREQUENT_WORD_COUNT = 20_000

if (!existsSync(SOURCE)) {
  console.error(`The file ${SOURCE} does not exist.`)
  console.error('1. Download glove.6B.50d.zip from https://zenodo.org/records/4925376 into .cache/glove.')
  console.error('2. Make sure that its MD5 is a6c8d6e1e52401e913e5f6fa137b1d53.')
  console.error('3. Extract it. The zip file uses LZMA compression. On Windows, use "tar -xf glove.6B.50d.zip".')
  process.exit(1)
}

// The words that the file must always have, because the sentences use them.
const listWords = new Set(
  [...NGSL_FIRST_1000, ...YEARS_3_AND_4, ...YEARS_5_AND_6, ...YEAR_1_COMMON_EXCEPTION_WORDS, ...YEAR_2_COMMON_EXCEPTION_WORDS].map(
    (word) => word.toLowerCase(),
  ),
)

const buffer = readFileSync(SOURCE)
const headerEnd = buffer.indexOf(10)
const [count, dimensions] = buffer.subarray(0, headerEnd).toString().trim().split(/\s+/).map(Number)
const ALPHABETIC = /^[a-z]+$/

const entries: WordVectorEntry[] = []
const found = new Set<string>()
let position = headerEnd + 1
let frequentWords = 0

for (let rank = 0; rank < count; rank += 1) {
  const space = buffer.indexOf(32, position)
  const word = buffer.subarray(position, space).toString()
  const start = space + 1
  const isFrequent = ALPHABETIC.test(word) && frequentWords < MOST_FREQUENT_WORD_COUNT
  if (isFrequent || listWords.has(word)) {
    const vector = new Float32Array(buffer.buffer.slice(buffer.byteOffset + start, buffer.byteOffset + start + dimensions * 4))
    entries.push({ word, vector })
    found.add(word)
    if (isFrequent) frequentWords += 1
  }
  position = start + dimensions * 4
  if (buffer[position] === 10) position += 1
}

const missing = [...listWords].filter((word) => !found.has(word))
const bytes = encodeWordVectors(entries)
mkdirSync('public/data', { recursive: true })
writeFileSync(OUTPUT, bytes)

console.log(`${entries.length} words, ${dimensions} dimensions, ${bytes.byteLength} bytes in ${OUTPUT}`)
console.log(`${frequentWords} most frequent words and ${entries.length - frequentWords} other list words`)
console.log(`List words without a GloVe vector (${missing.length}): ${missing.join(', ') || 'none'}`)
