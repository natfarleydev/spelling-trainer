// The everyday words that a teacher sets every term, but that the other word sources do not have.
// Our own list (CC0). The NGSL, the statutory spelling lists and CYP-LEX leave out most of these words, because they
// are proper nouns. A child writes them in a diary, a letter and a date, so a teacher sets them for a spelling test.
// "February" is not in MONTH_WORDS of this file only for the word source: it is already a statutory word for years 3
// and 4. The test for the months uses ALL_MONTH_WORDS, which has all 12 months.

export const DAY_WORDS: readonly string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const ALL_MONTH_WORDS: readonly string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// The days and the months together. isKnownWord accepts these words, so another sentence can use them.
// Example: "We go swimming on Monday."
export const EVERYDAY_WORDS: readonly string[] = [...DAY_WORDS, ...ALL_MONTH_WORDS]
