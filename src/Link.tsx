import type { MouseEvent, ReactNode } from 'react'
import type { Navigator } from './navigator'

type LinkProps = {
  navigator: Navigator
  href: string
  className?: string
  children: ReactNode
}

// A link that opens the page in the same tab without a reload.
// It keeps the normal browser behavior for a middle click and for Ctrl, Cmd, Shift or Alt with a click.
export function Link({ navigator, href, className, children }: LinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigator.push(href)
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}
