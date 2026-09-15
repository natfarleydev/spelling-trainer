import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { createMemoryNavigator } from './navigator'
import { createPresentation } from './presentation'
import { PresentationPage, type Downloads, type PresentationPageProps } from './PresentationPage'
import { createMemoryStore } from './presentationStore'

const BASE = '/spelling-trainer/'
const presentation = createPresentation({
  id: 'k3x9',
  createdAt: '2026-09-15T06:30:00.000Z',
  words: ['because', 'friend', 'necessary'],
})

const fakeDownloads = (overrides: Partial<Downloads> = {}): Downloads => ({
  pdf: vi.fn().mockResolvedValue(undefined),
  pptx: vi.fn().mockResolvedValue(undefined),
  ...overrides,
})

const renderPage = (overrides: Partial<PresentationPageProps> = {}) => {
  const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
  const props: PresentationPageProps = {
    base: BASE,
    id: 'k3x9',
    slide: 1,
    store: createMemoryStore([presentation]),
    navigator,
    downloads: fakeDownloads(),
    ...overrides,
  }
  return { props, user: userEvent.setup(), ...render(<PresentationPage {...props} />) }
}

const button = (name: string) => screen.getByRole('button', { name })

describe('PresentationPage', () => {
  it('shows a loading message before the presentation loads', () => {
    renderPage()
    expect(screen.getByRole('status')).toHaveTextContent('Loading the presentation…')
  })

  it('shows the word of the slide in the URL', async () => {
    renderPage({ slide: 2 })
    expect(await screen.findByText('friend')).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('tells the user when the presentation does not exist', async () => {
    renderPage({ id: 'unknown' })
    expect(await screen.findByRole('heading', { name: 'We cannot find this presentation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All presentations' })).toHaveAttribute('href', BASE)
  })

  it('tells the user when the browser cannot load the presentation', async () => {
    const store = { ...createMemoryStore(), get: vi.fn().mockRejectedValue(new Error('blocked')) }
    renderPage({ store })
    expect(await screen.findByRole('heading', { name: 'We cannot open this presentation' })).toBeInTheDocument()
    expect(screen.getByText('Reload the page to try again.')).toBeInTheDocument()
  })

  it('changes the URL to slide 1 when the URL has no slide number', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9`)
    renderPage({ slide: null, navigator })
    await screen.findByText('because')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  it('changes the URL to the last slide when the slide number is too large', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/99`)
    renderPage({ slide: 99, navigator })
    await screen.findByText('necessary')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/3`)
  })

  it('replaces the URL when the slide changes, so that Back goes to the previous page', async () => {
    const navigator = createMemoryNavigator(BASE)
    navigator.push(`${BASE}presentations/k3x9/1`)
    const { user } = renderPage({ navigator })
    await screen.findByText('because')
    await user.click(button('Next slide'))
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/2`)
    navigator.back()
    expect(navigator.pathname()).toBe(BASE)
  })

  it('moves between the slides with the keyboard', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user } = renderPage({ navigator })
    await screen.findByText('because')
    await user.keyboard('{ArrowRight}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/2`)
    await user.keyboard('{ArrowLeft}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  it('does nothing when the user pushes the Escape key', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/2`)
    const { user } = renderPage({ slide: 2, navigator })
    await screen.findByText('friend')
    await user.keyboard('{Escape}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/2`)
    expect(screen.getByText('friend')).toBeInTheDocument()
  })

  it('does not change the slide when the user pushes the space bar on a focused button', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user, props } = renderPage({ navigator })
    await screen.findByText('because')
    button('Download PDF').focus()
    await user.keyboard(' ')
    expect(props.downloads.pdf).toHaveBeenCalledOnce()
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  it('has a link to all the presentations', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user } = renderPage({ navigator })
    await screen.findByText('because')
    await user.click(screen.getByRole('link', { name: 'All presentations' }))
    expect(navigator.pathname()).toBe(BASE)
  })

  it('removes its keyboard listener when it is removed', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user, unmount } = renderPage({ navigator })
    await screen.findByText('because')
    unmount()
    await user.keyboard('{ArrowRight}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  describe('downloads', () => {
    it('gives the deck to the PDF download', async () => {
      const { user, props } = renderPage()
      await screen.findByText('because')
      await user.click(button('Download PDF'))
      expect(props.downloads.pdf).toHaveBeenCalledWith(presentation.deck)
      expect(props.downloads.pptx).not.toHaveBeenCalled()
    })

    it('gives the deck to the PPTX download', async () => {
      const { user, props } = renderPage()
      await screen.findByText('because')
      await user.click(button('Download PPTX'))
      expect(props.downloads.pptx).toHaveBeenCalledWith(presentation.deck)
      expect(props.downloads.pdf).not.toHaveBeenCalled()
    })

    it('shows an error when a download fails, and removes it when the next download starts', async () => {
      const pdf = vi.fn().mockRejectedValueOnce(new Error('no')).mockResolvedValue(undefined)
      const { user } = renderPage({ downloads: fakeDownloads({ pdf }) })
      await screen.findByText('because')
      await user.click(button('Download PDF'))
      expect(await screen.findByRole('alert')).toHaveTextContent('The download failed. Try again.')
      await user.click(button('Download PDF'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
