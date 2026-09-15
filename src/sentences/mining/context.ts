import { splitSentence } from '../highlight'

// The context score measures how well a sentence shows the meaning of a word.
// Method: hide the word, let a masked language model guess it, then compare the guesses with the word.
// Source of the method: "Measuring Contextual Informativeness in Child-Directed Text" (arXiv:2412.17427).
// That paper compares the guesses with ConceptNet Numberbatch embeddings. We use our GloVe word vectors.
// Example: "The astronaut flew into ___." gives "space" with a high probability, so the context is good.

export type Guess = {
  // The token of the guess. RoBERTa tokens can start with a space.
  readonly token: string
  // The probability of the guess, from 0 to 1.
  readonly score: number
}

// Replace the first whole-word match of the keyword with the mask token, or give null when there is no match.
export const maskSentence = (sentence: string, keyword: string, mask: string): string | null => {
  const parts = splitSentence(sentence, keyword)
  if (!parts.some((part) => part.isWord)) return null
  return parts.map((part) => (part.isWord ? mask : part.text)).join('')
}

// The sum of the probability of each guess multiplied by its similarity to the keyword.
// An exact guess has the similarity 1. A negative similarity counts as 0.
export const contextScore = (
  guesses: readonly Guess[],
  keyword: string,
  similarity: (guess: string, keyword: string) => number,
): number => {
  const key = keyword.toLowerCase()
  return guesses.reduce((sum, { token, score }) => {
    const guess = token.trim().toLowerCase()
    return sum + score * Math.max(0, guess === key ? 1 : similarity(guess, key))
  }, 0)
}

// The share of (good, poor) pairs where the good item has the higher score. A tie counts as a half.
// 1 is perfect agreement, 0.5 is chance. This is the area under the ROC curve.
export const rankAgreement = (good: readonly number[], poor: readonly number[]): number => {
  const pairs = good.length * poor.length
  if (pairs === 0) return 0.5
  const wins = good.reduce(
    (total, goodScore) =>
      total + poor.reduce((sum, poorScore) => sum + (goodScore > poorScore ? 1 : goodScore === poorScore ? 0.5 : 0), 0),
    0,
  )
  return wins / pairs
}
