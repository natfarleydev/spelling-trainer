import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const LOCAL_URL = `http://localhost:${PORT}/spelling-trainer/`

// Set BASE_URL to test a deployed site. Then Playwright does not start a local server.
// Example: BASE_URL=https://natfarleydev.github.io/spelling-trainer/
const deployedUrl = process.env.BASE_URL
const baseURL = deployedUrl ? (deployedUrl.endsWith('/') ? deployedUrl : `${deployedUrl}/`) : LOCAL_URL

// Call Vite with node. npx adds approximately 3 seconds, and the typecheck is a separate step.
const VITE = 'node node_modules/vite/bin/vite.js'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Test the production build, because GitHub Pages serves the production build.
  webServer: deployedUrl
    ? undefined
    : {
        command: `${VITE} build && ${VITE} preview --port ${PORT} --strictPort`,
        url: LOCAL_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
