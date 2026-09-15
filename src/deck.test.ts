import { describe, expect, it } from 'vitest'
import { buildDeck } from './deck'

describe('buildDeck', () => {
  it('makes one slide for each word, in the same order', () => {
    expect(buildDeck(['because', 'friend'])).toEqual([{ word: 'because' }, { word: 'friend' }])
  })

  it('makes an empty deck from an empty list', () => {
    expect(buildDeck([])).toEqual([])
  })

  it('adds the analysis and the sentence to each slide when it gets a sentence maker', () => {
    const makeSentence = (word: string) => ({
      analysis: { type: 'other' } as const,
      sentence: { template: 'The word is {word}.', text: `The word is ${word}.` },
    })
    expect(buildDeck(['because', 'friend'], makeSentence)).toEqual([
      { word: 'because', analysis: { type: 'other' }, sentence: { template: 'The word is {word}.', text: 'The word is because.' } },
      { word: 'friend', analysis: { type: 'other' }, sentence: { template: 'The word is {word}.', text: 'The word is friend.' } },
    ])
  })

  it('does not change the list of words', () => {
    const words = Object.freeze(['because'])
    expect(() => buildDeck(words)).not.toThrow()
  })
})
