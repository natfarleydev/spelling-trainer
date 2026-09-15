/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves the app from the /spelling-trainer/ path.
  base: '/spelling-trainer/',
  plugins: [react()],
  test: {
    // Vitest runs only the tests in src. Playwright runs the tests in the e2e folder.
    projects: [
      {
        extends: true,
        test: {
          // The pure units do not need a DOM. The node environment keeps these tests fast.
          name: 'unit',
          include: ['src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'component',
          include: ['src/**/*.test.tsx'],
          environment: 'jsdom',
          setupFiles: ['./src/componentTestSetup.ts'],
        },
      },
    ],
  },
})
