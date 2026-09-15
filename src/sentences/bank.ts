import { COMMON_EXCEPTION_WORDS_BANK } from './bank/commonExceptionWords'
import { YEARS_3_AND_4_BANK } from './bank/years3And4'
import { YEARS_5_AND_6_BANK } from './bank/years5And6'

// Sentences that help a child to understand the meaning of a word. src/sentences/bank.test.ts has the rules.
export type BankEntry = {
  readonly word: string
  readonly sentences: readonly string[]
}

export const BANK_ENTRIES: readonly BankEntry[] = [
  ...COMMON_EXCEPTION_WORDS_BANK,
  ...YEARS_3_AND_4_BANK,
  ...YEARS_5_AND_6_BANK,
]

const SENTENCES_BY_WORD: ReadonlyMap<string, readonly string[]> = new Map(
  BANK_ENTRIES.map((entry) => [entry.word.toLowerCase(), entry.sentences]),
)

// Give the bank sentences of a word, or an empty list when the bank has no sentences for it.
export const bankSentences = (word: string): readonly string[] => SENTENCES_BY_WORD.get(word.trim().toLowerCase()) ?? []
