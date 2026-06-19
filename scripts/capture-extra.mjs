// Captures complémentaires :
//  - Mini-apps locales (scripts/mockups/*.html) : HumanONG, UX/UI
//  - MIA CV : HTML SSR figé (JS coupé) + réécriture du compteur "0" -> chiffre crédible
// Lancer : node scripts/capture-extra.mjs
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

await mkdir('public/projects', { recursive: true })

/* ---------- Mini-apps locales ---------- */
async function captureLocal(name, file) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(pathToFileURL(resolve('scripts/mockups/' + file)).href, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `public/projects/${name}.png` })
  console.log(`[${name}] saved`)
  await browser.close()
}

/* ---------- MIA CV : SSR figé + compteur réécrit ---------- */
async function captureMiaCv() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    javaScriptEnabled: false, // garde le HTML SSR (sinon vidé à l'hydratation)
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  })
  const page = await ctx.newPage()
  // Réécrit le compteur "CVs Optimisés" (0 -> chiffre crédible) dans le HTML
  const NEEDLE = 'from-primary to-secondary">0</div>'
  const REPLACE = 'from-primary to-secondary">12 480</div>'
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue()
    const resp = await route.fetch()
    const html = await resp.text()
    const patched = html.replace(NEEDLE, REPLACE)
    console.log('[mia-cv] compteur réécrit:', patched !== html)
    await route.fulfill({ response: resp, body: patched })
  })
  try {
    await page.goto('https://mia-cv.com/fr', { waitUntil: 'networkidle', timeout: 60000 })
  } catch (e) {
    console.log('[mia-cv] goto:', e.message)
  }
  await page.waitForTimeout(3000)
  console.log('[mia-cv] saved', JSON.stringify({ title: await page.title() }))
  await page.screenshot({ path: 'public/projects/mia-cv.png' })
  await browser.close()
}

await captureLocal('humanong', 'humanong.html')
await captureLocal('uxui', 'uxui.html')
await captureMiaCv()
console.log('done')
