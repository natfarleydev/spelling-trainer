import type { Sentence } from './sentences/sentence'
import type { WordAnalysis } from './sentences/wordType'

// One slide in the presentation. A slide from schema version 1 has only the word.
export type Slide = {
  readonly word: string
  readonly analysis?: WordAnalysis
  readonly sentence?: Sentence
}

export type Deck = readonly Slide[]

export type SlideSentence = {
  readonly analysis: WordAnalysis
  readonly sentence: Sentence
}

// Give the analysis and a sentence for one word.
export type MakeSentence = (word: string) => SlideSentence

// Make one slide for each word. When there is a sentence maker, add the analysis and the sentence to each slide.
export const buildDeck = (words: readonly string[], makeSentence?: MakeSentence): Deck =>
  words.map((word) => (makeSentence ? { word, ...makeSentence(word) } : { word }))
