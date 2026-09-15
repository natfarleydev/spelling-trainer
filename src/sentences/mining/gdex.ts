// GDEX ("Good Dictionary EXamples") scores a sentence for use as an example of a word.
// Source of the method: Kilgarriff, A., Husák, M., McAdam, K., Rundell, M. and Rychlý, P. (2008).
// "GDEX: Automatically finding good dictionary examples in a corpus". Proceedings of EURALEX 2008.
// The rules and the values here are our own version for KS2 children. GDEX does not measure the context.
// src/sentences/mining/context.ts measures the context.

// The best sentence length for KS2 children, in words.
export const OPTIMAL_LENGTH = { min: 6, max: 10 } as const

// Each greylist word multiplies the score by this value.
const GREYLIST_PENALTY = 0.7

// Words that make a sentence formal, old-fashioned, American or about adult life.
// The first review of the Tatoeba candidates (2026-09-15) found many of them in the oldest sentences.
export const GREYLIST: ReadonlySet<string> = new Set([
  // Formal or old-fashioned words.
  'whom',
  'shall',
  'thus',
  'upon',
  'hence',
  'whereas',
  'whatever',
  'whether',
  'regard',
  'mine',
  'ought',
  'indeed',
  'moreover',
  'therefore',
  'somewhat',
  'rather',
  'lest',
  'thee',
  'thou',
  // American words. AMERICAN_WORDS already rejects some other American words, for example "apartment".
  'cookies',
  'dollar',
  'dollars',
  'college',
  'subway',
  'garbage',
  'gasoline',
  'highway',
  'freshman',
  // Adult life.
  'business',
  'company',
  'office',
  'boss',
  'salary',
  'tax',
  'taxes',
  'loan',
  'debt',
  'election',
  'politics',
  'lawyer',
  'customer',
  'wife',
  'husband',
  'marriage',
  'married',
  'hotel',
  'coffee',
])

// A pronoun at the start usually refers to something outside the sentence.
const START_PRONOUNS = new Set(['he', 'she', 'it', 'they', 'this', 'that', 'these', 'those', 'him', 'her', 'them', 'his', 'its', 'their'])

export const tokenize = (sentence: string): readonly string[] => sentence.split(/[^\p{L}']+/u).filter((token) => token !== '')

export const isWholeSentence = (sentence: string): boolean => /^\p{Lu}/u.test(sentence) && /[.!?]$/.test(sentence)

// 1 inside the interval. Outside the interval, the score goes down in a straight line to 0.
export const optimalInterval = (value: number, min: number, max: number): number => {
  if (value < min) return Math.max(0, value / min)
  if (value > max) return Math.max(0, 1 - (value - max) / max)
  return 1
}

// 0 when the sentence does not have the keyword, 0.5 when the keyword is the first word, else 1.
export const keywordPositionScore = (tokens: readonly string[], keyword: string): number => {
  const index = tokens.findIndex((token) => token.toLowerCase() === keyword.toLowerCase())
  if (index === -1) return 0
  return index === 0 ? 0.5 : 1
}

export const pronounStartScore = (tokens: readonly string[]): number =>
  START_PRONOUNS.has((tokens[0] ?? '').toLowerCase()) ? 0.5 : 1

// The mean commonness of the words, without the keyword.
export const commonWordScore = (tokens: readonly string[], keyword: string, commonness: (word: string) => number): number => {
  const others = tokens.filter((token) => token.toLowerCase() !== keyword.toLowerCase())
  return others.length === 0 ? 1 : others.reduce((sum, token) => sum + commonness(token), 0) / others.length
}

export const greylistScore = (tokens: readonly string[]): number =>
  tokens.reduce((score, token) => (GREYLIST.has(token.toLowerCase()) ? score * GREYLIST_PENALTY : score), 1)

export type GdexTools = {
  // From 0 to 1: how well a young child knows the word. Example: 1 for "dog", less for "provide".
  readonly commonness: (word: string) => number
}

// A score from 0 (worst) to 1 (best).
export const gdexScore = (sentence: string, keyword: string, { commonness }: GdexTools): number => {
  if (!isWholeSentence(sentence)) return 0
  const tokens = tokenize(sentence)
  const others = tokens.filter((token) => token.toLowerCase() !== keyword.toLowerCase())
  return (
    optimalInterval(tokens.length, OPTIMAL_LENGTH.min, OPTIMAL_LENGTH.max) *
    keywordPositionScore(tokens, keyword) *
    pronounStartScore(tokens) *
    greylistScore(others) *
    (0.5 + 0.5 * commonWordScore(tokens, keyword, commonness))
  )
}
