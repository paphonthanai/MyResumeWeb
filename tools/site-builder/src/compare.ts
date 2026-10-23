import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

export interface FileDiff {
  file: string
  problem: 'missing' | 'extra' | 'different'
  /** ตำแหน่งตัวอักษรแรกที่ต่าง และข้อความรอบ ๆ ทั้งสองฝั่ง */
  at?: number
  expected?: string
  actual?: string
}

export interface CompareResult {
  compared: string[]
  diffs: FileDiff[]
}

// ไฟล์ที่เทียบ: หน้าเว็บ + sitemap + robots (ไฟล์ใน assets/ เทียบผ่านชื่อที่ HTML อ้างถึง)
const TEXT_FILE = /\.(html|xml|txt)$/

/**
 * ชื่อไฟล์ JS/CSS ที่ Vite ใส่ hash จะต่างกันเมื่อโค้ดของโมดูลเนื้อหาต่างกัน
 * แม้ข้อมูลจะเหมือนกัน จึงตัด hash ออกก่อนเทียบ: /assets/index-AbC123.js → /assets/index.js
 */
export function normalizeAssetHashes(text: string): string {
  return text.replace(/(\/assets\/[\w.-]+?)-[\w-]{8}(\.(?:js|css|mjs))/g, '$1$2')
}

async function listFiles(dir: string): Promise<string[]> {
  const out: string[] = []
  for (const e of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (e.isFile()) out.push(relative(dir, join(e.parentPath, e.name)).replaceAll('\\', '/'))
  }
  return out.sort()
}

/** เทียบไฟล์ข้อความทุกไฟล์ใน dist สองชุด */
export async function compareDist(expectedDir: string, actualDir: string): Promise<CompareResult> {
  const expected = (await listFiles(expectedDir)).filter((f) => TEXT_FILE.test(f))
  const actual = new Set((await listFiles(actualDir)).filter((f) => TEXT_FILE.test(f)))
  const diffs: FileDiff[] = []

  for (const file of expected) {
    if (!actual.delete(file)) {
      diffs.push({ file, problem: 'missing' })
      continue
    }
    const a = normalizeAssetHashes(await readFile(join(expectedDir, file), 'utf8'))
    const b = normalizeAssetHashes(await readFile(join(actualDir, file), 'utf8'))
    if (a === b) continue
    let i = 0
    while (i < a.length && a[i] === b[i]) i++
    diffs.push({ file, problem: 'different', at: i, expected: a.slice(i - 60, i + 120), actual: b.slice(i - 60, i + 120) })
  }
  for (const file of actual) diffs.push({ file, problem: 'extra' })
  return { compared: expected, diffs }
}
