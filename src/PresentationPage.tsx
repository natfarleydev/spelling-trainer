import { useEffect, useRef, useState } from 'react'
import type { Deck, Slide } from './deck'
import { Link } from './Link'
import { MessagePage } from './MessagePage'
import { keyToAction, nextIndex, previousIndex } from './navigation'
import type { Navigator } from './navigator'
import { replaceSlide, type Presentation } from './presentation'
import type { PresentationStore } from './presentationStore'
import { homePath, presentationPath } from './routes'
import { changeWordType, newSentence } from './sentences/slideSentence'
import { WORD_TYPES, type TagWord, type WordType } from './sentences/wordType'
import { Slideshow } from './Slideshow'

export type Downloads = {
  readonly pdf: (deck: Deck) => Promise<void>
  readonly pptx: (deck: Deck) => Promise<void>
}

export type PresentationPageProps = {
  base: string
  id: string
  // The slide number from the URL. It starts at 1. Null means that the URL has no slide number.
  slide: number | null
  store: PresentationStore
  navigator: Navigator
  downloads: Downloads
  // Load the part-of-speech tagger. The page needs it only for a slide from schema version 1.
  loadTagger: () => Promise<TagWord>
  // Give a number from 0 to 1, to choose the sentences.
  random: () => number
}

type LoadState =
  | { readonly status: 'loading' }
  | { readonly status: 'missing' }
  | { readonly status: 'failed' }
  | { readonly status: 'ready'; readonly presentation: Presentation }

type SaveState = 'idle' | 'saving' | 'saved' | 'failed'

const TYPE_LABELS: Readonly<Record<WordType, string>> = {
  noun: 'Noun',
  verb: 'Verb',
  adjective: 'Adjective',
  adverb: 'Adverb',
  number: 'Number',
  other: 'Other',
}

// If the tagger does not load, the override table and the "other" templates still give a sentence.
const NO_TAGS: TagWord = () => []

// The space bar and the Enter key operate a focused control. The slide keys must not also operate.
const ownsKey = (target: EventTarget | null, key: string): boolean => {
  if (!(target instanceof Element)) return false
  if (target.closest('input, textarea, select, [contenteditable="true"]')) return true
  return (key === ' ' || key === 'Enter') && target.closest('button, a') !== null
}

export function PresentationPage({
  base,
  id,
  slide,
  store,
  navigator,
  downloads,
  loadTagger,
  random,
}: PresentationPageProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [downloadFailed, setDownloadFailed] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  // Load the tagger one time only, and only when a slide needs it.
  const taggerRef = useRef<Promise<TagWord> | null>(null)

  useEffect(() => {
    let active = true
    store.get(id).then(
      (presentation) => active && setState(presentation ? { status: 'ready', presentation } : { status: 'missing' }),
      () => active && setState({ status: 'failed' }),
    )
    return () => {
      active = false
    }
  }, [store, id])

  const count = state.status === 'ready' ? state.presentation.deck.length : 0
  const index = Math.max(0, Math.min(slide ?? 1, count) - 1)

  // Correct the URL when it has no slide number, or when the slide number is too large.
  useEffect(() => {
    if (state.status === 'ready' && slide !== index + 1) navigator.replace(presentationPath(base, id, index + 1))
  }, [state.status, slide, index, navigator, base, id])

  useEffect(() => {
    if (state.status !== 'ready') return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || ownsKey(event.target, event.key)) return
      const action = keyToAction(event.key)
      if (action === null) return
      event.preventDefault()
      const next = action === 'next' ? nextIndex(index, count) : previousIndex(index)
      // Replace the URL, so that the Back button goes to the previous page, not to the previous slide.
      navigator.replace(presentationPath(base, id, next + 1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [state.status, index, count, navigator, base, id])

  if (state.status === 'loading') {
    return (
      <main className="message-page">
        <p role="status">Loading the presentation…</p>
      </main>
    )
  }

  if (state.status === 'missing') {
    return (
      <MessagePage base={base} navigator={navigator} title="We cannot find this presentation">
        <p>The browser keeps presentations only on the device and in the browser where you made them.</p>
      </MessagePage>
    )
  }

  if (state.status === 'failed') {
    return (
      <MessagePage base={base} navigator={navigator} title="We cannot open this presentation">
        <p>Reload the page to try again.</p>
      </MessagePage>
    )
  }

  const { presentation } = state
  const { deck } = presentation
  const currentSlide = deck[index]

  const download = (save: (deck: Deck) => Promise<void>) => {
    setDownloadFailed(false)
    save(deck).catch(() => setDownloadFailed(true))
  }

  const getTagger = () => (taggerRef.current ??= loadTagger().catch(() => NO_TAGS))

  // Change the current slide, save the presentation, then show the change.
  // If the save fails, the page keeps the previous slide, so that it shows only saved data.
  const updateSlide = async (change: (slide: Slide) => Slide | Promise<Slide>) => {
    const changed = await change(currentSlide)
    if (changed === currentSlide) return
    const next = replaceSlide(presentation, index, changed)
    setSaveState('saving')
    try {
      await store.save(next)
      setState({ status: 'ready', presentation: next })
      setSaveState('saved')
    } catch {
      setSaveState('failed')
    }
  }

  const giveNewSentence = () =>
    updateSlide(async (current) =>
      newSentence(current, { tagWord: current.analysis ? NO_TAGS : await getTagger(), random }),
    )

  const selectType = (type: WordType) => updateSlide((current) => changeWordType(current, type, { random }))

  return (
    <div className="presentation-page">
      <header className="presentation-bar">
        <Link navigator={navigator} href={homePath(base)} className="back-link">
          All presentations
        </Link>
        <div className="sentence-controls">
          <button type="button" onClick={giveNewSentence}>
            New sentence
          </button>
          <label>
            Word type{' '}
            <select
              value={currentSlide.analysis?.type ?? ''}
              onChange={(event) => selectType(event.target.value as WordType)}
            >
              {!currentSlide.analysis && (
                <option value="" disabled>
                  Not known
                </option>
              )}
              {WORD_TYPES.map((type) => (
                <option key={type} value={type}>
                  {TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </label>
          {saveState === 'saving' && <span role="status">Saving…</span>}
          {saveState === 'saved' && <span role="status">Saved.</span>}
          {saveState === 'failed' && (
            <span className="error" role="alert">
              The app could not save the change. Try again.
            </span>
          )}
        </div>
        <div className="actions">
          {downloadFailed && (
            <span className="error" role="alert">
              The download failed. Try again.
            </span>
          )}
          <button type="button" onClick={() => download(downloads.pdf)}>
            Download PDF
          </button>
          <button type="button" onClick={() => download(downloads.pptx)}>
            Download PPTX
          </button>
        </div>
      </header>
      <Slideshow
        deck={deck}
        index={index}
        onIndexChange={(next) => navigator.replace(presentationPath(base, id, next + 1))}
      />
    </div>
  )
}
