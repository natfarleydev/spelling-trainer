import { tokenize } from './gdex'
import { NAMES } from './hardFilter'

// Tatoeba has many sentences that are almost the same. Example: "If I had enough money, I would buy that nice car."
// and "If I had enough money, I would buy the book." The teacher needs different sentences for a word.

// A sentence is almost the same as a picked sentence when this share of its three-word sequences are shared.
export const DIVERSITY_LIMIT = 0.4

const trigrams = (text: string): ReadonlySet<string> => {
  const tokens = tokenize(text).map((token) => (NAMES.has(token) ? 'NAME' : token.toLowerCase()))
  return new Set(tokens.slice(0, -2).map((token, index) => `${token} ${tokens[index + 1]} ${tokens[index + 2]}`))
}

// The share of the three-word sequences of the shorter sentence that are also in the other sentence.
export const trigramOverlap = (a: string, b: string): number => {
  const first = trigrams(a)
  const second = trigrams(b)
  const smaller = Math.min(first.size, second.size)
  if (smaller === 0) return 0
  return [...first].filter((trigram) => second.has(trigram)).length / smaller
}

// Pick a maximum of count items, in order. Skip an item that is almost the same as an item that is already picked.
export const pickDiverse = <T extends { readonly text: string }>(items: readonly T[], count: number): readonly T[] =>
  items.reduce<readonly T[]>(
    (picked, item) =>
      picked.length < count && picked.every((other) => trigramOverlap(item.text, other.text) < DIVERSITY_LIMIT)
        ? [...picked, item]
        : picked,
    [],
  )
