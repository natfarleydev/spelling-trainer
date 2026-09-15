import type { ReactNode } from 'react'
import { Link } from './Link'
import type { Navigator } from './navigator'
import { homePath } from './routes'

type MessagePageProps = {
  base: string
  navigator: Navigator
  title: string
  children: ReactNode
}

// A page that tells the user about a problem, and gives a link to the home page.
export function MessagePage({ base, navigator, title, children }: MessagePageProps) {
  return (
    <main className="message-page">
      <h1>{title}</h1>
      {children}
      <p>
        <Link navigator={navigator} href={homePath(base)}>
          All presentations
        </Link>
      </p>
    </main>
  )
}
