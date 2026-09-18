import { expect, test, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'

// BASE_URL is set when the tests run against a deployed site, not against a local build.
const DEPLOYED = Boolean(process.env.BASE_URL)

// A commit SHA from a build, or "development" when git was not available.
const ANY_VERSION = /^([0-9a-f]{40}|development)$/

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

// The word is also in the sentence, so the tests find the slide word by its class.
const slideWord = (page: Page) => page.locator('.slide .word')

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

// The Tatoeba licence (CC BY 2.0 FR) needs a credit with a link.
test('gives the credit for the Tatoeba sentences on the home page', async ({ page }) => {
  const credit = page.getByRole('link', { name: 'Tatoeba' })
  await expect(credit).toBeVisible()
  await expect(credit).toHaveAttribute('href', 'https://tatoeba.org')
})

test('has the expected build version', async ({ page }) => {
  // CI sets EXPECTED_APP_VERSION to the commit SHA. Then the test proves that the site has this commit.
  const expected = process.env.EXPECTED_APP_VERSION ?? ANY_VERSION
  await expect(page.getByTestId('app-version')).toHaveAttribute('data-version', expected)
  // The HTML also has the version, so that a script can check a deployment without a browser.
  await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', expected)
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
  await expect(slideWord(page)).toHaveText('because')
  await expect(page.getByText('1 / 10')).toBeVisible()
  await page.screenshot({ path: 'test-results/screenshots/slide-1.png' })

  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/2$/)
  await expect(slideWord(page)).toHaveText('friend')

  await page.keyboard.press('ArrowLeft')
  await expect(page).toHaveURL(/\/1$/)
  await expect(slideWord(page)).toHaveText('because')
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
  await expect(slideWord(page)).toHaveText('necessary')
  await expect(page.getByText('3 / 10')).toBeVisible()
})

test('does not close the presentation when the user pushes Escape', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)
  const url = page.url()
  await page.keyboard.press('Escape')
  await expect(page).toHaveURL(url)
  await expect(slideWord(page)).toHaveText('because')
})

test('goes to the home page with Back, and lists the saved presentation', async ({ page }) => {
  await textbox(page).fill('cat\ndog')
  await page.getByRole('button', { name: 'Make the presentation' }).click()
  await expect(slideWord(page)).toHaveText('cat')
  await page.keyboard.press('ArrowRight')

  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Spelling trainer' })).toBeVisible()
  await expect(textbox(page)).toHaveValue('cat\ndog')
  const saved = page.getByRole('list', { name: 'Saved presentations' }).getByRole('link', { name: /cat, dog/ })
  await expect(saved).toBeVisible()
  await page.screenshot({ path: 'test-results/screenshots/home-with-saved.png', fullPage: true })

  await saved.click()
  await expect(slideWord(page)).toHaveText('cat')
})

const NO_MEANING_NOTE = 'This simple sentence does not show what the word means.'

test('shows a sentence with the word on each slide, and tells the user when it does not show the meaning', async ({
  page,
}) => {
  await makePresentation(page, ['necessary', 'zebra'])
  const sentence = page.locator('.sentence')
  // "necessary" is in the word bank, so its sentence shows the meaning.
  await expect(sentence).toContainText('necessary')
  await expect(page.getByText(NO_MEANING_NOTE)).toBeHidden()
  await page.screenshot({ path: 'test-results/screenshots/slide-sentence.png' })

  await page.keyboard.press('ArrowRight')
  await expect(sentence).toContainText('zebra')
  await expect(page.getByText(NO_MEANING_NOTE)).toBeVisible()
})

// A teacher sets a day of the week or a month every term. These words are proper nouns, so the other word sources
// leave them out. The bank must show the meaning of the day and the month.
test('shows a sentence that gives the meaning of a day of the week and a month', async ({ page }) => {
  await makePresentation(page, ['Wednesday', 'September'])
  const sentence = page.locator('.sentence')
  await expect(sentence).toContainText('Wednesday')
  await expect(page.getByText(NO_MEANING_NOTE)).toBeHidden()

  await page.keyboard.press('ArrowRight')
  await expect(sentence).toContainText('September')
  await expect(page.getByText(NO_MEANING_NOTE)).toBeHidden()
})

test('keeps a new sentence and a new word type after a reload', async ({ page }) => {
  await makePresentation(page, ['record'])
  const sentence = page.locator('.sentence')
  const wordType = page.getByRole('combobox', { name: 'Word type' })
  const first = await sentence.textContent()

  await page.getByRole('button', { name: 'New sentence' }).click()
  await expect(page.getByRole('status')).toHaveText('Saved.')
  await expect(sentence).not.toHaveText(first ?? '')

  // The templates for "Other" are predictable, so the test can check the sentence.
  await wordType.selectOption('other')
  await expect(sentence).toHaveText(/^(The cat can spell record\.|Can the frog spell record\?|The dog wrote record on the mat\.)$/)
  const saved = await sentence.textContent()

  await page.reload()
  await expect(wordType).toHaveValue('other')
  await expect(sentence).toHaveText(saved ?? '')
  await page.screenshot({ path: 'test-results/screenshots/slide-controls.png' })
})

test('opens a deep link through the GitHub Pages 404 page', async ({ page }) => {
  await makePresentation(page, TEN_WORDS)
  const deepLink = page.url().replace(/\/1$/, '/4')

  // GitHub Pages serves 404.html for a path that is not a file. The local preview server does not do this.
  // Thus, for a local build, the test serves 404.html. A deployed site uses the real GitHub Pages behavior.
  if (!DEPLOYED) {
    const notFoundHtml = await readFile('dist/404.html', 'utf8')
    await page.route(deepLink, (route) => route.fulfill({ status: 404, contentType: 'text/html', body: notFoundHtml }))
  }

  await page.goto(deepLink)
  await expect(page).toHaveURL(deepLink)
  await expect(slideWord(page)).toHaveText('separate')
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
    const word = slideWord(page)
    await expect(word).toHaveText('accommodate')
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
  const word = slideWord(page)
  await expect(word).toHaveText('accommodate')
  const box = await word.boundingBox()
  expect(box!.x).toBeGreaterThanOrEqual(0)
  expect(box!.x + box!.width).toBeLessThanOrEqual(375)
  await page.screenshot({ path: 'test-results/screenshots/slide-phone.png' })
})
