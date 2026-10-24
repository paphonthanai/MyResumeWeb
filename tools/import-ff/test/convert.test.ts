import { test as baseTest } from 'node:test'
import assert from 'node:assert/strict'
import { firestoreViolations, toFirestoreDocs, validateSnapshot, type SiteSnapshot } from '@pnjtech/schema'
import { fromLegacy, toLegacy } from '../src/convert.ts'
import { scanPublicFiles } from '../src/files.ts'
import { hasLegacySource, loadLegacyContent, loadLegacySite, WEB_DIR } from '../src/legacy.ts'

// เทสต์ชุดนี้ต้องใช้ repo Fire First — ถ้าไม่มีให้ข้ามพร้อมบอกเหตุผล แทนที่จะล้มทั้งชุด
const available = hasLegacySource()
const test = (name: string, fn: () => void) =>
  baseTest(name, { skip: available ? false : `ไม่พบเว็บ Fire First ที่ ${WEB_DIR} (ตั้ง FIRE_FIRST_WEB)` }, fn)

const D = available ? await loadLegacyContent() : (undefined as never)
const site = available ? await loadLegacySite() : (undefined as never)
const files = available ? await scanPublicFiles() : (undefined as never)
const snapshot = available ? fromLegacy(D, site, files) : (undefined as never)

/** ทุกค่าปลายทาง (string/boolean) ใน object พร้อม path */
function leaves(v: unknown, path = ''): [string, unknown][] {
  if (Array.isArray(v)) return v.flatMap((x, i) => leaves(x, `${path}[${i}]`))
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => leaves(x, path ? `${path}.${k}` : k))
  return [[path, v]]
}

test('snapshot ผ่านการตรวจ schema และ ref ทั้งหมด', () => {
  assert.deepEqual(validateSnapshot(snapshot), [])
})

test('แปลงกลับเป็น ff-content.js ได้ตรงทุกค่า (ครบ 100%)', () => {
  assert.deepStrictEqual(toLegacy(snapshot), D)
})

test('ข้อความทุกตัวใน ff-content.js อยู่ใน snapshot', () => {
  const json = JSON.stringify(snapshot)
  const strings = leaves(D).filter(([, v]) => typeof v === 'string')
  const missing = strings.filter(([, v]) => !json.includes(JSON.stringify(v)))
  assert.ok(strings.length > 300, `คาดว่ามีข้อความมากกว่า 300 ค่า ได้ ${strings.length}`)
  assert.deepEqual(missing, [])
})

test('toLegacy อ่านค่าจากตำแหน่งที่ editor จะแก้จริง', () => {
  const edited: SiteSnapshot = structuredClone(snapshot)
  const works = edited.collections.find((c) => c.def.id === 'works')!
  works.items[0].data.title = { th: 'ผลงานใหม่', en: 'New project' }
  const faq = edited.pages.find((p) => p.id === 'contact')!.blocks.find((b) => b.type === 'faq')!
  faq.heading = { th: 'ถามตอบ', en: 'Q&A' }
  const back = toLegacy(edited)
  assert.deepEqual(back.works[0].t, { th: 'ผลงานใหม่', en: 'New project' })
  assert.deepEqual(back.h.faq, { th: 'ถามตอบ', en: 'Q&A' })
})

test('ขนาดรูปและ alt ใน IMAGES ย้ายเข้าคลังสื่อครบ และตรงกับไฟล์จริง', () => {
  for (const [name, img] of Object.entries(site.IMAGES)) {
    const m = snapshot.media.find((x) => x.id === name)
    assert.ok(m, `ไม่มี ${name} ในคลังสื่อ`)
    assert.equal(m.w, img.w, `${name}.w`)
    assert.equal(m.h, img.h, `${name}.h`)
    assert.deepEqual(m.alt, img.alt, `${name}.alt`)
    const real = files[`${name}.jpg`]
    assert.deepEqual([real.w, real.h], [img.w, img.h], `ขนาดใน site.js ของ ${name} ไม่ตรงกับไฟล์จริง`)
  }
})

test('ทุกไฟล์ในคลังสื่อมีอยู่จริงใน web/public พร้อม webp ถ้ามี', () => {
  for (const m of snapshot.media) {
    assert.ok(files[m.file], `ไม่พบ ${m.file}`)
    for (const v of m.variants) assert.ok(files[v.file], `ไม่พบ ${v.file}`)
    if (m.kind === 'image') assert.ok(m.w && m.h, `${m.id} ไม่มีขนาดรูป`)
  }
})

test('เขียนลง Firestore ได้: ไม่มี undefined, ไม่มี array ซ้อน, document เล็กกว่า 1 MiB', () => {
  const docs = toFirestoreDocs(snapshot)
  for (const d of docs) {
    assert.deepEqual(firestoreViolations(d.data), [], d.path)
    assert.ok(Buffer.byteLength(JSON.stringify(d.data)) < 1_000_000, `${d.path} ใหญ่เกิน`)
    assert.equal(d.path.split('/').length % 2, 0, `${d.path} ไม่ใช่ path ของ document`)
  }
  assert.equal(new Set(docs.map((d) => d.path)).size, docs.length, 'path ซ้ำ')
})
