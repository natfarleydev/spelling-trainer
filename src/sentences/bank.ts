import { COMMON_EXCEPTION_WORDS_BANK } from './bank/commonExceptionWords'
import { TATOEBA_0001_BANK } from './bank/tatoeba0001'
import { TATOEBA_0002_BANK } from './bank/tatoeba0002'
import { TATOEBA_0003_BANK } from './bank/tatoeba0003'
import { TATOEBA_0004_BANK } from './bank/tatoeba0004'
import { WRITTEN_CONCRETE_BANK } from './bank/writtenConcrete'
import { WRITTEN_PATTERN_BANK } from './bank/writtenPattern'
import { YEARS_3_AND_4_BANK } from './bank/years3And4'
import { YEARS_5_AND_6_BANK } from './bank/years5And6'

// Sentences that help a child to understand the meaning of a word. src/sentences/bank.test.ts has the rules.
export type BankEntry = {
  readonly word: string
  readonly sentences: readonly string[]
}

// A sentence from Tatoeba (https://tatoeba.org, CC BY 2.0 FR). The id finds the sentence on Tatoeba.
export type TatoebaSentence = {
  readonly id: number
  readonly text: string
  // True when we changed the sentence, for example when we expanded "don't" to "do not".
  readonly changed?: true
}

export type TatoebaEntry = {
  readonly word: string
  readonly sentences: readonly TatoebaSentence[]
}

// The app uses only the text. The data files keep the ids for the provenance.
export const toBankEntries = (entries: readonly TatoebaEntry[]): readonly BankEntry[] =>
  entries.map(({ word, sentences }) => ({ word, sentences: sentences.map(({ text }) => text) }))

// Join the entries of the same word, so that the bank has each word one time.
// The sentences keep their order, and a sentence that is already in the entry does not go in again.
export const mergeEntries = (...lists: readonly (readonly BankEntry[])[]): readonly BankEntry[] => {
  const merged = new Map<string, BankEntry>()
  for (const { word, sentences } of lists.flat()) {
    const key = word.toLowerCase()
    const current = merged.get(key)
    merged.set(
      key,
      current
        ? { ...current, sentences: [...current.sentences, ...sentences.filter((sentence) => !current.sentences.includes(sentence))] }
        : { word, sentences },
    )
  }
  return [...merged.values()]
}

// All the Tatoeba batches, in the order of the mining.
export const TATOEBA_ENTRIES: readonly TatoebaEntry[] = [
  ...TATOEBA_0001_BANK,
  ...TATOEBA_0002_BANK,
  ...TATOEBA_0003_BANK,
  ...TATOEBA_0004_BANK,
]

export const BANK_ENTRIES: readonly BankEntry[] = mergeEntries(
  COMMON_EXCEPTION_WORDS_BANK,
  YEARS_3_AND_4_BANK,
  YEARS_5_AND_6_BANK,
  toBankEntries(TATOEBA_ENTRIES),
  WRITTEN_CONCRETE_BANK,
  WRITTEN_PATTERN_BANK,
)

const SENTENCES_BY_WORD: ReadonlyMap<string, readonly string[]> = new Map(
  BANK_ENTRIES.map((entry) => [entry.word.toLowerCase(), entry.sentences]),
)

// Give the bank sentences of a word, or an empty list when the bank has no sentences for it.
export const bankSentences = (word: string): readonly string[] => SENTENCES_BY_WORD.get(word.trim().toLowerCase()) ?? []
