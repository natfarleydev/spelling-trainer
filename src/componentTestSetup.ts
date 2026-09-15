import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Remove the rendered components after each test. This keeps each test isolated.
afterEach(cleanup)
