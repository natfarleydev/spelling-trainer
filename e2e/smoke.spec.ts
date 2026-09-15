import { expect, test, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'

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

const textbox = (page: Page) => page.getByLabel('Type the spelling words. Put one word on each line.')

async function makePresentation(page: Page, words: string[]) {
  await textbox(page).fill(words.join('\n'))
  await page.getByRole('button', { name: 'Make the presentation' }).click()
  await expect(page).toHaveURL(/\/spelling-trainer\/presentations\/[a-z2-9]{10}\/1$/)
}

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('shows the home page with the alpha sticker', async ({ page }) => {
  await expect(page).toHaveTitle('Spelling trainer')
  await expect(page.getByRole('heading', { name: 'Spelling trainer' })).toBeVisible()
  await expect(page.getByRole('note', { name: 'Alpha version' })).toBeVisible()
  await expect(page.getByText('You have no saved presentations yet.')).toBeVisible()
  await page.screenshot({ path: 'test-results/screenshots/home.png', fullPage: true })
})

test('disables the make button when there are more than 10 words', async ({ page }) => {
  await textbox(page).fill([...TEN_WORDS, 'extra'].join('\n'))
  await expect(page.getByText('11 of 10 words. Remove 1.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Make the presentation' })).toBeDisabled()
})

test('keeps the words after a reload, until the user clicks Clear', async ({ page }) => {
  await textbox(page).fill('because\nfriend')
  await page.reload()
  await expect(textbox(page)).toHaveValue('because\nfriend')

  await page.getByRole('button', { name: 'Clear' }).click()
  await expect(textbox(page)).toHaveValue('')
  await page.getByRole('button', { name: 'Undo' }).click()
  await expect(textbox(page)).toHaveValue('because\nfriend')

  await page.getByRole('button', { name: 'Clear' }).click()
  await page.reload()
  await expect(textbox(page)).toHaveValue('')
})

test('makes a presentation and moves between its slides', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)
  await expect(page.getByText('because', { exact: true })).toBeVisible()
  await expect(page.getByText('1 / 10')).toBeVisible()
  await page.screenshot({ path: 'test-results/screenshots/slide-1.png' })

  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/2$/)
  await expect(page.getByText('friend', { exact: true })).toBeVisible()

  await page.keyboard.press('ArrowLeft')
  await expect(page).toHaveURL(/\/1$/)
  await expect(page.getByText('because', { exact: true })).toBeVisible()
})

test('does not move past the last slide', async ({ page }) => {
  await makePresentation(page, ['one', 'two'])
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/2$/)
  await expect(page.getByText('2 / 2')).toBeVisible()
})

test('keeps the presentation and the slide after a reload', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/3$/)
  await page.reload()
  await expect(page.getByText('necessary', { exact: true })).toBeVisible()
  await expect(page.getByText('3 / 10')).toBeVisible()
})

test('does not close the presentation when the user pushes Escape', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)
  const url = page.url()
  await page.keyboard.press('Escape')
  await expect(page).toHaveURL(url)
  await expect(page.getByText('because', { exact: true })).toBeVisible()
})

test('goes to the home page with Back, and lists the saved presentation', async ({ page }) => {
  await textbox(page).fill('cat\ndog')
  await page.getByRole('button', { name: 'Make the presentation' }).click()
  await expect(page.getByText('cat', { exact: true })).toBeVisible()
  await page.keyboard.press('ArrowRight')

  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Spelling trainer' })).toBeVisible()
  await expect(textbox(page)).toHaveValue('cat\ndog')
  const saved = page.getByRole('list', { name: 'Saved presentations' }).getByRole('link', { name: /cat, dog/ })
  await expect(saved).toBeVisible()
  await page.screenshot({ path: 'test-results/screenshots/home-with-saved.png', fullPage: true })

  await saved.click()
  await expect(page.getByText('cat', { exact: true })).toBeVisible()
})

test('opens a deep link through the GitHub Pages 404 page', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)
  const deepLink = page.url().replace(/\/1$/, '/4')

  // GitHub Pages serves 404.html for a path that is not a file. The preview server does not do this, so the test does it.
  const notFoundHtml = await readFile('dist/404.html', 'utf8')
  await page.route(deepLink, (route) => route.fulfill({ status: 404, contentType: 'text/html', body: notFoundHtml }))

  await page.goto(deepLink)
  await expect(page).toHaveURL(deepLink)
  await expect(page.getByText('separate', { exact: true })).toBeVisible()
  await expect(page.getByText('4 / 10')).toBeVisible()
})

test('shows a message for a presentation that does not exist', async ({ page }) => {
  await page.goto('./presentations/doesnotexist/1')
  await expect(page.getByRole('heading', { name: 'We cannot find this presentation' })).toBeVisible()
  await page.getByRole('link', { name: 'All presentations' }).click()
  await expect(page.getByRole('heading', { name: 'Spelling trainer' })).toBeVisible()
})

test('downloads a PDF file and a PPTX file from the presentation page', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)

  const pdf = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PDF' }).click()
  expect((await pdf).suggestedFilename()).toBe('spelling-words.pdf')

  const pptx = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PPTX' }).click()
  expect((await pptx).suggestedFilename()).toBe('spelling-words.pptx')
})

// Different devices have different fonts. A wide font must not push a long word off the screen.
// The letter spacing makes the font wide on all operating systems.
for (const viewport of [
  { name: 'phone', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 720 },
]) {
  test(`fits a long word to a ${viewport.name} screen when the font is wide`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.reload()
    await page.addStyleTag({ content: '.word { letter-spacing: 0.25em !important; }' })
    await makePresentation(page, ['accommodate'])
    const word = page.getByText('accommodate', { exact: true })
    await expect(word).toBeVisible()
    await expect(async () => {
      const box = await word.boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width)
    }).toPass({ timeout: 2000 })
  })
}

test('operates on a phone screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.reload()
  await page.screenshot({ path: 'test-results/screenshots/home-phone.png', fullPage: true })
  await makePresentation(page, ['accommodate'])
  const word = page.getByText('accommodate', { exact: true })
  await expect(word).toBeVisible()
  const box = await word.boundingBox()
  expect(box!.x).toBeGreaterThanOrEqual(0)
  expect(box!.x + box!.width).toBeLessThanOrEqual(375)
  await page.screenshot({ path: 'test-results/screenshots/slide-phone.png' })
})
