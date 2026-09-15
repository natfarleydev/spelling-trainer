import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildDeck } from './deck'
import { screenFontSize } from './fontSize'
import { Slideshow } from './Slideshow'

const deck = buildDeck(['because', 'friend', 'necessary'])

const renderSlideshow = () => {
  const onExit = vi.fn()
  return { onExit, user: userEvent.setup(), ...render(<Slideshow deck={deck} onExit={onExit} />) }
}

const button = (name: string) => screen.getByRole('button', { name })

// Make the document act as if the browser shows the page in full screen.
const enterFakeFullscreen = () => {
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => document.body })
  const exitFullscreen = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(document, 'exitFullscreen', { configurable: true, value: exitFullscreen })
  return exitFullscreen
}

afterEach(() => {
  Reflect.deleteProperty(document, 'fullscreenElement')
  Reflect.deleteProperty(document, 'exitFullscreen')
})

describe('Slideshow', () => {
  it('shows the first word and the slide number', () => {
    renderSlideshow()
    expect(screen.getByText('because')).toBeInTheDocument()
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('shows only one word at a time', () => {
    renderSlideshow()
    expect(screen.queryByText('friend')).not.toBeInTheDocument()
  })

  it('gives the word the screen font size', () => {
    renderSlideshow()
    expect(screen.getByText('because').getAttribute('style')).toContain(screenFontSize('because'))
  })

  it('moves to the next slide and to the previous slide with the buttons', async () => {
    const { user } = renderSlideshow()
    await user.click(button('Next slide'))
    expect(screen.getByText('friend')).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    await user.click(button('Previous slide'))
    expect(screen.getByText('because')).toBeInTheDocument()
  })

  it('moves to the next slide when the user clicks the slide', async () => {
    const { user } = renderSlideshow()
    await user.click(screen.getByText('because'))
    expect(screen.getByText('friend')).toBeInTheDocument()
  })

  it('moves between the slides with the keyboard', async () => {
    const { user } = renderSlideshow()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('friend')).toBeInTheDocument()
    await user.keyboard(' ')
    expect(screen.getByText('necessary')).toBeInTheDocument()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('friend')).toBeInTheDocument()
  })

  it('stops the default browser action for a navigation key', () => {
    renderSlideshow()
    const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true })
    window.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })

  it('does not stop the default browser action for a different key', () => {
    renderSlideshow()
    const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true })
    window.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('disables the previous button on the first slide', () => {
    renderSlideshow()
    expect(button('Previous slide')).toBeDisabled()
    expect(button('Next slide')).toBeEnabled()
  })

  it('disables the next button on the last slide', async () => {
    const { user } = renderSlideshow()
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')
    expect(screen.getByText('necessary')).toBeInTheDocument()
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
    expect(button('Next slide')).toBeDisabled()
    expect(button('Previous slide')).toBeEnabled()
  })

  it('calls onExit when the user pushes the Escape key', async () => {
    const { user, onExit } = renderSlideshow()
    await user.keyboard('{Escape}')
    expect(onExit).toHaveBeenCalledOnce()
  })

  it('calls onExit when the user clicks Exit and the page is not in full screen', async () => {
    const { user, onExit } = renderSlideshow()
    await user.click(button('Exit'))
    expect(onExit).toHaveBeenCalledOnce()
  })

  it('stops full screen when the user clicks Exit in full screen', async () => {
    const { user, onExit } = renderSlideshow()
    const exitFullscreen = enterFakeFullscreen()
    await user.click(button('Exit'))
    expect(exitFullscreen).toHaveBeenCalledOnce()
    // The fullscreenchange event calls onExit later.
    expect(onExit).not.toHaveBeenCalled()
  })

  it('calls onExit when the browser stops full screen', () => {
    const { onExit } = renderSlideshow()
    fireEvent(document, new Event('fullscreenchange'))
    expect(onExit).toHaveBeenCalledOnce()
  })

  it('does not call onExit when the browser starts full screen', () => {
    const { onExit } = renderSlideshow()
    enterFakeFullscreen()
    fireEvent(document, new Event('fullscreenchange'))
    expect(onExit).not.toHaveBeenCalled()
  })

  it('removes its listeners when it is removed', async () => {
    const { user, onExit, unmount } = renderSlideshow()
    unmount()
    await user.keyboard('{Escape}')
    fireEvent(document, new Event('fullscreenchange'))
    expect(onExit).not.toHaveBeenCalled()
  })
})
