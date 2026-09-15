import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { createMemoryNavigator } from './navigator'
import { createPresentation, type Presentation } from './presentation'
import { PresentationPage, type Downloads, type PresentationPageProps } from './PresentationPage'
import { createMemoryStore } from './presentationStore'
import { bankSentences } from './sentences/bank'
import { fillTemplate, TEMPLATES } from './sentences/sentence'
import { makeSlideSentence } from './sentences/slideSentence'
import type { TagWord } from './sentences/wordType'

const BASE = '/spelling-trainer/'
const nounTagger: TagWord = () => ['Noun', 'Singular']
const presentation = createPresentation({
  id: 'k3x9',
  createdAt: '2026-09-15T06:30:00.000Z',
  words: ['because', 'zebra', 'necessary'],
  makeSentence: makeSlideSentence({ tagWord: nounTagger, random: () => 0, bankSentences }),
})
const NO_MEANING_NOTE = 'This simple sentence does not show what the word means.'
const nounSentence = (index: number, word: string) => fillTemplate(TEMPLATES['noun.singular'][index], word)
// The sentence has the word under test in a separate element, so the tests compare the full text of the sentence element.
const sentenceMatcher = (text: string) => (_: string, element: Element | null) =>
  element?.classList.contains('sentence') === true && element.textContent === text
const findSentence = (text: string) => screen.findByText(sentenceMatcher(text))
const getSentence = (text: string) => screen.getByText(sentenceMatcher(text))

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
    loadTagger: async () => nounTagger,
    random: () => 0,
    ...overrides,
  }
  return { props, user: userEvent.setup(), ...render(<PresentationPage {...props} />) }
}

const button = (name: string) => screen.getByRole('button', { name })
// The word is also in the sentence, so the tests find the slide word by its class.
const WORD = { selector: '.word' }
const typeSelector = () => screen.getByRole('combobox', { name: 'Word type' })

describe('PresentationPage', () => {
  it('shows a loading message before the presentation loads', () => {
    renderPage()
    expect(screen.getByRole('status')).toHaveTextContent('Loading the presentation…')
  })

  it('shows the word of the slide in the URL', async () => {
    renderPage({ slide: 2 })
    expect(await screen.findByText('zebra', WORD)).toBeInTheDocument()
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
    await screen.findByText('because', WORD)
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  it('changes the URL to the last slide when the slide number is too large', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/99`)
    renderPage({ slide: 99, navigator })
    await screen.findByText('necessary', WORD)
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/3`)
  })

  it('replaces the URL when the slide changes, so that Back goes to the previous page', async () => {
    const navigator = createMemoryNavigator(BASE)
    navigator.push(`${BASE}presentations/k3x9/1`)
    const { user } = renderPage({ navigator })
    await screen.findByText('because', WORD)
    await user.click(button('Next slide'))
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/2`)
    navigator.back()
    expect(navigator.pathname()).toBe(BASE)
  })

  it('moves between the slides with the keyboard', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user } = renderPage({ navigator })
    await screen.findByText('because', WORD)
    await user.keyboard('{ArrowRight}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/2`)
    await user.keyboard('{ArrowLeft}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  it('does nothing when the user pushes the Escape key', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/2`)
    const { user } = renderPage({ slide: 2, navigator })
    await screen.findByText('zebra', WORD)
    await user.keyboard('{Escape}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/2`)
    expect(screen.getByText('zebra', WORD)).toBeInTheDocument()
  })

  it('does not change the slide when the user pushes the space bar on a focused button', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user, props } = renderPage({ navigator })
    await screen.findByText('because', WORD)
    button('Download PDF').focus()
    await user.keyboard(' ')
    expect(props.downloads.pdf).toHaveBeenCalledOnce()
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  it('has a link to all the presentations', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user } = renderPage({ navigator })
    await screen.findByText('because', WORD)
    await user.click(screen.getByRole('link', { name: 'All presentations' }))
    expect(navigator.pathname()).toBe(BASE)
  })

  it('removes its keyboard listener when it is removed', async () => {
    const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
    const { user, unmount } = renderPage({ navigator })
    await screen.findByText('because', WORD)
    unmount()
    await user.keyboard('{ArrowRight}')
    expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
  })

  describe('sentences', () => {
    it('shows the sentence of the slide under the word', async () => {
      renderPage()
      expect(await findSentence(nounSentence(0, 'because'))).toHaveClass('sentence')
    })

    it('tells the user when the sentence does not show the meaning of the word', async () => {
      renderPage()
      await findSentence(nounSentence(0, 'because'))
      expect(screen.getByText(NO_MEANING_NOTE)).toBeInTheDocument()
    })

    it('does not show the note for a sentence from the word bank', async () => {
      renderPage({ slide: 3 })
      await findSentence(bankSentences('necessary')[0])
      expect(screen.queryByText(NO_MEANING_NOTE)).not.toBeInTheDocument()
    })

    it('shows the word type of the slide in the selector', async () => {
      renderPage()
      await screen.findByText('because', WORD)
      expect(typeSelector()).toHaveValue('noun')
    })

    it('gives the slide a new sentence and saves it', async () => {
      const store = createMemoryStore([presentation])
      const { user } = renderPage({ store })
      await findSentence(nounSentence(0, 'because'))

      await user.click(button('New sentence'))

      expect(await findSentence(nounSentence(1, 'because'))).toBeInTheDocument()
      expect((await store.get('k3x9'))?.deck[0].sentence?.text).toBe(nounSentence(1, 'because'))
      expect(screen.getByRole('status')).toHaveTextContent('Saved.')
    })

    it('changes only the current slide', async () => {
      const store = createMemoryStore([presentation])
      const { user } = renderPage({ store, slide: 2 })
      await findSentence(nounSentence(0, 'zebra'))

      await user.click(button('New sentence'))

      await findSentence(nounSentence(1, 'zebra'))
      const saved = await store.get('k3x9')
      expect(saved?.deck[0]).toEqual(presentation.deck[0])
      expect(saved?.deck[2]).toEqual(presentation.deck[2])
    })

    it('changes the word type, gives a sentence for the new type and saves it', async () => {
      const store = createMemoryStore([presentation])
      const { user } = renderPage({ store })
      await findSentence(nounSentence(0, 'because'))

      await user.selectOptions(typeSelector(), 'verb')

      const verbSentence = fillTemplate(TEMPLATES['verb.infinitive.transitive'][0], 'because')
      expect(await findSentence(verbSentence)).toBeInTheDocument()
      expect(typeSelector()).toHaveValue('verb')
      expect((await store.get('k3x9'))?.deck[0].analysis).toEqual({ type: 'verb', form: 'infinitive', transitive: true })
    })

    it('shows an error and keeps the sentence when the change cannot be saved', async () => {
      const store = { ...createMemoryStore([presentation]), save: vi.fn().mockRejectedValue(new Error('full')) }
      const { user } = renderPage({ store })
      await findSentence(nounSentence(0, 'because'))

      await user.click(button('New sentence'))

      expect(await screen.findByRole('alert')).toHaveTextContent('The app could not save the change. Try again.')
      expect(getSentence(nounSentence(0, 'because'))).toBeInTheDocument()
    })

    it('makes a sentence with the tagger for a slide from schema version 1', async () => {
      const old: Presentation = {
        schemaVersion: 1,
        id: 'old1',
        createdAt: presentation.createdAt,
        words: ['zebra'],
        deck: [{ word: 'zebra' }],
      }
      const loadTagger = vi.fn(async () => nounTagger)
      const { user, container } = renderPage({ id: 'old1', store: createMemoryStore([old]), loadTagger })
      await screen.findByText('zebra', WORD)
      expect(container.querySelector('.sentence')).toBeNull()

      await user.click(button('New sentence'))

      expect(await findSentence(nounSentence(0, 'zebra'))).toBeInTheDocument()
      expect(loadTagger).toHaveBeenCalledOnce()
    })

    it('does not change the slide when the user pushes an arrow key in the word type selector', async () => {
      const navigator = createMemoryNavigator(`${BASE}presentations/k3x9/1`)
      const { user } = renderPage({ navigator })
      await screen.findByText('because', WORD)
      typeSelector().focus()
      await user.keyboard('{ArrowRight}')
      expect(navigator.pathname()).toBe(`${BASE}presentations/k3x9/1`)
    })
  })

  describe('downloads', () => {
    it('gives the deck to the PDF download', async () => {
      const { user, props } = renderPage()
      await screen.findByText('because', WORD)
      await user.click(button('Download PDF'))
      expect(props.downloads.pdf).toHaveBeenCalledWith(presentation.deck)
      expect(props.downloads.pptx).not.toHaveBeenCalled()
    })

    it('gives the deck to the PPTX download', async () => {
      const { user, props } = renderPage()
      await screen.findByText('because', WORD)
      await user.click(button('Download PPTX'))
      expect(props.downloads.pptx).toHaveBeenCalledWith(presentation.deck)
      expect(props.downloads.pdf).not.toHaveBeenCalled()
    })

    it('shows an error when a download fails, and removes it when the next download starts', async () => {
      const pdf = vi.fn().mockRejectedValueOnce(new Error('no')).mockResolvedValue(undefined)
      const { user } = renderPage({ downloads: fakeDownloads({ pdf }) })
      await screen.findByText('because', WORD)
      await user.click(button('Download PDF'))
      expect(await screen.findByRole('alert')).toHaveTextContent('The download failed. Try again.')
      await user.click(button('Download PDF'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
