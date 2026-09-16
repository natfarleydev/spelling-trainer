import { NGSL_WORDS } from '../ngsl'
import { EXTRA_SIMPLE_WORDS } from '../simpleWords'
import { YEAR_1_COMMON_EXCEPTION_WORDS, YEAR_2_COMMON_EXCEPTION_WORDS } from './commonExceptionWords'
import { YEARS_3_AND_4, YEARS_5_AND_6 } from './ks2StatutoryWords'
import { ALL_PATTERN_WORDS } from './patternWords'

// Give the base form of a word. Example: "waited" gives "wait". The bank rules test uses compromise for this.
export type RootOf = (word: string) => string

// Our own reviewed list (CC0) of words that a child aged 7 to 11 in the UK knows, but that are not in the NGSL,
// the extra simple words or the spelling lists. Add a word only when a bank sentence needs it.
export const KNOWN_EXTRA_WORDS: readonly string[] = [
  'alike',
  'amazing',
  'apple',
  'astronaut',
  'balloon',
  'bark',
  'bench',
  'brave',
  'captain',
  'cart',
  'clap',
  'cotton',
  'drum',
  'english',
  'france',
  'french',
  'glue',
  'grandad',
  'homework',
  'hungry',
  'melt',
  'mum',
  'palace',
  'pet',
  'puppy',
  'purple',
  'queen',
  'saturday',
  'soup',
  'thief',
  'tidy',
  'tunnel',
]

// Pronouns, articles and other short forms. The NGSL gives only one form of some of these words.
export const FUNCTION_WORD_FORMS: readonly string[] = [
  'a',
  'an',
  'the',
  'i',
  'me',
  'my',
  'mine',
  'myself',
  'you',
  'your',
  'yours',
  'yourself',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'we',
  'us',
  'our',
  'ours',
  'ourselves',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'this',
  'that',
  'these',
  'those',
  'cannot',
]

export const NUMBER_WORDS: readonly string[] = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
  'hundred',
  'thousand',
  'million',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
]

// Irregular forms and their base forms.
const IRREGULAR_BASES: ReadonlyMap<string, string> = new Map([
  ['best', 'good'],
  ['better', 'good'],
  ['worse', 'bad'],
  ['worst', 'bad'],
  ['woke', 'wake'],
  ['woken', 'wake'],
  ['broke', 'break'],
  ['broken', 'break'],
  ['spoke', 'speak'],
  ['spoken', 'speak'],
  ['chose', 'choose'],
  ['chosen', 'choose'],
  ['stole', 'steal'],
  ['stolen', 'steal'],
  ['froze', 'freeze'],
  ['frozen', 'freeze'],
  ['hid', 'hide'],
  ['hidden', 'hide'],
  ['rode', 'ride'],
  ['ridden', 'ride'],
  ['wrote', 'write'],
  ['written', 'write'],
  ['bit', 'bite'],
  ['bitten', 'bite'],
  ['fell', 'fall'],
  ['fallen', 'fall'],
  ['ate', 'eat'],
  ['eaten', 'eat'],
  ['gave', 'give'],
  ['given', 'give'],
  ['took', 'take'],
  ['taken', 'take'],
  ['drove', 'drive'],
  ['driven', 'drive'],
  ['flew', 'fly'],
  ['flown', 'fly'],
  ['drew', 'draw'],
  ['drawn', 'draw'],
  ['grew', 'grow'],
  ['grown', 'grow'],
  ['threw', 'throw'],
  ['thrown', 'throw'],
  ['knew', 'know'],
  ['known', 'know'],
  ['wore', 'wear'],
  ['worn', 'wear'],
  ['tore', 'tear'],
  ['torn', 'tear'],
  ['swam', 'swim'],
  ['sang', 'sing'],
  ['sung', 'sing'],
  ['rang', 'ring'],
  ['rung', 'ring'],
  ['began', 'begin'],
  ['begun', 'begin'],
  ['ran', 'run'],
  ['sat', 'sit'],
  ['won', 'win'],
  ['done', 'do'],
  ['gone', 'go'],
  ['dug', 'dig'],
  ['stuck', 'stick'],
  ['caught', 'catch'],
  ['taught', 'teach'],
  ['bought', 'buy'],
  ['brought', 'bring'],
  ['thought', 'think'],
  ['fought', 'fight'],
  ['found', 'find'],
  ['held', 'hold'],
  ['fed', 'feed'],
  ['slept', 'sleep'],
  ['kept', 'keep'],
  ['swept', 'sweep'],
  ['left', 'leave'],
  ['meant', 'mean'],
  ['lost', 'lose'],
  ['sold', 'sell'],
  ['told', 'tell'],
  ['shot', 'shoot'],
  ['hung', 'hang'],
  ['men', 'man'],
  ['women', 'woman'],
  ['children', 'child'],
  ['feet', 'foot'],
  ['teeth', 'tooth'],
  ['mice', 'mouse'],
  ['geese', 'goose'],
  ['people', 'person'],
  ['lives', 'life'],
  ['knives', 'knife'],
  ['leaves', 'leaf'],
  ['wolves', 'wolf'],
  ['halves', 'half'],
  ['shelves', 'shelf'],
  ['thieves', 'thief'],
])

const MINIMUM_STEM_LENGTH = 2

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

// Give the stem with one letter less when the stem ends in a doubled consonant. Example: "runn" gives "run".
const undoubled = (stem: string): readonly string[] => {
  const last = stem.at(-1) ?? ''
  return stem.length > MINIMUM_STEM_LENGTH && last === stem.at(-2) && !VOWELS.has(last) ? [stem.slice(0, -1)] : []
}

// Give the stem, the stem with "e" and the stem with no doubled consonant. Example: "shin" gives "shin" and "shine".
const stemForms = (stem: string): readonly string[] => [stem, `${stem}e`, ...undoubled(stem)]

type SuffixRule = { readonly suffix: string; readonly bases: (stem: string) => readonly string[] }

const SUFFIX_RULES: readonly SuffixRule[] = [
  { suffix: 'ies', bases: (stem) => [`${stem}y`] },
  { suffix: 'ied', bases: (stem) => [`${stem}y`] },
  { suffix: 'ier', bases: (stem) => [`${stem}y`] },
  { suffix: 'iest', bases: (stem) => [`${stem}y`] },
  { suffix: 'ily', bases: (stem) => [`${stem}y`] },
  { suffix: 'iness', bases: (stem) => [`${stem}y`] },
  { suffix: 'es', bases: (stem) => [stem] },
  { suffix: 's', bases: (stem) => [stem] },
  { suffix: 'ing', bases: stemForms },
  { suffix: 'ed', bases: stemForms },
  { suffix: 'er', bases: stemForms },
  { suffix: 'est', bases: stemForms },
  { suffix: 'en', bases: stemForms },
  { suffix: 'y', bases: stemForms },
  { suffix: 'ful', bases: (stem) => [stem] },
  { suffix: 'less', bases: (stem) => [stem] },
  { suffix: 'ness', bases: (stem) => [stem] },
  { suffix: 'ment', bases: (stem) => [stem] },
  { suffix: 'ical', bases: (stem) => [`${stem}ic`] },
  { suffix: 'al', bases: (stem) => [stem] },
  { suffix: 'ly', bases: (stem) => [stem] },
]

const directBases = (word: string): readonly string[] => [
  ...(IRREGULAR_BASES.has(word) ? [IRREGULAR_BASES.get(word) ?? ''] : []),
  ...SUFFIX_RULES.filter(({ suffix }) => word.endsWith(suffix) && word.length - suffix.length >= MINIMUM_STEM_LENGTH).flatMap(
    ({ suffix, bases }) => bases(word.slice(0, -suffix.length)),
  ),
]

// Give the possible base forms of a word, with one more step for words with two suffixes. Example: "drawings" gives
// "drawing" and "draw". Some bases are not real words. That is not a problem, because we look up each base.
export const candidateBases = (word: string): readonly string[] => {
  const lower = word.toLowerCase()
  const first = directBases(lower)
  return [...new Set([...first, ...first.flatMap(directBases)])].filter((base) => base !== lower && base.length > 0)
}

const KNOWN_WORDS: ReadonlySet<string> = new Set(
  [
    ...NGSL_WORDS,
    ...EXTRA_SIMPLE_WORDS,
    ...KNOWN_EXTRA_WORDS,
    ...FUNCTION_WORD_FORMS,
    ...NUMBER_WORDS,
    ...YEAR_1_COMMON_EXCEPTION_WORDS,
    ...YEAR_2_COMMON_EXCEPTION_WORDS,
    ...YEARS_3_AND_4,
    ...YEARS_5_AND_6,
    ...ALL_PATTERN_WORDS,
  ].map((word) => word.toLowerCase()),
)

// A word is known when the word, its root or one of its candidate bases is in the known word lists.
export const isKnownWord = (word: string, rootOf: RootOf): boolean =>
  [word.toLowerCase(), rootOf(word).toLowerCase(), ...candidateBases(word)].some((form) => KNOWN_WORDS.has(form))
