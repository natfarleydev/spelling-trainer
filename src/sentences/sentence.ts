import type { WordAnalysis } from './wordType'

export const WORD_SLOT = '{word}'

export type TemplateKey =
  | 'noun.singular'
  | 'noun.plural'
  | 'noun.uncountable'
  | 'noun.month'
  | 'noun.day'
  | 'verb.infinitive.transitive'
  | 'verb.infinitive.intransitive'
  | 'verb.past.transitive'
  | 'verb.past.intransitive'
  | 'verb.thirdPerson.transitive'
  | 'verb.thirdPerson.intransitive'
  | 'verb.gerund.transitive'
  | 'verb.gerund.intransitive'
  | 'adjective'
  | 'adverb'
  | 'number.cardinal'
  | 'number.ordinal'
  | 'other'

// Short, playful sentences for KS2 children, in British English. Example: "The cat sat on the hat."
// Only the word under test can be difficult. The tests make sure that each other word is simple,
// that each template has an animal or a playful thing, and that each template has a maximum of 8 words.
// A template has no "a" or "an" before the word, because the correct article depends on the sound of the word.
export const TEMPLATES: Readonly<Record<TemplateKey, readonly string[]>> = {
  // These templates also operate for an abstract noun, for example "curiosity".
  'noun.singular': [
    'The cat sat on the {word}.',
    'The dog ran to the {word}.',
    'A frog hid in the {word}.',
    'The fox told the hen about the {word}.',
    'The pig found the {word} in a box.',
  ],
  'noun.plural': [
    'The {word} sat on the mat.',
    'The dog ran past the {word}.',
    'A fox hid the {word} in a box.',
    'The cat saw the {word} on the hill.',
  ],
  'noun.uncountable': ['The owl knows all about {word}.', 'The cat told the dog about {word}.', 'A frog had lots of {word}.'],
  'noun.month': ['The cat has a party in {word}.', 'It snows on the hill in {word}.', 'The bear sleeps in {word}.'],
  'noun.day': ['The dog has a bath on {word}.', 'The frog swims in the pond on {word}.', 'The pig bakes a cake on {word}.'],
  'verb.infinitive.transitive': ['The cat will {word} the hat.', 'Can the dog {word} the ball?', 'The fox wants to {word} the box.'],
  'verb.infinitive.intransitive': ['The duck will {word} soon.', 'When will the frog {word}?', 'The hen wants to {word} again.'],
  'verb.past.transitive': ['The fox {word} the box.', 'The cat {word} the hat on the mat.', 'Yesterday the dog {word} the ball.'],
  'verb.past.intransitive': ['The frog {word} on the log.', 'The duck {word} in the pond.', 'The bee {word} in the sun.'],
  'verb.thirdPerson.transitive': ['The dog {word} the ball every day.', 'The cat often {word} the hat.'],
  'verb.thirdPerson.intransitive': ['The frog {word} on the log.', 'The owl often {word} at night.'],
  'verb.gerund.transitive': ['The pig is {word} the cake.', 'The cat is {word} the hat.'],
  'verb.gerund.intransitive': ['The duck is {word} in the pond.', 'The hen is {word} again.'],
  // These templates also operate for an adjective that has no degrees, for example "actual".
  adjective: ['The {word} dog sat on the mat.', 'The frog looked {word}.', 'The cat has some {word} hats.'],
  adverb: ['The cat ran {word}.', 'The dog {word} sits on the mat.', 'The frog jumped {word}.'],
  'number.cardinal': ['I saw {word} frogs on a log.', 'The cat has {word} hats.'],
  'number.ordinal': ['The frog came {word} in the race.', 'It is the {word} cake for the pig.'],
  other: ['The cat can spell {word}.', 'Can the frog spell {word}?', 'The dog wrote {word} on the mat.'],
}

export const templateKey = (analysis: WordAnalysis): TemplateKey => {
  switch (analysis.type) {
    case 'noun':
      return `noun.${analysis.form}`
    case 'verb':
      return `verb.${analysis.form}.${analysis.transitive ? 'transitive' : 'intransitive'}`
    case 'number':
      return `number.${analysis.form}`
    case 'adjective':
    case 'adverb':
    case 'other':
      return analysis.type
  }
}

export type Sentence = {
  readonly template: string
  readonly text: string
}

export type SentenceRequest = {
  readonly word: string
  readonly analysis: WordAnalysis
  // Give a number from 0 to 1. The shell gives Math.random, so that this function stays pure.
  readonly random: () => number
  // For "New sentence": the function does not give this template again when a different template exists.
  readonly previous?: Sentence
}

// Use a replacement function, so that a "$" in the word has no special meaning.
export const fillTemplate = (template: string, word: string): string => template.replace(WORD_SLOT, () => word)

export const chooseSentence = ({ word, analysis, random, previous }: SentenceRequest): Sentence => {
  const templates = TEMPLATES[templateKey(analysis)]
  const different = previous ? templates.filter((template) => template !== previous.template) : templates
  const candidates = different.length > 0 ? different : templates
  const index = Math.max(0, Math.min(Math.floor(random() * candidates.length), candidates.length - 1))
  const template = candidates[index]
  return { template, text: fillTemplate(template, word.trim()) }
}
