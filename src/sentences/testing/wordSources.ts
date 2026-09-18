import { FUNCTION_WORDS } from '../functionWords'
import { NGSL_FIRST_1000 } from '../ngslFirst1000'
import { AMERICAN_WORDS } from '../simpleWords'
import { CONCRETE_WORDS } from '../mining/concreteWords'
import { YEAR_1_COMMON_EXCEPTION_WORDS, YEAR_2_COMMON_EXCEPTION_WORDS } from './commonExceptionWords'
import type { WordSource } from './coverage'
import { CYPLEX_WORDS } from './cyplexWords'
import { EVERYDAY_WORDS } from './everydayWords'
import { NUMBER_WORDS } from './knownWords'
import { YEARS_3_AND_4, YEARS_5_AND_6 } from './ks2StatutoryWords'
import { ALL_PATTERN_WORDS } from './patternWords'

// The word sources of the sentence bank, for the coverage report in WORD-COVERAGE.md.
// A teacher can set any word of these lists as a spelling word.

// A function word, for example "the" or "was", has no meaning of its own, so the bank gives it no sentence.
// An American spelling, for example "toward", can never get a sentence, because the rule for British English does not
// allow it in a sentence. Thus the report leaves out both.
const settable = (words: readonly string[]): readonly string[] =>
  words.filter((word) => {
    const key = word.toLowerCase()
    return !FUNCTION_WORDS.has(key) && !AMERICAN_WORDS.has(key)
  })

export const WORD_SOURCES: readonly WordSource[] = [
  {
    name: 'Statutory spelling list, years 3 and 4',
    description: 'The words that the national curriculum of England gives for years 3 and 4.',
    words: settable(YEARS_3_AND_4),
  },
  {
    name: 'Statutory spelling list, years 5 and 6',
    description: 'The words that the national curriculum of England gives for years 5 and 6.',
    words: settable(YEARS_5_AND_6),
  },
  {
    name: 'Common exception words, years 1 and 2',
    description: 'The common exception words of the national curriculum for years 1 and 2.',
    words: settable([...YEAR_1_COMMON_EXCEPTION_WORDS, ...YEAR_2_COMMON_EXCEPTION_WORDS]),
  },
  {
    name: 'Spelling pattern words, English Appendix 1',
    description: 'The example words of the spelling patterns, prefixes and suffixes of English Appendix 1.',
    words: settable(ALL_PATTERN_WORDS),
  },
  {
    name: 'CYP-LEX book words, ages 7 to 9',
    description: 'The words that children aged 7 to 9 meet in a fifth or more of the books that they read.',
    words: settable(CYPLEX_WORDS),
  },
  {
    name: 'Concrete words',
    description: 'Our list of nouns, verbs and adjectives that a teacher sets, for example "light" and "garden".',
    words: settable(CONCRETE_WORDS),
  },
  {
    name: 'Days of the week and months',
    description: 'The everyday proper nouns that a child writes in a diary, a letter and a date.',
    words: settable(EVERYDAY_WORDS),
  },
  {
    name: 'Number words',
    description: 'The numbers in words, for the sums, the dates and the stories that a child writes.',
    words: settable(NUMBER_WORDS),
  },
  {
    name: 'First 1000 NGSL words',
    description: 'The most common English words. A teacher can set any of them, so the bank needs all of them.',
    words: settable(NGSL_FIRST_1000),
  },
]
