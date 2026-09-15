import { describe, expect, it } from 'vitest'
import { NGSL_WORDS } from './ngsl'
import { NGSL_FIRST_1000 } from './ngslFirst1000'

// The American spellings in NGSL 1.2 and the British spellings that the data file uses.
const SPELLING_CHANGES: readonly (readonly [string, string])[] = [
  ['color', 'colour'], ['favorite', 'favourite'], ['behavior', 'behaviour'], ['center', 'centre'],
  ['program', 'programme'], ['organize', 'organise'], ['organization', 'organisation'], ['realize', 'realise'],
  ['recognize', 'recognise'], ['theater', 'theatre'], ['meter', 'metre'], ['analyze', 'analyse'],
  ['defense', 'defence'], ['offense', 'offence'], ['license', 'licence'], ['catalog', 'catalogue'],
  ['dialog', 'dialogue'], ['gray', 'grey'], ['neighbor', 'neighbour'], ['honor', 'honour'],
  ['labor', 'labour'], ['humor', 'humour'], ['harbor', 'harbour'], ['favor', 'favour'],
  ['specialize', 'specialise'], ['apologize', 'apologise'], ['emphasize', 'emphasise'], ['criticize', 'criticise'],
  ['summarize', 'summarise'], ['characterize', 'characterise'],
]

describe('NGSL_WORDS', () => {
  it('has all 2809 words of NGSL 1.2, each one time', () => {
    expect(NGSL_WORDS).toHaveLength(2809)
    expect(new Set(NGSL_WORDS).size).toBe(2809)
  })

  it('starts with the most frequent words', () => {
    expect(NGSL_WORDS.slice(0, 5)).toEqual(['the', 'be', 'and', 'of', 'to'])
  })

  it('has the same first 1000 words as NGSL_FIRST_1000, in the same order', () => {
    expect(NGSL_WORDS.slice(0, 1000)).toEqual(NGSL_FIRST_1000)
  })

  it.each(SPELLING_CHANGES)('uses the British spelling of %j: %j', (american, british) => {
    expect(NGSL_WORDS).toContain(british)
    expect(NGSL_WORDS).not.toContain(american)
  })
})
