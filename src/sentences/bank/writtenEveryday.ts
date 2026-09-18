import type { BankEntry } from '../bank'

// Sentences for the days of the week and the months. Our own work (CC0).
// A teacher sets these words every term, but the other word sources leave them out, because they are proper nouns.
// Each sentence gives the place of the day or the month in the week or the year, or an event that a child knows.
// "May" and "March" are also common words. The bank keeps one list for each word, so the entry for "March" also has a
// sentence for the verb, and the entry for "May" joins these sentences with the sentences for the modal verb in
// writtenNgsl0001.ts. The teacher presses "New sentence" to find the other meaning.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_EVERYDAY_BANK: readonly BankEntry[] = [
  {
    word: 'Monday',
    sentences: [
      'Monday is the first day of the school week.',
      'After Sunday comes Monday, and the weekend ends.',
      'On Monday we get our spelling words for the week.',
    ],
  },
  {
    word: 'Tuesday',
    sentences: [
      'Tuesday comes after Monday and before Wednesday.',
      'We go swimming every Tuesday afternoon.',
      'The second day of the school week is Tuesday.',
    ],
  },
  {
    word: 'Wednesday',
    sentences: [
      'Wednesday is in the middle of the week, between Tuesday and Thursday.',
      'On Wednesday we play games in the afternoon.',
      'The day after Tuesday is Wednesday.',
    ],
  },
  {
    word: 'Thursday',
    sentences: [
      'Thursday comes after Wednesday and before Friday.',
      'Every Thursday my class goes to the library.',
      'Thursday is the day before the last day of the school week.',
    ],
  },
  {
    word: 'Friday',
    sentences: [
      'Friday is the last day of the school week.',
      'After Friday comes the weekend, with Saturday and Sunday.',
      'On Friday we have the spelling test.',
    ],
  },
  {
    word: 'Saturday',
    sentences: [
      'Saturday is the first day of the weekend.',
      'On Saturday we do not go to school.',
      'My football game is every Saturday morning.',
    ],
  },
  {
    word: 'Sunday',
    sentences: [
      'Sunday comes after Saturday, and then the week starts again.',
      'On Sunday my family eats a big dinner together.',
      'Sunday is the last day of the weekend.',
    ],
  },
  {
    word: 'January',
    sentences: [
      'January is the first month of the year.',
      'The new year begins in January, when it is cold.',
      'After December comes January, and the winter goes on.',
    ],
  },
  {
    word: 'March',
    sentences: [
      'March is the month after February, and the spring begins.',
      'In March the days get longer and warmer.',
      'March comes before April in the year.',
      'We march in a line to the hall, and we lift our feet.',
    ],
  },
  {
    word: 'April',
    sentences: [
      'April is the month after March, and the flowers grow.',
      'In April we have a school holiday for Easter.',
      'April comes before May in the year.',
    ],
  },
  {
    word: 'May',
    sentences: [
      'May is the month between April and June.',
      'In May the weather gets warm and the days are long.',
      'After April comes May, and then the summer is near.',
    ],
  },
  {
    word: 'June',
    sentences: [
      'June is the month when the summer starts.',
      'In June we have a sports day at school.',
      'June comes after May and before July.',
    ],
  },
  {
    word: 'July',
    sentences: [
      'July is a summer month, and the school holiday begins.',
      'In July the sun is hot and the days are long.',
      'July comes after June in the year.',
    ],
  },
  {
    word: 'August',
    sentences: [
      'August is the last month of the summer holiday.',
      'In August we go to the beach, because school is closed.',
      'August comes after July and before September.',
    ],
  },
  {
    word: 'September',
    sentences: [
      'September is the month when school starts again.',
      'In September the autumn begins and the leaves turn brown.',
      'September comes after August in the year.',
    ],
  },
  {
    word: 'October',
    sentences: [
      'October is an autumn month, and the nights get dark early.',
      'In October the leaves fall from the trees.',
      'October comes after September and before November.',
    ],
  },
  {
    word: 'November',
    sentences: [
      'November is the month before December, and it is cold.',
      'In November the month is wet, and the mornings are dark.',
      'November comes after October in the year.',
    ],
  },
  {
    word: 'December',
    sentences: [
      'December is the last month of the year.',
      'In December we have Christmas and a winter holiday.',
      'After November comes December, and then a new year starts.',
    ],
  },
]
