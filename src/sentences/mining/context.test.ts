import { describe, expect, it } from 'vitest'
import { contextScore, maskSentence, rankAgreement, type Guess } from './context'

describe('maskSentence', () => {
  it('replaces the keyword with the mask token', () => {
    expect(maskSentence('We eat food when we are hungry.', 'food', '<mask>')).toBe('We eat <mask> when we are hungry.')
  })

  it('replaces the keyword in a different case, and only as a whole word', () => {
    expect(maskSentence('Food and seafood are good.', 'food', '<mask>')).toBe('<mask> and seafood are good.')
  })

  it('gives null when the sentence does not have the keyword', () => {
    expect(maskSentence('We eat bread.', 'food', '<mask>')).toBeNull()
  })
})

describe('contextScore', () => {
  const similarity = (a: string, b: string) => (a === b ? 1 : a === 'meals' && b === 'food' ? 0.5 : 0)

  it('adds the probability of each guess, weighted by its similarity to the keyword', () => {
    const guesses: Guess[] = [
      { token: ' food', score: 0.6 },
      { token: ' meals', score: 0.2 },
      { token: ' shoes', score: 0.1 },
    ]
    expect(contextScore(guesses, 'food', similarity)).toBeCloseTo(0.6 + 0.2 * 0.5)
  })

  it('compares the guess without spaces and without capital letters', () => {
    expect(contextScore([{ token: ' Food', score: 0.4 }], 'food', similarity)).toBeCloseTo(0.4)
  })

  it('does not subtract for a guess with a negative similarity', () => {
    expect(contextScore([{ token: 'x', score: 0.9 }], 'food', () => -0.5)).toBe(0)
  })

  it('gives 0 when there are no guesses', () => {
    expect(contextScore([], 'food', similarity)).toBe(0)
  })
})

describe('rankAgreement', () => {
  // The share of (good, poor) pairs where the good sentence has the higher score. 1 is perfect. 0.5 is chance.
  it('gives 1 when each good item has a higher score than each poor item', () => {
    expect(rankAgreement([0.9, 0.8], [0.1, 0.2])).toBe(1)
  })

  it('gives 0 when each poor item has the higher score', () => {
    expect(rankAgreement([0.1], [0.9])).toBe(0)
  })

  it('counts a tie as a half', () => {
    expect(rankAgreement([0.5], [0.5])).toBe(0.5)
    expect(rankAgreement([0.9, 0.5], [0.5])).toBe(0.75)
  })
})
