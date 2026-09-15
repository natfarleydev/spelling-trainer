import { describe, expect, it } from 'vitest'
import { NGSL_FIRST_1000 } from './ngslFirst1000'
import { AMERICAN_WORDS, EXTRA_SIMPLE_WORDS, isSimpleWord, WORD_FORMS } from './simpleWords'

describe('NGSL_FIRST_1000', () => {
  it('has 1000 different words', () => {
    expect(NGSL_FIRST_1000).toHaveLength(1000)
    expect(new Set(NGSL_FIRST_1000).size).toBe(1000)
  })

  it('starts with the most frequent words', () => {
    expect(NGSL_FIRST_1000.slice(0, 5)).toEqual(['the', 'be', 'and', 'of', 'to'])
  })

  it.each(['colour', 'favourite', 'behaviour', 'centre', 'programme', 'organise', 'organisation', 'realise', 'recognise'])(
    'uses the British spelling %j',
    (word) => {
      expect(NGSL_FIRST_1000).toContain(word)
    },
  )

  it.each(['color', 'favorite', 'behavior', 'center', 'program', 'organize', 'organization', 'realize', 'recognize'])(
    'does not have the American spelling %j',
    (word) => {
      expect(NGSL_FIRST_1000).not.toContain(word)
    },
  )
})

describe('isSimpleWord', () => {
  it.each(['the', 'The', 'about', 'people'])('accepts the NGSL word %j', (word) => {
    expect(isSimpleWord(word)).toBe(true)
  })

  it.each(['is', 'was', 'are', 'went'])('accepts the inflected form %j of an NGSL word', (word) => {
    expect(isSimpleWord(word)).toBe(true)
  })

  it.each(EXTRA_SIMPLE_WORDS)('accepts the extra simple word %j', (word) => {
    expect(isSimpleWord(word)).toBe(true)
  })

  it.each(['accommodate', 'rhythm', 'mischievous', 'color'])('rejects the word %j', (word) => {
    expect(isSimpleWord(word)).toBe(false)
  })
})

describe('the word data', () => {
  it('gives an NGSL word or an extra simple word as the base of each inflected form', () => {
    const simple = new Set([...NGSL_FIRST_1000, ...EXTRA_SIMPLE_WORDS])
    const notSimple = Object.entries(WORD_FORMS).filter(([, base]) => !simple.has(base))
    expect(notSimple).toEqual([])
  })

  it('has no extra simple word that is already an NGSL word', () => {
    expect(EXTRA_SIMPLE_WORDS.filter((word) => NGSL_FIRST_1000.includes(word))).toEqual([])
  })

  it('has no American word in the extra simple words or in the inflected forms', () => {
    const words = [...EXTRA_SIMPLE_WORDS, ...Object.keys(WORD_FORMS)]
    expect(words.filter((word) => AMERICAN_WORDS.has(word))).toEqual([])
  })
})

describe('AMERICAN_WORDS', () => {
  // The sentence bank needs these words. Example: "Do not fall off the wall."
  it.each(['fall', 'store'])('does not block %j, because British English also uses it as a verb', (word) => {
    expect(AMERICAN_WORDS.has(word)).toBe(false)
  })

  it.each([
    'color', 'favorite', 'behavior', 'center', 'program', 'organize', 'organization', 'realize', 'recognize',
    'theater', 'meter', 'analyze', 'defense', 'offense', 'license', 'catalog', 'dialog', 'gray', 'neighbor',
    'honor', 'labor', 'humor', 'harbor', 'favor', 'specialize', 'apologize', 'emphasize', 'criticize',
    'summarize', 'characterize',
  ])('blocks the American spelling %j', (word) => {
    expect(AMERICAN_WORDS.has(word)).toBe(true)
  })

  it.each(['mom', 'movie', 'apartment', 'truck', 'toward', 'candy', 'cookie', 'vacation'])(
    'blocks the American word %j',
    (word) => {
      expect(AMERICAN_WORDS.has(word)).toBe(true)
    },
  )
})
