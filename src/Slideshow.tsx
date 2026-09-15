import { useLayoutEffect, useRef } from 'react'
import type { Deck } from './deck'
import { fitMeasuredFontSize, screenFontSize } from './fontSize'
import { measureWordInBrowser, type MeasureWord } from './measureWord'
import { nextIndex, previousIndex } from './navigation'

type SlideshowProps = {
  deck: Deck
  // The index of the current slide. It starts at 0.
  index: number
  onIndexChange: (index: number) => void
  // The tests give a fake. The app uses the real browser measurement.
  measureWord?: MeasureWord
}

// Show one slide of the deck. The parent keeps the index, so that the URL can keep the slide number.
export function Slideshow({ deck, index, onIndexChange, measureWord = measureWordInBrowser }: SlideshowProps) {
  const slideRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  const count = deck.length
  const isFirst = index === 0
  const isLast = index >= count - 1
  const { word } = deck[index]

  // Start with the CSS estimate, then measure the rendered word and fit it to the slide.
  // The logic is in fitMeasuredFontSize. This effect only reads the layout and writes the style.
  useLayoutEffect(() => {
    const slideElement = slideRef.current
    const wordElement = wordRef.current
    if (!slideElement || !wordElement) return

    const fit = () => {
      const size = fitMeasuredFontSize(measureWord(slideElement, wordElement))
      if (size !== null) wordElement.style.fontSize = `${size}px`
    }

    fit()
    if (typeof ResizeObserver === 'undefined') return
    // Fit again when the slide changes size, or when a font loads and changes the width of the word.
    const observer = new ResizeObserver(fit)
    observer.observe(slideElement)
    observer.observe(wordElement)
    return () => observer.disconnect()
  }, [word, measureWord])

  const next = () => {
    if (!isLast) onIndexChange(nextIndex(index, count))
  }
  const previous = () => {
    if (!isFirst) onIndexChange(previousIndex(index))
  }

  return (
    <div className="slideshow">
      <div className="slide" ref={slideRef} onClick={next}>
        <span className="word" ref={wordRef} style={{ fontSize: screenFontSize(word) }}>
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
