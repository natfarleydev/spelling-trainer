import { describe, expect, it } from 'vitest'
import { BLOCKED_WORDS, hardFilterReason, NAMES, type FilterTools } from './hardFilter'

const KNOWN = new Set(['we', 'eat', 'when', 'are', 'hungry', 'likes', 'the', 'is', 'good', 'a', 'colour', 'and', 'with', 'my'])
const tools: FilterTools = { isKnown: (word) => KNOWN.has(word.toLowerCase()) }

describe('hardFilterReason', () => {
  it('passes a good sentence', () => {
    expect(hardFilterReason('We eat food when we are hungry.', 'food', tools)).toBeNull()
  })

  it.each([
    ['not a whole sentence', 'we eat food when we are hungry', 'food'],
    ['too short', 'We eat food.', 'food'],
    ['too long', 'We eat food when we are hungry and we eat food when we are hungry and hungry.', 'hungry'],
    ['no keyword', 'We eat when we are hungry.', 'food'],
    ['the keyword two times', 'We eat food when we are hungry for food.', 'food'],
    ['a number', 'We eat food when we are 9 and hungry.', 'food'],
    ['an apostrophe', 'We eat food when we’re hungry.', 'food'],
    ['a quotation mark', 'We eat "food" when we are hungry.', 'food'],
    ['an ellipsis', 'We eat food... when we are hungry.', 'food'],
    ['an unknown word', 'We eat food when we are ravenous.', 'food'],
    ['an American spelling', 'We eat food with a color.', 'food'],
    ['a blocked word', 'We eat food and beer when we are hungry.', 'food'],
  ])('rejects a sentence with %s', (_, sentence, word) => {
    const known = { isKnown: (other: string) => KNOWN.has(other.toLowerCase()) || ['beer', 'color', 'for'].includes(other) }
    expect(hardFilterReason(sentence, word, known)).not.toBeNull()
  })

  it('accepts a name from the list of names', () => {
    expect(hardFilterReason('Tom likes the food when we are hungry.', 'food', tools)).toBeNull()
    expect(hardFilterReason('Muiriel likes the food when we are hungry.', 'food', tools)).not.toBeNull()
  })

  it('accepts the keyword in a different case', () => {
    expect(hardFilterReason('Food is good when we are hungry.', 'food', tools)).toBeNull()
  })
})

describe('the word lists', () => {
  it.each([
    ['NAMES', [...NAMES]],
    ['BLOCKED_WORDS', [...BLOCKED_WORDS]],
  ])('%s has each word one time', (_, words) => {
    expect(new Set(words.map((word) => word.toLowerCase())).size).toBe(words.length)
  })

  it('has names with a capital letter', () => {
    expect([...NAMES].filter((name) => !/^[A-Z][a-z]+$/.test(name))).toEqual([])
  })

  it('has blocked words in lowercase', () => {
    expect([...BLOCKED_WORDS].filter((word) => word !== word.toLowerCase())).toEqual([])
  })
})
