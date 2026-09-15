import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { type AppDependencies } from './App'
import { makeId } from './presentation'
import { createBrowserNavigator } from './navigator'
import { downloadPdf } from './pdf'
import { downloadPptx } from './pptx'
import { createIdbStore } from './presentationStore'
import { restoredPath } from './spaRedirect'
import './index.css'

// This file is the imperative shell. It makes the real dependencies and gives them to the app.

const base = import.meta.env.BASE_URL

// Restore the path that 404.html saved, before the app reads the path.
const path = restoredPath(window.location, base)
if (path !== null) window.history.replaceState(null, '', path)

const safeLocalStorage = (): Storage | null => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const ID_LENGTH = 10

const dependencies: AppDependencies = {
  base,
  store: createIdbStore(),
  // If the browser refuses localStorage, the draft functions get a storage that fails. The page tells the user.
  storage: safeLocalStorage() ?? {
    getItem: () => {
      throw new Error('localStorage is not available')
    },
    setItem: () => {
      throw new Error('localStorage is not available')
    },
    removeItem: () => {
      throw new Error('localStorage is not available')
    },
  },
  navigator: createBrowserNavigator(window),
  downloads: { pdf: downloadPdf, pptx: downloadPptx },
  makeId: () => makeId(crypto.getRandomValues(new Uint8Array(ID_LENGTH))),
  now: () => new Date().toISOString(),
  timeZone: undefined,
  version: import.meta.env.VITE_APP_VERSION,
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App dependencies={dependencies} />
  </StrictMode>,
)
