// GDEX ("Good Dictionary EXamples") scores a sentence for use as an example of a word.
// Source of the method: Kilgarriff, A., Husák, M., McAdam, K., Rundell, M. and Rychlý, P. (2008).
// "GDEX: Automatically finding good dictionary examples in a corpus". Proceedings of EURALEX 2008.
// The rules and the values here are our own version for KS2 children. GDEX does not measure the context.
// src/sentences/mining/context.ts measures the context.

// The best sentence length for KS2 children, in words.
export const OPTIMAL_LENGTH = { min: 6, max: 12 } as const

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

// The share of the words, without the keyword, that are common words.
export const commonWordShare = (tokens: readonly string[], keyword: string, isCommon: (word: string) => boolean): number => {
  const others = tokens.filter((token) => token.toLowerCase() !== keyword.toLowerCase())
  return others.length === 0 ? 1 : others.filter(isCommon).length / others.length
}

export type GdexTools = {
  // True for a word that a young child knows well, for example a word in the first 1000 NGSL words.
  readonly isCommon: (word: string) => boolean
}

// A score from 0 (worst) to 1 (best).
export const gdexScore = (sentence: string, keyword: string, { isCommon }: GdexTools): number => {
  if (!isWholeSentence(sentence)) return 0
  const tokens = tokenize(sentence)
  return (
    optimalInterval(tokens.length, OPTIMAL_LENGTH.min, OPTIMAL_LENGTH.max) *
    keywordPositionScore(tokens, keyword) *
    pronounStartScore(tokens) *
    (0.5 + 0.5 * commonWordShare(tokens, keyword, isCommon))
  )
}
