import { describe, expect, it } from 'vitest'
import { AMERICAN_WORDS } from '../simpleWords'
import {
  ALL_PATTERN_WORDS,
  YEAR_1_PATTERN_WORDS,
  YEAR_2_PATTERN_WORDS,
  YEARS_3_AND_4_PATTERN_WORDS,
  YEARS_5_AND_6_PATTERN_WORDS,
} from './patternWords'

// The words of the document itself, not example words. The extraction from the PDF must not have them.
const GRAMMAR_WORDS = [
  'verb',
  'noun',
  'adjective',
  'adverb',
  'preposition',
  'suffix',
  'prefix',
  'tense',
  'singular',
  'plural',
  'schwa',
  'unstressed',
  'stressed',
  'contraction',
  'apostrophe',
  'homophone',
]

const lists = [
  ['YEAR_1_PATTERN_WORDS', YEAR_1_PATTERN_WORDS],
  ['YEAR_2_PATTERN_WORDS', YEAR_2_PATTERN_WORDS],
  ['YEARS_3_AND_4_PATTERN_WORDS', YEARS_3_AND_4_PATTERN_WORDS],
  ['YEARS_5_AND_6_PATTERN_WORDS', YEARS_5_AND_6_PATTERN_WORDS],
] as const

describe.each(lists)('%s', (_, words) => {
  it('has lowercase words only, each one time', () => {
    expect(words.filter((word) => word !== word.toLowerCase())).toEqual([])
    expect(new Set(words).size).toBe(words.length)
  })

  it('has only letters in each word, and a minimum of 2 letters', () => {
    expect(words.filter((word) => !/^[a-z]{2,}$/.test(word))).toEqual([])
  })

  it('has no grammar word of the document itself', () => {
    expect(words.filter((word) => GRAMMAR_WORDS.includes(word))).toEqual([])
  })

  it('has no American spelling', () => {
    expect(words.filter((word) => AMERICAN_WORDS.has(word))).toEqual([])
  })
})

describe('ALL_PATTERN_WORDS', () => {
  it('has all the words of the four lists', () => {
    expect(ALL_PATTERN_WORDS.length).toBe(
      YEAR_1_PATTERN_WORDS.length + YEAR_2_PATTERN_WORDS.length + YEARS_3_AND_4_PATTERN_WORDS.length + YEARS_5_AND_6_PATTERN_WORDS.length,
    )
  })

  it('has a minimum of 700 words', () => {
    expect(ALL_PATTERN_WORDS.length).toBeGreaterThanOrEqual(700)
  })
})
