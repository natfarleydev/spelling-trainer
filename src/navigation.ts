export type NavigationAction = 'next' | 'previous'

// The Escape key has no action, so that the user cannot close a presentation by accident.
const KEY_ACTIONS: Readonly<Record<string, NavigationAction>> = {
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageDown: 'next',
  ' ': 'next',
  ArrowLeft: 'previous',
  ArrowUp: 'previous',
  PageUp: 'previous',
}

// Give the navigation action for a keyboard key. Give null if the key has no action.
export const keyToAction = (key: string): NavigationAction | null =>
  Object.hasOwn(KEY_ACTIONS, key) ? KEY_ACTIONS[key] : null

// Give the index of the next slide. Stay on the last slide.
export const nextIndex = (index: number, count: number): number => Math.max(0, Math.min(index + 1, count - 1))

// Give the index of the previous slide. Stay on the first slide.
export const previousIndex = (index: number): number => Math.max(index - 1, 0)
