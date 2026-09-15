import { buildDeck, type Deck } from './deck'

// A saved presentation. Change schemaVersion when the stored format changes.
export type Presentation = {
  readonly schemaVersion: 1
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
}

export const createPresentation = ({ id, createdAt, words }: NewPresentation): Presentation => ({
  schemaVersion: 1,
  id,
  createdAt,
  words,
  deck: buildDeck(words),
})

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

// Make sure that stored data has the correct format before the app uses it.
export const isPresentation = (value: unknown): value is Presentation =>
  isRecord(value) &&
  value.schemaVersion === 1 &&
  typeof value.id === 'string' &&
  typeof value.createdAt === 'string' &&
  Array.isArray(value.words) &&
  value.words.every((word) => typeof word === 'string') &&
  Array.isArray(value.deck) &&
  value.deck.every((slide) => isRecord(slide) && typeof slide.word === 'string')
