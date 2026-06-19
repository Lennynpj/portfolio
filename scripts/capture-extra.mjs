// Captures complémentaires :
//  - HumanONG : mini-app locale (scripts/mockups/humanong.html)
//  - MIA CV   : vrai site, via Google Chrome installé en mode visible (anti-bot)
// Lancer : node scripts/capture-extra.mjs
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

await mkdir('public/projects', { recursive: true })

/* ---------- 1. HumanONG : mini-app locale ---------- */
async function captureHumanong() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const url = pathToFileURL(resolve('scripts/mockups/humanong.html')).href
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'public/projects/humanong.png' })
  const info = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight, txt: document.body.innerText.trim().length }))
  console.log('[humanong] saved', JSON.stringify(info))
  await browser.close()
}

/* ---------- 2. MIA CV : HTML SSR figé (JS désactivé) ----------
   Le site vide sa page à l'hydratation sous automation. En coupant le JS,
   on garde le HTML rendu côté serveur (titre + contenu + CSS) tel quel,
   et aucun bandeau cookies (injecté en JS) n'apparaît. */
async function captureMiaCv() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    javaScriptEnabled: false,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  })
  const page = await ctx.newPage()
  try {
    await page.goto('https://mia-cv.com/fr', { waitUntil: 'networkidle', timeout: 60000 })
  } catch (e) {
    console.log('[mia-cv] goto:', e.message)
  }
  await page.waitForTimeout(3000) // laisser polices + images se charger
  const title = await page.title()
  await page.screenshot({ path: 'public/projects/mia-cv.png' })
  console.log('[mia-cv] saved', JSON.stringify({ title }))
  await browser.close()
}

await captureHumanong()
await captureMiaCv()
console.log('done')
