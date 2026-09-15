import { describe, expect, it } from 'vitest'
import { buildDeck } from './deck'
import type { Slide } from './deck'
import {
  createPresentation,
  isPresentation,
  makeId,
  presentationName,
  replaceSlide,
  sortNewestFirst,
} from './presentation'

const words = ['because', 'friend', 'necessary', 'separate']

// 06:30 UTC is 07:30 in London in September (British Summer Time).
const createdAt = '2026-09-15T06:30:00.000Z'

const makeSentence = (word: string) => ({
  analysis: { type: 'other' } as const,
  sentence: { template: 'The word is {word}.', text: `The word is ${word}.` },
})

describe('createPresentation', () => {
  it('keeps the id, the time and the words, and makes the deck with sentences in schema version 2', () => {
    expect(createPresentation({ id: 'k3x9', createdAt, words, makeSentence })).toEqual({
      schemaVersion: 2,
      id: 'k3x9',
      createdAt,
      words,
      deck: buildDeck(words, makeSentence),
    })
  })
})

describe('replaceSlide', () => {
  const presentation = createPresentation({ id: 'k3x9', createdAt, words, makeSentence })
  const changed: Slide = { word: 'friend', analysis: { type: 'adverb' }, sentence: { template: 'x {word}', text: 'x friend' } }

  it('gives a new presentation with the slide at the index replaced', () => {
    const next = replaceSlide(presentation, 1, changed)
    expect(next.deck[1]).toEqual(changed)
    expect(next.deck.filter((_, i) => i !== 1)).toEqual(presentation.deck.filter((_, i) => i !== 1))
  })

  it('does not change the presentation that it gets', () => {
    const before = structuredClone(presentation)
    replaceSlide(presentation, 1, changed)
    expect(presentation).toEqual(before)
  })

  it.each([-1, 4, 1.5])('gives the same presentation for the index %s that is not a slide', (index) => {
    expect(replaceSlide(presentation, index, changed)).toBe(presentation)
  })
})

describe('presentationName', () => {
  it('gives the date, the time and the first three words', () => {
    const presentation = createPresentation({ id: 'k3x9', createdAt, words })
    expect(presentationName(presentation, 'Europe/London')).toBe('15 Sep 2026, 07:30 — because, friend, necessary…')
  })

  it('does not add an ellipsis when there are three words or fewer', () => {
    const presentation = createPresentation({ id: 'k3x9', createdAt, words: ['because', 'friend'] })
    expect(presentationName(presentation, 'Europe/London')).toBe('15 Sep 2026, 07:30 — because, friend')
  })

  it('uses the time zone', () => {
    const presentation = createPresentation({ id: 'k3x9', createdAt: '2026-01-05T23:05:00.000Z', words: ['cat'] })
    expect(presentationName(presentation, 'UTC')).toBe('5 Jan 2026, 23:05 — cat')
    expect(presentationName(presentation, 'Asia/Tokyo')).toBe('6 Jan 2026, 08:05 — cat')
  })
})

describe('sortNewestFirst', () => {
  const older = createPresentation({ id: 'a', createdAt: '2026-09-01T10:00:00.000Z', words: ['a'] })
  const newer = createPresentation({ id: 'b', createdAt: '2026-09-02T10:00:00.000Z', words: ['b'] })

  it('puts the newest presentation first', () => {
    expect(sortNewestFirst([older, newer])).toEqual([newer, older])
  })

  it('does not change the list that it gets', () => {
    const list = Object.freeze([older, newer])
    expect(() => sortNewestFirst(list)).not.toThrow()
    expect(list).toEqual([older, newer])
  })
})

describe('makeId', () => {
  it('gives one character for each random byte', () => {
    expect(makeId(new Uint8Array(10))).toHaveLength(10)
  })

  it('uses only lowercase letters and digits that are easy to read', () => {
    const bytes = Uint8Array.from({ length: 256 }, (_, i) => i)
    expect(makeId(bytes)).toMatch(/^[abcdefghijkmnpqrstuvwxyz23456789]+$/)
  })

  it('gives the same id for the same bytes', () => {
    expect(makeId(new Uint8Array([0, 1, 31, 32]))).toBe('ab9a')
  })
})

describe('isPresentation', () => {
  it('accepts a presentation', () => {
    expect(isPresentation(createPresentation({ id: 'k3x9', createdAt, words }))).toBe(true)
  })

  it.each([
    ['null', null],
    ['a string', 'k3x9'],
    ['an empty object', {}],
    ['words that are not a list', { ...createPresentation({ id: 'k3x9', createdAt, words }), words: 'because' }],
    ['a deck that is not a list', { ...createPresentation({ id: 'k3x9', createdAt, words }), deck: null }],
    ['schema version 3', { ...createPresentation({ id: 'k3x9', createdAt, words, makeSentence }), schemaVersion: 3 }],
    [
      'a slide with a sentence that is not an object',
      { ...createPresentation({ id: 'k3x9', createdAt, words: ['cat'] }), deck: [{ word: 'cat', sentence: 'The word is cat.' }] },
    ],
    [
      'a slide with a sentence that has no template',
      { ...createPresentation({ id: 'k3x9', createdAt, words: ['cat'] }), deck: [{ word: 'cat', sentence: { text: 'The word is cat.' } }] },
    ],
    [
      'a slide with an analysis that is not correct',
      { ...createPresentation({ id: 'k3x9', createdAt, words: ['cat'] }), deck: [{ word: 'cat', analysis: { type: 'animal' } }] },
    ],
  ])('rejects %s', (_, value) => {
    expect(isPresentation(value)).toBe(false)
  })

  it('accepts a presentation in schema version 1, which a previous version of the app saved', () => {
    const stored = { schemaVersion: 1, id: 'old', createdAt, words: ['cat'], deck: [{ word: 'cat' }] }
    expect(isPresentation(stored)).toBe(true)
  })

  it('accepts a presentation with sentences in schema version 2', () => {
    expect(isPresentation(createPresentation({ id: 'k3x9', createdAt, words, makeSentence }))).toBe(true)
  })
})
