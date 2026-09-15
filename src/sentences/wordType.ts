export type NounForm = 'singular' | 'plural' | 'uncountable' | 'month' | 'day'
export type VerbForm = 'infinitive' | 'past' | 'thirdPerson' | 'gerund'
export type NumberForm = 'cardinal' | 'ordinal'

export type WordAnalysis =
  | { readonly type: 'noun'; readonly form: NounForm }
  // A transitive verb has an object. Example: "describe it". An intransitive verb has no object. Example: "arrive".
  | { readonly type: 'verb'; readonly form: VerbForm; readonly transitive: boolean }
  | { readonly type: 'adjective' }
  | { readonly type: 'adverb' }
  | { readonly type: 'number'; readonly form: NumberForm }
  | { readonly type: 'other' }

export type WordType = WordAnalysis['type']

// The types that the teacher can select, in the order that the selector shows them.
export const WORD_TYPES: readonly WordType[] = ['noun', 'verb', 'adjective', 'adverb', 'number', 'other']

const NOUN_FORMS: readonly NounForm[] = ['singular', 'plural', 'uncountable', 'month', 'day']
const VERB_FORMS: readonly VerbForm[] = ['infinitive', 'past', 'thirdPerson', 'gerund']
const NUMBER_FORMS: readonly NumberForm[] = ['cardinal', 'ordinal']

// Give the part-of-speech tags of one word. The tag names are the compromise tag names.
export type TagWord = (word: string) => readonly string[]

const OTHER: WordAnalysis = { type: 'other' }
const singularNoun: WordAnalysis = { type: 'noun', form: 'singular' }

export const analyseFromTags = (tags: readonly string[]): WordAnalysis => {
  const has = (tag: string) => tags.includes(tag)
  if (has('Value')) return { type: 'number', form: has('Ordinal') ? 'ordinal' : 'cardinal' }
  if (has('Noun')) {
    if (has('Month')) return { type: 'noun', form: 'month' }
    if (has('WeekDay')) return { type: 'noun', form: 'day' }
    if (has('Plural')) return { type: 'noun', form: 'plural' }
    if (has('Uncountable')) return { type: 'noun', form: 'uncountable' }
    return singularNoun
  }
  if (has('Verb')) {
    const form: VerbForm = has('PastTense')
      ? 'past'
      : has('Gerund')
        ? 'gerund'
        : has('Infinitive')
          ? 'infinitive'
          : has('PresentTense')
            ? 'thirdPerson'
            : 'infinitive'
    return { type: 'verb', form, transitive: true }
  }
  if (has('Adjective')) return { type: 'adjective' }
  if (has('Adverb')) return { type: 'adverb' }
  return OTHER
}

// Verbs with no object, in all their forms. The templates for these verbs have no "it" or "them".
// The review of the KS2 sentences found some of these verbs, for example "I want to decide them".
const INTRANSITIVE_VERB_FORMS = [
  ['appear', 'appears', 'appeared', 'appearing'],
  ['arrive', 'arrives', 'arrived', 'arriving'],
  ['bargain', 'bargains', 'bargained', 'bargaining'],
  ['breathe', 'breathes', 'breathed', 'breathing'],
  ['communicate', 'communicates', 'communicated', 'communicating'],
  ['correspond', 'corresponds', 'corresponded', 'corresponding'],
  ['decide', 'decides', 'decided', 'deciding'],
  ['disappear', 'disappears', 'disappeared', 'disappearing'],
  ['exaggerate', 'exaggerates', 'exaggerated', 'exaggerating'],
  ['exist', 'exists', 'existed', 'existing'],
  ['happen', 'happens', 'happened', 'happening'],
  ['interfere', 'interferes', 'interfered', 'interfering'],
  ['occur', 'occurs', 'occurred', 'occurring'],
  ['reign', 'reigns', 'reigned', 'reigning'],
]
export const INTRANSITIVE_VERBS: ReadonlySet<string> = new Set(INTRANSITIVE_VERB_FORMS.flat())

// Corrections for the tagger. The research with the KS2 statutory word lists found these words.
export const WORD_OVERRIDES: Readonly<Record<string, WordAnalysis>> = {
  // The American lexicon of the tagger does not know these British spellings.
  centre: singularNoun,
  programme: singularNoun,
  // The tagger gives the wrong type for these words.
  peculiar: { type: 'adjective' },
  various: { type: 'adjective' },
  interfere: { type: 'verb', form: 'infinitive', transitive: false },
  // The tagger gives "verb", but a child uses these words more frequently as nouns.
  address: singularNoun,
  answer: singularNoun,
  bruise: singularNoun,
  circle: singularNoun,
  exercise: singularNoun,
  experience: singularNoun,
  experiment: singularNoun,
  guide: singularNoun,
  notice: singularNoun,
  position: singularNoun,
  promise: singularNoun,
  question: singularNoun,
  rhyme: singularNoun,
  sentence: singularNoun,
  surprise: singularNoun,
  thought: singularNoun,
  // The templates for a noun, verb, adjective or adverb do not operate for these words.
  according: OTHER,
  although: OTHER,
  enough: OTHER,
  especially: OTHER,
  forward: OTHER,
  forwards: OTHER,
  suppose: OTHER,
  therefore: OTHER,
  though: OTHER,
  through: OTHER,
}

// Find the type and the form of a word. Use the override table first, then the tagger.
export const analyseWord = (word: string, tagWord: TagWord): WordAnalysis => {
  const trimmed = word.trim()
  const key = trimmed.toLowerCase()
  if (Object.hasOwn(WORD_OVERRIDES, key)) return WORD_OVERRIDES[key]

  let analysis: WordAnalysis
  try {
    analysis = analyseFromTags(tagWord(trimmed))
  } catch {
    return OTHER
  }
  return analysis.type === 'verb' && INTRANSITIVE_VERBS.has(key) ? { ...analysis, transitive: false } : analysis
}

// Give the analysis for a type that the teacher selects. A different type gets its default form.
export const withType = (analysis: WordAnalysis, type: WordType, word: string): WordAnalysis => {
  if (analysis.type === type) return analysis
  switch (type) {
    case 'noun':
      return singularNoun
    case 'verb':
      return { type: 'verb', form: 'infinitive', transitive: !INTRANSITIVE_VERBS.has(word.trim().toLowerCase()) }
    case 'number':
      return { type: 'number', form: 'cardinal' }
    case 'adjective':
    case 'adverb':
    case 'other':
      return { type }
  }
}

const isOneOf = <T extends string>(values: readonly T[], value: unknown): value is T =>
  typeof value === 'string' && (values as readonly string[]).includes(value)

// Make sure that a stored analysis has the correct format before the app uses it.
export const isWordAnalysis = (value: unknown): value is WordAnalysis => {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  switch (record.type) {
    case 'noun':
      return isOneOf(NOUN_FORMS, record.form)
    case 'verb':
      return isOneOf(VERB_FORMS, record.form) && typeof record.transitive === 'boolean'
    case 'number':
      return isOneOf(NUMBER_FORMS, record.form)
    case 'adjective':
    case 'adverb':
    case 'other':
      return true
    default:
      return false
  }
}

// True when two analyses have the same type, form and transitivity.
export const sameAnalysis = (a: WordAnalysis, b: WordAnalysis): boolean => {
  switch (a.type) {
    case 'noun':
    case 'number':
      return a.type === b.type && a.form === b.form
    case 'verb':
      return b.type === 'verb' && a.form === b.form && a.transitive === b.transitive
    case 'adjective':
    case 'adverb':
    case 'other':
      return a.type === b.type
  }
}
