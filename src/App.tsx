import { useState } from 'react'
import { buildDeck, type Deck } from './deck'
import { downloadPdf } from './pdf'
import { downloadPptx } from './pptx'
import { Slideshow } from './Slideshow'
import { isValidWordList, MAX_WORDS, parseWords, wordCountMessage } from './words'

export type Downloads = {
  readonly pdf: (deck: Deck) => Promise<void>
  readonly pptx: (deck: Deck) => Promise<void>
}

const DEFAULT_DOWNLOADS: Downloads = { pdf: downloadPdf, pptx: downloadPptx }

type AppProps = {
  // The tests give fake downloads. The app uses the real downloads.
  downloads?: Downloads
}

export default function App({ downloads = DEFAULT_DOWNLOADS }: AppProps) {
  const [text, setText] = useState('')
  const [presenting, setPresenting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const words = parseWords(text)
  const valid = isValidWordList(words)
  const deck = buildDeck(words)

  const download = (save: (deck: Deck) => Promise<void>) => {
    setError(null)
    save(deck).catch(() => setError('The download failed. Try again.'))
  }

  const present = () => {
    // Full screen is optional. Some browsers refuse it.
    document.documentElement.requestFullscreen?.().catch(() => {})
    setPresenting(true)
  }

  if (presenting) {
    return <Slideshow deck={deck} onExit={() => setPresenting(false)} />
  }

  return (
    <main className="setup">
      <div className="alpha-sticker" role="note" aria-label="Alpha version">
        Alpha
      </div>
      <h1>Spelling trainer</h1>
      <label htmlFor="words">Type the spelling words. Put one word on each line.</label>
      <textarea
        id="words"
        rows={MAX_WORDS}
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoCapitalize="off"
        autoFocus
      />
      <p className={words.length > MAX_WORDS ? 'count too-many' : 'count'}>{wordCountMessage(words.length)}</p>
      <div className="actions">
        <button type="button" onClick={present} disabled={!valid}>
          Show the slides
        </button>
        <button type="button" onClick={() => download(downloads.pdf)} disabled={!valid}>
          Download PDF
        </button>
        <button type="button" onClick={() => download(downloads.pptx)} disabled={!valid}>
          Download PPTX
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </main>
  )
}
