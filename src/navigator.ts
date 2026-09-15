// A small interface for the browser history. The components use it, so that the tests can give a memory version.
export type Navigator = {
  readonly pathname: () => string
  // Add a history entry.
  readonly push: (path: string) => void
  // Replace the current history entry.
  readonly replace: (path: string) => void
  readonly back: () => void
  // The listener runs after each change of the path. The result removes the listener.
  readonly subscribe: (listener: () => void) => () => void
}

const createListeners = () => {
  const listeners = new Set<() => void>()
  return {
    add: (listener: () => void) => void listeners.add(listener),
    remove: (listener: () => void) => void listeners.delete(listener),
    notify: () => listeners.forEach((listener) => listener()),
  }
}

// The window methods that the browser navigator uses.
export type BrowserWindow = {
  readonly location: { readonly pathname: string }
  readonly history: {
    pushState: (data: unknown, unused: string, url: string) => void
    replaceState: (data: unknown, unused: string, url: string) => void
    back: () => void
  }
  addEventListener: (type: 'popstate', listener: () => void) => void
  removeEventListener: (type: 'popstate', listener: () => void) => void
}

export const createBrowserNavigator = (win: BrowserWindow): Navigator => {
  const listeners = createListeners()
  return {
    pathname: () => win.location.pathname,
    push: (path) => {
      win.history.pushState(null, '', path)
      listeners.notify()
    },
    replace: (path) => {
      win.history.replaceState(null, '', path)
      listeners.notify()
    },
    back: () => win.history.back(),
    subscribe: (listener) => {
      listeners.add(listener)
      // The browser sends popstate for the Back and Forward buttons.
      win.addEventListener('popstate', listener)
      return () => {
        listeners.remove(listener)
        win.removeEventListener('popstate', listener)
      }
    },
  }
}

export const createMemoryNavigator = (start: string): Navigator => {
  const listeners = createListeners()
  let entries: readonly string[] = [start]
  const change = (next: readonly string[]) => {
    entries = next
    listeners.notify()
  }
  return {
    pathname: () => entries[entries.length - 1],
    push: (path) => change([...entries, path]),
    replace: (path) => change([...entries.slice(0, -1), path]),
    back: () => {
      if (entries.length > 1) change(entries.slice(0, -1))
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.remove(listener)
    },
  }
}
