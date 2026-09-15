import { NGSL_FIRST_1000 } from './ngslFirst1000'

// Our own list (CC0) of words that young children in the UK know, but that are not in the first 1000 NGSL words.
// Add a word here only when a template needs it.
export const EXTRA_SIMPLE_WORDS: readonly string[] = ['birthday', 'spell']

// Inflected forms of simple words, with their base form. The NGSL gives only the base form of each word.
export const WORD_FORMS: Readonly<Record<string, string>> = {
  is: 'be',
  are: 'be',
  was: 'be',
  were: 'be',
  did: 'do',
  has: 'have',
  went: 'go',
  came: 'come',
  talked: 'talk',
  books: 'book',
  me: 'I',
  my: 'I',
  us: 'we',
  them: 'they',
}

// American spellings and American words. The templates must use British English.
export const AMERICAN_WORDS: ReadonlySet<string> = new Set([
  'apartment', 'behavior', 'candy', 'center', 'color', 'cookie', 'diaper', 'elevator', 'eraser', 'fall',
  'favorite', 'flashlight', 'fries', 'gotten', 'gray', 'math', 'mom', 'movie', 'organization', 'organize',
  'pants', 'program', 'realize', 'recognize', 'sidewalk', 'soccer', 'store', 'toward', 'trash', 'truck',
  'vacation',
])

const SIMPLE_WORDS: ReadonlySet<string> = new Set(
  [...NGSL_FIRST_1000, ...EXTRA_SIMPLE_WORDS].map((word) => word.toLowerCase()),
)

// A word is simple when it, or its base form, is in the first 1000 NGSL words or in the extra simple words.
export const isSimpleWord = (word: string): boolean => {
  const lower = word.toLowerCase()
  const base = Object.hasOwn(WORD_FORMS, lower) ? WORD_FORMS[lower] : lower
  return SIMPLE_WORDS.has(base.toLowerCase())
}
