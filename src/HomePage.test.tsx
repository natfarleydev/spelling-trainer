import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DRAFT_KEY, loadDraft } from './draft'
import { HomePage, type HomePageProps } from './HomePage'
import { createMemoryNavigator } from './navigator'
import { createPresentation } from './presentation'
import { createMemoryStore, type PresentationStore } from './presentationStore'
import { brokenStorage, createMemoryStorage } from './testing/memoryStorage'

const BASE = '/spelling-trainer/'
const NOW = '2026-09-15T06:30:00.000Z'

const renderHome = (overrides: Partial<HomePageProps> = {}) => {
  const props: HomePageProps = {
    base: BASE,
    store: createMemoryStore(),
    storage: createMemoryStorage(),
    navigator: createMemoryNavigator(BASE),
    makeId: () => 'k3x9',
    now: () => NOW,
    timeZone: 'Europe/London',
    ...overrides,
  }
  return { props, user: userEvent.setup(), ...render(<HomePage {...props} />) }
}

const textbox = () => screen.getByLabelText('Type the spelling words. Put one word on each line.')
const button = (name: string) => screen.getByRole('button', { name })

describe('HomePage', () => {
  it('shows the alpha sticker', () => {
    renderHome()
    expect(screen.getByRole('note', { name: 'Alpha version' })).toHaveTextContent('Alpha')
  })

  it('shows the count of the words', async () => {
    const { user } = renderHome()
    expect(screen.getByText('0 of 10 words')).toBeInTheDocument()
    await user.type(textbox(), 'because{Enter}friend')
    expect(screen.getByText('2 of 10 words')).toBeInTheDocument()
  })

  it('disables the make button when there are no words', () => {
    renderHome()
    expect(button('Make the presentation')).toBeDisabled()
  })

  it('disables the make button and shows a warning when there are too many words', async () => {
    const { user } = renderHome()
    await user.type(textbox(), Array.from({ length: 11 }, (_, i) => `word${i}`).join('{Enter}'))
    expect(screen.getByText('11 of 10 words. Remove 1.')).toHaveClass('too-many')
    expect(button('Make the presentation')).toBeDisabled()
  })

  describe('the draft', () => {
    it('shows the saved draft when the page opens', () => {
      renderHome({ storage: createMemoryStorage({ [DRAFT_KEY]: 'because\nfriend' }) })
      expect(textbox()).toHaveValue('because\nfriend')
    })

    it('saves the words while the user types', async () => {
      const storage = createMemoryStorage()
      const { user } = renderHome({ storage })
      await user.type(textbox(), 'because')
      expect(loadDraft(storage)).toBe('because')
    })

    it('tells the user when the browser cannot keep the words', async () => {
      const { user } = renderHome({ storage: brokenStorage })
      await user.type(textbox(), 'a')
      expect(screen.getByRole('alert')).toHaveTextContent(
        'This browser cannot keep your words. Copy them before you close the page.',
      )
    })

    it('keeps the words after the user makes a presentation', async () => {
      const storage = createMemoryStorage()
      const { user } = renderHome({ storage })
      await user.type(textbox(), 'because')
      await user.click(button('Make the presentation'))
      expect(loadDraft(storage)).toBe('because')
    })
  })

  describe('Clear', () => {
    it('is disabled when the text box is empty', () => {
      renderHome()
      expect(button('Clear')).toBeDisabled()
    })

    it('removes the words from the text box and from the storage', async () => {
      const storage = createMemoryStorage({ [DRAFT_KEY]: 'because' })
      const { user } = renderHome({ storage })
      await user.click(button('Clear'))
      expect(textbox()).toHaveValue('')
      expect(loadDraft(storage)).toBe('')
      expect(screen.getByRole('status')).toHaveTextContent('Words cleared.')
    })

    it('puts the words back when the user clicks Undo', async () => {
      const storage = createMemoryStorage({ [DRAFT_KEY]: 'because\nfriend' })
      const { user } = renderHome({ storage })
      await user.click(button('Clear'))
      await user.click(button('Undo'))
      expect(textbox()).toHaveValue('because\nfriend')
      expect(loadDraft(storage)).toBe('because\nfriend')
      expect(screen.queryByRole('button', { name: 'Undo' })).not.toBeInTheDocument()
    })

    it('removes the Undo button when the user types again', async () => {
      const { user } = renderHome({ storage: createMemoryStorage({ [DRAFT_KEY]: 'because' }) })
      await user.click(button('Clear'))
      await user.type(textbox(), 'x')
      expect(screen.queryByRole('button', { name: 'Undo' })).not.toBeInTheDocument()
    })
  })

  describe('Make the presentation', () => {
    it('saves the presentation and opens its first slide', async () => {
      const store = createMemoryStore()
      const navigator = createMemoryNavigator(BASE)
      const { user } = renderHome({ store, navigator })
      await user.type(textbox(), 'because{Enter}friend')
      await user.click(button('Make the presentation'))

      expect(await store.get('k3x9')).toEqual(
        createPresentation({ id: 'k3x9', createdAt: NOW, words: ['because', 'friend'] }),
      )
      expect(navigator.pathname()).toBe('/spelling-trainer/presentations/k3x9/1')
    })

    it('shows an error and stays on the page when the save fails', async () => {
      const store: PresentationStore = { ...createMemoryStore(), save: vi.fn().mockRejectedValue(new Error('full')) }
      const navigator = createMemoryNavigator(BASE)
      const { user } = renderHome({ store, navigator })
      await user.type(textbox(), 'because')
      await user.click(button('Make the presentation'))

      expect(await screen.findByRole('alert')).toHaveTextContent('The app could not save the presentation. Try again.')
      expect(navigator.pathname()).toBe(BASE)
    })

    it('saves only one presentation when the user clicks two times', async () => {
      let finishSave = () => {}
      const save = vi.fn(() => new Promise<void>((resolve) => (finishSave = resolve)))
      const { user } = renderHome({ store: { ...createMemoryStore(), save } })
      await user.type(textbox(), 'because')
      await user.click(button('Make the presentation'))
      expect(button('Saving…')).toBeDisabled()
      await user.click(button('Saving…'))
      finishSave()
      expect(save).toHaveBeenCalledOnce()
    })
  })

  describe('the saved presentations', () => {
    it('tells the user when there are no saved presentations', async () => {
      renderHome()
      expect(await screen.findByText('You have no saved presentations yet.')).toBeInTheDocument()
    })

    it('lists the saved presentations, newest first, as links', async () => {
      const store = createMemoryStore([
        createPresentation({ id: 'old', createdAt: '2026-09-01T09:00:00.000Z', words: ['cat'] }),
        createPresentation({ id: 'new', createdAt: '2026-09-02T09:00:00.000Z', words: ['dog'] }),
      ])
      renderHome({ store })
      const list = await screen.findByRole('list', { name: 'Saved presentations' })
      const links = within(list).getAllByRole('link')
      expect(links.map((link) => link.textContent)).toEqual(['2 Sep 2026, 10:00 — dog', '1 Sep 2026, 10:00 — cat'])
      expect(links[0]).toHaveAttribute('href', '/spelling-trainer/presentations/new/1')
    })

    it('opens a presentation in the same tab when the user clicks its link', async () => {
      const store = createMemoryStore([createPresentation({ id: 'k3x9', createdAt: NOW, words: ['cat'] })])
      const navigator = createMemoryNavigator(BASE)
      const { user } = renderHome({ store, navigator })
      await user.click(await screen.findByRole('link', { name: /cat/ }))
      expect(navigator.pathname()).toBe('/spelling-trainer/presentations/k3x9/1')
    })

    it('lets the browser open a new tab when the user holds Ctrl and clicks a link', async () => {
      const store = createMemoryStore([createPresentation({ id: 'k3x9', createdAt: NOW, words: ['cat'] })])
      const navigator = createMemoryNavigator(BASE)
      const { user } = renderHome({ store, navigator })
      const link = await screen.findByRole('link', { name: /cat/ })
      await user.keyboard('{Control>}')
      await user.click(link)
      await user.keyboard('{/Control}')
      expect(navigator.pathname()).toBe(BASE)
    })
  })
})
