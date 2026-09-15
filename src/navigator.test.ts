import { describe, expect, it, vi } from 'vitest'
import { createBrowserNavigator, createMemoryNavigator, type BrowserWindow } from './navigator'

describe('createMemoryNavigator', () => {
  it('gives the start path', () => {
    expect(createMemoryNavigator('/a').pathname()).toBe('/a')
  })

  it.each(['push', 'replace'] as const)('changes the path and tells the listeners on %s', (method) => {
    const navigator = createMemoryNavigator('/a')
    const listener = vi.fn()
    navigator.subscribe(listener)
    navigator[method]('/b')
    expect(navigator.pathname()).toBe('/b')
    expect(listener).toHaveBeenCalledOnce()
  })

  it('goes back to the previous path after push, but not after replace', () => {
    const navigator = createMemoryNavigator('/a')
    navigator.push('/b')
    navigator.replace('/c')
    navigator.back()
    expect(navigator.pathname()).toBe('/a')
  })

  it('stops telling a listener after unsubscribe', () => {
    const navigator = createMemoryNavigator('/a')
    const listener = vi.fn()
    const unsubscribe = navigator.subscribe(listener)
    unsubscribe()
    navigator.push('/b')
    expect(listener).not.toHaveBeenCalled()
  })
})

// A fake window that records the history calls and keeps the popstate listeners.
const fakeWindow = () => {
  const popstateListeners = new Set<() => void>()
  const win = {
    location: { pathname: '/a' },
    history: {
      pushState: vi.fn((_state: unknown, _unused: string, path: string) => {
        win.location.pathname = path
      }),
      replaceState: vi.fn((_state: unknown, _unused: string, path: string) => {
        win.location.pathname = path
      }),
      back: vi.fn(),
    },
    addEventListener: (_type: 'popstate', listener: () => void) => void popstateListeners.add(listener),
    removeEventListener: (_type: 'popstate', listener: () => void) => void popstateListeners.delete(listener),
  } satisfies BrowserWindow
  const popstate = (pathname: string) => {
    win.location.pathname = pathname
    popstateListeners.forEach((listener) => listener())
  }
  return { win, popstate, popstateListeners }
}

describe('createBrowserNavigator', () => {
  it('reads the path from the location', () => {
    expect(createBrowserNavigator(fakeWindow().win).pathname()).toBe('/a')
  })

  it('adds a history entry on push and tells the listeners', () => {
    const { win } = fakeWindow()
    const navigator = createBrowserNavigator(win)
    const listener = vi.fn()
    navigator.subscribe(listener)
    navigator.push('/b')
    expect(win.history.pushState).toHaveBeenCalledWith(null, '', '/b')
    expect(listener).toHaveBeenCalledOnce()
  })

  it('replaces the history entry on replace and tells the listeners', () => {
    const { win } = fakeWindow()
    const navigator = createBrowserNavigator(win)
    const listener = vi.fn()
    navigator.subscribe(listener)
    navigator.replace('/b')
    expect(win.history.replaceState).toHaveBeenCalledWith(null, '', '/b')
    expect(listener).toHaveBeenCalledOnce()
  })

  it('asks the browser to go back', () => {
    const { win } = fakeWindow()
    createBrowserNavigator(win).back()
    expect(win.history.back).toHaveBeenCalledOnce()
  })

  it('tells the listeners when the browser changes the path', () => {
    const { win, popstate } = fakeWindow()
    const navigator = createBrowserNavigator(win)
    const listener = vi.fn()
    navigator.subscribe(listener)
    popstate('/c')
    expect(listener).toHaveBeenCalledOnce()
    expect(navigator.pathname()).toBe('/c')
  })

  it('removes the popstate listener after unsubscribe', () => {
    const { win, popstateListeners } = fakeWindow()
    const unsubscribe = createBrowserNavigator(win).subscribe(vi.fn())
    expect(popstateListeners.size).toBe(1)
    unsubscribe()
    expect(popstateListeners.size).toBe(0)
  })
})
