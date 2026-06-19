// Capture des screenshots des sites projets.
// Prérequis : npm i playwright && npx playwright install chromium
// Lancer : node scripts/screenshots.mjs
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const SITES = [
  { name: 'mia-cv', url: 'https://mia-cv.com/fr' },
  { name: 'tipsyou', url: 'https://www.thetipsyou.fr/fr' },
  { name: 'get5stars', url: 'https://www.get5stars.app/fr' },
  { name: 'steven-coaching', url: 'https://steven-coaching.fr/' },
  { name: 'eventpics', url: 'https://eventpics.fr/' },
]

const COOKIE_LABELS = [
  'Tout accepter',
  'Tout refuser',
  "J'accepte",
  'Accepter',
  'Accepter et fermer',
  'Refuser',
  'Accept all',
  'Accept',
  'Got it',
  'OK',
  'Continuer',
]

await mkdir('public/projects', { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'fr-FR',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
})

for (const s of SITES) {
  const page = await ctx.newPage()
  try {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 45000 })
  } catch (e) {
    console.log(`[${s.name}] goto:`, e.message)
  }
  // Attendre le rendu réel du contenu (SPA lentes)
  try {
    await page.waitForFunction(
      () => document.body && document.body.innerText.replace(/\s/g, '').length > 250,
      { timeout: 15000 },
    )
  } catch {
    console.log(`[${s.name}] contenu lent / non détecté`)
  }
  await page.waitForTimeout(3000)

  // Fermer un éventuel bandeau cookies
  for (const label of COOKIE_LABELS) {
    try {
      const btn = page.getByRole('button', { name: label, exact: false }).first()
      if (await btn.isVisible({ timeout: 400 })) {
        await btn.click({ timeout: 1500 })
        await page.waitForTimeout(900)
        break
      }
    } catch {
      /* next */
    }
  }

  // Déclencher le lazy-load puis revenir en haut
  try {
    await page.evaluate(
      () =>
        new Promise((resolve) => {
          let y = 0
          const id = setInterval(() => {
            window.scrollBy(0, 500)
            y += 500
            if (y >= 3500) {
              clearInterval(id)
              resolve()
            }
          }, 120)
        }),
    )
  } catch {
    /* ignore */
  }
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1400)

  const info = await page.evaluate(() => ({
    title: document.title,
    textLen: document.body.innerText.trim().length,
    height: document.body.scrollHeight,
  }))
  await page.screenshot({ path: `public/projects/${s.name}.png` })
  console.log(`[${s.name}] saved`, JSON.stringify(info))
  await page.close()
}

await browser.close()
console.log('done')
