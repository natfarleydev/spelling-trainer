import { AxeBuilder } from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// The style guide in CLAUDE.md. These smoke tests check the parts that a machine can measure.

const textbox = (page: Page) => page.getByLabel('Type the spelling words. Put one word on each line.')
const slideWord = (page: Page) => page.locator('.slide .word')

async function makePresentation(page: Page, words: string[]) {
  await textbox(page).fill(words.join('\n'))
  await page.getByRole('button', { name: 'Make the presentation' }).click()
  await expect(page).toHaveURL(/\/presentations\/[a-z2-9]{10}\/1$/)
  await expect(page.locator('.sentence')).toBeVisible()
}

// axe-core finds accessibility problems. The style guide allows no serious or critical problems.
const seriousProblems = async (page: Page) =>
  (await new AxeBuilder({ page }).analyze()).violations
    .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
    .map((violation) => `${violation.id}: ${violation.help} (${violation.nodes.length})`)

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('has no serious accessibility problems on the home page', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Spelling trainer' })).toBeVisible()
  expect(await seriousProblems(page)).toEqual([])
})

test('has no serious accessibility problems on a slide', async ({ page }) => {
  await makePresentation(page, ['necessary'])
  expect(await seriousProblems(page)).toEqual([])
})

test('loads the fonts of the style guide', async ({ page }) => {
  await makePresentation(page, ['necessary'])
  const loaded = await page.evaluate(async () => {
    await document.fonts.ready
    return [...document.fonts].filter((font) => font.status === 'loaded').map((font) => font.family.replace(/["']/g, ''))
  })
  expect(loaded).toEqual(expect.arrayContaining(['Playpen Sans', 'Andika']))
  expect(await slideWord(page).evaluate((element) => getComputedStyle(element).fontFamily)).toMatch(/^["']?Playpen Sans/)
  const buttonFont = await page.getByRole('button', { name: 'New sentence' }).evaluate((element) => getComputedStyle(element).fontFamily)
  expect(buttonFont).toMatch(/^["']?Andika/)
})

test('highlights the word in the sentence and gives each slide a colour', async ({ page }) => {
  await makePresentation(page, ['necessary', 'yacht'])
  await expect(page.locator('.sentence .sentence-word')).toHaveText('necessary')
  await expect(page.locator('.slide')).toHaveAttribute('data-colour', 'cream')
  await page.screenshot({ path: 'test-results/screenshots/style-slide.png' })

  await page.keyboard.press('ArrowRight')
  await expect(page.locator('.slide')).toHaveAttribute('data-colour', 'sky')
  await expect(page.locator('.sentence .sentence-word')).toHaveText('yacht')
})

test('shows the alpha sticker and the styled home page on a phone', async ({ page }) => {
  await page.screenshot({ path: 'test-results/screenshots/style-home.png', fullPage: true })
  await page.setViewportSize({ width: 375, height: 812 })
  await expect(page.getByRole('note', { name: 'Alpha version' })).toBeVisible()
  await page.screenshot({ path: 'test-results/screenshots/style-home-phone.png', fullPage: true })
})

// NN/g: the page must not hide content. The fixed alpha sticker covered the title on a phone.
for (const viewport of [
  { name: 'phone', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 720 },
]) {
  test(`does not cover the page title with the alpha sticker on a ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    const sticker = await page.getByRole('note', { name: 'Alpha version' }).boundingBox()
    // Measure the text of the title, not the heading block, because the block is as wide as the page.
    const title = await page.getByRole('heading', { name: 'Spelling trainer' }).evaluate((element) => {
      const range = document.createRange()
      range.selectNodeContents(element)
      const { x, y, width, height } = range.getBoundingClientRect()
      return { x, y, width, height }
    })
    expect(sticker).not.toBeNull()
    const box = sticker!
    const overlaps =
      box.x < title.x + title.width && title.x < box.x + box.width && box.y < title.y + title.height && title.y < box.y + box.height
    // The message gives both boxes, so that a failure shows the size of the overlap.
    expect(overlaps, `sticker ${JSON.stringify(box)} and title text ${JSON.stringify(title)}`).toBe(false)
  })
}

test('embeds Playpen Sans in the PDF download', async ({ page }) => {
  await makePresentation(page, ['necessary'])
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PDF' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('spelling-words.pdf')

  const { readFile } = await import('node:fs/promises')
  const pdf = (await readFile(await download.path())).toString('latin1')
  // jsPDF writes the name of each embedded font into the file. If the font files do not load, the PDF has only Helvetica.
  expect(pdf).toContain('PlaypenSans')
})

test('still downloads a PDF when the font files are not valid', async ({ page }) => {
  // NN/g: prevent errors. A server can answer with an HTML page and the status 200 instead of a font file.
  // Then the PDF must use its fallback font, and the download must still operate.
  await page.route('**/fonts/playpen-sans/*.ttf', (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Not a font</title>' }),
  )
  await makePresentation(page, ['necessary'])
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PDF' }).click()
  const download = await downloadPromise

  const { readFile } = await import('node:fs/promises')
  const pdf = (await readFile(await download.path())).toString('latin1')
  expect(pdf).not.toContain('PlaypenSans')
  expect(pdf).toContain('Helvetica')
})

test('uses Comic Sans MS and the slide colours in the PPTX download', async ({ page }) => {
  await makePresentation(page, ['necessary', 'yacht'])
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PPTX' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('spelling-words.pptx')

  // A PPTX file is a zip file. Read the XML of each slide.
  const { readFile } = await import('node:fs/promises')
  const { strFromU8, unzipSync } = await import('fflate')
  const files = unzipSync(new Uint8Array(await readFile(await download.path())))
  const slideXml = (number: number) => strFromU8(files[`ppt/slides/slide${number}.xml`])

  // The slides have the cream and the sky backgrounds of the style guide, in order.
  expect(slideXml(1)).toContain('FFF4D6')
  expect(slideXml(2)).toContain('DDF0FF')
  expect(slideXml(1)).toContain('Comic Sans MS')
})
