import nlp from 'compromise/two'
import { describe, expect, it } from 'vitest'
import { tagWithCompromise } from './compromiseTagger'
import { chooseSentence } from './sentence'
import { YEARS_3_AND_4, YEARS_5_AND_6 } from './testing/ks2StatutoryWords'
import { analyseWord, type WordAnalysis } from './wordType'

// These tests use the real compromise library, so that they find a change in its behaviour.
const tagWord = tagWithCompromise(nlp)

describe('tagWithCompromise', () => {
  it('gives the tags of a single word', () => {
    expect(tagWord('caught')).toEqual(expect.arrayContaining(['Verb', 'PastTense']))
  })

  it('gives no tags for an empty word', () => {
    expect(tagWord('')).toEqual([])
  })
})

describe('the KS2 statutory words', () => {
  it.each<[string, WordAnalysis]>([
    ['caught', { type: 'verb', form: 'past', transitive: true }],
    ['potatoes', { type: 'noun', form: 'plural' }],
    ['knowledge', { type: 'noun', form: 'uncountable' }],
    ['February', { type: 'noun', form: 'month' }],
    ['necessary', { type: 'adjective' }],
    ['often', { type: 'adverb' }],
    ['forty', { type: 'number', form: 'cardinal' }],
    ['twelfth', { type: 'number', form: 'ordinal' }],
    ['centre', { type: 'noun', form: 'singular' }],
    ['arrive', { type: 'verb', form: 'infinitive', transitive: false }],
  ])('gives the correct analysis for %j', (word, expected) => {
    expect(analyseWord(word, tagWord)).toEqual(expected)
  })

  it.each([...YEARS_3_AND_4, ...YEARS_5_AND_6])('makes a sentence with %j', (word) => {
    const sentence = chooseSentence({ word, analysis: analyseWord(word, tagWord), random: Math.random })
    expect(sentence.text).toContain(word)
  })
})
