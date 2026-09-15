import { describe, expect, it } from 'vitest'
import {
  commonWordScore,
  gdexScore,
  GREYLIST,
  greylistScore,
  isWholeSentence,
  keywordPositionScore,
  OPTIMAL_LENGTH,
  optimalInterval,
  pronounStartScore,
  tokenize,
} from './gdex'
import { AMERICAN_WORDS } from '../simpleWords'

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

  it('uses a short optimal length for KS2 children', () => {
    expect(OPTIMAL_LENGTH).toEqual({ min: 6, max: 10 })
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

describe('commonWordScore', () => {
  it('gives the mean commonness of the other words, without the keyword', () => {
    const commonness = (word: string) => (word.toLowerCase() === 'hungry' ? 0.5 : 1)
    expect(commonWordScore(['We', 'eat', 'food', 'when', 'hungry'], 'food', commonness)).toBeCloseTo((1 + 1 + 1 + 0.5) / 4)
  })

  it('gives 1 when the sentence has only the keyword', () => {
    expect(commonWordScore(['Food'], 'food', () => 0)).toBe(1)
  })
})

describe('greylistScore', () => {
  it('gives 1 for a sentence with no greylist word, and less for each greylist word', () => {
    expect(greylistScore(['We', 'eat', 'food'])).toBe(1)
    expect(greylistScore(['Whom', 'did', 'you', 'see'])).toBeCloseTo(0.7)
    expect(greylistScore(['Whom', 'shall', 'we', 'see'])).toBeCloseTo(0.49)
  })

  it('has lowercase words, each one time, and no word that the American spelling list already rejects', () => {
    const words = [...GREYLIST]
    expect(words.filter((word) => word !== word.toLowerCase())).toEqual([])
    expect(words.filter((word) => AMERICAN_WORDS.has(word))).toEqual([])
  })
})

describe('gdexScore', () => {
  const commonness = () => 1

  it('gives a score from 0 to 1, and 1 for a sentence that obeys all the rules', () => {
    expect(gdexScore('We always eat food when we are hungry.', 'food', { commonness })).toBe(1)
  })

  it('gives 0 for a sentence that is not whole', () => {
    expect(gdexScore('we always eat food when we are hungry', 'food', { commonness })).toBe(0)
  })

  it('gives a lower score for a sentence with less common words', () => {
    const rare = gdexScore('We always eat food when we are hungry.', 'food', {
      commonness: (word) => (word === 'hungry' ? 0.2 : 1),
    })
    expect(rare).toBeLessThan(1)
    expect(rare).toBeGreaterThan(0)
  })

  it('gives a lower score for a sentence that is too short, too long, starts with a pronoun, or has a greylist word', () => {
    const good = gdexScore('We always eat food when we are hungry.', 'food', { commonness })
    expect(gdexScore('We eat food.', 'food', { commonness })).toBeLessThan(good)
    expect(gdexScore('We always eat food when we are hungry and when we are sad and tired too.', 'food', { commonness })).toBeLessThan(
      good,
    )
    expect(gdexScore('They always eat food when they are hungry.', 'food', { commonness })).toBeLessThan(good)
    expect(gdexScore('We shall always eat food when we are hungry.', 'food', { commonness })).toBeLessThan(good)
  })
})
