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
const INTRANSITIVE_VERB_FORMS = [
  ['arrive', 'arrives', 'arrived', 'arriving'],
  ['appear', 'appears', 'appeared', 'appearing'],
  ['disappear', 'disappears', 'disappeared', 'disappearing'],
  ['occur', 'occurs', 'occurred', 'occurring'],
  ['interfere', 'interferes', 'interfered', 'interfering'],
  ['happen', 'happens', 'happened', 'happening'],
  ['exist', 'exists', 'existed', 'existing'],
  ['correspond', 'corresponds', 'corresponded', 'corresponding'],
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
  forward: OTHER,
  forwards: OTHER,
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
