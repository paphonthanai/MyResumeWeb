import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { imageSize } from './image-size.ts'
import { PUBLIC_IMG_DIR, WEB_DIR } from './legacy.ts'
import type { FileInfo } from './convert.ts'

/**
 * สำรวจไฟล์ใน web/public/img (รวมโฟลเดอร์ย่อย เช่น products/) และ favicon
 * พร้อมขนาดไฟล์และขนาดรูปจริง — key เป็น path จาก img/ เช่น "products/cone.jpg"
 */
export async function scanPublicFiles(): Promise<FileInfo> {
  const out: FileInfo = {}
  const add = async (name: string, path: string) => {
    const buf = await readFile(path)
    out[name] = { bytes: buf.length, ...imageSize(buf) }
  }
  for (const e of await readdir(PUBLIC_IMG_DIR, { withFileTypes: true, recursive: true })) {
    if (!e.isFile()) continue
    const path = join(e.parentPath, e.name)
    await add(relative(PUBLIC_IMG_DIR, path).replaceAll('\\', '/'), path)
  }
  await add('favicon.png', `${WEB_DIR}public/favicon.png`)
  return out
}
