import { describe, expect, it } from 'vitest'
import { chooseSentence, TEMPLATES, templateKey, WORD_SLOT, type TemplateKey } from './sentence'
import { AMERICAN_WORDS, isSimpleWord } from './simpleWords'
import type { WordAnalysis } from './wordType'

const allTemplates = Object.entries(TEMPLATES) as [TemplateKey, readonly string[]][]
const everyTemplate = allTemplates.flatMap(([key, templates]) => templates.map((template) => [key, template] as const))

// The words of a template, without the word under test.
const otherWords = (template: string): string[] => template.replace(WORD_SLOT, ' ').match(/[A-Za-z]+/g) ?? []

describe('TEMPLATES', () => {
  it.each(allTemplates)('has a minimum of 2 templates for %s', (_, templates) => {
    expect(templates.length).toBeGreaterThanOrEqual(2)
  })

  it.each(everyTemplate)('%s: %j has exactly one word slot', (_, template) => {
    expect(template.split(WORD_SLOT)).toHaveLength(2)
  })

  it.each(everyTemplate)('%s: %j is a sentence', (_, template) => {
    expect(template).toMatch(/^[A-Z]/)
    expect(template).toMatch(/[.?]$/)
  })

  // Only the word under test can be difficult. All the other words must be simple.
  it.each(everyTemplate)('%s: %j uses only simple words', (_, template) => {
    expect(otherWords(template).filter((word) => !isSimpleWord(word))).toEqual([])
  })

  it.each(everyTemplate)('%s: %j uses British English', (_, template) => {
    expect(otherWords(template).filter((word) => AMERICAN_WORDS.has(word.toLowerCase()))).toEqual([])
  })

  // "a" or "an" depends on the sound of the word under test. The templates do not guess it.
  it.each(everyTemplate)('%s: %j has no "a" or "an" before the word slot', (_, template) => {
    expect(template).not.toMatch(/\ban? \{word\}/i)
  })

  // The rules below come from a review of the sentences for all the KS2 statutory words.

  it.each(TEMPLATES['noun.singular'])('noun.singular: %j operates for an abstract noun', (template) => {
    // "Where is the curiosity?" and "That is a good accident." do not make sense.
    expect(template).not.toMatch(/^Where\b/)
    expect(template).not.toMatch(/\bgood \{word\}/)
  })

  it.each(TEMPLATES.adjective)('adjective: %j operates for an adjective that has no degrees', (template) => {
    // "That is very actual." and "It was favourite today." do not make sense.
    expect(template).not.toMatch(/\bvery \{word\}/)
    expect(template).not.toMatch(/\{word\} today\b/)
  })

  it.each([
    'verb.infinitive.intransitive',
    'verb.past.intransitive',
    'verb.thirdPerson.intransitive',
    'verb.gerund.intransitive',
  ] as const)('%s has a template with a person as the subject of the verb', (key) => {
    // "It will decide soon." does not make sense for a verb that a person does.
    // "I think it will {word}." does not count, because "it" is the subject of the verb.
    const personBeforeVerb = /\b(I|we|they|she|he|you)( will| often| are| is| am)? \{word\}/i
    expect(TEMPLATES[key].some((template) => personBeforeVerb.test(template))).toBe(true)
  })
})

describe('templateKey', () => {
  it.each<[WordAnalysis, TemplateKey]>([
    [{ type: 'noun', form: 'singular' }, 'noun.singular'],
    [{ type: 'noun', form: 'plural' }, 'noun.plural'],
    [{ type: 'noun', form: 'uncountable' }, 'noun.uncountable'],
    [{ type: 'noun', form: 'month' }, 'noun.month'],
    [{ type: 'noun', form: 'day' }, 'noun.day'],
    [{ type: 'verb', form: 'infinitive', transitive: true }, 'verb.infinitive.transitive'],
    [{ type: 'verb', form: 'infinitive', transitive: false }, 'verb.infinitive.intransitive'],
    [{ type: 'verb', form: 'past', transitive: true }, 'verb.past.transitive'],
    [{ type: 'verb', form: 'past', transitive: false }, 'verb.past.intransitive'],
    [{ type: 'verb', form: 'thirdPerson', transitive: true }, 'verb.thirdPerson.transitive'],
    [{ type: 'verb', form: 'thirdPerson', transitive: false }, 'verb.thirdPerson.intransitive'],
    [{ type: 'verb', form: 'gerund', transitive: true }, 'verb.gerund.transitive'],
    [{ type: 'verb', form: 'gerund', transitive: false }, 'verb.gerund.intransitive'],
    [{ type: 'adjective' }, 'adjective'],
    [{ type: 'adverb' }, 'adverb'],
    [{ type: 'number', form: 'cardinal' }, 'number.cardinal'],
    [{ type: 'number', form: 'ordinal' }, 'number.ordinal'],
    [{ type: 'other' }, 'other'],
  ])('gives the template key for %o', (analysis, key) => {
    expect(templateKey(analysis)).toBe(key)
  })
})

describe('chooseSentence', () => {
  const noun: WordAnalysis = { type: 'noun', form: 'singular' }
  const [first, second] = TEMPLATES['noun.singular']
  const last = TEMPLATES['noun.singular'].at(-1)!

  it('puts the word into the template', () => {
    expect(chooseSentence({ word: 'yacht', analysis: noun, random: () => 0 })).toEqual({
      template: first,
      text: first.replace(WORD_SLOT, 'yacht'),
    })
  })

  it('keeps the capital letters of the word', () => {
    const sentence = chooseSentence({ word: 'February', analysis: { type: 'noun', form: 'month' }, random: () => 0 })
    expect(sentence.text).toContain('February')
  })

  it('uses the random number to choose the template', () => {
    expect(chooseSentence({ word: 'yacht', analysis: noun, random: () => 0.999999 }).template).toBe(last)
  })

  it('does not give a template past the end of the list when the random number is 1', () => {
    expect(chooseSentence({ word: 'yacht', analysis: noun, random: () => 1 }).template).toBe(last)
  })

  it('gives a different template from the previous sentence', () => {
    const previous = chooseSentence({ word: 'yacht', analysis: noun, random: () => 0 })
    const next = chooseSentence({ word: 'yacht', analysis: noun, random: () => 0, previous })
    expect(next.template).toBe(second)
  })

  it('always gives a sentence with the word for each template key', () => {
    for (const [key] of allTemplates) {
      const analysis = analysisFor(key)
      const sentence = chooseSentence({ word: 'zzword', analysis, random: Math.random })
      expect(sentence.text).toContain('zzword')
      expect(TEMPLATES[key]).toContain(sentence.template)
    }
  })
})

// Make an analysis that gives the template key. The test above uses it to reach each key.
function analysisFor(key: TemplateKey): WordAnalysis {
  const [type, form, transitivity] = key.split('.')
  if (type === 'noun') return { type, form: form as 'singular' }
  if (type === 'verb') return { type, form: form as 'infinitive', transitive: transitivity === 'transitive' }
  if (type === 'number') return { type, form: form as 'cardinal' }
  return { type: type as 'adjective' | 'adverb' | 'other' }
}
