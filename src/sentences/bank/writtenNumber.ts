import type { BankEntry } from '../bank'

// Sentences for the number words. Our own work (CC0).
// A child writes a number in words in a sum, a date and a story, so a teacher sets these words for a spelling test.
// A sentence gives the place of the number in the count, a sum, or a group of things that a child counts. Example:
// "Seven days make one week."
// The word vector of a number is near the other numbers, so the clue word of a sentence is another number.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NUMBER_BANK: readonly BankEntry[] = [
  {
    word: 'zero',
    sentences: [
      'Zero means none at all, and it is less than one.',
      'If you take one from one, you get zero.',
      'The score was zero, because nobody scored a goal.',
    ],
  },
  {
    word: 'one',
    sentences: [
      'One is the first number, and it comes before two.',
      'I have one apple, and my sister has two.',
      'Only one child can win the race.',
    ],
  },
  {
    word: 'three',
    sentences: [
      'Three comes after two and before four.',
      'Two and one make three.',
      'I have three pens: a red one, a blue one and a green one.',
    ],
  },
  {
    word: 'four',
    sentences: ['Four comes after three, and two and two make four.', 'A dog has four legs.', 'There are four children in my family.'],
  },
  { word: 'six', sentences: ['Six comes after five and before seven.', 'Half of twelve is six.', 'The cat had six baby kittens.'] },
  {
    word: 'seven',
    sentences: ['Seven days make one week.', 'Seven comes after six and before eight.', 'I was seven years old last year.'],
  },
  { word: 'nine', sentences: ['Nine comes after eight and before ten.', 'Three times three makes nine.', 'My brother is nine years old.'] },
  {
    word: 'ten',
    sentences: [
      'Ten comes after nine, and it is two times five.',
      'I have ten fingers on my two hands.',
      'We learn ten spelling words every week.',
    ],
  },
  {
    word: 'eleven',
    sentences: ['Eleven comes after ten and before twelve.', 'A football team has eleven players.', 'My sister is eleven years old.'],
  },
  {
    word: 'twelve',
    sentences: ['Twelve months make one year.', 'Twelve comes after eleven, and it is two more than ten.', 'A clock shows twelve hours.'],
  },
  {
    word: 'thirteen',
    sentences: ['Thirteen comes after twelve and before fourteen.', 'Ten and three make thirteen.', 'My cousin is thirteen years old.'],
  },
  {
    word: 'fourteen',
    sentences: [
      'Fourteen comes after thirteen, and it is two times seven.',
      'Ten and four make fourteen.',
      'Two weeks have fourteen days.',
    ],
  },
  {
    word: 'fifteen',
    sentences: ['Fifteen comes after fourteen and before sixteen.', 'Ten and five make fifteen.', 'The lesson lasts fifteen minutes.'],
  },
  {
    word: 'sixteen',
    sentences: [
      'Sixteen comes after fifteen, and it is two times eight.',
      'Ten and six make sixteen.',
      'There are sixteen children in the small class.',
    ],
  },
  {
    word: 'seventeen',
    sentences: [
      'Seventeen comes after sixteen and before eighteen.',
      'Ten and seven make seventeen.',
      'My sister will be seventeen next year.',
    ],
  },
  {
    word: 'eighteen',
    sentences: [
      'Eighteen comes after seventeen, and it is two times nine.',
      'Ten and eight make eighteen.',
      'Eighteen is one less than nineteen.',
    ],
  },
  {
    word: 'nineteen',
    sentences: ['Nineteen comes after eighteen and before twenty.', 'Ten and nine make nineteen.', 'Nineteen children came to the party.'],
  },
  {
    word: 'twenty',
    sentences: [
      'Twenty comes after nineteen, and it is two times ten.',
      'Twenty children are in my class.',
      'Twenty is ten more than ten.',
    ],
  },
  {
    word: 'thirty',
    sentences: ['Thirty is ten more than twenty.', 'There are thirty minutes in half an hour.', 'Thirty is three times ten.'],
  },
  { word: 'fifty', sentences: ['Fifty is five times ten.', 'Half of one hundred is fifty.', 'Fifty is ten more than forty.'] },
  { word: 'sixty', sentences: ['Sixty minutes make one hour.', 'Sixty is six times ten.', 'Sixty is ten more than fifty.'] },
  {
    word: 'seventy',
    sentences: ['Seventy is seven times ten.', 'Seventy is ten more than sixty.', 'My grandmother is seventy years old.'],
  },
  { word: 'eighty', sentences: ['Eighty is eight times ten.', 'Eighty is ten more than seventy.', 'The old man is eighty years old.'] },
  {
    word: 'ninety',
    sentences: [
      'Ninety is nine times ten, and it is ten less than one hundred.',
      'Ninety is ten more than eighty.',
      'The film lasts ninety minutes.',
    ],
  },
  { word: 'hundred', sentences: ['One hundred is ten times ten.', 'I counted to one hundred.', 'A hundred years is a very long time.'] },
  {
    word: 'thousand',
    sentences: ['One thousand is ten times one hundred.', 'A thousand people came to the show.', 'I have a thousand things to do today.'],
  },
  {
    word: 'million',
    sentences: ['One million is a thousand times a thousand.', 'A million is a very big number.', 'The city has one million people.'],
  },
  {
    word: 'fourth',
    sentences: [
      'The fourth child in the line comes after the third.',
      'April is the fourth month of the year.',
      'I came fourth in the race, after three other children.',
    ],
  },
  {
    word: 'seventh',
    sentences: ['The seventh day of the week is Sunday.', 'July is the seventh month of the year.', 'She came seventh in the race.'],
  },
  {
    word: 'ninth',
    sentences: [
      'The ninth child comes after the eighth.',
      'September is the ninth month of the year.',
      'He came ninth, and ten children ran.',
    ],
  },
  {
    word: 'tenth',
    sentences: ['The tenth child is the last of ten.', 'October is the tenth month of the year.', 'She came tenth in the race.'],
  },
]
