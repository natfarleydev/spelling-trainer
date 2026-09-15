/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves the app from the /spelling-trainer/ path.
  base: '/spelling-trainer/',
  plugins: [react()],
  test: {
    // Vitest runs only the unit tests. Playwright runs the tests in the e2e folder.
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
