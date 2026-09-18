import { describe, expect, it } from 'vitest'
import { bankSentences } from '../bank'
import { MEANING_EXCEPTIONS, needsMeaningCheck } from './meaningExceptions'

// The meaning rule of bank.test.ts measures the word vectors. A word vector can carry a meaning that a child does not
// use, for example "ruler" as a king. The rule cannot check the sentences of such a word, so the word gets an
// exception with a reason. These tests keep the list of exceptions small and correct.

describe('needsMeaningCheck', () => {
  it('gives true for a word that the meaning rule can check', () => {
    expect(needsMeaningCheck('lion')).toBe(true)
  })

  it('gives false for a word with an exception, without regard to capital letters and spaces', () => {
    expect(needsMeaningCheck(' Ruler ')).toBe(false)
  })
})

describe('MEANING_EXCEPTIONS', () => {
  it.each([...MEANING_EXCEPTIONS.entries()])('%s gives a reason', (_, reason) => {
    expect(reason.length).toBeGreaterThan(40)
  })

  // A word with no bank sentence does not need an exception. Thus an old entry does not stay in the list.
  it.each([...MEANING_EXCEPTIONS.keys()])('%s has bank sentences', (word) => {
    expect(bankSentences(word).length).toBeGreaterThan(0)
  })
})
