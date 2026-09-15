import { describe, expect, it } from 'vitest'
import { buildDeck } from './deck'
import { createPresentation, isPresentation, makeId, presentationName, sortNewestFirst } from './presentation'

const words = ['because', 'friend', 'necessary', 'separate']

// 06:30 UTC is 07:30 in London in September (British Summer Time).
const createdAt = '2026-09-15T06:30:00.000Z'

describe('createPresentation', () => {
  it('keeps the id, the time and the words, and makes the deck', () => {
    expect(createPresentation({ id: 'k3x9', createdAt, words })).toEqual({
      schemaVersion: 1,
      id: 'k3x9',
      createdAt,
      words,
      deck: buildDeck(words),
    })
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
    ['a different schema version', { ...createPresentation({ id: 'k3x9', createdAt, words }), schemaVersion: 2 }],
    ['words that are not a list', { ...createPresentation({ id: 'k3x9', createdAt, words }), words: 'because' }],
    ['a deck that is not a list', { ...createPresentation({ id: 'k3x9', createdAt, words }), deck: null }],
  ])('rejects %s', (_, value) => {
    expect(isPresentation(value)).toBe(false)
  })
})
