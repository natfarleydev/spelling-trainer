import { NGSL_FIRST_1000 } from './ngslFirst1000'

// Our own list (CC0) of short words that UK children read in Reception and Year 1, but that are not in the
// first 1000 NGSL words. Most are decodable phonics words, for example "cat", "hat" and "frog".
// Add a word here only when a template needs it.
export const EXTRA_SIMPLE_WORDS: readonly string[] = [
  'bake', 'ball', 'bath', 'bee', 'cake', 'cat', 'duck', 'fox', 'frog', 'hat', 'hen', 'hide',
  'hill', 'jump', 'log', 'mat', 'owl', 'pig', 'pond', 'snow', 'spell', 'sun', 'swim',
]

// Inflected forms of simple words, with their base form. The NGSL gives only the base form of each word.
export const WORD_FORMS: Readonly<Record<string, string>> = {
  is: 'be',
  are: 'be',
  was: 'be',
  were: 'be',
  did: 'do',
  has: 'have',
  had: 'have',
  went: 'go',
  came: 'come',
  sat: 'sit',
  sits: 'sit',
  ran: 'run',
  hid: 'hide',
  told: 'tell',
  found: 'find',
  wrote: 'write',
  knows: 'know',
  wants: 'want',
  sleeps: 'sleep',
  swims: 'swim',
  bakes: 'bake',
  looked: 'look',
  jumped: 'jump',
  snows: 'snow',
  saw: 'see',
  hats: 'hat',
  frogs: 'frog',
  lots: 'lot',
  me: 'I',
  my: 'I',
  us: 'we',
  them: 'they',
}

// American spellings and American words. All sentences must use British English.
// The list has the 30 American spellings in NGSL 1.2. It does not have "fall" or "store",
// because British English also uses them as verbs. Example: "Do not fall off the wall."
export const AMERICAN_WORDS: ReadonlySet<string> = new Set([
  'analyze', 'apartment', 'apologize', 'behavior', 'candy', 'catalog', 'center', 'characterize', 'color', 'cookie',
  'criticize', 'defense', 'diaper', 'dialog', 'elevator', 'emphasize', 'eraser', 'favor', 'favorite', 'flashlight',
  'fries', 'gotten', 'gray', 'harbor', 'honor', 'humor', 'labor', 'license', 'math', 'meter',
  'mom', 'movie', 'neighbor', 'offense', 'organization', 'organize', 'pants', 'program', 'realize', 'recognize',
  'sidewalk', 'soccer', 'specialize', 'summarize', 'theater', 'toward', 'trash', 'truck', 'vacation',
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
