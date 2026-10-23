import { readdir, readFile } from 'node:fs/promises'
import { imageSize } from './image-size.ts'
import { PUBLIC_IMG_DIR, WEB_DIR } from './legacy.ts'
import type { FileInfo } from './convert.ts'

/** สำรวจไฟล์ใน web/public/img และ favicon พร้อมขนาดไฟล์และขนาดรูปจริง */
export async function scanPublicFiles(): Promise<FileInfo> {
  const out: FileInfo = {}
  const add = async (name: string, path: string) => {
    const buf = await readFile(path)
    out[name] = { bytes: buf.length, ...imageSize(buf) }
  }
  for (const e of await readdir(PUBLIC_IMG_DIR, { withFileTypes: true })) {
    if (e.isFile()) await add(e.name, `${PUBLIC_IMG_DIR}${e.name}`)
  }
  await add('favicon.png', `${WEB_DIR}public/favicon.png`)
  return out
}
