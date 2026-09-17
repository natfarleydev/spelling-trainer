import type { BankEntry } from '../bank'

// The second batch of sentences for the first 1000 NGSL words, in the order of the NGSL rank. Our own work (CC0).
// Many of these words are abstract, and a word can have more than one meaning. Example: "state" is a condition and
// also a part of a country. Each sentence shows one meaning that a child meets.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NGSL_0002_BANK: readonly BankEntry[] = [
  {
    word: 'study',
    sentences: [
      'I study my spellings every night before the test.',
      'We study plants in our science lesson.',
      'She went to her room to study for the test.',
    ],
  },
  {
    word: 'follow',
    sentences: [
      'Follow me, and I will show you the way.',
      'The dog will follow you if you carry food.',
      'Follow the rules of the game, or you cannot play.',
    ],
  },
  {
    word: 'begin',
    sentences: [
      'The film will begin at seven, so do not be late.',
      'Begin at the top of the page and write down the answer.',
      'When the teacher says go, the race will begin.',
    ],
  },
  {
    word: 'since',
    sentences: ['I have been here since the morning.', 'Since it is raining, we will stay inside.', 'She has not eaten since lunch.'],
  },
  {
    word: 'bring',
    sentences: [
      'Bring your book to the lesson tomorrow.',
      'Please bring me a glass of water.',
      'The rain will bring water to the dry plants.',
    ],
  },
  {
    word: 'state',
    sentences: [
      'Tell me the state of your work: is it finished?',
      'The old house is in a bad state, and the roof lets in rain.',
      'Water in a frozen state is hard ice.',
    ],
  },
  {
    word: 'fact',
    sentences: [
      'It is a fact that the earth turns around the sun.',
      'Check the fact in a book before you say it.',
      'That is not a fact, because it is not true.',
    ],
  },
  {
    word: 'however',
    sentences: [
      'It was cold. However, we still went outside.',
      'I wanted to swim. However, the water was too cold.',
      'However hard I try, I cannot reach the shelf.',
    ],
  },
  {
    word: 'area',
    sentences: [
      'This area of the town has many houses and a park.',
      'This area of the field is wet.',
      'Wash the area around the cut on your arm.',
    ],
  },
  {
    word: 'provide',
    sentences: [
      'The school will provide a pen for every child.',
      'Trees provide cool air on a hot day.',
      'Parents provide food and a home for their children.',
    ],
  },
  {
    word: 'name',
    sentences: ['My name is on the front of my book.', 'What is the name of your dog?', 'Write your name at the top of the page.'],
  },
  {
    word: 'month',
    sentences: [
      'A month is longer than a week, and shorter than a year.',
      'A month has about thirty days.',
      'We wait one month for the next visit.',
    ],
  },
  {
    word: 'large',
    sentences: [
      'The large box is too heavy for one person.',
      'A large crowd waited outside the shop.',
      'Her feet are large, so she needs big shoes.',
    ],
  },
  {
    word: 'without',
    sentences: ['I went out without my coat, and I was cold.', 'You cannot live without water.', 'He left without a word.'],
  },
  {
    word: 'order',
    sentences: [
      'Put the words in order, from first to last.',
      'The teacher gave an order, and we followed it.',
      'We order our food, and then we wait.',
    ],
  },
  {
    word: 'issue',
    sentences: [
      'We have an issue with the computer, and it will not start.',
      'The issue is not important, so do not worry.',
      'The new issue of the paper comes out today.',
    ],
  },
  {
    word: 'market',
    sentences: [
      'We buy fruit at the market on Saturday.',
      'The market has many small shops in the street.',
      'My mother sells cakes at the market.',
    ],
  },
  {
    word: 'pay',
    sentences: [
      'I pay for my lunch with money.',
      'You must pay the fare before you get on the bus.',
      'The shop will not let you take food without pay.',
    ],
  },
  {
    word: 'service',
    sentences: [
      'The bus service stops at nine in the evening.',
      'The service in the restaurant was quick and kind.',
      'He gave good service, and he helped every person.',
    ],
  },
  {
    word: 'against',
    sentences: [
      'Do not lean against the wet wall.',
      'We played against the other school, and we won.',
      'The rain beat against the window.',
    ],
  },
  {
    word: 'second',
    sentences: [
      'Wait one second, and I will be ready.',
      'She came second in the race, after the winner.',
      'This is my second cake, because I ate one already.',
    ],
  },
  { word: 'yes', sentences: ['I said yes, because I wanted to come.', 'Yes, that answer is right.', 'Say yes or no, and do not wait.'] },
  {
    word: 'job',
    sentences: ['My job at home is to wash the plates.', 'Her job is to teach children.', 'He did a good job, and the work was perfect.'],
  },
  {
    word: 'plan',
    sentences: [
      'We made a plan for the trip.',
      'My plan is to finish my homework first.',
      'The plan did not work, so we tried another way.',
    ],
  },
  {
    word: 'result',
    sentences: ['The result of the game was a draw.', 'The road is wet as a result of the rain.', 'Check the result of your sum.'],
  },
  {
    word: 'away',
    sentences: ['The shop is far away from my house.', 'Put your toys away in the box.', 'The bird flew away over the trees.'],
  },
  {
    word: 'example',
    sentences: [
      'This picture is an example of good work.',
      'Give me an example of a hot drink.',
      'Follow the example at the top of the page.',
    ],
  },
  {
    word: 'happen',
    sentences: [
      'What will happen if I press the button?',
      'An accident can happen when you run inside.',
      'Tell me what did happen after I left.',
    ],
  },
  {
    word: 'offer',
    sentences: [
      'Thank you for your offer of help.',
      'The shop has a special offer on apples.',
      'I offer to help, and I give my time for free.',
    ],
  },
  {
    word: 'close',
    sentences: ['Close the door, because it is cold.', 'The shop will close at five.', 'Stand close to me, and do not go far.'],
  },
  {
    word: 'understand',
    sentences: [
      'I understand the question, so I can answer it.',
      'Read it again if you do not understand.',
      'Now I understand why she was sad.',
    ],
  },
  {
    word: 'thank',
    sentences: ['I thank my friend for the help.', 'Say thank you when you get a gift.', 'We thank the cook for the good dinner.'],
  },
  {
    word: 'far',
    sentences: [
      'The school is not far, and we walk there.',
      'The beach is far away, and the walk takes an hour.',
      'The bird flew far away over the sea.',
    ],
  },
  {
    word: 'student',
    sentences: [
      'Every student in the class has a book.',
      'The student asked the teacher a question.',
      'She is a good student, and she works hard.',
    ],
  },
  {
    word: 'face',
    sentences: [
      'Wash your face with soap and water.',
      'Her face was happy, and she had a big smile.',
      'Turn and face the front of the class.',
    ],
  },
  {
    word: 'idea',
    sentences: ['I have an idea for the story.', 'That is a good idea, and we will try it.', 'Tell me your idea for the game.'],
  },
  {
    word: 'cost',
    sentences: ['The book will cost five pounds.', 'How much does the ticket cost?', 'The cost of the trip is too high for me.'],
  },
  {
    word: 'less',
    sentences: [
      'I have less money than you, and I cannot buy it.',
      'Eat less sugar, because it is bad for your teeth.',
      'The small cup holds less water than the big cup.',
    ],
  },
  { word: 'until', sentences: ['Wait here until I come back.', 'The shop is open until six.', 'We played until it was dark.'] },
  {
    word: 'reason',
    sentences: ['The reason for the wait was the heavy rain.', 'Tell me the reason why you are late.', 'There is no reason to be afraid.'],
  },
  {
    word: 'form',
    sentences: [
      'Fill in the form with your name and your age.',
      'Water can form ice when it is very cold.',
      'The clouds form a dark shape in the sky.',
    ],
  },
  {
    word: 'spend',
    sentences: ['I spend my money on books.', 'We spend the summer by the sea.', 'Do not spend all your time on the computer.'],
  },
  {
    word: 'level',
    sentences: [
      'The water level in the river is high.',
      'Put the book on the same level as the shelf.',
      'This game has ten levels, and I am on level two.',
    ],
  },
  {
    word: 'person',
    sentences: [
      'Every person in the room stood up.',
      'She is a kind person, and she helps everyone.',
      'Only one person can sit on this chair.',
    ],
  },
  {
    word: 'member',
    sentences: ['Every member of the team wears the same shirt.', 'She is a member of the reading club.', 'A member of my family is ill.'],
  },
  {
    word: 'bad',
    sentences: ['The bad weather stopped the game.', 'I feel bad, because I made a mistake.', 'The milk is bad, and it smells.'],
  },
  {
    word: 'able',
    sentences: ['I am able to swim, and I can reach the other side.', 'Is she able to come to the party?', 'A bird is able to fly.'],
  },
  {
    word: 'support',
    sentences: ['The wall will support the roof of the house.', 'My parents support me when I am sad.', 'I support my team at every game.'],
  },
  {
    word: 'line',
    sentences: ['Draw a straight line with a ruler.', 'Stand in a line and wait your turn.', 'Write on the first line of the page.'],
  },
  {
    word: 'present',
    sentences: [
      'I gave her a present, and she opened the box.',
      'Every child was present, and nobody was away.',
      'The teacher will present the prize to the winner.',
    ],
  },
]
