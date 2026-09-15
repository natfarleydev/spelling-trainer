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
export const BLOCKED_WORDS: ReadonlySet<string> = new Set([
  'alcohol',
  'arrest',
  'arrested',
  'ass',
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
  'weapon',
  'whiskey',
  'whisky',
  'wine',
])

export const MINIMUM_WORDS = 4
export const MAXIMUM_WORDS = 15

// Only letters, spaces and simple punctuation. No numbers, quotation marks or apostrophes.
const ALLOWED_CHARACTERS = /^[\p{L} ,.!?;:-]+$/u

export type FilterTools = {
  // True for a word that a KS2 child knows. The script uses isKnownWord with the compromise root.
  readonly isKnown: (word: string) => boolean
}

// Give the reason why the sentence fails a hard filter, or null when the sentence passes all the filters.
export const hardFilterReason = (sentence: string, keyword: string, { isKnown }: FilterTools): string | null => {
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
  const blocked = others.find((token) => BLOCKED_WORDS.has(token.toLowerCase()))
  if (blocked) return `the blocked word "${blocked}"`
  const american = others.find((token) => AMERICAN_WORDS.has(token.toLowerCase()))
  if (american) return `the American word "${american}"`
  const unknown = others.find((token) => !isKnown(token))
  return unknown ? `the unknown word "${unknown}"` : null
}
