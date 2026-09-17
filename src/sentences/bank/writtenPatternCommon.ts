import type { BankEntry } from '../bank'

// Sentences for the common spelling pattern words of years 1 and 2 that Tatoeba does not cover. Our own work (CC0).
// These words are common, but they are abstract or they have many meanings, for example "well", "way" and "those".
// The mining of 2026-09-16 found only idioms and adult contexts for them. Each sentence here shows one meaning, and it
// gives a word that a child knows as the clue. src/sentences/bank.test.ts checks the rules.
export const WRITTEN_PATTERN_COMMON_BANK: readonly BankEntry[] = [
  {
    word: 'well',
    sentences: [
      'She sings well, and everyone likes her good voice.',
      'I did well in the test, and my work was better than before.',
      'Are you well, or are you still ill?',
    ],
  },
  {
    word: 'think',
    sentences: [
      'I think about the answer before I say it.',
      'Use your brain to think, and then tell me what you know.',
      'What do you think of my picture?',
    ],
  },
  {
    word: 'give',
    sentences: [
      'I give a gift to my friend, and she says thank you.',
      'Give the book to me, and I will take it.',
      'Please give me some help, because I cannot do it.',
    ],
  },
  {
    word: 'say',
    sentences: [
      'Say hello when you meet a new person.',
      'What did you say? I did not hear you.',
      'I always say thank you when someone helps me.',
    ],
  },
  {
    word: 'way',
    sentences: [
      'Show me the way to the park, because I do not know the road.',
      'This is the best way to make a cake.',
      'Is there another way to get home?',
    ],
  },
  { word: 'made', sentences: ['I made a cake, and my sister made a card.', 'This table is made of wood.', 'The rain made the road wet.'] },
  {
    word: 'came',
    sentences: [
      'She came to my house, and then we went to the park.',
      'Winter came, and the days got cold.',
      'I called my dog, and he came to me.',
    ],
  },
  {
    word: 'take',
    sentences: [
      'Take the bag and carry it to the car.',
      'Take one apple, and give the other one to your friend.',
      'I take the bus to school every morning.',
    ],
  },
  { word: 'like', sentences: ['I like cake, but I do not like fish.', 'A puppy looks like a small dog.', 'Do you like to sing?'] },
  {
    word: 'time',
    sentences: ['What time does the film start?', 'It is time for bed, so turn off the light.', 'I ran the race in a fast time.'],
  },
  {
    word: 'those',
    sentences: [
      'Those books on the shelf are mine, and these books are yours.',
      'I like those red shoes more than the other shoes.',
      'Those children over there are in my class.',
    ],
  },
  {
    word: 'each',
    sentences: ['Each child gets one book, and nobody gets two.', 'The two teams each have five players.', 'Give each person a plate.'],
  },
  {
    word: 'meant',
    sentences: [
      'I meant to say sorry, and then I said it.',
      'The red light meant that we had to stop.',
      'I did not want to hurt you, because I meant to help.',
    ],
  },
  {
    word: 'soon',
    sentences: [
      'The bus will come soon, so wait a little.',
      'Do it now, or the shop will close soon.',
      'Soon it will be dark, and then we go home.',
    ],
  },
  {
    word: 'took',
    sentences: ['I took the book from the shelf and read it.', 'She took my hand and we crossed the road.', 'The trip took one hour.'],
  },
  {
    word: 'good',
    sentences: [
      'The food was good, and I liked it.',
      'You did a good job, and your work is better than before.',
      'A good friend helps you when you are sad.',
    ],
  },
  {
    word: 'goes',
    sentences: ['The bus goes to town every hour.', 'My sister goes to school with me.', 'The road goes up the hill and then down again.'],
  },
  {
    word: 'now',
    sentences: ['Come now, because we are late.', 'Yesterday it was cold, but now it is warm.', 'Stop now, and do not do it again.'],
  },
  {
    word: 'right',
    sentences: [
      'Your answer is right, and it is not wrong.',
      'Turn right at the shop, and then go on.',
      'I write with my right hand, not my left hand.',
    ],
  },
  {
    word: 'while',
    sentences: [
      'I read a book while my brother played outside.',
      'Wait here for a while, and I will come back soon.',
      'While the cake was in the oven, we made the tea.',
    ],
  },
  {
    word: 'know',
    sentences: [
      'I know the answer, because I read the book.',
      'Do you know my brother? He is in your class.',
      'I did not know the way, so I asked.',
    ],
  },
  {
    word: 'little',
    sentences: [
      'A mouse is a little animal, and it is not big.',
      'Give me a little cake, but not a big piece.',
      'My little sister is younger than me.',
    ],
  },
  {
    word: 'always',
    sentences: [
      'I always brush my teeth before bed, every single night.',
      'She is always late, and she is never early.',
      'The sun always comes up in the morning.',
    ],
  },
  {
    word: 'other',
    sentences: [
      'One shoe is here, and the other shoe is under the bed.',
      'My other friend lives in another town.',
      'Some children like dogs, and other children like cats.',
    ],
  },
  {
    word: 'nothing',
    sentences: [
      'There is nothing in the box, because it is empty.',
      'I said nothing, because I did not know the answer.',
      'Nothing was left on the plate after dinner.',
    ],
  },
  {
    word: 'want',
    sentences: ['What do you want to eat for dinner?', 'I want more cake, but I do not need it.', 'If you want help, just ask me.'],
  },
  {
    word: 'world',
    sentences: [
      'The world is round, and it turns every day.',
      'People live in every part of the world.',
      'The tallest mountain in the world is very high.',
    ],
  },
  {
    word: 'worth',
    sentences: [
      'The old coin is worth a lot of money.',
      'This book is worth reading, because it is very good.',
      'A new bike is worth more than an old bike.',
    ],
  },
  {
    word: 'quite',
    sentences: [
      'The film was quite good, but it was not the best.',
      'It is quite late, so we must go home.',
      'I am quite sure, but I am not certain.',
    ],
  },
  {
    word: 'copier',
    sentences: [
      'A copier is like a printer, and it copies a page.',
      'Put the page in the copier, and press the button to print.',
      'The school has two machines: a copier and a printer.',
    ],
  },
]
