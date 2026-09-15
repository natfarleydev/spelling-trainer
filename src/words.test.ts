import { describe, expect, it } from 'vitest'
import { isValidWordList, MAX_WORDS, parseWords, wordCountMessage } from './words'

describe('parseWords', () => {
  it('gives one word for each line', () => {
    expect(parseWords('because\nfriend\nnecessary')).toEqual(['because', 'friend', 'necessary'])
  })

  it('removes the spaces at the start and at the end of a line', () => {
    expect(parseWords('  because \t')).toEqual(['because'])
  })

  it('ignores the empty lines', () => {
    expect(parseWords('\nbecause\n\n   \nfriend\n')).toEqual(['because', 'friend'])
  })

  it('accepts Windows line endings', () => {
    expect(parseWords('because\r\nfriend')).toEqual(['because', 'friend'])
  })

  it('gives an empty list for empty text', () => {
    expect(parseWords('')).toEqual([])
  })
})

describe('isValidWordList', () => {
  it('rejects an empty list', () => {
    expect(isValidWordList([])).toBe(false)
  })

  it('accepts a list of MAX_WORDS words', () => {
    expect(isValidWordList(Array(MAX_WORDS).fill('word'))).toBe(true)
  })

  it('rejects a list with more than MAX_WORDS words', () => {
    expect(isValidWordList(Array(MAX_WORDS + 1).fill('word'))).toBe(false)
  })
})

describe('wordCountMessage', () => {
  it('gives the number of words', () => {
    expect(wordCountMessage(3)).toBe('3 of 10 words')
  })

  it('tells the user how many words to remove when there are too many', () => {
    expect(wordCountMessage(12)).toBe('12 of 10 words. Remove 2.')
  })
})
