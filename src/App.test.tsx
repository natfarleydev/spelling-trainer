import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App, { type AppDependencies } from './App'
import { createMemoryNavigator } from './navigator'
import { createPresentation } from './presentation'
import { createMemoryStore } from './presentationStore'
import { createMemoryStorage } from './testing/memoryStorage'

const BASE = '/spelling-trainer/'

const renderApp = (start: string, overrides: Partial<AppDependencies> = {}) => {
  const dependencies: AppDependencies = {
    base: BASE,
    store: createMemoryStore([
      createPresentation({ id: 'k3x9', createdAt: '2026-09-15T06:30:00.000Z', words: ['because', 'friend'] }),
    ]),
    storage: createMemoryStorage(),
    navigator: createMemoryNavigator(start),
    downloads: { pdf: vi.fn(), pptx: vi.fn() },
    makeId: () => 'new1',
    now: () => '2026-09-16T06:30:00.000Z',
    timeZone: 'Europe/London',
    ...overrides,
  }
  return { dependencies, user: userEvent.setup(), ...render(<App dependencies={dependencies} />) }
}

describe('App', () => {
  it('shows the home page at the base path', () => {
    renderApp(BASE)
    expect(screen.getByRole('heading', { name: 'Spelling trainer' })).toBeInTheDocument()
  })

  it('shows the presentation page at a presentation path', async () => {
    renderApp(`${BASE}presentations/k3x9/2`)
    expect(await screen.findByText('friend')).toBeInTheDocument()
  })

  it('shows the not-found page at an unknown path', () => {
    renderApp(`${BASE}unknown`)
    expect(screen.getByRole('heading', { name: 'We cannot find this page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All presentations' })).toHaveAttribute('href', BASE)
  })

  it('shows the new page when the path changes', async () => {
    const { dependencies } = renderApp(BASE)
    act(() => dependencies.navigator.push(`${BASE}presentations/k3x9/1`))
    expect(await screen.findByText('because')).toBeInTheDocument()
    act(() => dependencies.navigator.back())
    expect(screen.getByRole('heading', { name: 'Spelling trainer' })).toBeInTheDocument()
  })

  it('makes a presentation, shows it, and goes back to the home page with the words kept', async () => {
    const { user, dependencies } = renderApp(BASE)
    await user.type(screen.getByLabelText('Type the spelling words. Put one word on each line.'), 'cat{Enter}dog')
    await user.click(screen.getByRole('button', { name: 'Make the presentation' }))

    expect(await screen.findByText('cat')).toBeInTheDocument()
    expect(dependencies.navigator.pathname()).toBe(`${BASE}presentations/new1/1`)

    act(() => dependencies.navigator.back())
    expect(screen.getByLabelText('Type the spelling words. Put one word on each line.')).toHaveValue('cat\ndog')
    expect(await screen.findByRole('link', { name: /cat, dog/ })).toBeInTheDocument()
  })
})
