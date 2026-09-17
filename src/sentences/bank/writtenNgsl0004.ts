import type { BankEntry } from '../bank'

// The fourth batch of sentences for the first 1000 NGSL words, in the order of the NGSL rank. Our own work (CC0).
// The NGSL has American spellings, for example "toward". The bank gives no sentence to such a word, because the rule
// for British English does not allow it in a sentence. The British word is "towards".
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NGSL_0004_BANK: readonly BankEntry[] = [
  {
    word: 'remain',
    sentences: [
      'Remain in your seat until the bell rings.',
      'Only three cakes remain, because we ate the rest.',
      'The snow will remain on the hill until the spring.',
    ],
  },
  { word: 'top', sentences: ['Put the book on top of the pile.', 'The top of the hill is flat.', 'She climbed to the top of the tree.'] },
  {
    word: 'among',
    sentences: [
      'The cat hid among the tall plants.',
      'Share the sweets among the four children.',
      'My house is among the trees at the end of the road.',
    ],
  },
  {
    word: 'win',
    sentences: [
      'Our team will win the game if we score.',
      'She hopes to win the race.',
      'You cannot win every time, and sometimes you lose.',
    ],
  },
  {
    word: 'involve',
    sentences: [
      'The game will involve every child in the class.',
      'The job does involve hard work.',
      'Do not involve me in your game, because I want to read.',
    ],
  },
  {
    word: 'reach',
    sentences: [
      'I cannot reach the shelf, because it is too high.',
      'We will reach the top of the hill before lunch.',
      'Reach out your hand and take the cup.',
    ],
  },
  {
    word: 'social',
    sentences: [
      'The school has a social club after lessons.',
      'A dog is a social animal, and it likes company.',
      'We play games together at the social meeting.',
    ],
  },
  {
    word: 'period',
    sentences: [
      'The lesson lasts for one period of forty minutes.',
      'For a short period the rain stopped.',
      'In that period of history, people rode horses.',
    ],
  },
  {
    word: 'across',
    sentences: ['We walked across the bridge to the other side.', 'The dog ran across the road.', 'Draw a line across the page.'],
  },
  { word: 'note', sentences: ['Write a note to remind me.', 'The teacher sent a note to my parents.', 'Make a note of the page number.'] },
  {
    word: 'create',
    sentences: [
      'We create a picture with paint and paper.',
      'The builder will create a new room.',
      'You can create a story from your own ideas.',
    ],
  },
  {
    word: 'along',
    sentences: [
      'We walked along the river to the bridge.',
      'Move along the seat, so I can sit down.',
      'Trees grow along the side of the road.',
    ],
  },
  { word: 'type', sentences: ['What type of animal is a fish?', 'This type of bread is soft.', 'Type your name on the computer.'] },
  {
    word: 'political',
    sentences: [
      'The political leader spoke to the people.',
      'A political party wants to win the vote.',
      'The political news is about the leaders of the country.',
    ],
  },
  {
    word: 'free',
    sentences: [
      'The books in the library are free, and you pay nothing.',
      'I am free after school, so we can play.',
      'The bird was free to fly away when we opened the door.',
    ],
  },
  {
    word: 'moment',
    sentences: ['Wait a moment, and I will be ready.', 'At that moment the door opened.', 'For one moment I forgot your name.'],
  },
  {
    word: 'policy',
    sentences: [
      'The school policy says that every child wears a coat outside.',
      'The school policy is a rule for every child and every teacher.',
      'Our policy is to be kind to everyone.',
    ],
  },
  {
    word: 'require',
    sentences: [
      'The plants require water every day.',
      'The game does require four players.',
      'You require a ticket before you get on the train.',
    ],
  },
  {
    word: 'wait',
    sentences: ['Wait here until I come back.', 'We wait for the bus every morning.', 'Do not wait, because the shop closes soon.'],
  },
  {
    word: 'general',
    sentences: [
      'The general idea is good, but the detail is wrong.',
      'In general, most children like fruit, but a few do not.',
      'The general was the leader of the army.',
    ],
  },
  {
    word: 'easy',
    sentences: [
      'The sum was easy, and I finished it quickly.',
      'It is easy to ride a bike when you learn.',
      'The easy road is flat, and the hard road goes up.',
    ],
  },
  {
    word: 'sense',
    sentences: [
      'Use your sense of smell to find the flower.',
      'The sentence does not make sense.',
      'She has the good sense to wear a coat in the rain.',
    ],
  },
  { word: 'add', sentences: ['Add two and three to make five.', 'Add some milk to the cake mix.', 'Add your name to the list.'] },
  {
    word: 'produce',
    sentences: [
      'The farm will produce milk and eggs.',
      'Trees produce fruit in the summer.',
      'The workers produce cars in the big building.',
    ],
  },
  {
    word: 'sell',
    sentences: [
      'The shop will sell bread and cakes.',
      'I will sell my old bike for ten pounds.',
      'They sell fruit at the market on Saturday.',
    ],
  },
  {
    word: 'agree',
    sentences: [
      'I agree with you, because you are right.',
      'We agree to share the sweets.',
      'My friends do not agree about the best film.',
    ],
  },
  {
    word: 'law',
    sentences: [
      'The law says that a car must stop at a red light.',
      'It is against the law to steal.',
      'A new law will keep the river clean.',
    ],
  },
  {
    word: 'everything',
    sentences: ['Everything in the box is mine.', 'She ate everything on her plate.', 'Everything was wet after the rain.'],
  },
  {
    word: 'research',
    sentences: [
      'We research the life of a bird for our project.',
      'The doctor does research about a new medicine.',
      'My research shows that plants need light.',
    ],
  },
  {
    word: 'cover',
    sentences: ['Cover the cake, so the flies do not touch it.', 'The snow will cover the field.', 'The cover of the book is red.'],
  },
  {
    word: 'human',
    sentences: [
      'A human is a person, and not an animal.',
      'The human body has two arms and two legs.',
      'A dog can hear better than a human.',
    ],
  },
  {
    word: 'situation',
    sentences: [
      'The situation was difficult, because we had no map.',
      'In this situation, the best plan is to wait.',
      'The situation got better after the rain stopped.',
    ],
  },
  {
    word: 'staff',
    sentences: [
      'The staff of the shop are the people who work there.',
      'The school staff include the teachers and the cook.',
      'A member of staff will help you to find the book.',
    ],
  },
  {
    word: 'major',
    sentences: ['The major problem is the broken wheel.', 'A major road goes through the town.', 'The major part of the work is finished.'],
  },
  {
    word: 'someone',
    sentences: ['Someone left a bag on the bus.', 'I need someone to help me carry this box.', 'Someone is at the door.'],
  },
  {
    word: 'above',
    sentences: ['The picture hangs above the desk.', 'The sky above us was full of stars.', 'The shelf above the sink holds the cups.'],
  },
  {
    word: 'sometimes',
    sentences: [
      'Sometimes I walk to school, and sometimes I take the bus.',
      'It sometimes rains in the summer.',
      'Sometimes she is late, but she is often early.',
    ],
  },
  {
    word: 'choose',
    sentences: [
      'Choose the book that you want to read.',
      'You can choose between the red one and the blue one.',
      'I choose fruit instead of sweets.',
    ],
  },
  {
    word: 'die',
    sentences: ['A plant will die without water.', 'The fire will die if you do not add wood.', 'The old tree did die in the cold winter.'],
  },
  {
    word: 'himself',
    sentences: ['He made the cake himself, with no help.', 'The boy hurt himself when he fell.', 'My brother can dress himself now.'],
  },
  {
    word: 'strong',
    sentences: ['The strong man lifted the heavy box.', 'A strong wind blew the leaves away.', 'Drink milk to make your bones strong.'],
  },
  {
    word: 'rise',
    sentences: ['The sun will rise in the morning.', 'The bread will rise in the hot oven.', 'The river will rise after the heavy rain.'],
  },
  {
    word: 'maybe',
    sentences: [
      'Maybe it will rain, so take your coat.',
      'Maybe I will come, but I am not sure.',
      'Maybe the answer is five, or maybe it is six.',
    ],
  },
  { word: 'else', sentences: ['Is there anything else in the bag?', 'Somebody else took my pen.', 'What else do you want to eat?'] },
  { word: 'please', sentences: ['Please close the door.', 'Say please when you ask for something.', 'The gift will please my mother.'] },
  {
    word: 'difference',
    sentences: [
      'The difference between five and three is two.',
      'Can you see the difference between the two pictures?',
      'A small change can make a big difference.',
    ],
  },
  {
    word: 'health',
    sentences: ['Fruit is good for your health.', 'The doctor asked about my health.', 'Sport and sleep keep you in good health.'],
  },
  {
    word: 'step',
    sentences: ['Take one step forward.', 'The first step is to wash your hands.', 'She sat on the top step of the stairs.'],
  },
  {
    word: 'themselves',
    sentences: [
      'The children made the cakes themselves.',
      'The cats wash themselves after dinner.',
      'My parents painted the room themselves.',
    ],
  },
]
