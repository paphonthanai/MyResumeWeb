import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// อ่านเนื้อหาจากโฟลเดอร์ web/ ของ repo Fire First โดยตรง เพื่อให้ผลการแปลงตรงกับเว็บที่ใช้งานจริงเสมอ
// ค่าเริ่มต้นคือ repo Fire First ที่ clone ไว้ข้างกัน (../firefirst/web) หรือกำหนดเองด้วย FIRE_FIRST_WEB
const DEFAULT_WEB_DIR = fileURLToPath(new URL('../../../../firefirst/web/', import.meta.url))
export const WEB_DIR = resolve(process.env.FIRE_FIRST_WEB || DEFAULT_WEB_DIR) + '/'
export const PUBLIC_IMG_DIR = `${WEB_DIR}public/img/`

/** มีเว็บ Fire First ให้อ่านหรือไม่ (เครื่องที่ไม่ได้ clone repo Fire First จะข้ามเทสต์การแปลง) */
export const hasLegacySource = () => existsSync(`${WEB_DIR}src/content/ff-content.js`)

type L = { th: string; en: string }

/** โครงของ D ใน web/src/content/ff-content.js */
export interface LegacyContent {
  brand: L
  legal: L
  slogan: L
  nav: { id: string; l: L }[]
  cta: L
  call: L
  more: L
  hero: { kicker: L; h1: L; lead: L }
  values: { k: L; s: L; d: L }[]
  services: { t: L; d: L }[]
  fleet: { t: L; d: L }[]
  works: { img: string; t: L; c: L }[]
  reviews: { q: L; w: L }[]
  reviewNote: L
  pricing: { t: L; p: L; u: L; f: L[]; hl?: boolean }[]
  faq: { q: L; a: L }[]
  about: { h: L; p: L; md: L; mdr: L; facts: { k: L; v: L }[] }
  contact: {
    addr: L
    tel: string
    mail: string
    l: { addr: L; tel: L; mail: L; name: L; org: L; msg: L; send: L; sent: L }
  }
  seo: Record<'home' | 'about' | 'products' | 'works' | 'contact', { t: L; d: L }>
  h: {
    services: L
    fleet: L
    works: L
    reviews: L
    pricing: L
    faq: L
    contact: L
    about: L
    hq: L
    close: L
    closeSub: L
    all: L
  }
}

export interface LegacyImage {
  w: number
  h: number
  alt?: L
}

export interface LegacySite {
  SITE_URL: string
  PHONE: string
  PHONE_TEL: string
  EMAIL: string
  IMAGES: Record<string, LegacyImage>
}

export async function loadLegacyContent(): Promise<LegacyContent> {
  const mod = await import(pathToFileURL(`${WEB_DIR}src/content/ff-content.js`).href)
  return mod.D as LegacyContent
}

/** site.js ใช้ import.meta.env ของ Vite ซึ่งไม่มีใน Node จึงแทนด้วย object ว่างก่อน import */
export async function loadLegacySite(): Promise<LegacySite> {
  const src = await readFile(`${WEB_DIR}src/content/site.js`, 'utf8')
  const patched = src.replaceAll('import.meta.env', '({})')
  const mod = await import(`data:text/javascript;base64,${Buffer.from(patched).toString('base64')}`)
  return mod as LegacySite
}
