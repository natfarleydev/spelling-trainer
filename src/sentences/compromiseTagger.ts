import type { TagWord } from './wordType'

// The compromise methods that the adapter uses.
export type CompromiseLike = (text: string) => {
  json: () => ReadonlyArray<{ terms: ReadonlyArray<{ tags: readonly string[] }> }>
}

// Give the tags of the first term of the word. Give no tags for an empty word.
export const tagWithCompromise =
  (nlp: CompromiseLike): TagWord =>
  (word) =>
    nlp(word).json()[0]?.terms[0]?.tags ?? []

// The imperative shell: load the tagging build of compromise only when the app makes sentences.
// compromise/two is approximately 120 KB after gzip, so the first page does not load it.
export const loadCompromiseTagger = async (): Promise<TagWord> => {
  const { default: nlp } = await import('compromise/two')
  return tagWithCompromise(nlp)
}
