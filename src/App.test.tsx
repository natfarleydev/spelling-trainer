import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App, { type Downloads } from './App'
import { buildDeck } from './deck'

const fakeDownloads = (overrides: Partial<Downloads> = {}): Downloads => ({
  pdf: vi.fn().mockResolvedValue(undefined),
  pptx: vi.fn().mockResolvedValue(undefined),
  ...overrides,
})

const renderApp = (downloads = fakeDownloads()) => ({
  user: userEvent.setup(),
  downloads,
  ...render(<App downloads={downloads} />),
})

const textbox = () => screen.getByLabelText('Type the spelling words. Put one word on each line.')
const button = (name: string) => screen.getByRole('button', { name })

describe('App', () => {
  it('shows the alpha sticker', () => {
    renderApp()
    expect(screen.getByRole('note', { name: 'Alpha version' })).toHaveTextContent('Alpha')
  })

  it('disables all the buttons when there are no words', () => {
    renderApp()
    expect(screen.getByText('0 of 10 words')).toBeInTheDocument()
    expect(button('Show the slides')).toBeDisabled()
    expect(button('Download PDF')).toBeDisabled()
    expect(button('Download PPTX')).toBeDisabled()
  })

  it('enables all the buttons when there are words', async () => {
    const { user } = renderApp()
    await user.type(textbox(), 'because{Enter}friend')
    expect(screen.getByText('2 of 10 words')).toBeInTheDocument()
    expect(button('Show the slides')).toBeEnabled()
    expect(button('Download PDF')).toBeEnabled()
    expect(button('Download PPTX')).toBeEnabled()
  })

  it('disables all the buttons and shows a warning when there are too many words', async () => {
    const { user } = renderApp()
    await user.type(textbox(), Array.from({ length: 11 }, (_, i) => `word${i}`).join('{Enter}'))
    expect(screen.getByText('11 of 10 words. Remove 1.')).toHaveClass('too-many')
    expect(button('Show the slides')).toBeDisabled()
    expect(button('Download PDF')).toBeDisabled()
    expect(button('Download PPTX')).toBeDisabled()
  })

  it('gives the deck to the PDF download', async () => {
    const { user, downloads } = renderApp()
    await user.type(textbox(), 'because{Enter}friend')
    await user.click(button('Download PDF'))
    expect(downloads.pdf).toHaveBeenCalledWith(buildDeck(['because', 'friend']))
    expect(downloads.pptx).not.toHaveBeenCalled()
  })

  it('gives the deck to the PPTX download', async () => {
    const { user, downloads } = renderApp()
    await user.type(textbox(), 'because')
    await user.click(button('Download PPTX'))
    expect(downloads.pptx).toHaveBeenCalledWith(buildDeck(['because']))
    expect(downloads.pdf).not.toHaveBeenCalled()
  })

  it('shows an error when a download fails', async () => {
    const { user } = renderApp(fakeDownloads({ pdf: vi.fn().mockRejectedValue(new Error('no')) }))
    await user.type(textbox(), 'because')
    await user.click(button('Download PDF'))
    expect(await screen.findByText('The download failed. Try again.')).toHaveClass('error')
  })

  it('removes the error when the next download starts', async () => {
    const pdf = vi.fn().mockRejectedValueOnce(new Error('no')).mockResolvedValue(undefined)
    const { user } = renderApp(fakeDownloads({ pdf }))
    await user.type(textbox(), 'because')
    await user.click(button('Download PDF'))
    await screen.findByText('The download failed. Try again.')
    await user.click(button('Download PDF'))
    expect(screen.queryByText('The download failed. Try again.')).not.toBeInTheDocument()
  })

  it('shows the slides, then shows the same words again after exit', async () => {
    const { user } = renderApp()
    await user.type(textbox(), 'because{Enter}friend')
    await user.click(button('Show the slides'))

    expect(screen.getByText('because')).toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
    expect(screen.queryByRole('note', { name: 'Alpha version' })).not.toBeInTheDocument()

    await user.click(button('Exit'))
    expect(textbox()).toHaveValue('because\nfriend')
  })
})
