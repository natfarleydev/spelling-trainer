import { describe, expect, it } from 'vitest'
import {
  commonWordShare,
  gdexScore,
  isWholeSentence,
  keywordPositionScore,
  optimalInterval,
  pronounStartScore,
  tokenize,
} from './gdex'

// GDEX: Kilgarriff et al. (2008), "GDEX: Automatically finding good dictionary examples in a corpus".

describe('tokenize', () => {
  it('gives the words of a sentence without punctuation', () => {
    expect(tokenize('We eat food, when we are hungry!')).toEqual(['We', 'eat', 'food', 'when', 'we', 'are', 'hungry'])
  })
})

describe('isWholeSentence', () => {
  it.each([
    ['We eat food.', true],
    ['Do you like food?', true],
    ['What a meal!', true],
    ['we eat food.', false],
    ['We eat food', false],
    ['"We eat food."', false],
  ])('%j: %s', (sentence, expected) => {
    expect(isWholeSentence(sentence)).toBe(expected)
  })
})

describe('optimalInterval', () => {
  it('gives 1 inside the interval', () => {
    expect(optimalInterval(6, 6, 12)).toBe(1)
    expect(optimalInterval(9, 6, 12)).toBe(1)
    expect(optimalInterval(12, 6, 12)).toBe(1)
  })

  it('gives less than 1 outside the interval, and less for a value that is farther away', () => {
    expect(optimalInterval(4, 6, 12)).toBeLessThan(1)
    expect(optimalInterval(3, 6, 12)).toBeLessThan(optimalInterval(4, 6, 12))
    expect(optimalInterval(15, 6, 12)).toBeLessThan(1)
    expect(optimalInterval(20, 6, 12)).toBeLessThan(optimalInterval(15, 6, 12))
  })

  it('never gives less than 0', () => {
    expect(optimalInterval(0, 6, 12)).toBe(0)
    expect(optimalInterval(100, 6, 12)).toBe(0)
  })
})

describe('keywordPositionScore', () => {
  it('gives less for a keyword at the start of the sentence', () => {
    expect(keywordPositionScore(['Food', 'is', 'good'], 'food')).toBeLessThan(keywordPositionScore(['We', 'eat', 'food'], 'food'))
  })

  it('gives 0 when the sentence does not have the keyword', () => {
    expect(keywordPositionScore(['We', 'eat', 'bread'], 'food')).toBe(0)
  })
})

describe('pronounStartScore', () => {
  // A pronoun at the start usually refers to something outside the sentence, so the sentence is less clear alone.
  it.each([
    [['He', 'ate', 'it'], 0.5],
    [['They', 'ate', 'food'], 0.5],
    [['This', 'is', 'food'], 0.5],
    [['We', 'eat', 'food'], 1],
    [['Tom', 'ate', 'food'], 1],
  ])('%j gives %s', (tokens, expected) => {
    expect(pronounStartScore(tokens)).toBe(expected)
  })
})

describe('commonWordShare', () => {
  it('gives the share of the other words that are common, without the keyword', () => {
    const isCommon = (word: string) => ['we', 'eat', 'when', 'are'].includes(word.toLowerCase())
    expect(commonWordShare(['We', 'eat', 'food', 'when', 'we', 'are', 'hungry'], 'food', isCommon)).toBeCloseTo(5 / 6)
  })

  it('gives 1 when the sentence has only the keyword', () => {
    expect(commonWordShare(['Food'], 'food', () => false)).toBe(1)
  })
})

describe('gdexScore', () => {
  const isCommon = () => true

  it('gives a score from 0 to 1, and 1 for a sentence that obeys all the rules', () => {
    expect(gdexScore('We always eat food when we are hungry.', 'food', { isCommon })).toBe(1)
  })

  it('gives 0 for a sentence that is not whole', () => {
    expect(gdexScore('we always eat food when we are hungry', 'food', { isCommon })).toBe(0)
  })

  it('gives a lower score for a sentence with rare words', () => {
    const rare = gdexScore('We always eat food when we are hungry.', 'food', { isCommon: (word) => word !== 'hungry' })
    expect(rare).toBeLessThan(1)
    expect(rare).toBeGreaterThan(0)
  })

  it('gives a lower score for a sentence that is too short, too long, or starts with a pronoun', () => {
    const good = gdexScore('We always eat food when we are hungry.', 'food', { isCommon })
    expect(gdexScore('We eat food.', 'food', { isCommon })).toBeLessThan(good)
    expect(gdexScore('We always eat food when we are hungry and when we are sad and tired too.', 'food', { isCommon })).toBeLessThan(
      good,
    )
    expect(gdexScore('They always eat food when they are hungry.', 'food', { isCommon })).toBeLessThan(good)
  })
})
