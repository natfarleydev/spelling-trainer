import { useSyncExternalStore } from 'react'
import type { TextStorage } from './draft'
import { HomePage } from './HomePage'
import { MessagePage } from './MessagePage'
import type { Navigator } from './navigator'
import { PresentationPage, type Downloads } from './PresentationPage'
import type { PresentationStore } from './presentationStore'
import { parseRoute, type Route } from './routes'
import type { TagWord } from './sentences/wordType'

// All the side effects that the app uses. main.tsx gives the real ones. The tests give fakes.
export type AppDependencies = {
  base: string
  store: PresentationStore
  storage: TextStorage
  navigator: Navigator
  downloads: Downloads
  makeId: () => string
  now: () => string
  timeZone: string | undefined
  // The commit SHA of the build.
  version: string
  // Load the part-of-speech tagger for the sentences.
  loadTagger: () => Promise<TagWord>
  // Give a number from 0 to 1, to choose the sentences.
  random: () => number
}

function RoutePage({ route, dependencies }: { route: Route; dependencies: AppDependencies }) {
  const { base, navigator } = dependencies
  switch (route.name) {
    case 'home':
      return <HomePage {...dependencies} />
    case 'presentation':
      // The key makes a new page for a different presentation, so that no state stays from the previous one.
      return (
        <PresentationPage
          key={route.id}
          base={base}
          id={route.id}
          slide={route.slide}
          store={dependencies.store}
          navigator={navigator}
          downloads={dependencies.downloads}
          loadTagger={dependencies.loadTagger}
          random={dependencies.random}
        />
      )
    case 'notFound':
      return (
        <MessagePage base={base} navigator={navigator} title="We cannot find this page">
          <p>The address can be incorrect.</p>
        </MessagePage>
      )
  }
}

export default function App({ dependencies }: { dependencies: AppDependencies }) {
  const { base, navigator } = dependencies
  const pathname = useSyncExternalStore(navigator.subscribe, navigator.pathname)

  return (
    <>
      <RoutePage route={parseRoute(pathname, base)} dependencies={dependencies} />
      {/* The deployment check reads the build version. The user does not see it. */}
      <div hidden data-testid="app-version" data-version={dependencies.version} />
    </>
  )
}
