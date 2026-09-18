import type { BankEntry } from '../bank'

// Sentences for the everyday nouns of a school, a home and a street. Our own work (CC0).
// A teacher sets these words, because a child meets them every day, but the other word sources leave them out.
// The word vector of some of these words carries the meaning of an adult, so the clue word of the sentence comes from
// that word family. Example: "branch" is 0.72 from "part" and only 0.36 from "tree", so the sentence gives "part".
// "ruler" and "trainers" are in MEANING_EXCEPTIONS, because no sentence for the meaning of a child can pass the
// meaning rule: the vector of "ruler" is a king, and the vector of "trainers" is a person who trains other people.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_EVERYDAY_NOUN_BANK: readonly BankEntry[] = [
  {
    word: 'classroom',
    sentences: [
      'Our classroom has thirty desks and a big window.',
      'The teacher writes on the board at the front of the classroom.',
      'We hang our coats outside the classroom.',
    ],
  },
  {
    word: 'register',
    sentences: [
      'The teacher calls the register, and we say yes to our names.',
      'The register shows which children are at school today.',
      'Put your name on the register when you arrive.',
    ],
  },
  {
    word: 'assembly',
    sentences: [
      'The whole school meets in the hall for assembly.',
      'We sing a song in assembly every Monday.',
      'The headteacher spoke to the whole school at assembly.',
    ],
  },
  {
    word: 'uniform',
    sentences: [
      'My school uniform is a grey skirt and a blue jumper.',
      'Every child wears the same uniform at my school.',
      'Put on your uniform before you go to school.',
    ],
  },
  {
    word: 'homework',
    sentences: [
      'I do my homework after school, before dinner.',
      'The teacher gave us homework about the water cycle.',
      'My homework is ten spelling words to learn.',
    ],
  },
  {
    word: 'ruler',
    sentences: [
      'Draw a straight line with your ruler.',
      'The ruler shows the centimetres, so I can measure the box.',
      'My ruler is thirty centimetres long.',
    ],
  },
  {
    word: 'rubber',
    sentences: [
      'Use the rubber to remove the pencil marks.',
      'My rubber is made of soft plastic, and it removes pencil marks.',
      'Keep your pencil and your rubber in your bag.',
    ],
  },
  {
    word: 'glue',
    sentences: [
      'Stick the paper on the card with glue.',
      'The glue is wet, so wait until it sticks and is dry.',
      'Use glue to stick the paper on the card.',
    ],
  },
  {
    word: 'bathroom',
    sentences: [
      'I wash my hands in the bathroom.',
      'The bathroom has a bath and a shower.',
      'Clean your teeth in the bathroom before bed.',
    ],
  },
  {
    word: 'garage',
    sentences: [
      'Dad keeps the car in the garage.',
      'The garage is next to the house, and it has a big door.',
      'My bike lives in the garage with the garden tools.',
    ],
  },
  {
    word: 'stairs',
    sentences: [
      'Walk up the stairs to your bedroom.',
      'Do not run down the stairs, because you may fall.',
      'The stairs join the two floors of the house.',
    ],
  },
  {
    word: 'blanket',
    sentences: [
      'A warm blanket keeps me from the cold at night.',
      'The blanket and the pillow keep me warm in bed.',
      'She put a warm blanket over the sleeping baby, like a jacket.',
    ],
  },
  {
    word: 'pillow',
    sentences: [
      'My head rests on a soft pillow when I go to bed.',
      'My head rests on a soft pillow on the bed.',
      'She cried into her pillow on the bed when she was sad.',
    ],
  },
  {
    word: 'sandwich',
    sentences: [
      'I ate a cheese sandwich for my lunch.',
      'Put the meat between two pieces of bread to make a sandwich.',
      'My sandwich was in a box with an apple.',
    ],
  },
  {
    word: 'butter',
    sentences: [
      'Put butter on the bread before the jam.',
      'The butter was hard, so it did not spread.',
      'We make cakes with butter, sugar and eggs.',
    ],
  },
  {
    word: 'jam',
    sentences: ['I like jam on my bread for breakfast.', 'The jam is made from fruit and sugar.', 'She put a spoon of jam on the cake.'],
  },
  {
    word: 'cereal',
    sentences: ['I eat cereal with milk for breakfast.', 'The cereal is made from grain.', 'Pour the cereal into your bowl.'],
  },
  {
    word: 'pizza',
    sentences: [
      'We ate pizza with cheese on the top.',
      'The pizza is round and flat, and we cut it into pieces.',
      'My favourite food is pizza with hot cheese.',
    ],
  },
  {
    word: 'pasta',
    sentences: [
      'We had pasta with tomato sauce for dinner.',
      'Cook the pasta in hot water for ten minutes.',
      'Pasta and rice are both good with a sauce.',
    ],
  },
  {
    word: 'salad',
    sentences: [
      'The salad has green leaves and tomato in it.',
      'I eat a salad when I want something cold and fresh.',
      'Wash the salad before you eat it.',
    ],
  },
  {
    word: 'sausage',
    sentences: [
      'We ate a hot sausage with potatoes for dinner.',
      'The sausage is made from meat.',
      'Do not eat the sausage when it is cold.',
    ],
  },
  {
    word: 'trousers',
    sentences: [
      'I wear trousers to school, and my sister wears a skirt.',
      'My trousers were wet after I walked in the rain.',
      'These trousers are too short for my long legs.',
    ],
  },
  {
    word: 'glove',
    sentences: ['I lost one glove, so my hand is cold.', 'Put a glove on each hand in the winter.', 'The glove keeps my fingers warm.'],
  },
  {
    word: 'trainers',
    sentences: [
      'Put on your trainers before the game.',
      'I wear trainers to run in the playground.',
      'My trainers are soft shoes for sport.',
    ],
  },
  {
    word: 'lion',
    sentences: [
      'The lion is a big cat with a loud roar.',
      'A lion hunts other animals in the hot grass.',
      'We saw a lion and a tiger at the zoo.',
    ],
  },
  {
    word: 'tiger',
    sentences: [
      'The tiger is a wild cat that hunts alone.',
      'The tiger has orange fur with black lines.',
      'A tiger is bigger than a dog and much stronger.',
    ],
  },
  {
    word: 'snake',
    sentences: [
      'A snake has no legs, and it moves along the ground.',
      'The long snake hid in the grass.',
      'A snake can be very dangerous, so do not touch it.',
    ],
  },
  {
    word: 'spider',
    sentences: [
      'A spider is a small creature with eight legs.',
      'The spider is a creature that makes a web in the corner.',
      'A spider has eight legs, and a snake has none.',
    ],
  },
  {
    word: 'frog',
    sentences: [
      'The frog is a small creature that jumps.',
      'A frog and a snake both like a warm rock.',
      'The green frog jumped into the pond.',
    ],
  },
  {
    word: 'penguin',
    sentences: [
      'A penguin is a bird that swims, and it cannot fly like an owl.',
      'The penguin swims in the cold sea, like a dolphin.',
      'The penguin walks on the ice, and the dolphin swims under it.',
    ],
  },
  {
    word: 'owl',
    sentences: [
      'The owl is a bird that hunts at night, like a cat.',
      'An owl sleeps in the day, and the squirrel does not.',
      'We heard the owl and the squirrel in the dark trees.',
    ],
  },
  {
    word: 'duck',
    sentences: [
      'The duck swims on the pond and eats the bread that we throw.',
      'A duck is a bird with a flat mouth for the water.',
      'The duck is a bird that walks to the water with her babies.',
    ],
  },
  {
    word: 'fog',
    sentences: [
      'The thick fog made it hard to see the road.',
      'The fog came with the rain, and we could not see far.',
      'The fog is a cloud that sits on the ground.',
    ],
  },
  {
    word: 'frost',
    sentences: [
      'The frost made the grass white and hard.',
      'On a cold morning there is frost on the window.',
      'The frost melts when the sun comes up.',
    ],
  },
  {
    word: 'rainbow',
    sentences: [
      'A rainbow has seven colours in the sky.',
      'After the rain we saw a rainbow above the trees.',
      'The rainbow is a curve of colour in the sky.',
    ],
  },
  {
    word: 'breeze',
    sentences: ['A gentle breeze moved the leaves on the tree.', 'The breeze is a light wind.', 'We felt a cool breeze at the beach.'],
  },
  {
    word: 'leaf',
    sentences: [
      'A green leaf grows on the branch of the tree.',
      'In autumn each leaf turns brown and falls.',
      'The leaf floated on the water of the pond.',
    ],
  },
  {
    word: 'branch',
    sentences: [
      'The bird sat on a branch in the upper part of the tree.',
      'A thick branch broke off the main tree in the storm.',
      'A branch is the part of a tree where the leaves grow.',
    ],
  },
  {
    word: 'birthday',
    sentences: [
      'My birthday is the day when I get one year older.',
      'We had a cake and a party for my birthday.',
      'On my birthday my friends gave me gifts.',
    ],
  },
  {
    word: 'grandfather',
    sentences: [
      'My grandfather is the father of my mother.',
      'Grandfather tells me stories about the past.',
      'My grandfather is old, and his hair is grey.',
    ],
  },
  {
    word: 'tomorrow',
    sentences: [
      'Today is Monday, so tomorrow is Tuesday.',
      'We go to the farm tomorrow, and not today.',
      'Tomorrow is the day after today.',
    ],
  },
  {
    word: 'yesterday',
    sentences: [
      'Yesterday was the day before today.',
      'Yesterday it rained, but today the sun is out.',
      'I did my homework yesterday, so now I can play.',
    ],
  },
  {
    word: 'Easter',
    sentences: ['At Easter we eat chocolate eggs.', 'Easter comes in the spring, after the winter.', 'We have a school holiday at Easter.'],
  },
  {
    word: 'purple',
    sentences: [
      'Purple is the colour that you get from red and blue.',
      'She wore a purple dress with white shoes.',
      'The purple flower grows in our garden.',
    ],
  },
  {
    word: 'teeth',
    sentences: [
      'I clean my teeth every morning and every night.',
      'Your teeth help you to bite your food.',
      'The dog has sharp teeth in its mouth.',
    ],
  },
  {
    word: 'tractor',
    sentences: [
      'The farmer drives a tractor across the field.',
      'A tractor has big wheels, and it pulls a heavy load.',
      'The tractor works on the farm all day.',
    ],
  },
  {
    word: 'helicopter',
    sentences: [
      'A helicopter can fly straight up into the sky.',
      'The helicopter landed in the field near the hospital.',
      'A helicopter has no wings like a plane.',
    ],
  },
  {
    word: 'railway',
    sentences: [
      'The train runs on the railway to the city.',
      'We waited at the railway station for the train.',
      'The railway goes across the bridge.',
    ],
  },
  {
    word: 'cricket',
    sentences: [
      'In cricket you hit the ball with a bat.',
      'We play cricket on the grass in the summer.',
      'A cricket team has eleven players.',
    ],
  },
  {
    word: 'swimming',
    sentences: [
      'I go swimming in the pool every Tuesday.',
      'Swimming makes your arms and your legs strong.',
      'She is swimming across the pond.',
    ],
  },
  {
    word: 'skipping',
    sentences: [
      'The girl is skipping along the path with quick jumps.',
      'Skipping is good for you, because you jump many times.',
      'We took turns at skipping in the playground.',
    ],
  },
  {
    word: 'penny',
    sentences: [
      'A penny is the smallest coin of our money.',
      'I found a penny, and the coin was worth very little.',
      'One penny is not enough to buy a cake.',
    ],
  },
  {
    word: 'wallet',
    sentences: [
      'Dad keeps his money in a wallet.',
      'The wallet has room for cards and notes.',
      'I lost my wallet, and all my money was in it.',
    ],
  },
]
