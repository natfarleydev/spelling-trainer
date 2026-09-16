import type { BankEntry } from '../bank'

// Sentences for spelling-pattern words that do not have 3 good Tatoeba sentences. Our own work (CC0).
// The vetting of the pattern words (2026-09-16) found only idioms for some words, for example "take it down a notch",
// "bear with me" or "high school". Each sentence here shows the meaning of the word. src/sentences/bank.test.ts checks the rules.
export const WRITTEN_PATTERN_BANK: readonly BankEntry[] = [
  { word: 'buzz', sentences: ['The bees buzz around the flowers in the sun.', 'I can hear a fly buzz near the window.'] },
  { word: 'catches', sentences: ['She catches the ball with both hands.'] },
  { word: 'hunted', sentences: ['The cat hunted a mouse in the long grass.'] },
  { word: 'under', sentences: ['The cat sleeps under my bed.'] },
  { word: 'dare', sentences: ['I did not dare to look down from the tall tree.'] },
  {
    word: 'hutch',
    sentences: ['The frisky rabbit ran into its little hutch.', 'We clean the hutch where the frisky rabbit sleeps.'],
  },
  {
    word: 'honk',
    sentences: ['Cars honk with a loud noise when the road is blocked.', 'The driver gave a loud honk to warn us.'],
  },
  {
    word: 'notch',
    sentences: ['Cut a small notch in the stick with a knife.', 'Cut a notch in the edge of the wood to mark it.'],
  },
  {
    word: 'grander',
    sentences: ['The enormous palace is grander than our little house.', 'This hall is grander and nicer than the old one.'],
  },
  {
    word: 'grandest',
    sentences: ['This is the nicest and grandest hotel in the city.', 'The grandest building of all was the famous pyramid.'],
  },
  {
    word: 'freshest',
    sentences: ['This fruit is the freshest and most delicious in the shop.', 'The freshest bread has the best smell and taste.'],
  },
  {
    word: 'rule',
    sentences: ['The first rule of the game is to be fair.', 'A rule tells you what you can and cannot do.'],
  },
  { word: 'hurt', sentences: ['I fell over and hurt my knee.', 'It hurt badly when I fell on my arm.'] },
  { word: 'burst', sentences: ['The balloon burst with a loud noise.', 'The bag was so full that it burst open.'] },
  { word: 'chief', sentences: ['Rain is the chief reason we stayed at home.', 'The chief cook decides what the kitchen makes.'] },
  { word: 'high', sentences: ['The wall is too high for me to climb.', 'The plane flew high above the clouds.'] },
  {
    word: 'bear',
    sentences: ['A bear is a big animal with thick black hair.', 'A big black bear walked slowly through the trees.'],
  },
  {
    word: 'phonics',
    sentences: ['In phonics we teach the sound of each letter.', 'Phonics helps us practise the letters of the alphabet.'],
  },
  { word: 'frisky', sentences: ['The frisky dog is playful and never lazy.', 'The frisky puppy is silly and full of fun.'] },
  {
    word: 'farmyard',
    sentences: ['The farmyard was full of hens and pigs.', 'We fed the sheep and the pig in the farmyard.'],
  },
  {
    word: 'blackberry',
    sentences: ['A blackberry is a dark fruit, smaller than an apple.', 'We picked a blackberry and an apple from the garden.'],
  },
]
