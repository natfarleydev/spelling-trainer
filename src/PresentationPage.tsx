import { useEffect, useState } from 'react'
import type { Deck } from './deck'
import { Link } from './Link'
import { MessagePage } from './MessagePage'
import { keyToAction, nextIndex, previousIndex } from './navigation'
import type { Navigator } from './navigator'
import type { Presentation } from './presentation'
import type { PresentationStore } from './presentationStore'
import { homePath, presentationPath } from './routes'
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
}

type LoadState =
  | { readonly status: 'loading' }
  | { readonly status: 'missing' }
  | { readonly status: 'failed' }
  | { readonly status: 'ready'; readonly presentation: Presentation }

// The space bar and the Enter key operate a focused control. The slide keys must not also operate.
const ownsKey = (target: EventTarget | null, key: string): boolean => {
  if (!(target instanceof Element)) return false
  if (target.closest('input, textarea, select, [contenteditable="true"]')) return true
  return (key === ' ' || key === 'Enter') && target.closest('button, a') !== null
}

export function PresentationPage({ base, id, slide, store, navigator, downloads }: PresentationPageProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [downloadFailed, setDownloadFailed] = useState(false)

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

  const { deck } = state.presentation

  const download = (save: (deck: Deck) => Promise<void>) => {
    setDownloadFailed(false)
    save(deck).catch(() => setDownloadFailed(true))
  }

  return (
    <div className="presentation-page">
      <header className="presentation-bar">
        <Link navigator={navigator} href={homePath(base)} className="back-link">
          All presentations
        </Link>
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
