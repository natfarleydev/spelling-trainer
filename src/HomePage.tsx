import { useEffect, useState } from 'react'
import { clearDraft, loadDraft, saveDraft, type TextStorage } from './draft'
import { Link } from './Link'
import type { Navigator } from './navigator'
import { createPresentation, presentationName, type Presentation } from './presentation'
import type { PresentationStore } from './presentationStore'
import { presentationPath } from './routes'
import { bankSentences } from './sentences/bank'
import { makeSlideSentence } from './sentences/slideSentence'
import type { TagWord } from './sentences/wordType'
import { isValidWordList, MAX_WORDS, parseWords, wordCountMessage } from './words'

export type HomePageProps = {
  base: string
  store: PresentationStore
  storage: TextStorage
  navigator: Navigator
  makeId: () => string
  now: () => string
  // The time zone for the names of the presentations. Undefined means the time zone of the device.
  timeZone: string | undefined
  // Load the part-of-speech tagger for the sentences.
  loadTagger: () => Promise<TagWord>
  // Give a number from 0 to 1, to choose the sentences.
  random: () => number
}

// If the tagger does not load, the override table and the "other" templates still give a sentence for each word.
const NO_TAGS: TagWord = () => []

export function HomePage({ base, store, storage, navigator, makeId, now, timeZone, loadTagger, random }: HomePageProps) {
  const [text, setText] = useState(() => loadDraft(storage))
  const [storageFailed, setStorageFailed] = useState(false)
  // The words before the user clicked Clear. Undo puts them back.
  const [clearedText, setClearedText] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)
  const [presentations, setPresentations] = useState<readonly Presentation[] | null>(null)

  useEffect(() => {
    let active = true
    store.list().then(
      (list) => active && setPresentations(list),
      () => active && setPresentations([]),
    )
    return () => {
      active = false
    }
  }, [store])

  const words = parseWords(text)
  const valid = isValidWordList(words)

  const changeText = (next: string) => {
    setText(next)
    setClearedText(null)
    setStorageFailed(!saveDraft(storage, next))
  }

  const clear = () => {
    setClearedText(text)
    setText('')
    setStorageFailed(!clearDraft(storage))
  }

  const undoClear = () => {
    if (clearedText === null) return
    changeText(clearedText)
  }

  const makePresentation = async () => {
    setSaving(true)
    setSaveFailed(false)
    const tagWord = await loadTagger().catch(() => NO_TAGS)
    const presentation = createPresentation({
      id: makeId(),
      createdAt: now(),
      words,
      makeSentence: makeSlideSentence({ tagWord, random, bankSentences }),
    })
    try {
      await store.save(presentation)
      navigator.push(presentationPath(base, presentation.id, 1))
    } catch {
      setSaveFailed(true)
      setSaving(false)
    }
  }

  return (
    <main className="home-page">
      <div className="alpha-sticker" role="note" aria-label="Alpha version">
        Alpha
      </div>
      <h1>Spelling trainer</h1>

      <section className="word-form" aria-labelledby="new-heading">
        <h2 id="new-heading">New presentation</h2>
        <label htmlFor="words">Type the spelling words. Put one word on each line.</label>
        <textarea
          id="words"
          rows={MAX_WORDS}
          value={text}
          onChange={(event) => changeText(event.target.value)}
          autoCapitalize="off"
        />
        <p className={words.length > MAX_WORDS ? 'count too-many' : 'count'}>{wordCountMessage(words.length)}</p>
        {storageFailed && (
          <p className="error" role="alert">
            This browser cannot keep your words. Copy them before you close the page.
          </p>
        )}
        <div className="actions">
          <button type="button" className="primary" onClick={makePresentation} disabled={!valid || saving}>
            {saving ? 'Saving…' : 'Make the presentation'}
          </button>
          <button type="button" onClick={clear} disabled={text === ''}>
            Clear
          </button>
        </div>
        {clearedText !== null && (
          <p className="notice" role="status">
            Words cleared.{' '}
            <button type="button" className="link-button" onClick={undoClear}>
              Undo
            </button>
          </p>
        )}
        {saveFailed && (
          <p className="error" role="alert">
            The app could not save the presentation. Try again.
          </p>
        )}
      </section>

      <section className="saved" aria-labelledby="saved-heading">
        <h2 id="saved-heading">Saved presentations</h2>
        {presentations !== null && presentations.length === 0 && (
          <p className="empty">You have no saved presentations yet.</p>
        )}
        {presentations !== null && presentations.length > 0 && (
          <ul aria-labelledby="saved-heading">
            {presentations.map((presentation) => (
              <li key={presentation.id}>
                <Link navigator={navigator} href={presentationPath(base, presentation.id, 1)}>
                  {presentationName(presentation, timeZone)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
