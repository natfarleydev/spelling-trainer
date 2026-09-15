// One slide in the presentation. Later versions can add more slide types.
export type Slide = {
  readonly word: string
}

export type Deck = readonly Slide[]

// Make one slide for each word.
export const buildDeck = (words: readonly string[]): Deck => words.map((word) => ({ word }))
