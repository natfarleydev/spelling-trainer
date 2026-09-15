import { useEffect, useState } from 'react'
import type { Deck } from './deck'
import { screenFontSize } from './fontSize'
import { keyToAction, nextIndex, previousIndex } from './navigation'

type SlideshowProps = {
  deck: Deck
  onExit: () => void
}

// Show the deck one slide at a time. The logic is in navigation.ts and fontSize.ts.
export function Slideshow({ deck, onExit }: SlideshowProps) {
  const [index, setIndex] = useState(0)
  const count = deck.length

  const next = () => setIndex((i) => nextIndex(i, count))
  const previous = () => setIndex(previousIndex)

  const exit = () => {
    if (document.fullscreenElement) {
      // The fullscreenchange listener calls onExit.
      document.exitFullscreen().catch(onExit)
    } else {
      onExit()
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const action = keyToAction(event.key)
      if (action === null) return
      event.preventDefault()
      if (action === 'next') setIndex((i) => nextIndex(i, count))
      if (action === 'previous') setIndex(previousIndex)
      if (action === 'exit') onExit()
    }

    // The browser uses the Escape key to stop full screen. It does not send a keydown event.
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) onExit()
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [count, onExit])

  const { word } = deck[index]

  return (
    <div className="slideshow">
      <div className="slide" onClick={next}>
        <span className="word" style={{ fontSize: screenFontSize(word) }}>
          {word}
        </span>
      </div>
      <nav className="controls">
        <button type="button" onClick={previous} disabled={index === 0} aria-label="Previous slide">
          ←
        </button>
        <span>
          {index + 1} / {count}
        </span>
        <button type="button" onClick={next} disabled={index === count - 1} aria-label="Next slide">
          →
        </button>
        <button type="button" onClick={exit}>
          Exit
        </button>
      </nav>
    </div>
  )
}
