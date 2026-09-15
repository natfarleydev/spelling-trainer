import { describe, expect, it } from 'vitest'
import type { BankEntry } from './bank'
import { LINK_THRESHOLD, linkedTemplates } from './link'
import type { WordAnalysis } from './wordType'
import type { WordVectors } from './wordVectors'

// A 2-dimensional vector at an angle. The cosine similarity of two vectors is the cosine of the angle between them.
const at = (degrees: number): Float32Array =>
  Float32Array.from([Math.cos((degrees * Math.PI) / 180), Math.sin((degrees * Math.PI) / 180)])

const fakeVectors = (angles: Readonly<Record<string, number>>): WordVectors => ({
  dimensions: 2,
  words: Object.keys(angles),
  vector: (word) => {
    const angle = angles[word.toLowerCase()]
    return angle === undefined ? undefined : at(angle)
  },
})

const similarity = (degrees: number) => Math.cos((degrees * Math.PI) / 180)

const NOUN: WordAnalysis = { type: 'noun', form: 'singular' }
const VERB: WordAnalysis = { type: 'verb', form: 'past', transitive: false }

const vectors = fakeVectors({
  yacht: 0,
  ark: 0,
  boat: 10,
  sailed: 20,
  harbour: 25,
  trips: 30,
  red: 80,
  hill: 80,
  cake: 70,
  the: 0,
  is: 0,
  on: 0,
})

const link = (word: string, entries: readonly BankEntry[], analyseWord: (word: string) => WordAnalysis = () => NOUN) =>
  linkedTemplates({ word, analysis: NOUN, entries, vectors, analyseWord })

describe('linkedTemplates', () => {
  it('puts the word into a sentence of a bank word that has a similar meaning', () => {
    const links = link('yacht', [{ word: 'boat', sentences: ['The boat sailed out of the harbour.'] }])
    expect(links).toMatchObject([{ template: 'The {word} sailed out of the harbour.', from: 'boat' }])
    expect(links).toHaveLength(1)
  })

  it('gives a score that is the lower of the word similarity and the best context similarity', () => {
    const [linked] = linkedTemplates({
      word: 'yacht',
      analysis: NOUN,
      entries: [{ word: 'boat', sentences: ['The boat is like a ship.'] }],
      vectors: fakeVectors({ yacht: 0, boat: 10, ship: 2 }),
      analyseWord: () => NOUN,
    })
    expect(linked.score).toBeCloseTo(similarity(10))
    const [far] = linkedTemplates({
      word: 'yacht',
      analysis: NOUN,
      entries: [{ word: 'boat', sentences: ['The boat went on trips.'] }],
      vectors: fakeVectors({ yacht: 0, boat: 5, trips: 30 }),
      analyseWord: () => NOUN,
    })
    expect(far.score).toBeCloseTo(similarity(30))
  })

  it('gives the most similar links first', () => {
    const entries = [
      { word: 'boat', sentences: ['The boat went on trips.', 'The boat sailed out of the harbour.'] },
    ]
    expect(link('yacht', entries).map((linked) => linked.template)).toEqual([
      'The {word} sailed out of the harbour.',
      'The {word} went on trips.',
    ])
  })

  it('does not use a bank word with a different meaning', () => {
    expect(similarity(70)).toBeLessThan(LINK_THRESHOLD)
    expect(link('yacht', [{ word: 'cake', sentences: ['The cake sailed out of the harbour.'] }])).toEqual([])
  })

  it('does not use a bank word with a different word type or form', () => {
    const analyseWord = (word: string) => (word === 'boat' ? VERB : NOUN)
    expect(link('yacht', [{ word: 'boat', sentences: ['The boat sailed out of the harbour.'] }], analyseWord)).toEqual([])
  })

  it('does not use a sentence when the other words do not show the meaning', () => {
    expect(link('yacht', [{ word: 'boat', sentences: ['The boat is on the red hill.'] }])).toEqual([])
  })

  it('does not use the entry of the word itself', () => {
    expect(link('Yacht', [{ word: 'yacht', sentences: ['The yacht sailed out of the harbour.'] }])).toEqual([])
  })

  it.each([
    ['the bank word starts the sentence', 'Boat trips sailed out of the harbour.'],
    ['the sentence already has the word', 'The boat sailed past the yacht in the harbour.'],
    ['the sentence has another form of the bank word', 'The boat sailed past the boats in the harbour.'],
    ['the sentence has the bank word two times', 'The boat sailed past a boat in the harbour.'],
  ])('does not use a sentence when %s', (_, sentence) => {
    expect(link('yacht', [{ word: 'boat', sentences: [sentence] }])).toEqual([])
  })

  it('does not use a sentence when "a" or "an" before the bank word is wrong for the word', () => {
    const entries = [{ word: 'boat', sentences: ['I saw a boat in the harbour.'] }]
    expect(link('ark', entries)).toEqual([])
    expect(link('yacht', entries).map((linked) => linked.template)).toEqual(['I saw a {word} in the harbour.'])
  })

  it('gives no links for a word that has no vector', () => {
    expect(link('zzzz', [{ word: 'boat', sentences: ['The boat sailed out of the harbour.'] }])).toEqual([])
  })
})
