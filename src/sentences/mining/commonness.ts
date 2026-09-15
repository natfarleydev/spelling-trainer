// How well a young child knows a word, from 0 to 1. GDEX uses it to prefer sentences with the most common words.
// The value comes from the rank of the word in the NGSL (1 is the most frequent word).

export type CommonnessTools = {
  // The NGSL rank of a lowercase word, or undefined when the word is not in the NGSL.
  readonly rankOf: (word: string) => number | undefined
  // The possible base forms of a lowercase word. Example: "dogs" gives "dog".
  readonly bases: (word: string) => readonly string[]
  // Names that a child can read, for example "Tom".
  readonly names: ReadonlySet<string>
}

// The commonness for each rank band, most frequent first.
const RANK_BANDS: readonly { readonly maximumRank: number; readonly commonness: number }[] = [
  { maximumRank: 500, commonness: 1 },
  { maximumRank: 1000, commonness: 0.85 },
  { maximumRank: 2000, commonness: 0.6 },
  { maximumRank: Infinity, commonness: 0.45 },
]

// The commonness of a known word that is not in the NGSL, for example a word from the spelling lists.
const NO_RANK_COMMONNESS = 0.4

export const makeCommonness =
  ({ rankOf, bases, names }: CommonnessTools) =>
  (word: string): number => {
    if (names.has(word)) return 1
    const lower = word.toLowerCase()
    const ranks = [lower, ...bases(lower)].map(rankOf).filter((rank): rank is number => rank !== undefined)
    if (ranks.length === 0) return NO_RANK_COMMONNESS
    const best = Math.min(...ranks)
    return RANK_BANDS.find(({ maximumRank }) => best <= maximumRank)?.commonness ?? NO_RANK_COMMONNESS
  }
