import nlp from 'compromise/three'
import { describe, expect, it } from 'vitest'
import { NGSL_WORDS } from '../ngsl'
import { AMERICAN_WORDS } from '../simpleWords'
import { candidateBases, FUNCTION_WORD_FORMS, isKnownWord, KNOWN_EXTRA_WORDS, NUMBER_WORDS } from './knownWords'

// A root function that gives the word itself, so that a test checks only the word.
const noRoot = (word: string) => word.toLowerCase()

// The real root function that the bank rules test uses.
const compromiseRoot = (word: string): string => {
  const doc = nlp(word)
  doc.compute('root')
  return doc.json()[0]?.terms[0]?.root ?? word.toLowerCase()
}

describe('isKnownWord', () => {
  it.each(['house', 'House', 'teacher'])('accepts the NGSL word %j', (word) => {
    expect(isKnownWord(word, noRoot)).toBe(true)
  })

  it('accepts a word when its root is a known word', () => {
    expect(isKnownWord('waited', () => 'wait')).toBe(true)
  })

  it.each(['necessary', 'February', 'because'])('accepts the spelling-list word %j', (word) => {
    expect(isKnownWord(word, noRoot)).toBe(true)
  })

  it.each(['frog', 'astronaut', 'queen', 'Saturday'])('accepts the extra word %j', (word) => {
    expect(isKnownWord(word, noRoot)).toBe(true)
  })

  it.each(['us', 'Her', 'him', 'them', 'their', 'its', 'an', 'cannot'])('accepts the function word form %j', (word) => {
    expect(isKnownWord(word, noRoot)).toBe(true)
  })

  it.each(['two', 'Four', 'nine', 'sixty', 'seventy', 'hundred', 'third'])('accepts the number word %j', (word) => {
    expect(isKnownWord(word, noRoot)).toBe(true)
  })

  // The compromise root of a single word, with no other words, is sometimes the word itself.
  it.each(['tired', 'broken', 'marked', 'melted', 'drawings', 'trying', 'woke', 'measured', 'planned', 'closed', 'shining', 'finished', 'runner', 'seconds', 'colourful', 'magical', 'best'])(
    'accepts the inflected form %j through its candidate bases',
    (word) => {
      expect(isKnownWord(word, noRoot)).toBe(true)
    },
  )

  it.each(['sesquipedalian', 'color', 'zzzing'])('rejects %j', (word) => {
    expect(isKnownWord(word, noRoot)).toBe(false)
  })

  it.each([
    ['felt', 'feel'],
    ['children', 'child'],
    ['went', 'go'],
  ])('accepts %j with the compromise root %j', (word, root) => {
    expect(compromiseRoot(word)).toBe(root)
    expect(isKnownWord(word, compromiseRoot)).toBe(true)
  })
})

describe('candidateBases', () => {
  it.each([
    ['stories', 'story'],
    ['tried', 'try'],
    ['trying', 'try'],
    ['shining', 'shine'],
    ['running', 'run'],
    ['closed', 'close'],
    ['planned', 'plan'],
    ['melted', 'melt'],
    ['boxes', 'box'],
    ['cars', 'car'],
    ['runner', 'run'],
    ['baker', 'bake'],
    ['colourful', 'colour'],
    ['magical', 'magic'],
    ['musical', 'music'],
    ['slowly', 'slow'],
    ['drawings', 'draw'],
    ['best', 'good'],
    ['woke', 'wake'],
    ['broken', 'break'],
    ['done', 'do'],
  ])('gives %j as a possible base of %j', (word, base) => {
    expect(candidateBases(word)).toContain(base)
  })

  it('gives no bases for a short word that has no suffix', () => {
    expect(candidateBases('cat')).toEqual([])
  })

  it('does not give the word itself', () => {
    expect(candidateBases('stories')).not.toContain('stories')
  })
})

describe('the known word lists', () => {
  it('have no word in KNOWN_EXTRA_WORDS that is already an NGSL word', () => {
    expect(KNOWN_EXTRA_WORDS.filter((word) => NGSL_WORDS.includes(word))).toEqual([])
  })

  it.each([
    ['KNOWN_EXTRA_WORDS', KNOWN_EXTRA_WORDS],
    ['FUNCTION_WORD_FORMS', FUNCTION_WORD_FORMS],
    ['NUMBER_WORDS', NUMBER_WORDS],
  ] as const)('%s has lowercase words only, each one time, and no American word', (_, words) => {
    expect(words.filter((word) => word !== word.toLowerCase())).toEqual([])
    expect(new Set(words).size).toBe(words.length)
    expect(words.filter((word) => AMERICAN_WORDS.has(word))).toEqual([])
  })
})
