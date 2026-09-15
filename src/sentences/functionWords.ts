// Words that carry no meaning of their own. The meaning checks and the sentence links ignore them.
export const FUNCTION_WORDS: ReadonlySet<string> = new Set(
  (
    'a about after all also am an and any are as at be because been before but by can could did do does ' +
    'for from had has have he her him his how i if in into is it its me more my no not of on one or our ' +
    'out over so some than that the their them then there these they this to too up us very was we were ' +
    'what when where which who will with would you your'
  ).split(' '),
)
