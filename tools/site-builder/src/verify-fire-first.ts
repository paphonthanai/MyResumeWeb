// build เว็บ Fire First 2 แบบแล้วเทียบผลลัพธ์ทุกหน้า:
//   1) โค้ดเดิมทั้งหมด (ค่าอ้างอิง)
//   2) โค้ดเดิม แต่เนื้อหามาจาก SiteSnapshot ผ่าน toLegacy()
//
//   npm run site:verify-ff
//   npm run site:verify-ff -- path/to/snapshot.json     (ใช้ snapshot ที่กำหนด แทนการแปลงจากเว็บเดิม)
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { validateSnapshot, type SiteSnapshot } from '@pnjtech/schema'
import { fromLegacy } from '@pnjtech/import-ff/convert'
import { scanPublicFiles } from '@pnjtech/import-ff/files'
import { hasLegacySource, loadLegacyContent, loadLegacySite, WEB_DIR } from '@pnjtech/import-ff/legacy'
import { buildBaseline, buildFromSnapshot, ensureDir } from './build.ts'
import { compareDist } from './compare.ts'

if (!hasLegacySource()) {
  console.error(`ไม่พบเว็บ Fire First ที่ ${WEB_DIR} (ตั้ง FIRE_FIRST_WEB)`)
  process.exit(1)
}

const workDir = fileURLToPath(new URL('../.work/', import.meta.url))
await ensureDir(workDir)

const snapshotArg = process.argv[2]
const snapshot: SiteSnapshot = snapshotArg
  ? JSON.parse(await readFile(snapshotArg, 'utf8'))
  : fromLegacy(await loadLegacyContent(), await loadLegacySite(), await scanPublicFiles())

const issues = validateSnapshot(snapshot)
if (issues.length) {
  console.error('snapshot ไม่ผ่านการตรวจ:')
  for (const i of issues) console.error(`  - ${i.path}: ${i.message}`)
  process.exit(1)
}
await writeFile(join(workDir, 'snapshot.json'), JSON.stringify(snapshot, null, 2))

const t0 = Date.now()
console.log(`แม่แบบ: ${WEB_DIR}`)
console.log('1/2 build เว็บเดิม (npm ci + build)…')
const baseline = await buildBaseline(WEB_DIR, workDir)
console.log('2/2 build จาก snapshot…')
const fromSnapshot = await buildFromSnapshot(WEB_DIR, workDir, snapshot, baseline)

const { compared, diffs } = await compareDist(join(baseline, 'dist'), join(fromSnapshot, 'dist'))
await writeFile(join(workDir, 'report.json'), JSON.stringify({ compared, diffs }, null, 2))

console.log(`\nเทียบ ${compared.length} ไฟล์ (${Math.round((Date.now() - t0) / 1000)} วินาที):`)
for (const f of compared) {
  const d = diffs.find((x) => x.file === f)
  console.log(`  ${d ? '✗' : '✓'} ${f}${d ? ` — ${d.problem}` : ''}`)
}
for (const d of diffs.filter((x) => x.problem === 'extra')) console.log(`  ✗ ${d.file} — มีเกินมา`)
for (const d of diffs.filter((x) => x.problem === 'different')) {
  console.log(`\n${d.file} ต่างกันที่ตัวอักษร ${d.at}\n  เดิม:     …${d.expected}…\n  snapshot: …${d.actual}…`)
}
console.log(diffs.length ? `\nไม่ตรง ${diffs.length} ไฟล์ (รายละเอียดใน .work/report.json)` : '\nทุกไฟล์ตรงกัน')
if (diffs.length) process.exitCode = 1
