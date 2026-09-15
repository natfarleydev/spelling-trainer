import { describe, expect, it } from 'vitest'
import type { Slide } from '../deck'
import { fillTemplate, TEMPLATES, type Sentence } from './sentence'
import { changeWordType, makeSlideSentence, newSentence, type SentenceTools } from './slideSentence'
import type { WordAnalysis } from './wordType'

const nounTagger = () => ['Noun', 'Singular']
const NOUN: WordAnalysis = { type: 'noun', form: 'singular' }
const [firstNounTemplate] = TEMPLATES['noun.singular']
const YACHT_SENTENCES = ['A yacht is a boat with sails.', 'The yacht sailed out of the harbour.']

const tools = (overrides: Partial<SentenceTools> = {}): SentenceTools => ({
  tagWord: nounTagger,
  random: () => 0,
  bankSentences: (word) => (word.toLowerCase() === 'yacht' ? YACHT_SENTENCES : []),
  ...overrides,
})

const bankSentence = (text: string): Sentence => ({ template: text, text, source: 'bank' })
const templateSentence = (template: string, word: string): Sentence => ({
  template,
  text: fillTemplate(template, word),
  source: 'template',
})

describe('makeSlideSentence', () => {
  it('analyses the word and chooses a bank sentence when the bank has sentences for the word', () => {
    expect(makeSlideSentence(tools())('yacht')).toEqual({ analysis: NOUN, sentence: bankSentence(YACHT_SENTENCES[0]) })
  })

  it('uses the random number to choose the bank sentence', () => {
    expect(makeSlideSentence(tools({ random: () => 0.99 }))('yacht').sentence).toEqual(bankSentence(YACHT_SENTENCES[1]))
  })

  it('does not give a bank sentence past the end of the list when the random number is 1', () => {
    expect(makeSlideSentence(tools({ random: () => 1 }))('yacht').sentence).toEqual(bankSentence(YACHT_SENTENCES[1]))
  })

  it('chooses a template sentence when the bank has no sentences for the word', () => {
    expect(makeSlideSentence(tools())('record')).toEqual({
      analysis: NOUN,
      sentence: templateSentence(firstNounTemplate, 'record'),
    })
  })
})

describe('newSentence', () => {
  const bankSlide: Slide = { word: 'yacht', ...makeSlideSentence(tools())('yacht') }

  it('gives a different bank sentence with the same word and the same analysis', () => {
    const next = newSentence(bankSlide, tools())
    expect(next.word).toBe('yacht')
    expect(next.analysis).toEqual(NOUN)
    expect(next.sentence).toEqual(bankSentence(YACHT_SENTENCES[1]))
  })

  it('gives a template sentence when the bank has no different sentence', () => {
    const next = newSentence(bankSlide, tools({ bankSentences: () => [YACHT_SENTENCES[0]] }))
    expect(next.sentence).toEqual(templateSentence(firstNounTemplate, 'yacht'))
  })

  it('gives a different template sentence for a word that has no bank sentences', () => {
    const slide: Slide = { word: 'record', ...makeSlideSentence(tools())('record') }
    const next = newSentence(slide, tools())
    expect(next.sentence?.source).toBe('template')
    expect(next.sentence?.template).not.toBe(slide.sentence?.template)
    expect(next.sentence?.text).toContain('record')
  })

  it('does not use the bank when the teacher changed the word type', () => {
    const verbSlide = changeWordType(bankSlide, 'verb', tools())
    const next = newSentence(verbSlide, tools())
    expect(next.analysis).toEqual(verbSlide.analysis)
    expect(next.sentence?.source).toBe('template')
  })

  it('analyses a slide from schema version 1, which has no sentence', () => {
    const next = newSentence({ word: 'yacht' }, tools())
    expect(next.analysis).toEqual(NOUN)
    expect(next.sentence).toEqual(bankSentence(YACHT_SENTENCES[0]))
  })
})

describe('changeWordType', () => {
  const slide: Slide = { word: 'record', ...makeSlideSentence(tools())('record') }

  it('gives the default form of the new type and a sentence for it', () => {
    const next = changeWordType(slide, 'verb', tools())
    expect(next.analysis).toEqual({ type: 'verb', form: 'infinitive', transitive: true })
    expect(TEMPLATES['verb.infinitive.transitive']).toContain(next.sentence?.template)
    expect(next.sentence?.text).toContain('record')
  })

  it('gives the same slide when the type does not change', () => {
    expect(changeWordType(slide, 'noun', tools())).toBe(slide)
  })

  it('changes the type of a slide from schema version 1', () => {
    const next = changeWordType({ word: 'record' }, 'adjective', tools())
    expect(next.analysis).toEqual({ type: 'adjective' })
    expect(TEMPLATES.adjective).toContain(next.sentence?.template)
  })

  it('gives a template sentence for a type that is not the type from the tagger, and a bank sentence again for that type', () => {
    const bankSlide: Slide = { word: 'yacht', ...makeSlideSentence(tools())('yacht') }
    const verbSlide = changeWordType(bankSlide, 'verb', tools())
    expect(verbSlide.sentence?.source).toBe('template')
    expect(changeWordType(verbSlide, 'noun', tools()).sentence).toEqual(bankSentence(YACHT_SENTENCES[0]))
  })
})
