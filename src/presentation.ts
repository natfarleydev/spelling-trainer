import { buildDeck, type Deck, type MakeSentence, type Slide } from './deck'
import { SENTENCE_SOURCES, type Sentence } from './sentences/sentence'
import { isWordAnalysis } from './sentences/wordType'

// A saved presentation. Change schemaVersion when the stored format changes.
// Version 1: slides have only the word. Version 2: slides also have an analysis and a sentence.
export type Presentation = {
  readonly schemaVersion: 1 | 2
  readonly id: string
  // The time in ISO 8601 format, in UTC.
  readonly createdAt: string
  readonly words: readonly string[]
  readonly deck: Deck
}

export type NewPresentation = {
  readonly id: string
  readonly createdAt: string
  readonly words: readonly string[]
  readonly makeSentence?: MakeSentence
}

export const createPresentation = ({ id, createdAt, words, makeSentence }: NewPresentation): Presentation => ({
  schemaVersion: 2,
  id,
  createdAt,
  words,
  deck: buildDeck(words, makeSentence),
})

// Give a new presentation with one slide replaced. Give the same presentation when the index is not a slide.
export const replaceSlide = (presentation: Presentation, index: number, slide: Slide): Presentation =>
  Number.isInteger(index) && index >= 0 && index < presentation.deck.length
    ? { ...presentation, deck: presentation.deck.map((current, i) => (i === index ? slide : current)) }
    : presentation

// Use our own month names, because different browsers give different short names. Example: "Sep" or "Sept".
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const NAME_WORD_COUNT = 3

// Give a name that the user can recognise. Example: "15 Sep 2026, 07:30 — because, friend, necessary…".
// If timeZone is undefined, use the time zone of the device.
export const presentationName = (presentation: Presentation, timeZone?: string): string => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date(presentation.createdAt))
      .map(({ type, value }) => [type, value]),
  )
  const date = `${Number(parts.day)} ${MONTHS[Number(parts.month) - 1]} ${parts.year}, ${parts.hour}:${parts.minute}`
  const words = presentation.words.slice(0, NAME_WORD_COUNT).join(', ')
  const more = presentation.words.length > NAME_WORD_COUNT ? '…' : ''
  return `${date} — ${words}${more}`
}

export const sortNewestFirst = (presentations: readonly Presentation[]): Presentation[] =>
  [...presentations].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

// 32 characters with no "l", "o", "0" or "1", because these are easy to confuse.
// 256 is a multiple of 32, so each character has the same probability.
const ID_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789'

// Make an id from random bytes. The shell gives the bytes, so that this function stays pure.
export const makeId = (bytes: Uint8Array): string =>
  Array.from(bytes, (byte) => ID_ALPHABET[byte % ID_ALPHABET.length]).join('')

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

const isSentence = (value: unknown): value is Sentence =>
  isRecord(value) &&
  typeof value.template === 'string' &&
  typeof value.text === 'string' &&
  (value.source === undefined || SENTENCE_SOURCES.some((source) => source === value.source))

const isSlide = (value: unknown): value is Slide =>
  isRecord(value) &&
  typeof value.word === 'string' &&
  (value.analysis === undefined || isWordAnalysis(value.analysis)) &&
  (value.sentence === undefined || isSentence(value.sentence))

// Make sure that stored data has the correct format before the app uses it.
export const isPresentation = (value: unknown): value is Presentation =>
  isRecord(value) &&
  (value.schemaVersion === 1 || value.schemaVersion === 2) &&
  typeof value.id === 'string' &&
  typeof value.createdAt === 'string' &&
  Array.isArray(value.words) &&
  value.words.every((word) => typeof word === 'string') &&
  Array.isArray(value.deck) &&
  value.deck.every(isSlide)
