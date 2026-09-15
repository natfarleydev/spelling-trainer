import type { Deck } from './deck'
import { screenFontSize } from './fontSize'
import { nextIndex, previousIndex } from './navigation'

type SlideshowProps = {
  deck: Deck
  // The index of the current slide. It starts at 0.
  index: number
  onIndexChange: (index: number) => void
}

// Show one slide of the deck. The parent keeps the index, so that the URL can keep the slide number.
export function Slideshow({ deck, index, onIndexChange }: SlideshowProps) {
  const count = deck.length
  const isFirst = index === 0
  const isLast = index >= count - 1

  const next = () => {
    if (!isLast) onIndexChange(nextIndex(index, count))
  }
  const previous = () => {
    if (!isFirst) onIndexChange(previousIndex(index))
  }

  const { word } = deck[index]

  return (
    <div className="slideshow">
      <div className="slide" onClick={next}>
        <span className="word" style={{ fontSize: screenFontSize(word) }}>
          {word}
        </span>
      </div>
      <nav className="controls" aria-label="Slide controls">
        <button type="button" onClick={previous} disabled={isFirst} aria-label="Previous slide">
          ←
        </button>
        <span>
          {index + 1} / {count}
        </span>
        <button type="button" onClick={next} disabled={isLast} aria-label="Next slide">
          →
        </button>
      </nav>
    </div>
  )
}
