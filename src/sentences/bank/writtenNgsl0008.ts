import type { BankEntry } from '../bank'

// The eighth batch of sentences for the first 1000 NGSL words, in the order of the NGSL rank. Our own work (CC0).
// An abstract word of this batch has a word vector that is near its own word family and near the words of an adult
// subject. Example: "organise" is 0.70 from "prepare" but only 0.14 from "school", and "bill" is 0.83 from
// "legislation" but only 0.34 from "ten". Each sentence takes the clue from that family and keeps the subject simple.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NGSL_0008_BANK: readonly BankEntry[] = [
  {
    word: 'statement',
    sentences: [
      'The teacher read a statement about the school trip.',
      'Write a statement that tells what happened.',
      'His statement was true, and everyone agreed.',
    ],
  },
  {
    word: 'link',
    sentences: ['There is a link between rain and green grass.', 'The link in the chain broke.', 'Click the link to open the page.'],
  },
  {
    word: 'despite',
    sentences: ['Despite the rain, we played outside.', 'She won the race despite her sore leg.', 'Despite the cold, the flowers grew.'],
  },
  {
    word: 'introduce',
    sentences: [
      'Let me introduce my friend to you.',
      'The teacher will introduce a new subject today.',
      'Introduce yourself when you meet a new person.',
    ],
  },
  {
    word: 'ready',
    sentences: [
      'Are you ready to go to school?',
      'The dinner is ready, so come to the table.',
      'Get ready for the race, because it starts soon.',
    ],
  },
  {
    word: 'marry',
    sentences: [
      'My aunt will marry her friend in the summer.',
      'When two people marry, they become husband and wife.',
      'My aunt will marry in the summer, and then she will be a wife.',
    ],
  },
  {
    word: 'strike',
    sentences: [
      'Do not strike the ball too hard.',
      'The big clock will strike the hour with a loud sound.',
      'Strike the drum with the stick.',
    ],
  },
  {
    word: 'mile',
    sentences: [
      'The road goes on for one mile, and a mile is a long distance.',
      'A mile is longer than a metre.',
      'The beach is three miles from my house, and each mile takes time.',
    ],
  },
  {
    word: 'seek',
    sentences: [
      'The dog will seek the ball in the long grass.',
      'We seek an answer to the hard question.',
      'Seek help when you do not understand.',
    ],
  },
  {
    word: 'unit',
    sentences: [
      'A unit is one part of a group, and the company has three units.',
      'Our class works in a unit of five children.',
      'Each unit of the book has five lessons.',
    ],
  },
  {
    word: 'quickly',
    sentences: [
      'Run quickly, or we will miss the bus.',
      'She finished her work quickly and then rested.',
      'The rain stopped quickly, and the sun came out.',
    ],
  },
  {
    word: 'interview',
    sentences: [
      'The teacher had an interview with my parents.',
      'In an interview a person answers many questions.',
      'She had an interview for the job at the shop.',
    ],
  },
  {
    word: 'release',
    sentences: [
      'Release the bird, and let it fly away.',
      'The shop will release the new game, and then people can buy it.',
      'The teacher will release the class when the bell rings, and the children can go.',
    ],
  },
  {
    word: 'tax',
    sentences: [
      'People pay tax, and the money pays for roads and schools.',
      'The tax on the shop goods makes the price higher.',
      'Every worker pays tax from the money that they earn.',
    ],
  },
  {
    word: 'specific',
    sentences: [
      'Give me a specific answer, and not a general one.',
      'This specific book is the one that I want.',
      'Be specific about the time of the meeting.',
    ],
  },
  {
    word: 'fear',
    sentences: [
      'My fear of the dark went away when I got older.',
      'There is no fear when you know the way.',
      'A loud noise can bring fear to a small child.',
    ],
  },
  { word: 'aim', sentences: ['Aim the ball at the goal.', 'My aim is to read ten books this year.', 'Take careful aim before you throw.'] },
  {
    word: 'degree',
    sentences: [
      'A right angle has ninety degrees, and each degree is a small turn.',
      'My sister studies at college for a degree.',
      'One degree of heat is a small step on the scale.',
    ],
  },
  {
    word: 'husband',
    sentences: [
      'The husband of my aunt is my uncle.',
      'A husband and a wife live in the same house.',
      'Her husband cooks the dinner every night.',
    ],
  },
  {
    word: 'access',
    sentences: ['The steps give access to the top floor.', 'We have access to the library every day.', 'A key gives access to the room.'],
  },
  {
    word: 'movement',
    sentences: [
      'The movement of the train made me sleepy.',
      'A small movement of the curtain showed that the window was open.',
      'The movement of the clouds tells us the way of the wind.',
    ],
  },
  {
    word: 'treat',
    sentences: [
      'Treat a sick person with care, like a doctor.',
      'The doctor will treat the cut on my knee.',
      'A cake at the weekend is a special treat.',
    ],
  },
  {
    word: 'identify',
    sentences: [
      'Can you identify the bird by its song?',
      'Identify your bag by the name on the label.',
      'The teacher will identify the children who need help.',
    ],
  },
  {
    word: 'loss',
    sentences: [
      'The loss of the game made the team sad.',
      'The loss of my key was a problem.',
      'After the loss of the old tree, we planted a new one.',
    ],
  },
  {
    word: 'shall',
    sentences: ['Shall we go to the park now?', 'I shall finish my work before dinner.', 'We shall see the film tomorrow.'],
  },
  {
    word: 'treatment',
    sentences: [
      'The treatment from the doctor made me well.',
      'The treatment of animals must be kind.',
      'This treatment will take one week.',
    ],
  },
  {
    word: 'conference',
    sentences: [
      'The teachers had a conference about the new plan.',
      'At the conference many people gave a talk.',
      'The conference lasted two days.',
    ],
  },
  {
    word: 'yourself',
    sentences: [
      'Look at yourself in the mirror.',
      'Make the cake yourself, and do not ask for help.',
      'Be proud of yourself when you work hard.',
    ],
  },
  {
    word: 'express',
    sentences: [
      'Express your idea in a short sentence.',
      'The express train is faster than the other trains.',
      'Her face did express her surprise.',
    ],
  },
  {
    word: 'indicate',
    sentences: [
      'The sign will indicate the way to the beach.',
      'A dark cloud can indicate rain.',
      'Please indicate your answer with a mark.',
    ],
  },
  {
    word: 'attend',
    sentences: [
      'Every child must attend school.',
      'My parents will attend the school play.',
      'She could not attend the party, because she was ill.',
    ],
  },
  {
    word: 'investment',
    sentences: [
      'An investment of time in practice makes you better.',
      'The new library is an investment in the children.',
      'My parents made an investment to pay for college.',
    ],
  },
  {
    word: 'organise',
    sentences: [
      'We organise the trip, and we prepare the food.',
      'The teacher will organise the class into four groups, and she will invite the parents.',
      'Organise your work and prepare your bag before school.',
    ],
  },
  {
    word: 'beyond',
    sentences: [
      'The farm is beyond the hill, and you cannot see it.',
      'The ball went beyond the fence into the field.',
      'This sum is beyond me, because it is too hard.',
    ],
  },
  {
    word: 'potential',
    sentences: [
      'She has the potential to be a great runner.',
      'The plan has the potential to work well.',
      'Every child has potential, and a teacher helps it to grow.',
    ],
  },
  {
    word: 'relation',
    sentences: [
      'The relation between two things shows how one relates to the other.',
      'My cousin is a relation, because she is in my family.',
      'There is a relation between rain and the growth of plants.',
    ],
  },
  {
    word: 'file',
    sentences: [
      'Keep your work in a file, so the pages stay together.',
      'The teacher has a file for each child.',
      'Put the letter in the file on the shelf.',
    ],
  },
  {
    word: 'bar',
    sentences: [
      'A bar of chocolate is in the shop near the door.',
      'The gate has a metal bar across it.',
      'Hold the bar with both hands when you climb.',
    ],
  },
  {
    word: 'suffer',
    sentences: [
      'The plants suffer pain from the cold, and they die.',
      'A person with a serious illness can suffer, so the doctor helps.',
      'Do not let the animals suffer in the cold.',
    ],
  },
  {
    word: 'strategy',
    sentences: [
      'Our strategy for the game is to pass the ball quickly.',
      'A good strategy helps you to win.',
      'The strategy of the plan is simple: work together.',
    ],
  },
  {
    word: 'deep',
    sentences: [
      'The water in the pond is deep, so do not swim.',
      'He dug a deep hole in the garden.',
      'The deep voice of my uncle is easy to hear.',
    ],
  },
  {
    word: 'tend',
    sentences: [
      'Children tend to grow quickly in the summer.',
      'I tend to forget my lunch on a Monday.',
      'We tend the plants in the school garden.',
    ],
  },
  {
    word: 'advance',
    sentences: [
      'The team will advance to the next round of the cup.',
      'In advance of the trip, we packed our bags.',
      'The soldiers advance across the field.',
    ],
  },
  {
    word: 'network',
    sentences: [
      'The railway network joins the towns.',
      'A network of paths crosses the park, like the networks of roads.',
      'The television network sends the programme to every home.',
    ],
  },
  {
    word: 'generally',
    sentences: [
      'Generally the weather is warm in the summer.',
      'I generally walk to school, but today I took the bus.',
      'Generally the shop is open until six.',
    ],
  },
  {
    word: 'match',
    sentences: [
      'We watched the football match on Saturday.',
      'Find the shoe that is a match for this one, and make a pair.',
      'Our team will play the last match of the cup.',
    ],
  },
  {
    word: 'seat',
    sentences: ['Take your seat before the film starts.', 'The seat of the chair is soft.', 'There is one empty seat on the bus.'],
  },
  {
    word: 'normal',
    sentences: [
      'It is normal to feel tired after a long walk.',
      'A normal school day starts at nine.',
      'The weather is back to normal after the storm.',
    ],
  },
  {
    word: 'goal',
    sentences: [
      'She scored the winning goal in the last minute.',
      'My goal is to read every book in the series.',
      'The goal of the game is to get the ball in the net.',
    ],
  },
  {
    word: 'associate',
    sentences: [
      'The associate of the director works in the same office.',
      'I associate with my friends at school, and we play together.',
      'She is a close associate of the manager.',
    ],
  },
  {
    word: 'option',
    sentences: [
      'You have one option: finish the work now.',
      'The second option is to go by bus.',
      'Every option on the list costs the same.',
    ],
  },
  {
    word: 'message',
    sentences: ['I left a message for my mother on the table.', 'The message on the sign says stop.', 'Send a message to your friend.'],
  },
  {
    word: 'instance',
    sentences: [
      'Give me an instance of a kind act, for instance helping a friend.',
      'In this instance the answer is five.',
      'There was one instance of rain in the whole month.',
    ],
  },
  {
    word: 'refer',
    sentences: ['Refer to the map when you are lost.', 'The teacher will refer to page ten.', 'I refer to my notes when I forget.'],
  },
  {
    word: 'assume',
    sentences: [
      'We must not assume the answer, and we cannot be sure.',
      'I assume that you are ready.',
      'I assume that you are ready, and therefore we can leave.',
    ],
  },
  {
    word: 'theory',
    sentences: [
      'A theory is an idea that we must test, like a hypothesis.',
      'The theory of a scientist explains how a thing works.',
      'The theory explains why the sky is blue.',
    ],
  },
  {
    word: 'propose',
    sentences: [
      'I propose a plan, and then we agree it.',
      'The teacher will propose a new proposal for the trip.',
      'What do you propose that we do next?',
    ],
  },
  {
    word: 'adult',
    sentences: [
      'An adult is a person who is fully grown.',
      'Every child must come with an adult.',
      'The adult birds feed the young birds.',
    ],
  },
  {
    word: 'document',
    sentences: ['The document has the rules of the club.', 'Keep the document in a safe place.', 'Sign the document at the bottom.'],
  },
  {
    word: 'obviously',
    sentences: [
      'Obviously she is tired, and she certainly needs sleep.',
      'The answer is obviously right, and I really know it.',
      'The answer is obviously five.',
    ],
  },
  {
    word: 'bill',
    sentences: [
      'The bill in the restaurant shows what we must pay.',
      'My father paid the bill for the water.',
      'The bill was ten pounds, and we paid the price of the meal.',
    ],
  },
  {
    word: 'search',
    sentences: [
      'We search the room for the lost key.',
      'The search for the dog lasted two hours.',
      'Search the box, and you will find the toy.',
    ],
  },
]
