import type { BankEntry } from '../bank'

// The last batch of sentences for the first 1000 NGSL words. Our own work (CC0).
// After this batch each word source of WORD-COVERAGE.md is complete: every word that a teacher can set from the lists
// has 3 sentences or more.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NGSL_0009_BANK: readonly BankEntry[] = [
  {
    word: 'unclear',
    sentences: [
      'The writing was unclear, so I could not read it.',
      'If the answer is unclear, ask the teacher.',
      'The picture is unclear, because the glass is dirty.',
    ],
  },
  {
    word: 'anyway',
    sentences: [
      'It rained, but we went out anyway.',
      'I do not like the film, and it is too long anyway.',
      'Anyway, let us talk about something else.',
    ],
  },
  {
    word: 'speech',
    sentences: [
      'The head teacher gave a speech at the end of the year.',
      'Her speech was short and clear.',
      'We use speech to tell other people our ideas.',
    ],
  },
  {
    word: 'officer',
    sentences: [
      'A police officer helps people in the street.',
      'The officer showed us the way to the station.',
      'An officer in the army leads the soldiers.',
    ],
  },
  {
    word: 'throughout',
    sentences: [
      'It rained throughout the day, from morning to night.',
      'The story is funny throughout the book.',
      'Throughout the year the tree changes.',
    ],
  },
  { word: 'oil', sentences: ['We cook the chips in hot oil.', 'Put oil on the chain of your bike.', 'Oil floats on the top of water.'] },
  {
    word: 'guess',
    sentences: [
      'Guess the number that I am thinking.',
      'My guess was wrong, because the answer was five.',
      'I guess that the film starts at seven.',
    ],
  },
  {
    word: 'fun',
    sentences: [
      'We had fun at the party, and it was really funny.',
      'The game was fun, and everyone laughed.',
      'Swimming in the sea is fun in the summer.',
    ],
  },
  {
    word: 'protect',
    sentences: [
      'A coat will help to protect you from the rain.',
      'Sun cream helps to protect your skin.',
      'The dog will protect the house.',
    ],
  },
  {
    word: 'resource',
    sentences: [
      'Water is an important resource for a farm.',
      'The library is a good resource for your project.',
      'We must not waste a resource like paper.',
    ],
  },
  {
    word: 'disease',
    sentences: [
      'The doctor helps a person with a disease.',
      'A disease can make a plant turn brown.',
      'Clean hands stop a disease from moving to another person.',
    ],
  },
  {
    word: 'balance',
    sentences: [
      'Balance the book on your head.',
      'She lost her balance and fell off the bike.',
      'The balance of the scales shows the weight.',
    ],
  },
  {
    word: 'basis',
    sentences: [
      'The basis of the plan is that we work together.',
      'On the basis of the facts, the answer is five.',
      'Trust is the basis of a good friendship.',
    ],
  },
  {
    word: 'basic',
    sentences: ['The basic rule is to take turns.', 'We learn the basic sums first.', 'A basic meal of bread and cheese is enough.'],
  },
  {
    word: 'encourage',
    sentences: [
      'My parents encourage me to read every day.',
      'A kind word will encourage a friend.',
      'The teacher will encourage the class to try again.',
    ],
  },
  {
    word: 'operate',
    sentences: [
      'The machine does not operate when the switch is off.',
      'The doctor will operate on the broken leg, and the machine will help.',
      'Show me how to operate the computer.',
    ],
  },
  {
    word: 'reflect',
    sentences: [
      'The water will reflect the trees like a mirror.',
      'Reflect on your work, and think how to improve it.',
      'The glass will reflect the light.',
    ],
  },
  {
    word: 'useful',
    sentences: [
      'A map is useful when you are lost.',
      'This useful tool helps to open the box.',
      'Her advice was useful, and it solved my problem.',
    ],
  },
  {
    word: 'income',
    sentences: [
      'The income of the shop is the money that it takes.',
      'My sister has a small income from her job.',
      'The income pays for the food and the house.',
    ],
  },
  {
    word: 'previous',
    sentences: [
      'The previous owner of our house painted the door.',
      'In the previous lesson we learned about plants.',
      'My previous bike was smaller than this one.',
    ],
  },
  {
    word: 'okay',
    sentences: ['Are you okay, or are you sorry that you fell?', 'I am glad that you are okay.', 'It is okay to make a mistake.'],
  },
  {
    word: 'earn',
    sentences: ['You earn money when you work.', 'She will earn a prize for her good work.', 'How much do you earn in one hour?'],
  },
  { word: 'post', sentences: ['Put the letter in the post.', 'The post comes every morning.', 'Post the card to your grandmother.'] },
  {
    word: 'define',
    sentences: ['Define the word, and tell me what it means.', 'The rules define what we can do.', 'Can you define the shape of a circle?'],
  },
  {
    word: 'conclusion',
    sentences: [
      'At the conclusion of the story the dog comes home.',
      'My conclusion is that the plan will work.',
      'We came to the conclusion that the answer is five.',
    ],
  },
  {
    word: 'perform',
    sentences: [
      'The children will perform a play for the parents.',
      'She will perform a song on the stage.',
      'The machine can perform the same task every day.',
    ],
  },
  {
    word: 'mine',
    sentences: [
      'The coal comes from a mine under the ground.',
      'The workers in the mine dig for iron under the ground.',
      'The old mine gave iron to the factory.',
    ],
  },
  {
    word: 'debate',
    sentences: [
      'We had a debate about the best film.',
      'In a debate two sides give their reasons.',
      'The class debate was a discussion about the school uniform.',
    ],
  },
  {
    word: 'memory',
    sentences: [
      'I have a happy memory, and my memories of the holiday are clear.',
      'My memory of the day is clear.',
      'The computer has a large memory for pictures.',
    ],
  },
  {
    word: 'object',
    sentences: [
      'The object on the table is a small box that you can see.',
      'I object to the rule, and I say that it is not fair.',
      'The object of the game is the goal that the players want.',
    ],
  },
  {
    word: 'maintain',
    sentences: [
      'We maintain the garden, so it stays tidy.',
      'Maintain your bike, and it will last.',
      'She will maintain her speed to the end of the race.',
    ],
  },
  {
    word: 'ring',
    sentences: [
      'The bell will ring at the end of the lesson.',
      'She wears a gold ring on her finger.',
      'Ring me on the phone when you get home.',
    ],
  },
  {
    word: 'discover',
    sentences: [
      'We discover new animals in the deep sea.',
      'Discover the answer by reading the book.',
      'I did discover my lost key under the bed.',
    ],
  },
  {
    word: 'dead',
    sentences: [
      'The dead leaves fell from the tree in the autumn.',
      'The plant is dead, because it had no water.',
      'The old tree is dead, and it will not grow again.',
    ],
  },
  {
    word: 'extend',
    sentences: [
      'Extend your arm to reach the shelf.',
      'We will extend the house with a new room.',
      'Extend the line to the edge of the page.',
    ],
  },
  {
    word: 'direction',
    sentences: [
      'Which direction is the beach: this way or the opposite way?',
      'Follow the direction of the sign, and keep moving that way.',
      'The wind changed direction in the night.',
    ],
  },
  {
    word: 'facility',
    sentences: [
      'The sports facility has a pool and a large hall.',
      'The new facility for music opens next week.',
      'The school has a facility where we can cook.',
    ],
  },
  {
    word: 'screen',
    sentences: [
      'The screen of the computer shows the picture.',
      'We watched the film on a big screen.',
      'A screen at the window keeps the flies outside.',
    ],
  },
  {
    word: 'track',
    sentences: [
      'The train runs on the track.',
      'We track the weather every day for our project.',
      'Follow the track through the wood to the farm.',
    ],
  },
  {
    word: 'responsibility',
    sentences: [
      'It is my responsibility to feed the cat, and I am responsible for her.',
      'A leader has the responsibility to help the team.',
      'Take responsibility for your own work.',
    ],
  },
  {
    word: 'nor',
    sentences: [
      'I do not like fish, nor do I like meat.',
      'Neither the cat nor the dog was in the garden.',
      'She did not laugh, nor did she smile.',
    ],
  },
  {
    word: 'university',
    sentences: [
      'My sister studies at a university after college.',
      'A university teaches older students.',
      'He went to university to study science.',
    ],
  },
  {
    word: 'easily',
    sentences: ['She won the race easily, because she is fast.', 'The box opens easily.', 'I can easily finish before lunch.'],
  },
  {
    word: 'agency',
    sentences: ['The agency helps people to find a job.', 'A travel agency plans a holiday.', 'The agency sent a letter about the house.'],
  },
  {
    word: 'dollar',
    sentences: [
      'A dollar is the money of some countries.',
      'One dollar is worth less than one pound.',
      'The book costs one dollar in that shop.',
    ],
  },
  {
    word: 'ahead',
    sentences: ['The bus is ahead of us on the road.', 'Look ahead when you walk.', 'We are ahead in the game by two goals.'],
  },
  { word: 'cross', sentences: ['Cross the road at the lights.', 'Draw a cross on the map.', 'She was cross, because I broke her cup.'] },
  {
    word: 'yeah',
    sentences: ['Yeah means yes when we speak to a friend.', 'Yeah, I will come to the park.', 'She said yeah, and then she smiled.'],
  },
  {
    word: 'candidate',
    sentences: [
      'Each candidate for class leader gave a speech.',
      'The candidate hopes to win the vote.',
      'She is a candidate for the team.',
    ],
  },
  {
    word: 'legal',
    sentences: ['It is legal to ride a bike on this path.', 'A legal rule comes from the law.', 'The legal age to drive is seventeen.'],
  },
  {
    word: 'proposal',
    sentences: [
      'My proposal is that we play outside.',
      'The proposal for a new park was agreed.',
      'She wrote a proposal for the school trip.',
    ],
  },
  {
    word: 'conversation',
    sentences: [
      'We had a conversation about the holiday, and we talked for an hour.',
      'A conversation needs two people to talk and listen.',
      'Their conversation lasted one hour.',
    ],
  },
  {
    word: 'somebody',
    sentences: ['Somebody left a bag on the bus.', 'Somebody must feed the cat.', 'I need somebody to help me with this box.'],
  },
  {
    word: 'welcome',
    sentences: [
      'Welcome to our school, and we hope that you enjoy the day.',
      'The teacher gave a warm welcome to the new child.',
      'You are welcome to join our game.',
    ],
  },
  {
    word: 'communication',
    sentences: [
      'A letter is one kind of communication.',
      'Good communication means that people understand each other.',
      'The communication between the two schools is by letter.',
    ],
  },
  {
    word: 'agent',
    sentences: [
      'A travel agent is a person who the shop hired to plan a holiday.',
      'The agent sells houses for other people.',
      'An agent works for another person.',
    ],
  },
  {
    word: 'traditional',
    sentences: [
      'Fish and chips is a traditional meal, and it is a custom in our country.',
      'The traditional dance is very old.',
      'We keep the traditional song at Christmas.',
    ],
  },
  {
    word: 'replace',
    sentences: [
      'Replace the old book with a new one on the shelf.',
      'We must replace the broken window.',
      'A new player will replace the one who is ill.',
    ],
  },
  {
    word: 'herself',
    sentences: ['She made the cake herself.', 'The cat washes herself in the sun.', 'My sister dressed herself this morning.'],
  },
  { word: 'suddenly', sentences: ['Suddenly the door opened.', 'The rain stopped suddenly.', 'He suddenly remembered the answer.'] },
  {
    word: 'generation',
    sentences: [
      'My grandmother is from an older generation.',
      'Each generation of a family learns from the one before.',
      'The new generation of phones is faster.',
    ],
  },
  {
    word: 'estimate',
    sentences: [
      'My estimate is that fifty people came.',
      'Estimate the number of sweets in the jar.',
      'The estimate for the work is one week.',
    ],
  },
]
