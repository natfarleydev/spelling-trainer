// SPDX-License-Identifier: OGL-UK-3.0
//
// The example words for the spelling patterns in "English Appendix 1: Spelling",
// National curriculum in England, Department for Education.
// https://assets.publishing.service.gov.uk/media/5a7ccc06ed915d63cc65ce61/English_Appendix_1_-_Spelling.pdf
// © Crown copyright 2013. Contains public sector information licensed under the Open Government Licence v3.0.
// https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
//
// Changes: we took the example words of each spelling rule from the tables of the document, and we removed:
// - the prefixes and suffixes that are not words, for example "dis", "mis", "re" and "ness";
// - the grammar words of the document itself, for example "verb", "schwa", "unstressed" and "suffix";
// - the words of the explanations, for example the definitions of the homophones in the list for years 5 and 6.
// The statutory word lists are in src/sentences/testing/ks2StatutoryWords.ts and commonExceptionWords.ts.

export const YEAR_1_PATTERN_WORDS: readonly string[] = [
  'off', 'well', 'miss', 'buzz', 'back', 'bank', 'think', 'honk', 'sunk', 'pocket',
  'rabbit', 'carrot', 'thunder', 'sunset', 'catch', 'fetch', 'kitchen', 'notch', 'hutch', 'have',
  'live', 'give', 'cats', 'dogs', 'spends', 'rocks', 'thanks', 'catches', 'hunting', 'hunted',
  'hunter', 'buzzing', 'buzzed', 'buzzer', 'jumping', 'jumped', 'jumper', 'grander', 'grandest', 'fresher',
  'freshest', 'quicker', 'quickest', 'day', 'play', 'say', 'way', 'stay', 'boy', 'toy',
  'enjoy', 'annoy', 'made', 'came', 'same', 'take', 'safe', 'these', 'theme', 'complete',
  'five', 'ride', 'like', 'time', 'side', 'home', 'those', 'woke', 'hope', 'hole',
  'rule', 'rude', 'use', 'tube', 'tune', 'car', 'start', 'park', 'arm', 'garden',
  'tree', 'green', 'meet', 'week', 'sea', 'dream', 'meat', 'each', 'read', 'head',
  'bread', 'meant', 'instead', 'sound', 'her', 'better', 'under', 'summer', 'winter', 'sister',
  'girl', 'bird', 'shirt', 'first', 'third', 'turn', 'hurt', 'church', 'burst', 'food',
  'pool', 'moon', 'zoo', 'soon', 'book', 'took', 'foot', 'wood', 'good', 'toe',
  'goes', 'out', 'about', 'mouth', 'around', 'now', 'how', 'brown', 'down', 'town',
  'own', 'blow', 'snow', 'grow', 'show', 'blue', 'clue', 'true', 'rescue', 'new',
  'few', 'grew', 'flew', 'drew', 'threw', 'lie', 'tie', 'pie', 'cried', 'tried',
  'dried', 'chief', 'field', 'thief', 'high', 'night', 'light', 'bright', 'right', 'short',
  'born', 'horse', 'morning', 'more', 'score', 'before', 'wore', 'shore', 'saw', 'draw',
  'yawn', 'crawl', 'author', 'dinosaur', 'astronaut', 'air', 'fair', 'pair', 'hair', 'chair',
  'dear', 'hear', 'beard', 'near', 'year', 'bear', 'pear', 'wear', 'bare', 'dare',
  'care', 'share', 'scared', 'very', 'happy', 'funny', 'party', 'family', 'dolphin', 'alphabet',
  'phonics', 'elephant', 'when', 'where', 'which', 'wheel', 'while', 'sketch', 'kit', 'skin',
  'frisky', 'unhappy', 'undo', 'unload', 'unfair', 'unlock', 'football', 'playground', 'farmyard', 'bedroom',
  'blackberry',
]

export const YEAR_2_PATTERN_WORDS: readonly string[] = [
  'badge', 'edge', 'bridge', 'dodge', 'fudge', 'age', 'huge', 'change', 'charge', 'bulge',
  'village', 'gem', 'giant', 'magic', 'giraffe', 'energy', 'jacket', 'jar', 'jog', 'join',
  'adjust', 'race', 'ice', 'cell', 'city', 'fancy', 'knock', 'know', 'knee', 'gnat',
  'gnaw', 'write', 'written', 'wrote', 'wrong', 'wrap', 'table', 'apple', 'bottle', 'little',
  'middle', 'camel', 'tunnel', 'squirrel', 'travel', 'towel', 'tinsel', 'metal', 'pedal', 'capital',
  'hospital', 'animal', 'pencil', 'fossil', 'nostril', 'cry', 'fly', 'dry', 'try', 'reply',
  'flies', 'tries', 'replies', 'copies', 'babies', 'carries', 'copied', 'copier', 'happier', 'happiest',
  'cried', 'replied', 'copying', 'crying', 'replying', 'hiking', 'hiked', 'hiker', 'nicer', 'nicest',
  'shiny', 'patting', 'patted', 'humming', 'hummed', 'dropping', 'dropped', 'sadder', 'saddest', 'fatter',
  'fattest', 'runner', 'runny', 'all', 'ball', 'call', 'walk', 'talk', 'always', 'other',
  'mother', 'brother', 'nothing', 'key', 'donkey', 'monkey', 'chimney', 'valley', 'want', 'watch',
  'wander', 'quantity', 'squash', 'word', 'work', 'worm', 'world', 'worth', 'war', 'warm',
  'towards', 'television', 'treasure', 'usual', 'enjoyment', 'sadness', 'careful', 'playful', 'hopeless', 'plainness',
  'plain', 'badly', 'merriment', 'happiness', 'plentiful', 'penniless', 'happily', 'station', 'fiction', 'motion',
  'national', 'section', 'there', 'their', 'here', 'hear', 'quite', 'quiet', 'sea', 'bare',
  'bear', 'one', 'won', 'sun', 'son', 'too', 'two', 'bee', 'blue', 'blew',
  'night', 'knight',
]

export const YEARS_3_AND_4_PATTERN_WORDS: readonly string[] = [
  'forgetting', 'forgotten', 'beginning', 'beginner', 'prefer', 'preferred', 'gardening', 'gardener', 'limiting', 'limited',
  'limitation', 'myth', 'gym', 'pyramid', 'mystery', 'young', 'touch', 'double', 'trouble', 'country',
  'disappoint', 'disagree', 'disobey', 'misbehave', 'mislead', 'misspell', 'spell', 'immature', 'immortal', 'impossible',
  'impatient', 'imperfect', 'irresponsible', 'redo', 'refresh', 'return', 'reappear', 'redecorate', 'subdivide', 'subheading',
  'submarine', 'submerge', 'interact', 'intercity', 'international', 'interrelated', 'related', 'supermarket', 'superman', 'superstar',
  'antiseptic', 'clockwise', 'antisocial', 'autobiography', 'autograph', 'information', 'adoration', 'sensation', 'preparation', 'admiration',
  'sadly', 'completely', 'usually', 'usual', 'finally', 'final', 'comically', 'comical', 'happily', 'angrily',
  'nobly', 'basically', 'frantically', 'dramatically', 'measure', 'treasure', 'pleasure', 'enclosure', 'creature', 'furniture',
  'picture', 'nature', 'adventure', 'division', 'invasion', 'confusion', 'decision', 'collision', 'television', 'poisonous',
  'dangerous', 'mountainous', 'famous', 'various', 'tremendous', 'enormous', 'jealous', 'humorous', 'glamorous', 'vigorous',
  'courageous', 'outrageous', 'serious', 'obvious', 'curious', 'hideous', 'spontaneous', 'courteous', 'invention', 'injection',
  'action', 'hesitation', 'completion', 'expression', 'discussion', 'confession', 'permission', 'admission', 'expansion', 'extension',
  'comprehension', 'tension', 'musician', 'electrician', 'magician', 'politician', 'mathematician', 'scheme', 'chorus', 'chemist',
  'echo', 'character', 'chef', 'chalet', 'machine', 'brochure', 'league', 'tongue', 'antique', 'unique',
  'science', 'scene', 'discipline', 'fascinate', 'crescent', 'vein', 'weigh', 'eight', 'neighbour', 'obey',
  'accept', 'except', 'affect', 'effect', 'ball', 'bawl', 'berry', 'bury', 'brake', 'break',
  'fair', 'fare', 'grate', 'great', 'groan', 'grown', 'heel', 'heal', 'knot', 'mail',
  'male', 'main', 'mane', 'meat', 'meet', 'medal', 'meddle', 'missed', 'mist', 'peace',
  'piece', 'plain', 'plane', 'rain', 'rein', 'reign', 'seen', 'weather', 'whether', 'whose',
]

export const YEARS_5_AND_6_PATTERN_WORDS: readonly string[] = [
  'vicious', 'precious', 'conscious', 'delicious', 'malicious', 'suspicious', 'ambitious', 'cautious', 'fictitious', 'infectious',
  'nutritious', 'official', 'special', 'artificial', 'partial', 'confidential', 'essential', 'observant', 'observance', 'observation',
  'expectant', 'expectation', 'hesitant', 'hesitancy', 'hesitation', 'tolerant', 'tolerance', 'toleration', 'substance', 'substantial',
  'innocent', 'innocence', 'decent', 'decency', 'frequent', 'frequency', 'confident', 'confidence', 'assistant', 'assistance',
  'obedient', 'obedience', 'independent', 'independence', 'applicable', 'applicably', 'application', 'considerable', 'considerably', 'consideration',
  'tolerable', 'tolerably', 'changeable', 'noticeable', 'forcible', 'legible', 'dependable', 'comfortable', 'understandable', 'reasonable',
  'enjoyable', 'reliable', 'possible', 'possibly', 'horrible', 'horribly', 'terrible', 'terribly', 'visible', 'visibly',
  'incredible', 'incredibly', 'sensible', 'sensibly', 'referring', 'referred', 'referral', 'preferring', 'preferred', 'transferring',
  'transferred', 'reference', 'referee', 'preference', 'transference', 'deceive', 'conceive', 'receive', 'perceive', 'ceiling',
  'ought', 'bought', 'thought', 'nought', 'brought', 'fought', 'rough', 'tough', 'enough', 'cough',
  'though', 'although', 'dough', 'through', 'thorough', 'borough', 'plough', 'bough', 'doubt', 'island',
  'lamb', 'solemn', 'thistle', 'knight', 'advice', 'advise', 'device', 'devise', 'licence', 'license',
  'practice', 'practise', 'prophecy', 'prophesy', 'farther', 'further', 'father', 'guessed', 'guest', 'heard',
  'herd', 'led', 'lead', 'morning', 'mourning', 'passed', 'past', 'precede', 'proceed', 'principal',
  'principle', 'profit', 'prophet', 'stationary', 'stationery', 'steal', 'steel', 'wary', 'weary',
]

export const ALL_PATTERN_WORDS: readonly string[] = [
  ...YEAR_1_PATTERN_WORDS,
  ...YEAR_2_PATTERN_WORDS,
  ...YEARS_3_AND_4_PATTERN_WORDS,
  ...YEARS_5_AND_6_PATTERN_WORDS,
]
