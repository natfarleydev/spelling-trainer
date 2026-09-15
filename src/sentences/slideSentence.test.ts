import { describe, expect, it, vi } from 'vitest'
import type { Slide } from '../deck'
import { fillTemplate, TEMPLATES } from './sentence'
import { changeWordType, makeSlideSentence, newSentence } from './slideSentence'

const nounTagger = () => ['Noun', 'Singular']
const [firstNounTemplate] = TEMPLATES['noun.singular']

describe('makeSlideSentence', () => {
  it('analyses the word and chooses a sentence for it', () => {
    const make = makeSlideSentence({ tagWord: nounTagger, random: () => 0 })
    expect(make('yacht')).toEqual({
      analysis: { type: 'noun', form: 'singular' },
      sentence: { template: firstNounTemplate, text: fillTemplate(firstNounTemplate, 'yacht') },
    })
  })
})

describe('newSentence', () => {
  const slide: Slide = { word: 'yacht', ...makeSlideSentence({ tagWord: nounTagger, random: () => 0 })('yacht') }

  it('gives a different sentence with the same word and the same analysis', () => {
    const next = newSentence(slide, { tagWord: nounTagger, random: () => 0 })
    expect(next.word).toBe('yacht')
    expect(next.analysis).toEqual(slide.analysis)
    expect(next.sentence?.template).not.toBe(slide.sentence?.template)
    expect(next.sentence?.text).toContain('yacht')
  })

  it('does not use the tagger when the slide already has an analysis', () => {
    const tagWord = vi.fn(nounTagger)
    newSentence(slide, { tagWord, random: () => 0 })
    expect(tagWord).not.toHaveBeenCalled()
  })

  it('analyses a slide from schema version 1, which has no sentence', () => {
    const next = newSentence({ word: 'yacht' }, { tagWord: nounTagger, random: () => 0 })
    expect(next.analysis).toEqual({ type: 'noun', form: 'singular' })
    expect(next.sentence?.text).toBe(fillTemplate(firstNounTemplate, 'yacht'))
  })
})

describe('changeWordType', () => {
  const slide: Slide = { word: 'record', ...makeSlideSentence({ tagWord: nounTagger, random: () => 0 })('record') }

  it('gives the default form of the new type and a sentence for it', () => {
    const next = changeWordType(slide, 'verb', { random: () => 0 })
    expect(next.analysis).toEqual({ type: 'verb', form: 'infinitive', transitive: true })
    expect(TEMPLATES['verb.infinitive.transitive']).toContain(next.sentence?.template)
    expect(next.sentence?.text).toContain('record')
  })

  it('gives the same slide when the type does not change', () => {
    expect(changeWordType(slide, 'noun', { random: () => 0 })).toBe(slide)
  })

  it('changes the type of a slide from schema version 1', () => {
    const next = changeWordType({ word: 'record' }, 'adjective', { random: () => 0 })
    expect(next.analysis).toEqual({ type: 'adjective' })
    expect(TEMPLATES.adjective).toContain(next.sentence?.template)
  })
})
