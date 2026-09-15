import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { buildDeck } from './deck'
import { screenFontSize } from './fontSize'
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

  it('gives the word the screen font size', () => {
    renderSlideshow(0)
    expect(screen.getByText('because').getAttribute('style')).toContain(screenFontSize('because'))
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

  it('has no Exit button', () => {
    renderSlideshow(0)
    expect(screen.queryByRole('button', { name: 'Exit' })).not.toBeInTheDocument()
  })
})
