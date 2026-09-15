import type { Slide, SlideSentence } from '../deck'
import { chooseSentence, type Sentence } from './sentence'
import { analyseWord, sameAnalysis, withType, type TagWord, type WordAnalysis, type WordType } from './wordType'

export type SentenceTools = {
  readonly tagWord: TagWord
  // Give a number from 0 to 1. The shell gives Math.random.
  readonly random: () => number
  // Give the bank sentences of a word. The app gives bankSentences from ./bank.
  readonly bankSentences: (word: string) => readonly string[]
}

const pick = <T>(items: readonly T[], random: () => number): T =>
  items[Math.max(0, Math.min(Math.floor(random() * items.length), items.length - 1))]

// Choose a bank sentence first, because it shows the meaning of the word. Then choose a template sentence.
// Bank sentences apply only to the analysis from the tagger. A teacher who selects a different type wants a different use of the word.
const chooseSlideSentence = (
  word: string,
  analysis: WordAnalysis,
  automatic: WordAnalysis,
  { random, bankSentences }: SentenceTools,
  previous?: Sentence,
): Sentence => {
  const bank = sameAnalysis(analysis, automatic) ? bankSentences(word).filter((text) => text !== previous?.text) : []
  if (bank.length === 0) return chooseSentence({ word, analysis, random, previous })
  const text = pick(bank, random)
  return { template: text, text, source: 'bank' }
}

// Make the analysis and the first sentence for the word of a new slide.
export const makeSlideSentence =
  (tools: SentenceTools) =>
  (word: string): SlideSentence => {
    const analysis = analyseWord(word, tools.tagWord)
    return { analysis, sentence: chooseSlideSentence(word, analysis, analysis, tools) }
  }

// Give the slide a different sentence.
// A slide from schema version 1 has no analysis, so the tagger analyses the word first.
export const newSentence = (slide: Slide, tools: SentenceTools): Slide => {
  const automatic = analyseWord(slide.word, tools.tagWord)
  const analysis = slide.analysis ?? automatic
  return { ...slide, analysis, sentence: chooseSlideSentence(slide.word, analysis, automatic, tools, slide.sentence) }
}

const OTHER: WordAnalysis = { type: 'other' }

// Change the word type to the type that the teacher selects, and give a sentence for the new type.
export const changeWordType = (slide: Slide, type: WordType, tools: SentenceTools): Slide => {
  if (slide.analysis?.type === type) return slide
  const analysis = withType(slide.analysis ?? OTHER, type, slide.word)
  const automatic = analyseWord(slide.word, tools.tagWord)
  return { ...slide, analysis, sentence: chooseSlideSentence(slide.word, analysis, automatic, tools) }
}
