import { describe, expect, it } from 'vitest'
import { FUNCTION_WORDS } from '../functionWords'
import { NGSL_WORDS } from '../ngsl'
import { AMERICAN_WORDS } from '../simpleWords'
import { CONCRETE_WORDS } from './concreteWords'
import { GREYLIST } from './gdex'
import { BLOCKED_WORDS } from './hardFilter'

describe('CONCRETE_WORDS', () => {
  it('has lowercase words, each one time', () => {
    expect(CONCRETE_WORDS.filter((word) => word !== word.toLowerCase())).toEqual([])
    expect(CONCRETE_WORDS.filter((word, index) => CONCRETE_WORDS.indexOf(word) !== index)).toEqual([])
  })

  it('has only NGSL words', () => {
    const ngsl = new Set(NGSL_WORDS.map((word) => word.toLowerCase()))
    expect(CONCRETE_WORDS.filter((word) => !ngsl.has(word))).toEqual([])
  })

  it('has no function word, blocked word, greylist word or American word', () => {
    expect(
      CONCRETE_WORDS.filter(
        (word) => FUNCTION_WORDS.has(word) || BLOCKED_WORDS.has(word) || GREYLIST.has(word) || AMERICAN_WORDS.has(word),
      ),
    ).toEqual([])
  })

  it('has enough words for the first batches', () => {
    expect(CONCRETE_WORDS.length).toBeGreaterThanOrEqual(400)
  })
})
