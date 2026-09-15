import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { buildDeck } from './deck'
import { fitMeasuredFontSize, screenFontSize } from './fontSize'
import { Slideshow } from './Slideshow'

const deck = buildDeck(['because', 'friend', 'necessary'])

const renderSlideshow = (index: number) => {
  const onIndexChange = vi.fn()
  return { onIndexChange, user: userEvent.setup(), ...render(<Slideshow deck={deck} index={index} onIndexChange={onIndexChange} />) }
}

const button = (name: string) => screen.getByRole('button', { name })

describe('Slideshow', () => {
  it('shows the word at the index and the slide number', () => {
    renderSlideshow(1)
    expect(screen.getByText('friend')).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('shows only one word at a time', () => {
    renderSlideshow(0)
    expect(screen.queryByText('friend')).not.toBeInTheDocument()
  })

  it('keeps the estimated font size when the browser has no layout', () => {
    renderSlideshow(0)
    // The test DOM has no layout, so the measured fit gives null. Thus the word must not get a measured px size.
    expect(screen.getByText('because').style.fontSize).not.toMatch(/px$/)
    expect(screenFontSize('because')).toMatch(/^min\(/)
  })

  it('fits the measured word to the slide', () => {
    // A fake measurement. The test DOM has no layout, and this fake operates in all test DOMs.
    const measurement = { textWidth: 400, fontSize: 50, availableWidth: 375, availableHeight: 700 }
    const measureWord = vi.fn(() => measurement)

    render(<Slideshow deck={deck} index={0} onIndexChange={vi.fn()} measureWord={measureWord} />)

    const word = screen.getByText('because')
    expect(word.style.fontSize).toBe(`${fitMeasuredFontSize(measurement)}px`)
    expect(measureWord).toHaveBeenCalledWith(word.parentElement, word)
  })

  it('asks for the next index when the user clicks Next slide', async () => {
    const { user, onIndexChange } = renderSlideshow(0)
    await user.click(button('Next slide'))
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('asks for the previous index when the user clicks Previous slide', async () => {
    const { user, onIndexChange } = renderSlideshow(2)
    await user.click(button('Previous slide'))
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('asks for the next index when the user clicks the slide', async () => {
    const { user, onIndexChange } = renderSlideshow(0)
    await user.click(screen.getByText('because'))
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('disables Previous slide on the first slide', () => {
    renderSlideshow(0)
    expect(button('Previous slide')).toBeDisabled()
    expect(button('Next slide')).toBeEnabled()
  })

  it('disables Next slide on the last slide', () => {
    renderSlideshow(2)
    expect(button('Next slide')).toBeDisabled()
    expect(button('Previous slide')).toBeEnabled()
  })

  it('does not ask for a change when the user clicks the last slide', async () => {
    const { user, onIndexChange } = renderSlideshow(2)
    await user.click(screen.getByText('necessary'))
    expect(onIndexChange).not.toHaveBeenCalled()
  })

  it('shows the sentence of the slide under the word', () => {
    const withSentence = buildDeck(['because'], (word) => ({
      analysis: { type: 'other' },
      sentence: { template: 'The word is {word}.', text: `The word is ${word}.` },
    }))
    render(<Slideshow deck={withSentence} index={0} onIndexChange={vi.fn()} />)
    expect(screen.getByText('The word is because.')).toHaveClass('sentence')
  })

  it('shows no sentence for a slide that has no sentence', () => {
    const { container } = renderSlideshow(0)
    expect(container.querySelector('.sentence')).toBeNull()
  })

  it('has no Exit button', () => {
    renderSlideshow(0)
    expect(screen.queryByRole('button', { name: 'Exit' })).not.toBeInTheDocument()
  })
})
