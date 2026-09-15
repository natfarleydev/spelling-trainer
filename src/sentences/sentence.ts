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

// Simple sentences in British English. Only the word under test can be difficult.
// The tests make sure that each other word is in the first 1000 NGSL words, or is an extra simple word.
// A template has no "a" or "an" before the word, because the correct article depends on the sound of the word.
export const TEMPLATES: Readonly<Record<TemplateKey, readonly string[]>> = {
  'noun.singular': [
    'We talked about the {word}.',
    'Tell me about the {word}.',
    'I want to learn about the {word}.',
    'Where is the {word}?',
    'That is a good {word}.',
  ],
  'noun.plural': [
    'We talked about the {word}.',
    'The {word} are here.',
    'I want to learn about {word}.',
    'Where are the {word}?',
  ],
  'noun.uncountable': ['We talked about {word}.', 'Tell me about {word}.', 'I want to learn more about {word}.'],
  'noun.month': ['My birthday is in {word}.', 'We will go on holiday in {word}.', 'It is often cold in {word}.'],
  'noun.day': ['We go to school on {word}.', 'I will see you on {word}.', 'Today is {word}.'],
  'verb.infinitive.transitive': ['I want to {word} them.', 'We will {word} them today.', 'Can you {word} it?'],
  'verb.infinitive.intransitive': ['It will {word} soon.', 'I think it will {word}.', 'When will it {word}?'],
  'verb.past.transitive': ['We {word} them last week.', 'I think she {word} it.', 'They {word} it before school.'],
  'verb.past.intransitive': ['It {word} last week.', 'I think it {word} again.', 'It {word} on the first day.'],
  'verb.thirdPerson.transitive': ['She {word} them every day.', 'He often {word} it.'],
  'verb.thirdPerson.intransitive': ['It {word} every day.', 'It often {word} at night.'],
  'verb.gerund.transitive': ['We are {word} them now.', 'She is {word} it today.'],
  'verb.gerund.intransitive': ['It is {word} now.', 'I think it is {word} again.'],
  adjective: ['That is very {word}.', 'I think it is {word}.', 'It was {word} today.'],
  adverb: ['We {word} go to the park.', 'She did it {word}.', 'They {word} play here.'],
  'number.cardinal': ['I have {word} books.', 'There are {word} people here.'],
  'number.ordinal': ['It is my {word} birthday.', 'This is the {word} time.'],
  other: ['The word is {word}.', 'Can you spell {word}?', 'Write the word {word}.'],
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
