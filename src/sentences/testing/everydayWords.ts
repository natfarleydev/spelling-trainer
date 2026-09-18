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

// The everyday nouns of a school, a home and a street that the other word sources leave out. Our own list (CC0).
// A teacher sets these words, because a child meets them every day. Each word has a word vector in
// public/data/word-vectors.bin, so a sentence for the word can pass the meaning rule.
// The words "sock", "fridge", "cooker", "mum", "headteacher", "crayon", "whiteboard", "playtime", "scissors",
// "cupboard", "toothbrush", "yoghurt", "pudding", "crisps", "hamster", "hedgehog", "badger", "aeroplane", "lorry",
// "scooter", "netball" and "rounders" wait for a session that can make the word vector file again: the file has no
// vector for them, and the GloVe download needs a network that a limited session does not have.
export const EVERYDAY_NOUN_WORDS: readonly string[] = [
  'classroom',
  'register',
  'assembly',
  'uniform',
  'homework',
  'ruler',
  'rubber',
  'glue',
  'bathroom',
  'garage',
  'stairs',
  'blanket',
  'pillow',
  'sandwich',
  'butter',
  'jam',
  'cereal',
  'pizza',
  'pasta',
  'salad',
  'sausage',
  'trousers',
  'glove',
  'trainers',
  'lion',
  'tiger',
  'snake',
  'spider',
  'frog',
  'penguin',
  'owl',
  'duck',
  'fog',
  'frost',
  'rainbow',
  'breeze',
  'leaf',
  'branch',
  'birthday',
  'grandfather',
  'tomorrow',
  'yesterday',
  'Easter',
  'purple',
  'teeth',
  'tractor',
  'helicopter',
  'railway',
  'cricket',
  'swimming',
  'skipping',
  'penny',
  'wallet',
]

// The days, the months and the everyday nouns together. isKnownWord accepts these words, so another sentence can use
// them. Example: "We go swimming on Monday." and "The frost made the grass white."
export const EVERYDAY_WORDS: readonly string[] = [...DAY_WORDS, ...ALL_MONTH_WORDS, ...EVERYDAY_NOUN_WORDS]
