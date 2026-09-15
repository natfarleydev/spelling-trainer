import { describe, expect, it, vi } from 'vitest'
import { analyseFromTags, analyseWord, isWordAnalysis, withType, type WordAnalysis } from './wordType'

describe('analyseFromTags', () => {
  it.each<[string, readonly string[], WordAnalysis]>([
    ['a singular noun', ['Noun', 'Singular'], { type: 'noun', form: 'singular' }],
    ['a plural noun', ['Noun', 'Plural'], { type: 'noun', form: 'plural' }],
    ['an uncountable noun', ['Noun', 'Uncountable'], { type: 'noun', form: 'uncountable' }],
    ['a month', ['Date', 'Noun', 'Month'], { type: 'noun', form: 'month' }],
    ['a day of the week', ['Date', 'Noun', 'WeekDay', 'Singular'], { type: 'noun', form: 'day' }],
    ['a duration noun', ['Date', 'Noun', 'Duration', 'Singular'], { type: 'noun', form: 'singular' }],
    ['an infinitive', ['Verb', 'PresentTense', 'Infinitive'], { type: 'verb', form: 'infinitive', transitive: true }],
    ['a past tense verb', ['Verb', 'PastTense'], { type: 'verb', form: 'past', transitive: true }],
    ['a gerund', ['Verb', 'PresentTense', 'Gerund'], { type: 'verb', form: 'gerund', transitive: true }],
    ['a third person verb', ['Verb', 'PresentTense'], { type: 'verb', form: 'thirdPerson', transitive: true }],
    ['an adjective', ['Adjective'], { type: 'adjective' }],
    ['an adverb', ['Adverb'], { type: 'adverb' }],
    ['a cardinal number', ['Value', 'TextValue', 'Cardinal'], { type: 'number', form: 'cardinal' }],
    ['an ordinal number', ['Value', 'TextValue', 'Ordinal'], { type: 'number', form: 'ordinal' }],
    ['a conjunction', ['Conjunction'], { type: 'other' }],
    ['no tags', [], { type: 'other' }],
  ])('finds %s', (_, tags, expected) => {
    expect(analyseFromTags(tags)).toEqual(expected)
  })
})

describe('analyseWord', () => {
  const tagAs = (tags: readonly string[]) => vi.fn(() => tags)

  it('uses the tags of the tagger for a word that is not in the override table', () => {
    const tagWord = tagAs(['Noun', 'Singular'])
    expect(analyseWord('yacht', tagWord)).toEqual({ type: 'noun', form: 'singular' })
    expect(tagWord).toHaveBeenCalledWith('yacht')
  })

  it.each<[string, WordAnalysis]>([
    // The American lexicon of the tagger does not know these British spellings.
    ['centre', { type: 'noun', form: 'singular' }],
    ['programme', { type: 'noun', form: 'singular' }],
    // The tagger gives the wrong type for these words.
    ['peculiar', { type: 'adjective' }],
    ['interfere', { type: 'verb', form: 'infinitive', transitive: false }],
    // A child uses these words more frequently as nouns.
    ['sentence', { type: 'noun', form: 'singular' }],
    ['thought', { type: 'noun', form: 'singular' }],
    // Templates for a noun, verb or adjective do not operate for these words.
    ['though', { type: 'other' }],
    ['through', { type: 'other' }],
    // The review of the KS2 sentences found no template that operates for these words.
    ['suppose', { type: 'other' }],
    ['especially', { type: 'other' }],
  ])('uses the override table for %j', (word, expected) => {
    const tagWord = tagAs(['Verb', 'PresentTense', 'Infinitive'])
    expect(analyseWord(word, tagWord)).toEqual(expected)
    expect(tagWord).not.toHaveBeenCalled()
  })

  it('finds an override when the word has capital letters and spaces', () => {
    expect(analyseWord('  Centre ', tagAs(['Verb']))).toEqual({ type: 'noun', form: 'singular' })
  })

  it.each([
    ['arrive', ['Verb', 'PresentTense', 'Infinitive'], 'infinitive'],
    ['occurred', ['Verb', 'PastTense'], 'past'],
    ['disappears', ['Verb', 'PresentTense'], 'thirdPerson'],
    ['appearing', ['Verb', 'PresentTense', 'Gerund'], 'gerund'],
    // The review of the KS2 sentences found "I want to decide them" and "I want to breathe them".
    ['decide', ['Verb', 'PresentTense', 'Infinitive'], 'infinitive'],
    ['breathed', ['Verb', 'PastTense'], 'past'],
    ['communicates', ['Verb', 'PresentTense'], 'thirdPerson'],
    ['exaggerating', ['Verb', 'PresentTense', 'Gerund'], 'gerund'],
    ['reign', ['Verb', 'PresentTense', 'Infinitive'], 'infinitive'],
    ['bargain', ['Verb', 'PresentTense', 'Infinitive'], 'infinitive'],
  ] as const)('marks the verb %j as intransitive', (word, tags, form) => {
    expect(analyseWord(word, tagAs(tags))).toEqual({ type: 'verb', form, transitive: false })
  })

  it('gives "other" when the tagger fails', () => {
    const tagWord = vi.fn((): readonly string[] => {
      throw new Error('the tagger did not load')
    })
    expect(analyseWord('yacht', tagWord)).toEqual({ type: 'other' })
  })
})

describe('isWordAnalysis', () => {
  it.each<WordAnalysis>([
    { type: 'noun', form: 'singular' },
    { type: 'noun', form: 'plural' },
    { type: 'noun', form: 'uncountable' },
    { type: 'noun', form: 'month' },
    { type: 'noun', form: 'day' },
    { type: 'verb', form: 'infinitive', transitive: true },
    { type: 'verb', form: 'past', transitive: false },
    { type: 'verb', form: 'thirdPerson', transitive: true },
    { type: 'verb', form: 'gerund', transitive: false },
    { type: 'adjective' },
    { type: 'adverb' },
    { type: 'number', form: 'cardinal' },
    { type: 'number', form: 'ordinal' },
    { type: 'other' },
  ])('accepts %o', (analysis) => {
    expect(isWordAnalysis(analysis)).toBe(true)
  })

  it.each([
    null,
    'noun',
    {},
    { type: 'animal' },
    { type: 'noun' },
    { type: 'noun', form: 'many' },
    { type: 'verb', form: 'past' },
    { type: 'verb', form: 'past', transitive: 'yes' },
    { type: 'verb', form: 'future', transitive: true },
    { type: 'number', form: 'first' },
  ])('rejects %o', (value) => {
    expect(isWordAnalysis(value)).toBe(false)
  })
})

describe('withType', () => {
  it('keeps the analysis when the type does not change', () => {
    const analysis: WordAnalysis = { type: 'noun', form: 'plural' }
    expect(withType(analysis, 'noun', 'potatoes')).toBe(analysis)
  })

  it.each<[WordAnalysis['type'], string, WordAnalysis]>([
    ['noun', 'record', { type: 'noun', form: 'singular' }],
    ['verb', 'record', { type: 'verb', form: 'infinitive', transitive: true }],
    ['verb', 'arrive', { type: 'verb', form: 'infinitive', transitive: false }],
    ['adjective', 'record', { type: 'adjective' }],
    ['adverb', 'record', { type: 'adverb' }],
    ['number', 'record', { type: 'number', form: 'cardinal' }],
    ['other', 'record', { type: 'other' }],
  ])('gives the default form when the teacher changes the type to %j', (type, word, expected) => {
    expect(withType({ type: 'adjective' }, type, word)).toEqual(expected)
  })
})
