// A hand-labelled set to validate the context score. Our own work (CC0).
// For each word, a "good" sentence shows the meaning of the word, and a "poor" sentence is correct but does not.
// tools/mining/validateContext.ts must rank the good sentences above the poor sentences.

export type ContextLabel = {
  readonly word: string
  readonly good: string
  readonly poor: string
  // A poor sentence of a similar length, with a word that is related to the word. It does not show the meaning.
  readonly hardPoor: string
}

export const CONTEXT_LABELS: readonly ContextLabel[] = [
  {
    word: 'space',
    good: 'The astronaut flew into space in a rocket.',
    poor: 'There is some space on the table.',
    hardPoor: 'Tom and the other children had no space in the rocket museum.',
  },
  {
    word: 'food',
    good: 'We were hungry, so we ate some food.',
    poor: 'Tom put the food on the table.',
    hardPoor: 'Tom and his dog walked past the food in the kitchen.',
  },
  {
    word: 'rain',
    good: 'Take an umbrella, because the rain is heavy.',
    poor: 'Tom did not like the rain.',
    hardPoor: 'Mary talked about the rain with her friends at the park.',
  },
  {
    word: 'doctor',
    good: 'I was ill, so I went to see the doctor.',
    poor: 'Mary talked to the doctor yesterday.',
    hardPoor: 'The nurse waited in the room while Mary phoned the doctor.',
  },
  {
    word: 'teeth',
    good: 'Brush your teeth before you go to bed.',
    poor: 'Tom looked at his teeth.',
    hardPoor: 'At the dentist, Tom looked at the pictures of his teeth.',
  },
  {
    word: 'kitchen',
    good: 'Mum is cooking dinner in the kitchen.',
    poor: 'Tom went into the kitchen.',
    hardPoor: 'Mum and Dad went into the kitchen with the plates.',
  },
  {
    word: 'winter',
    good: 'It snows a lot in winter, so wear a warm coat.',
    poor: 'We will see you in winter.',
    hardPoor: 'Tom will see his friends in the snow park in winter.',
  },
  {
    word: 'library',
    good: 'I borrowed three books from the library.',
    poor: 'Mary was near the library.',
    hardPoor: 'Mary walked past the library with her new books.',
  },
  {
    word: 'hungry',
    good: 'I have not eaten all day, so I am very hungry.',
    poor: 'Tom said that he was hungry.',
    hardPoor: 'Tom was hungry, and he talked about his dinner.',
  },
  {
    word: 'sleep',
    good: 'I was very tired, so I went to sleep in my bed.',
    poor: 'Tom did not want to sleep.',
    hardPoor: 'Tom did not want to sleep in his bed at night.',
  },
  {
    word: 'swim',
    good: 'Fish swim in the water of the river.',
    poor: 'Tom can swim.',
    hardPoor: 'Tom wants to swim, and he likes the river.',
  },
  {
    word: 'bread',
    good: 'The baker makes fresh bread in the oven.',
    poor: 'Mary bought some bread.',
    hardPoor: 'Mary bought some bread and cheese at the shop.',
  },
  {
    word: 'ice',
    good: 'The pond froze, and the ice was very cold.',
    poor: 'Tom looked at the ice.',
    hardPoor: 'Tom and his friends looked at the ice near the snow.',
  },
  {
    word: 'bird',
    good: 'The bird flew out of its nest and sang.',
    poor: 'Mary saw a bird.',
    hardPoor: 'Mary saw a bird in the garden near the tree.',
  },
  {
    word: 'key',
    good: 'I used the key to unlock the door.',
    poor: 'Tom found a key.',
    hardPoor: 'Tom found a key near the door of the house.',
  },
  {
    word: 'milk',
    good: 'The farmer gets milk from the cows.',
    poor: 'Mary likes milk.',
    hardPoor: 'Mary put the milk next to the cow picture.',
  },
  {
    word: 'cold',
    good: 'Put on your coat, because it is cold outside.',
    poor: 'It was cold.',
    hardPoor: 'Tom said that the water was cold.',
  },
  {
    word: 'dentist',
    good: 'The dentist checked my teeth.',
    poor: 'Tom talked to the dentist.',
    hardPoor: 'Tom and his mum talked about the dentist and his teeth.',
  },
  {
    word: 'moon',
    good: 'At night, the moon shines in the dark sky.',
    poor: 'Tom looked at the moon.',
    hardPoor: 'Tom looked at the moon and the stars.',
  },
  {
    word: 'shoes',
    good: 'Put your shoes on your feet before you go outside.',
    poor: 'Mary bought new shoes.',
    hardPoor: 'Mary bought new shoes and socks at the shop.',
  },
  {
    word: 'train',
    good: 'We waited at the station for the train.',
    poor: 'Tom saw the train.',
    hardPoor: 'Tom saw the train near the station.',
  },
  {
    word: 'laugh',
    good: 'The joke was so funny that everyone started to laugh.',
    poor: 'Tom did not laugh.',
    hardPoor: 'Tom did not laugh at the funny film.',
  },
  {
    word: 'cry',
    good: 'The baby started to cry because it was hungry.',
    poor: 'Mary did not cry.',
    hardPoor: 'The baby did not cry when Mary smiled.',
  },
  {
    word: 'write',
    good: 'Use a pen to write your name on the paper.',
    poor: 'Tom wants to write.',
    hardPoor: 'Tom wants to write, so he found a pen.',
  },
  {
    word: 'hot',
    good: 'The sun was shining, and the day was very hot.',
    poor: 'It is hot.',
    hardPoor: 'Tom said the soup was hot.',
  },
  {
    word: 'garden',
    good: 'We planted flowers and vegetables in the garden.',
    poor: 'Tom is in the garden.',
    hardPoor: 'Tom sat in the garden with his flowers.',
  },
  {
    word: 'ears',
    good: 'We hear sounds with our ears.',
    poor: 'Tom touched his ears.',
    hardPoor: 'Tom touched his ears and his nose.',
  },
  {
    word: 'soap',
    good: 'Wash your hands with soap and water.',
    poor: 'Mary bought some soap.',
    hardPoor: 'Mary bought some soap and a towel.',
  },
  {
    word: 'birthday',
    good: 'On my birthday, I got a cake with candles.',
    poor: 'Today is my birthday.',
    hardPoor: 'Today is my birthday, and I am ten.',
  },
  {
    word: 'rich',
    good: 'He has lots of money, so he is very rich.',
    poor: 'Tom is rich.',
    hardPoor: 'Tom is rich, and he has a big house.',
  },
]
