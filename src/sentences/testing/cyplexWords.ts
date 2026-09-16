// SPDX-License-Identifier: CC-BY-4.0
//
// Words that children aged 7 to 9 meet in the books that they read.
// Source: CYP-LEX, the Children and Young People's Books Lexicon, file "main_cyplex79.csv".
// https://osf.io/tnu8k/ (the component "The CYP-LEX database", in the project https://osf.io/squ49/), downloaded 2026-09-16.
// © the authors. Licensed under CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
//
// Citation: Korochkina, M., Marelli, M., Brysbaert, M. and Rastle, K. (2024). The Children and Young People's Books
// Lexicon (CYP-LEX): A large-scale lexical database of books read by children and young people in the United Kingdom.
// Quarterly Journal of Experimental Psychology. https://doi.org/10.1177/17470218241229694
//
// Changes: we kept only the word forms that pass these rules, and we removed the rest of the data:
// - 4 to 12 letters, lowercase letters only;
// - Zipf frequency (column "Zipf_freq") from 3.2 to 4.4, so the word is common but not one of the most common words;
// - the word appears in 20% or more of the books (column "CD_book_perc_raw"), which removes the names of the characters
//   of one book;
// - the most frequent part of speech (columns "AllPoS" and "AllPoSFreq") is a noun or an adjective;
// - the word is not a function word, a first name, a blocked word or an American spelling;
// - the sentence bank did not have 3 sentences for the word on 2026-09-16.
// Claude then read the list and removed the words that are not correct for a spelling test for children: dark subjects
// (for example "weapons" and "revenge"), parts of compound words (for example "haired" and "legged") and proper nouns.
// The words keep the order of the data: the words that appear in the most books are first.
//
// This file is test data and mining input only. The app does not use it.

export const CYPLEX_WORDS: readonly string[] = [
  'corners', 'amazed', 'firm', 'complicated', 'agreement', 'respect', 'satisfied', 'progress', 'fifth', 'tricks',
  'keen', 'glimpse', 'relaxed', 'details', 'expensive', 'damage', 'tails', 'fuss', 'surprising', 'expert',
  'noisy', 'gasp', 'tangled', 'muffled', 'noses', 'elbow', 'peaceful', 'personal', 'load', 'brand',
  'dizzy', 'reasons', 'wink', 'contact', 'bump', 'shops', 'bolt', 'original', 'muddy', 'slight',
  'twist', 'rings', 'responsible', 'curved', 'mouthful', 'clapping', 'inches', 'splash', 'pattern', 'style',
  'unexpected', 'fork', 'fluffy', 'price', 'blur', 'cups', 'curly', 'stern', 'nostrils', 'pavement',
  'brief', 'sore', 'sheets', 'pairs', 'nuts', 'lungs', 'mass', 'pity', 'ankles', 'hips',
  'proof', 'skinny', 'duty', 'dive', 'alert', 'daylight', 'cute', 'cheerful', 'groups', 'events',
  'detail', 'pleasant', 'growl', 'nerves', 'sunny', 'jokes', 'sandwiches', 'thoughtful', 'opinion', 'chat',
  'valuable', 'suits', 'false', 'piles', 'crowds', 'exit', 'reflection', 'patient', 'holidays', 'eyebrow',
  'gloves', 'giggle', 'unlikely', 'advantage', 'range', 'feast', 'homes', 'approach', 'nails', 'term',
  'spray', 'covers', 'response', 'polished', 'vegetables', 'painful', 'hills', 'sleepy', 'hint', 'sizes',
  'patience', 'cracks', 'argument', 'handy', 'fashion', 'slippery', 'upper', 'drinks', 'temper', 'strangers',
  'pots', 'arrival', 'remote', 'command', 'concern', 'handsome', 'current', 'hopes', 'hopeful', 'dramatic',
  'diving', 'manner', 'steep', 'chances', 'jobs', 'astonished', 'thump', 'eerie', 'favour', 'flap',
  'manners', 'dishes', 'habit', 'modern', 'event', 'fond', 'stack', 'snack', 'spine', 'contents',
  'tricky', 'ribs', 'neighbours', 'astonishment', 'roads', 'shift', 'squashed', 'brow', 'miracle', 'source',
  'presents', 'behaviour', 'meals', 'satisfaction', 'facts', 'curls', 'grumpy', 'jagged', 'messy', 'condition',
  'steering', 'season', 'senses', 'version', 'protection', 'lean', 'powder', 'supplies', 'soap', 'angle',
  'applause', 'property', 'beam', 'unknown', 'newspapers', 'account', 'presence', 'background', 'blade', 'stroke',
  'amused', 'friendship', 'creepy', 'items', 'shorts', 'supply', 'coats', 'worries', 'process', 'successful',
  'sleeves', 'loop', 'greedy', 'pound', 'cushion', 'beloved', 'wishes', 'tape', 'wobbly', 'delicate',
  'depths', 'blink', 'bedtime', 'tour', 'photos', 'breaths', 'mixture', 'skill', 'tidy', 'bald',
  'moustache', 'chips', 'talks', 'shimmering', 'crumbs', 'trace', 'gust', 'rustling', 'sons', 'grasp',
  'strip', 'victory', 'towers', 'female', 'capable', 'imaginary', 'accent', 'glare', 'activity', 'thread',
  'reality', 'cotton', 'shriek', 'miniature', 'deserted', 'smelly', 'frantic', 'central', 'bundle', 'role',
  'spirits', 'possibility', 'pets', 'floors', 'worms', 'ease', 'heroes', 'blankets', 'bells', 'candles',
  'sandy', 'fires', 'trunks', 'ribbon', 'sixth', 'credit', 'remarkable', 'drivers', 'landscape', 'dozens',
  'pigs', 'secure', 'cheers', 'thrilled', 'velvet', 'banana', 'limbs', 'sensitive', 'gulp', 'quarters',
  'shirts', 'colourful', 'puff', 'underwater', 'lifetime', 'messages', 'palms', 'wires', 'outline', 'bites',
  'kettle', 'flick', 'limp', 'movements', 'discovery', 'comforting', 'direct', 'concrete', 'eyelids', 'patches',
  'tasty', 'rivers', 'swift', 'necks', 'clothing', 'constant', 'gown', 'winds', 'impression', 'performance',
  'hammer', 'stool', 'ache', 'intense', 'bubbles', 'efforts', 'thirsty', 'elderly', 'advanced', 'schools',
  'operation', 'title', 'fiery', 'dazzling', 'bitter', 'cousins', 'stove', 'circular', 'solution', 'brass',
  'picnic', 'dash', 'gifts', 'intelligent', 'marble', 'connection', 'screech', 'suggestion', 'judge', 'puddle',
  'flow', 'outer', 'patterns', 'lunchtime', 'maps', 'bacon', 'mistakes', 'target', 'urgent', 'exchange',
  'positive', 'gloomy', 'mound', 'tickets', 'reaction', 'owners', 'companion', 'frogs', 'shallow', 'splendid',
  'results', 'gentlemen', 'pointy', 'trade', 'blocks', 'design', 'professional', 'pyjamas', 'chains', 'soil',
  'scarf', 'forms', 'doctors', 'striped', 'amusement', 'scrap', 'bowls', 'puzzle', 'oven', 'mornings',
  'relatives', 'sale', 'cases', 'reward', 'lions', 'cameras', 'glory', 'elegant', 'invitation', 'handkerchief',
  'mobile', 'snacks', 'apples', 'loyal', 'cleaner', 'layer', 'difficulty', 'storms', 'musical', 'ability',
  'posters', 'packet', 'images', 'twigs', 'banks', 'wool', 'fascinating', 'needle', 'outfit', 'reassuring',
  'slimy', 'boards', 'twitching', 'bees', 'coins', 'doorbell', 'candle', 'glances', 'mistaken', 'charming',
  'equal', 'parties', 'dense', 'bats', 'butterflies', 'drain', 'print', 'restless', 'slices', 'tangle',
  'gesture', 'roast', 'drawers', 'gear', 'celebration', 'trips', 'daily', 'travels', 'career', 'announcement',
  'laundry', 'diamonds', 'lemon', 'treats', 'pipes', 'enthusiasm', 'biscuit', 'passenger', 'fireplace', 'barrel',
  'wrestling', 'merry', 'jewels', 'chickens', 'cloak', 'hush', 'customers', 'photographs', 'needles', 'beams',
]
