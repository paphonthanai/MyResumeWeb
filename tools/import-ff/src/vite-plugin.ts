import { createReadStream, existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import type { Plugin } from 'vite'
import { validateSnapshot, type SiteSnapshot } from '@pnjtech/schema'
import { fromLegacy } from './convert.ts'
import { scanPublicFiles } from './files.ts'
import { hasLegacySource, loadLegacyContent, loadLegacySite, PUBLIC_IMG_DIR, WEB_DIR } from './legacy.ts'

/** ที่อยู่ของข้อมูลตัวอย่างที่ฝั่ง client โหลด: <BASE>snapshot.json และ <BASE>img/<file> */
export const FF_SAMPLE_BASE = '/ff-sample/'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
}

/** รูปที่ snapshot อ้างถึง ใช้ webp ถ้ามี (เล็กกว่า jpg มาก) — วิดีโอไม่ส่งไปด้วย */
function imageFiles(snapshot: SiteSnapshot): string[] {
  return snapshot.media
    .filter((m) => m.kind === 'image')
    .map((m) => m.variants.find((v) => v.mime === 'image/webp')?.file ?? m.file)
}

/** ไฟล์สื่ออยู่ใน public/img (รูป) หรือ public (favicon) ของเว็บ Fire First — คืน undefined ถ้าไม่มี หรือ path ออกนอกโฟลเดอร์ */
function mediaPath(file: string): string | undefined {
  for (const dir of [PUBLIC_IMG_DIR, `${WEB_DIR}public/`]) {
    const full = resolve(dir, file)
    if (full.startsWith(resolve(dir) + sep) && existsSync(full)) return full
  }
}

async function buildSnapshot(): Promise<SiteSnapshot> {
  const snapshot = fromLegacy(await loadLegacyContent(), await loadLegacySite(), await scanPublicFiles())
  const issues = validateSnapshot(snapshot)
  if (issues.length) throw new Error(`snapshot ตัวอย่างไม่ผ่านการตรวจ: ${issues.map((i) => `${i.path} ${i.message}`).join('; ')}`)
  return snapshot
}

/**
 * โหมดตัวอย่างของหน้า Collections: แปลงเว็บ Fire First (../firefirst/web หรือ FIRE_FIRST_WEB)
 * เป็น SiteSnapshot ตอน dev/build แล้วเสิร์ฟให้ฝั่ง client เป็นไฟล์ JSON + รูป
 * ไม่พบ repo Fire First → ไม่มีไฟล์ตัวอย่าง หน้าจะแจ้งให้ตั้งค่าแทนที่จะ error
 */
export function ffSample(): Plugin {
  let ssr = false
  return {
    name: 'pnj-ff-sample',
    configResolved(config) {
      ssr = !!config.build.ssr
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        if (!url.startsWith(FF_SAMPLE_BASE)) return next()
        if (!hasLegacySource()) {
          res.statusCode = 404
          return res.end()
        }
        try {
          if (url === `${FF_SAMPLE_BASE}snapshot.json`) {
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-store')
            return res.end(JSON.stringify(await buildSnapshot()))
          }
          if (url.startsWith(`${FF_SAMPLE_BASE}img/`)) {
            const file = mediaPath(decodeURIComponent(url.slice(`${FF_SAMPLE_BASE}img/`.length)))
            if (!file) {
              res.statusCode = 404
              return res.end()
            }
            res.setHeader('Content-Type', MIME[extname(file)] ?? 'application/octet-stream')
            return createReadStream(file).pipe(res)
          }
        } catch (e) {
          server.config.logger.error(`[ff-sample] ${(e as Error).message}`)
          res.statusCode = 500
          return res.end()
        }
        next()
      })
    },
    async generateBundle() {
      if (ssr) return
      if (!hasLegacySource()) {
        this.warn(`ไม่พบเว็บ Fire First ที่ ${WEB_DIR} — ข้ามข้อมูลตัวอย่างของหน้า Collections (ตั้ง FIRE_FIRST_WEB)`)
        return
      }
      const snapshot = await buildSnapshot()
      this.emitFile({ type: 'asset', fileName: `${FF_SAMPLE_BASE.slice(1)}snapshot.json`, source: JSON.stringify(snapshot) })
      for (const file of new Set(imageFiles(snapshot))) {
        const path = mediaPath(file)
        if (!path) this.warn(`ไม่พบไฟล์สื่อ ${file} ของ Fire First`)
        else this.emitFile({ type: 'asset', fileName: `${FF_SAMPLE_BASE.slice(1)}img/${file}`, source: await readFile(path) })
      }
    },
  }
}
