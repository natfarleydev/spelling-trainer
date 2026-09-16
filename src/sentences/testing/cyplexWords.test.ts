import { describe, expect, it } from 'vitest'
import { FUNCTION_WORDS } from '../functionWords'
import { AMERICAN_WORDS } from '../simpleWords'
import { CYPLEX_WORDS } from './cyplexWords'

// Parts of compound words, for example "old-fashioned" or "dark-haired". They are not words on their own.
const COMPOUND_PARTS = ['fashioned', 'haired', 'legged', 'mouthed', 'pitched', 'shaped', 'sized', 'eyed']

describe('CYPLEX_WORDS', () => {
  it('has lowercase words only, each one time', () => {
    expect(CYPLEX_WORDS.filter((word) => word !== word.toLowerCase())).toEqual([])
    expect(new Set(CYPLEX_WORDS).size).toBe(CYPLEX_WORDS.length)
  })

  it('has only letters in each word, and a minimum of 4 letters', () => {
    expect(CYPLEX_WORDS.filter((word) => !/^[a-z]{4,}$/.test(word))).toEqual([])
  })

  it('has no function word', () => {
    expect(CYPLEX_WORDS.filter((word) => FUNCTION_WORDS.has(word))).toEqual([])
  })

  it('has no American spelling', () => {
    expect(CYPLEX_WORDS.filter((word) => AMERICAN_WORDS.has(word))).toEqual([])
  })

  it('has no part of a compound word', () => {
    expect(CYPLEX_WORDS.filter((word) => COMPOUND_PARTS.includes(word))).toEqual([])
  })

  it('has a minimum of 150 words', () => {
    expect(CYPLEX_WORDS.length).toBeGreaterThanOrEqual(150)
  })
})
