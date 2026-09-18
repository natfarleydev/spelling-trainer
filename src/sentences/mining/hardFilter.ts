import { AMERICAN_WORDS } from '../simpleWords'
import { isWholeSentence, tokenize } from './gdex'

// The hard filters remove a Tatoeba sentence before the scores. A sentence must obey all of them.

// The most frequent first names in the English Tatoeba sentences (counted on 2026-09-15).
// A sentence can use these names, because a child can read them.
export const NAMES: ReadonlySet<string> = new Set([
  'Tom',
  'Mary',
  'John',
  'Dan',
  'Linda',
  'Anna',
  'Alice',
  'Jane',
  'Ken',
  'Bill',
  'Jim',
  'Jack',
  'Bob',
  'Mike',
  'Kate',
  'Lucy',
  'Emma',
  'Sarah',
  'Ann',
  'Sam',
])

// Topics that are not correct for children aged 7 to 11, and rude words.
// The scan of the first 3,600 mined candidates (2026-09-15) found the words from "attack" to "youths" that were missing.
export const BLOCKED_WORDS: ReadonlySet<string> = new Set([
  'alcohol',
  'arrest',
  'arrested',
  'ass',
  'attack',
  'attacked',
  'cancer',
  'crime',
  'crimes',
  'criminal',
  'criminals',
  'dated',
  'dating',
  'inflation',
  'investment',
  'investments',
  'lovers',
  'military',
  'patients',
  'abortion',
  'pregnancy',
  'political',
  'retirement',
  'unemployment',
  'youths',
  'beer',
  'bitch',
  'blood',
  'bloody',
  'bomb',
  'boyfriend',
  'church',
  'cigarette',
  'cigarettes',
  'crap',
  'damn',
  'dead',
  'death',
  'die',
  'died',
  'dies',
  'divorce',
  'drug',
  'drugs',
  'drunk',
  'dying',
  'fat',
  'fuck',
  'gamble',
  'gambling',
  'girlfriend',
  'god',
  'gun',
  'guns',
  'hate',
  'hated',
  'hell',
  'idiot',
  'jail',
  'kill',
  'killed',
  'kills',
  'kiss',
  'kissed',
  'knife',
  'murder',
  'naked',
  'porn',
  'pray',
  'pregnant',
  'prison',
  'rape',
  'sex',
  'sexual',
  'sexy',
  'shit',
  'shoot',
  'shot',
  'smoke',
  'smoking',
  'stupid',
  'suicide',
  'terrorist',
  'ugly',
  'vodka',
  'war',
  'abuse',
  'breast',
  'affair',
  'victim',
  'violence',
  'violent',
  'weapon',
  'whiskey',
  'whisky',
  'wine',
])

// Phrases with a meaning that is not correct for children, although each word alone is correct.
export const BLOCKED_PHRASES: readonly string[] = [
  'make love',
  'made love',
  'making love',
  'birth control',
  'life support',
  'pass away',
  'passed away',
  'passes away',
  'fall in love',
  'falls in love',
  'fell in love',
  'fallen in love',
  'falling in love',
]

export const MINIMUM_WORDS = 4
export const MAXIMUM_WORDS = 15

// Only letters, spaces and simple punctuation. No numbers, quotation marks or apostrophes.
const ALLOWED_CHARACTERS = /^[\p{L} ,.!?;:-]+$/u

export type FilterTools = {
  // True for a word that a KS2 child knows. The script uses isKnownWord with the compromise root.
  readonly isKnown: (word: string) => boolean
  // The possible base forms of a lowercase word, so that a form of a blocked word is also blocked. Example: "murders".
  readonly bases?: (word: string) => readonly string[]
}

// Give the reason why the sentence fails a hard filter, or null when the sentence passes all the filters.
export const hardFilterReason = (sentence: string, keyword: string, { isKnown, bases = () => [] }: FilterTools): string | null => {
  if (!isWholeSentence(sentence)) return 'not a whole sentence'
  if (!ALLOWED_CHARACTERS.test(sentence)) return 'a character that is not allowed'
  // An ellipsis shows a pause or a missing part, which is difficult for a child to read.
  if (sentence.includes('..')) return 'an ellipsis'
  const tokens = tokenize(sentence)
  if (tokens.length < MINIMUM_WORDS) return 'too short'
  if (tokens.length > MAXIMUM_WORDS) return 'too long'
  const key = keyword.toLowerCase()
  const keywordCount = tokens.filter((token) => token.toLowerCase() === key).length
  if (keywordCount !== 1) return `the keyword ${keywordCount} times`
  const others = tokens.filter((token) => token.toLowerCase() !== key && !NAMES.has(token))
  const blocked = others.find((token) => {
    const lower = token.toLowerCase()
    return BLOCKED_WORDS.has(lower) || bases(lower).some((base) => BLOCKED_WORDS.has(base))
  })
  if (blocked) return `the blocked word "${blocked}"`
  const joined = ` ${tokens.map((token) => token.toLowerCase()).join(' ')} `
  const phrase = BLOCKED_PHRASES.find((blockedPhrase) => joined.includes(` ${blockedPhrase} `))
  if (phrase) return `the blocked phrase "${phrase}"`
  const american = others.find((token) => {
    const lower = token.toLowerCase()
    return AMERICAN_WORDS.has(lower) || bases(lower).some((base) => AMERICAN_WORDS.has(base))
  })
  if (american) return `the American word "${american}"`
  const unknown = others.find((token) => !isKnown(token))
  return unknown ? `the unknown word "${unknown}"` : null
}
