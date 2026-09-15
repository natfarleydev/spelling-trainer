import { describe, expect, it } from 'vitest'
import { makeCommonness } from './commonness'

const RANKS = new Map([
  ['the', 1],
  ['dog', 400],
  ['park', 900],
  ['provide', 1500],
  ['glacier', 2500],
])

const commonness = makeCommonness({
  rankOf: (word) => RANKS.get(word),
  bases: (word) => (word === 'dogs' ? ['dog'] : word === 'parks' ? ['parks', 'park'] : []),
  names: new Set(['Tom']),
})

describe('makeCommonness', () => {
  it.each([
    ['dog', 1],
    ['Dog', 1],
    ['park', 0.85],
    ['provide', 0.6],
    ['glacier', 0.45],
  ])('gives %j the commonness %s from its NGSL rank', (word, expected) => {
    expect(commonness(word)).toBe(expected)
  })

  it('uses the rank of a base form when the word has no rank', () => {
    expect(commonness('dogs')).toBe(1)
    expect(commonness('parks')).toBe(0.85)
  })

  it('gives a name from the list the commonness 1', () => {
    expect(commonness('Tom')).toBe(1)
  })

  it('gives a word with no rank a low commonness', () => {
    expect(commonness('zebra')).toBe(0.4)
  })
})
