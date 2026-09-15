import { describe, expect, it } from 'vitest'
import { buildDeck } from './deck'

describe('buildDeck', () => {
  it('makes one slide for each word, in the same order', () => {
    expect(buildDeck(['because', 'friend'])).toEqual([{ word: 'because' }, { word: 'friend' }])
  })

  it('makes an empty deck from an empty list', () => {
    expect(buildDeck([])).toEqual([])
  })

  it('does not change the list of words', () => {
    const words = Object.freeze(['because'])
    expect(() => buildDeck(words)).not.toThrow()
  })
})
