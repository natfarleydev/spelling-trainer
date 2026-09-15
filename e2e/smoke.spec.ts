import { expect, test, type Page } from '@playwright/test'

const TEN_WORDS = [
  'because',
  'friend',
  'necessary',
  'separate',
  'believe',
  'Wednesday',
  'rhythm',
  'accommodate',
  'definitely',
  'receive',
]

async function typeWords(page: Page, words: string[]) {
  await page.getByLabel('Type the spelling words').fill(words.join('\n'))
}

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('shows the page with the alpha sticker', async ({ page }) => {
  await expect(page).toHaveTitle('Spelling trainer')
  await expect(page.getByRole('heading', { name: 'Spelling trainer' })).toBeVisible()
  await expect(page.getByText('Alpha', { exact: true })).toBeVisible()
})

test('disables the buttons when there are no words', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Show the slides' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Download PDF' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Download PPTX' })).toBeDisabled()
})

test('disables the buttons when there are more than 10 words', async ({ page }) => {
  await typeWords(page, [...TEN_WORDS, 'extra'])
  await expect(page.getByText('11 of 10 words. Remove 1.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Show the slides' })).toBeDisabled()
})

test('shows one word on each slide', async ({ page }) => {
  await typeWords(page, TEN_WORDS)
  await expect(page.getByText('10 of 10 words')).toBeVisible()
  await page.getByRole('button', { name: 'Show the slides' }).click()

  await expect(page.getByText('because', { exact: true })).toBeVisible()
  await expect(page.getByText('1 / 10')).toBeVisible()

  await page.keyboard.press('ArrowRight')
  await expect(page.getByText('friend', { exact: true })).toBeVisible()
  await expect(page.getByText('2 / 10')).toBeVisible()

  await page.keyboard.press('ArrowLeft')
  await expect(page.getByText('because', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Exit' }).click()
  await expect(page.getByLabel('Type the spelling words')).toHaveValue(TEN_WORDS.join('\n'))
})

test('does not move past the last slide', async ({ page }) => {
  await typeWords(page, ['one', 'two'])
  await page.getByRole('button', { name: 'Show the slides' }).click()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByText('two', { exact: true })).toBeVisible()
  await expect(page.getByText('2 / 2')).toBeVisible()
})

test('downloads a PDF', async ({ page }) => {
  await typeWords(page, TEN_WORDS)
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PDF' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('spelling-words.pdf')
})

test('downloads a PPTX file', async ({ page }) => {
  await typeWords(page, TEN_WORDS)
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PPTX' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('spelling-words.pptx')
})
