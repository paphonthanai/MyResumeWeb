// แปลงเว็บ Fire First เดิมเป็น SiteSnapshot แล้วเขียนลง tools/import-ff/out/
//   npm run import:ff                                  (อ่านจาก ../firefirst/web)
//   FIRE_FIRST_WEB=/path/to/firefirst/web npm run import:ff
import { mkdir, writeFile } from 'node:fs/promises'
import { isDeepStrictEqual } from 'node:util'
import { firestoreViolations, toFirestoreDocs, validateSnapshot } from '@pnjtech/schema'
import { fromLegacy, toLegacy } from './convert.ts'
import { scanPublicFiles } from './files.ts'
import { hasLegacySource, loadLegacyContent, loadLegacySite, WEB_DIR } from './legacy.ts'

if (!hasLegacySource()) {
  console.error(`ไม่พบเว็บ Fire First ที่ ${WEB_DIR}\nclone repo Fire First ไว้ข้าง repo นี้ หรือตั้ง FIRE_FIRST_WEB`)
  process.exit(1)
}

const D = await loadLegacyContent()
const site = await loadLegacySite()
const snapshot = fromLegacy(D, site, await scanPublicFiles())

const issues = validateSnapshot(snapshot)
const roundTrip = isDeepStrictEqual(toLegacy(snapshot), D)
const docs = toFirestoreDocs(snapshot)
const fsProblems = docs.flatMap((d) => firestoreViolations(d.data).map((p) => `${d.path} ${p}`))

const out = new URL('../out/', import.meta.url)
await mkdir(out, { recursive: true })
await writeFile(new URL('fire-first.snapshot.json', out), JSON.stringify(snapshot, null, 2) + '\n')
await writeFile(new URL('fire-first.firestore.json', out), JSON.stringify(docs, null, 2) + '\n')

const count = (k: string) => snapshot.collections.find((c) => c.def.id === k)?.items.length
console.log(`หน้า ${snapshot.pages.length} · block ${snapshot.pages.reduce((n, p) => n + p.blocks.length, 0)}`)
console.log(`collections: ${snapshot.collections.map((c) => `${c.def.id}(${count(c.def.id)})`).join(' ')}`)
console.log(`สื่อ ${snapshot.media.length} ไฟล์ · ฟอร์ม ${snapshot.forms.length} · Firestore ${docs.length} documents`)
console.log(`ตรวจ schema: ${issues.length ? `${issues.length} ปัญหา` : 'ผ่าน'}`)
for (const i of issues) console.log(`  - ${i.path}: ${i.message}`)
console.log(`แปลงกลับเป็น ff-content.js ได้ตรงทุกค่า: ${roundTrip ? 'ใช่' : 'ไม่'}`)
console.log(`เขียน Firestore ได้: ${fsProblems.length ? fsProblems.join(', ') : 'ใช่'}`)
if (issues.length || !roundTrip || fsProblems.length) process.exitCode = 1
