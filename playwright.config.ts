import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

// Call Vite with node. npx adds approximately 3 seconds, and the typecheck is a separate step.
const VITE = 'node node_modules/vite/bin/vite.js'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}/spelling-trainer/`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Test the production build, because GitHub Pages serves the production build.
  webServer: {
    command: `${VITE} build && ${VITE} preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/spelling-trainer/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
