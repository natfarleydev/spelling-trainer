import type { Slide, SlideSentence } from '../deck'
import { chooseSentence } from './sentence'
import { analyseWord, withType, type TagWord, type WordAnalysis, type WordType } from './wordType'

export type SentenceTools = {
  readonly tagWord: TagWord
  // Give a number from 0 to 1. The shell gives Math.random.
  readonly random: () => number
}

// Make the analysis and the first sentence for the word of a new slide.
export const makeSlideSentence =
  ({ tagWord, random }: SentenceTools) =>
  (word: string): SlideSentence => {
    const analysis = analyseWord(word, tagWord)
    return { analysis, sentence: chooseSentence({ word, analysis, random }) }
  }

// Give the slide a different sentence.
// A slide from schema version 1 has no analysis, so the tagger analyses the word first.
export const newSentence = (slide: Slide, { tagWord, random }: SentenceTools): Slide => {
  const analysis = slide.analysis ?? analyseWord(slide.word, tagWord)
  return {
    ...slide,
    analysis,
    sentence: chooseSentence({ word: slide.word, analysis, random, previous: slide.sentence }),
  }
}

const OTHER: WordAnalysis = { type: 'other' }

// Change the word type to the type that the teacher selects, and give a sentence for the new type.
export const changeWordType = (slide: Slide, type: WordType, { random }: Pick<SentenceTools, 'random'>): Slide => {
  if (slide.analysis?.type === type) return slide
  const analysis = withType(slide.analysis ?? OTHER, type, slide.word)
  return { ...slide, analysis, sentence: chooseSentence({ word: slide.word, analysis, random }) }
}
