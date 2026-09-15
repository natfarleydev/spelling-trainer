import nlp from 'compromise/three'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { BANK_ENTRIES, bankSentences } from './bank'
import { FUNCTION_WORDS } from './functionWords'
import { splitSentence } from './highlight'
import { AMERICAN_WORDS } from './simpleWords'
import { YEAR_1_COMMON_EXCEPTION_WORDS, YEAR_2_COMMON_EXCEPTION_WORDS } from './testing/commonExceptionWords'
import { isKnownWord } from './testing/knownWords'
import { YEARS_3_AND_4, YEARS_5_AND_6 } from './testing/ks2StatutoryWords'
import { cosineSimilarity, decodeWordVectors } from './wordVectors'

// The rules for the sentence bank. A bank sentence must help a child to understand the meaning of the word.

const vectors = decodeWordVectors(new Uint8Array(readFileSync(new URL('../../public/data/word-vectors.bin', import.meta.url))))

const rootOf = (word: string): string => {
  const doc = nlp(word)
  doc.compute('root')
  return doc.json()[0]?.terms[0]?.root ?? word.toLowerCase()
}

const vectorOf = (word: string) => vectors.vector(word) ?? vectors.vector(rootOf(word))

const wordsOf = (sentence: string): string[] => sentence.split(/[^A-Za-z]+/).filter((word) => word !== '')

const MEANING_THRESHOLD = 0.4
const MAXIMUM_WORDS = 15

// The content word of the sentence that is most similar in meaning to the word under test.
const bestClue = (word: string, sentence: string): { word: string; similarity: number } | null => {
  const target = vectorOf(word)
  if (!target) return null
  const matches = wordsOf(sentence)
    .map((other) => other.toLowerCase())
    .filter((other) => other !== word.toLowerCase() && !FUNCTION_WORDS.has(other))
    .flatMap((other) => {
      const vector = vectorOf(other)
      return vector ? [{ word: other, similarity: cosineSimilarity(target, vector) }] : []
    })
    .sort((a, b) => b.similarity - a.similarity)
  return matches[0] ?? null
}

const everySentence = BANK_ENTRIES.flatMap((entry) => entry.sentences.map((sentence) => [entry.word, sentence] as const))

describe('BANK_ENTRIES', () => {
  it('has each word one time', () => {
    const words = BANK_ENTRIES.map((entry) => entry.word.toLowerCase())
    expect(words.filter((word, i) => words.indexOf(word) !== i)).toEqual([])
  })

  it.each(BANK_ENTRIES.map((entry) => [entry.word, entry] as const))('%s has at least 2 different sentences', (_, entry) => {
    expect(entry.sentences.length).toBeGreaterThanOrEqual(2)
    expect(new Set(entry.sentences).size).toBe(entry.sentences.length)
  })

  it('has sentences for each word of the statutory word list for years 3 and 4', () => {
    expect(YEARS_3_AND_4.filter((word) => bankSentences(word).length === 0)).toEqual([])
  })

  // A function word, for example "the" or "was", has no meaning of its own, so the bank has no sentences for it.
  it('has sentences for each common exception word for years 1 and 2 that is not a function word', () => {
    const words = [...YEAR_1_COMMON_EXCEPTION_WORDS, ...YEAR_2_COMMON_EXCEPTION_WORDS]
    expect(words.filter((word) => !FUNCTION_WORDS.has(word.toLowerCase()) && bankSentences(word).length === 0)).toEqual([])
  })

  it('has sentences for each word of the statutory word list for years 5 and 6', () => {
    expect(YEARS_5_AND_6.filter((word) => bankSentences(word).length === 0)).toEqual([])
  })
})

describe.each(everySentence)('%s: %j', (word, sentence) => {
  it('contains the word as a whole word', () => {
    expect(splitSentence(sentence, word).some((part) => part.isWord)).toBe(true)
  })

  it('is a sentence', () => {
    expect(sentence).toMatch(/^[A-Z]/)
    expect(sentence).toMatch(/[.?!]$/)
  })

  it(`has a maximum of ${MAXIMUM_WORDS} words`, () => {
    expect(wordsOf(sentence).length).toBeLessThanOrEqual(MAXIMUM_WORDS)
  })

  it('has no apostrophe', () => {
    expect(sentence).not.toMatch(/['’]/)
  })

  it('uses British English', () => {
    expect(wordsOf(sentence).filter((other) => AMERICAN_WORDS.has(other.toLowerCase()))).toEqual([])
  })

  it('uses only words that a KS2 child knows', () => {
    const unknown = wordsOf(sentence).filter(
      (other) => other.toLowerCase() !== word.toLowerCase() && !isKnownWord(other, rootOf),
    )
    expect(unknown).toEqual([])
  })

  it(`shows the meaning: a content word has a similarity of at least ${MEANING_THRESHOLD}`, () => {
    const clue = bestClue(word, sentence)
    expect(clue?.similarity ?? 0, `best clue: ${JSON.stringify(clue)}`).toBeGreaterThanOrEqual(MEANING_THRESHOLD)
  })
})

describe('bankSentences', () => {
  it('finds the sentences of a word without regard to capital letters and spaces', () => {
    const [entry] = BANK_ENTRIES
    expect(bankSentences(`  ${entry.word.toUpperCase()} `)).toEqual(entry.sentences)
  })

  it('gives an empty list for a word that is not in the bank', () => {
    expect(bankSentences('zzzz')).toEqual([])
  })
})
