import { test as baseTest } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fromLegacy } from '@pnjtech/import-ff/convert'
import { scanPublicFiles } from '@pnjtech/import-ff/files'
import { hasLegacySource, loadLegacyContent, loadLegacySite, WEB_DIR } from '@pnjtech/import-ff/legacy'
import { renderFfContent, renderSiteJs } from '../src/content-modules.ts'
import { normalizeAssetHashes } from '../src/compare.ts'

// การ build เทียบทั้งเว็บอยู่ใน npm run site:verify-ff (ช้า ต้อง npm ci) — เทสต์นี้ตรวจไฟล์เนื้อหาที่สร้างอย่างเดียว
const available = hasLegacySource()
const test = (name: string, fn: () => Promise<void> | void) =>
  baseTest(name, { skip: available ? false : `ไม่พบเว็บ Fire First ที่ ${WEB_DIR} (ตั้ง FIRE_FIRST_WEB)` }, fn)

/** import โมดูล JS จากข้อความ — แทน import.meta.env ของ Vite ด้วย object ว่าง */
const importText = (src: string) =>
  import(`data:text/javascript;base64,${Buffer.from(src.replaceAll('import.meta.env', '({})')).toString('base64')}`)

test('ff-content.js ที่สร้างจาก snapshot ให้ D และ pick() เหมือนไฟล์เดิม', async () => {
  const D = await loadLegacyContent()
  const original = await readFile(`${WEB_DIR}src/content/ff-content.js`, 'utf8')
  const snapshot = fromLegacy(D, await loadLegacySite(), await scanPublicFiles())
  const generated = await importText(renderFfContent(snapshot, original))
  const before = await importText(original)
  assert.deepStrictEqual(generated.D, D)
  assert.deepStrictEqual(generated.pick('th'), before.pick('th'))
  assert.deepStrictEqual(generated.pick('en'), before.pick('en'))
})

test('site.js ที่สร้างจาก snapshot มีข้อมูลติดต่อและรูปครบตามไฟล์เดิม', async () => {
  const site = await loadLegacySite()
  const snapshot = fromLegacy(await loadLegacyContent(), site, await scanPublicFiles())
  const generated = await importText(renderSiteJs(snapshot))
  assert.equal(generated.SITE_URL, site.SITE_URL)
  assert.equal(generated.PHONE, site.PHONE)
  assert.equal(generated.PHONE_TEL, site.PHONE_TEL)
  assert.equal(generated.EMAIL, site.EMAIL)
  for (const [name, img] of Object.entries(site.IMAGES)) assert.deepEqual(generated.IMAGES[name], img, name)
})

test('ไม่พบฟังก์ชัน pick ในแม่แบบให้ error ที่บอกสาเหตุ', () => {
  assert.throws(() => renderFfContent({} as never, 'export const D = {}'), /pick/)
})

baseTest('ตัด hash ออกจากชื่อไฟล์ assets ก่อนเทียบ', () => {
  assert.equal(
    normalizeAssetHashes('<script src="/assets/app-DN17SP5X.js"></script><link href="/assets/HomePage-CU_M7B7P.css">'),
    '<script src="/assets/app.js"></script><link href="/assets/HomePage.css">',
  )
  assert.equal(normalizeAssetHashes('/img/og/home-th.jpg?v=2'), '/img/og/home-th.jpg?v=2')
})
