import type { BankEntry } from './bank'
import { FUNCTION_WORDS } from './functionWords'
import { splitSentence } from './highlight'
import { WORD_SLOT } from './sentence'
import { sameAnalysis, type WordAnalysis } from './wordType'
import { cosineSimilarity, type WordVectors } from './wordVectors'

// Link a word with no bank sentences to a bank sentence of a word with a similar meaning.
// Example: "yacht" is near "boat", so "The boat sailed out of the harbour." gives "The yacht sailed out of the harbour."

// EXPERIMENT: the app does not use links yet.
// A review on 2026-09-15 linked 154 of 272 words (common exception words, NGSL words and extra nouns).
// Most links did not show the meaning. Examples: "Keep going and push to the end of the path." and
// "The driver parked the accident outside the house." The 50-dimension vectors find related words, not words that
// can replace each other. Also, the analysis of a bank word alone can be different from its type in the sentence.

// A link must have a word similarity and a context similarity of at least this value.
export const LINK_THRESHOLD = 0.62

export type LinkedTemplate = {
  readonly template: string
  // The bank word of the sentence.
  readonly from: string
  readonly score: number
}

export type LinkRequest = {
  readonly word: string
  readonly analysis: WordAnalysis
  readonly entries: readonly BankEntry[]
  readonly vectors: WordVectors
  // Give the analysis of a bank word, so that the link uses only a bank word of the same type and form.
  readonly analyseWord: (word: string) => WordAnalysis
}

const wordsOf = (sentence: string): readonly string[] =>
  sentence
    .split(/[^\p{L}]+/u)
    .filter((word) => word !== '')
    .map((word) => word.toLowerCase())

// A word that starts with the same 5 letters is probably a different form of the word. Example: "boats" for "boat".
const PREFIX_LENGTH = 5
const sharesPrefix = (other: string, word: string): boolean => other.startsWith(word.slice(0, PREFIX_LENGTH))

const articleFor = (word: string): string => (/^[aeiou]/.test(word) ? 'an' : 'a')

// The template of the sentence with the word slot in place of the bank word, or null when the sentence is not safe.
const safeTemplate = (sentence: string, bankWord: string, word: string): string | null => {
  const words = wordsOf(sentence)
  if (words.filter((other) => other === bankWord).length !== 1) return null
  if (words.some((other) => other !== bankWord && sharesPrefix(other, bankWord))) return null
  if (words.some((other) => sharesPrefix(other, word))) return null

  const parts = splitSentence(sentence, bankWord)
  const index = parts.findIndex((part) => part.isWord)
  // A bank word at the start of the sentence has a capital letter. The word under test must keep its own spelling.
  if (index < 1) return null
  const article = parts[index - 1].text.toLowerCase().match(/(?:^|[^\p{L}])(an?) $/u)?.[1]
  if (article !== undefined && article !== articleFor(word)) return null

  return parts.map((part) => (part.isWord ? WORD_SLOT : part.text)).join('')
}

// The best similarity of the word and a content word of the sentence.
const contextSimilarity = (vectors: WordVectors, target: Float32Array, sentence: string, bankWord: string): number =>
  wordsOf(sentence)
    .filter((other) => other !== bankWord && !FUNCTION_WORDS.has(other))
    .reduce((best, other) => {
      const vector = vectors.vector(other)
      return vector ? Math.max(best, cosineSimilarity(target, vector)) : best
    }, 0)

// Give the bank sentences that can show the meaning of the word, most similar first.
export const linkedTemplates = ({ word, analysis, entries, vectors, analyseWord }: LinkRequest): readonly LinkedTemplate[] => {
  const key = word.trim().toLowerCase()
  const target = vectors.vector(key)
  if (!target) return []

  return entries
    .flatMap((entry) => {
      const bankWord = entry.word.toLowerCase()
      const bankVector = bankWord === key ? undefined : vectors.vector(bankWord)
      if (!bankVector) return []
      const wordSimilarity = cosineSimilarity(target, bankVector)
      if (wordSimilarity < LINK_THRESHOLD || !sameAnalysis(analyseWord(entry.word), analysis)) return []

      return entry.sentences.flatMap((sentence) => {
        const template = safeTemplate(sentence, bankWord, key)
        if (template === null) return []
        const score = Math.min(wordSimilarity, contextSimilarity(vectors, target, sentence, bankWord))
        return score >= LINK_THRESHOLD ? [{ template, from: entry.word, score }] : []
      })
    })
    .sort((a, b) => b.score - a.score)
}
