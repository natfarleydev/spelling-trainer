import type { BankEntry } from '../bank'

// The fifth batch of sentences for the first 1000 NGSL words, in the order of the NGSL rank. Our own work (CC0).
// Some words of this batch are for adults, for example "economic", "organisation" and "percent". A teacher can still
// set them, so each sentence gives a subject that a child knows: a school, a shop, a club or the weather.
// The sentence for a word about the end of life keeps to a plant or a tree, for example "kill" and "death".
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NGSL_0005_BANK: readonly BankEntry[] = [
  {
    word: 'date',
    sentences: [
      'Write the date at the top of your page.',
      'What date is the school trip?',
      'The date on the milk shows when it is old.',
    ],
  },
  {
    word: 'model',
    sentences: [
      'I made a model of a boat from wood.',
      'The model of the town shows every street.',
      'She is a model student, and everyone copies her work.',
    ],
  },
  {
    word: 'raise',
    sentences: [
      'Raise your hand if you know the answer.',
      'The shop will raise the price, so the bread will cost more.',
      'We will raise money for the school.',
    ],
  },
  {
    word: 'customer',
    sentences: [
      'The customer paid for the bread at the shop.',
      'The shop keeper helps every customer.',
      'A happy customer will come back again.',
    ],
  },
  {
    word: 'front',
    sentences: [
      'Stand at the front of the queue.',
      'The front of the house has a red door.',
      'The teacher writes on the board at the front of the class.',
    ],
  },
  {
    word: 'explain',
    sentences: [
      'Explain the rules of the game to me.',
      'The teacher will explain the sum again.',
      'Can you explain why you are late?',
    ],
  },
  {
    word: 'outside',
    sentences: [
      'We play outside when the weather is dry.',
      'The cat sleeps outside in the garden.',
      'It is cold outside, so wear your coat.',
    ],
  },
  {
    word: 'economic',
    sentences: [
      'The economic news is about money and jobs.',
      'The town has an economic problem, because the factory closed.',
      'An economic plan will save money for the school.',
    ],
  },
  {
    word: 'site',
    sentences: [
      'The building site has sand and stone.',
      'This site is the place for the new school.',
      'We visit the site of the old castle.',
    ],
  },
  {
    word: 'land',
    sentences: ['The farmer works on his land.', 'The land near the river is wet.', 'The plane will land in an hour.'],
  },
  {
    word: 'sign',
    sentences: [
      'Sign your name at the bottom of the letter.',
      'The road sign shows the way to the beach.',
      'A dark cloud is a sign of rain.',
    ],
  },
  {
    word: 'claim',
    sentences: [
      'You can claim your prize at the desk.',
      'I claim that my answer is right.',
      'The claim was true, and she proved it.',
    ],
  },
  {
    word: 'relationship',
    sentences: [
      'The relationship between the two friends is strong.',
      'A brother and a sister have a family relationship.',
      'The relationship between rain and plants is important.',
    ],
  },
  {
    word: 'death',
    sentences: [
      'The death of the old tree made the garden empty.',
      'After the death of the plant, we grew a new one.',
      'The story tells about the death of a king many years ago.',
    ],
  },
  {
    word: 'nice',
    sentences: [
      'That is a nice picture, and I like the colours.',
      'She is a nice person, and she is kind to everyone.',
      'We had a nice day at the beach.',
    ],
  },
  {
    word: 'amount',
    sentences: [
      'A small amount of salt makes the food better.',
      'The amount of water in the cup is very little.',
      'Count the amount of money in your pocket.',
    ],
  },
  {
    word: 'regard',
    sentences: [
      'I regard my teacher as a kind person.',
      'With regard to your letter, the answer is yes.',
      'She has a high regard for her friend.',
    ],
  },
  {
    word: 'organisation',
    sentences: [
      'The organisation is a group of people with the same plan.',
      'A club is a small organisation, and each member pays.',
      'The organisation of the trip was the work of one group.',
    ],
  },
  {
    word: 'couple',
    sentences: [
      'A couple of children were late.',
      'The couple walked along the beach.',
      'I need a couple of minutes to finish.',
    ],
  },
  {
    word: 'act',
    sentences: [
      'The children will act in the school play.',
      'It was a kind act to help the old man.',
      'Act quickly, because the fire is hot.',
    ],
  },
  {
    word: 'quality',
    sentences: [
      'The quality of the work is high, and it has no mistakes.',
      'This coat is good quality, and it will last for years.',
      'Kindness is a good quality in a friend.',
    ],
  },
  {
    word: 'project',
    sentences: [
      'Our class project is a plan of work about animals.',
      'I finished my project, and the teacher liked my work.',
      'The project will take three weeks.',
    ],
  },
  {
    word: 'accord',
    sentences: [
      'The two friends are in accord, and they agree.',
      'Of my own accord, I washed the plates.',
      'The plan is in accord with the rules.',
    ],
  },
  {
    word: 'list',
    sentences: ['Write a list of the words for the test.', 'My list has ten things to buy.', 'Add milk to the shopping list.'],
  },
  {
    word: 'wish',
    sentences: ['I wish for a sunny day.', 'Make a wish before you eat the cake.', 'She got her wish, and the gift was perfect.'],
  },
  {
    word: 'fund',
    sentences: [
      'The fund will pay for the new books.',
      'We will fund the trip with the money that we raise.',
      'The school fund grows when we sell cakes.',
    ],
  },
  {
    word: 'rest',
    sentences: ['The rest of the cake is in the box.', 'Rest for a minute after the run.', 'I need rest, because I am tired.'],
  },
  {
    word: 'industry',
    sentences: [
      'The car industry makes cars in a big building.',
      'The town has a fishing industry by the sea.',
      'Industry gives work to many people.',
    ],
  },
  {
    word: 'education',
    sentences: [
      'A good education helps you to learn.',
      'The teacher works in education.',
      'Education begins at home and goes on at school.',
    ],
  },
  {
    word: 'kill',
    sentences: [
      'A cold night can kill the young plants in the garden.',
      'Too little water will kill the flower.',
      'The cold winter did kill the small tree.',
    ],
  },
  {
    word: 'serve',
    sentences: [
      'The cook will serve the dinner at six.',
      'Serve the food while it is hot.',
      'The shop keeper will serve the next person.',
    ],
  },
  {
    word: 'likely',
    sentences: [
      'It is likely to rain, so take your coat.',
      'She is likely to win, because she is fast.',
      'The most likely answer is five.',
    ],
  },
  {
    word: 'certainly',
    sentences: [
      'I will certainly come to your party.',
      'That is certainly the right answer.',
      'She certainly knows the way.',
    ],
  },
  {
    word: 'itself',
    sentences: [
      'The cat washes itself, and no other cat helps.',
      'The door opened by itself in the wind.',
      'The machine turns itself off at night.',
    ],
  },
  {
    word: 'teach',
    sentences: [
      'The teacher will teach us about plants.',
      'Teach me to swim, and I will learn quickly.',
      'I teach my dog to sit.',
    ],
  },
  {
    word: 'security',
    sentences: [
      'A lock gives security to your bike.',
      'The security of the building keeps everyone safe.',
      'The guard at the gate is there for security.',
    ],
  },
  {
    word: 'benefit',
    sentences: [
      'The benefit of sport is good health.',
      'A benefit of the new road is a shorter trip.',
      'Sleep will benefit your health.',
    ],
  },
  {
    word: 'risk',
    sentences: [
      'There is a risk of rain, so take a coat.',
      'Do not risk a fall on the wet floor.',
      'The risk of a cold is high in the winter.',
    ],
  },
  {
    word: 'news',
    sentences: [
      'The news says that the weather will be wet.',
      'I have good news about the test.',
      'The news on the radio told us about the storm.',
    ],
  },
  {
    word: 'standard',
    sentences: [
      'The standard of the work is high.',
      'The standard size of the paper is the same for everyone.',
      'Her work is above the standard for the class.',
    ],
  },
  {
    word: 'vote',
    sentences: [
      'We vote for the best story in the class.',
      'Every person can vote for the leader.',
      'My vote goes to the red team.',
    ],
  },
  {
    word: 'percent',
    sentences: [
      'Ten percent of the class was ill.',
      'Fifty percent is the same as a half.',
      'The shop takes twenty percent off the price.',
    ],
  },
  {
    word: 'focus',
    sentences: [
      'Focus on your work, and do not look away.',
      'The focus of the lesson is spelling.',
      'Focus your eyes on the small print.',
    ],
  },
  {
    word: 'stage',
    sentences: [
      'The children stood on the stage to sing.',
      'The first stage of the plan is easy.',
      'The play has a big stage with lights.',
    ],
  },
  {
    word: 'realise',
    sentences: [
      'I realise now that I was wrong, and I wish I had listened.',
      'Did you realise that you wish for the same thing as me?',
      'She did not realise the time, and now she wishes she had left.',
    ],
  },
  {
    word: 'data',
    sentences: [
      'The data shows that most children like fruit.',
      'We collect data about the weather every day.',
      'Put the data in a table.',
    ],
  },
  {
    word: 'single',
    sentences: ['A single apple was left in the bowl.', 'Not a single child was late.', 'She ate every single sweet.'],
  },
  {
    word: 'chance',
    sentences: [
      'There is a chance of rain today.',
      'Give me a chance to try again.',
      'By chance, I met my friend in the shop.',
    ],
  },
  {
    word: 'society',
    sentences: [
      'Our society helps people to live together.',
      'The reading society meets every week.',
      'In our society, children go to school.',
    ],
  },
  {
    word: 'technology',
    sentences: [
      'New technology helps doctors to work.',
      'The technology in a phone is very good, and it helps us.',
      'We use technology in the computer lesson.',
    ],
  },
]
