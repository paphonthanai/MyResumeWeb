import type { SiteSnapshot } from '@pnjtech/schema'
import { toLegacy } from '@pnjtech/import-ff/convert'

// แม่แบบ "Poster" ตอนนี้คือโค้ดเว็บ Fire First เดิมทั้งชุด ซึ่งอ่านเนื้อหาจาก 2 ไฟล์:
//   src/content/ff-content.js  (D + pick)
//   src/content/site.js        (SITE_URL, PHONE, PHONE_TEL, EMAIL, IMAGES)
// ขั้นนี้สร้าง 2 ไฟล์นั้นใหม่จาก SiteSnapshot แล้ว build ด้วยโค้ดเดิมที่ไม่ได้แก้
// (ขั้นถัดไปจะแตกหน้า .vue เป็น block ที่อ่าน snapshot โดยตรง)

const HEADER = '// สร้างจาก SiteSnapshot โดย @pnjtech/site-builder — อย่าแก้ไฟล์นี้ แก้เนื้อหาที่แพลตฟอร์มแทน\n'

/**
 * ff-content.js: D มาจาก toLegacy(snapshot) ส่วนโค้ดหลัง D (ฟังก์ชัน pick)
 * คัดลอกจากไฟล์เดิมของแม่แบบ เพื่อให้หน้า .vue ทำงานเหมือนเดิมทุกอย่าง
 */
export function renderFfContent(snapshot: SiteSnapshot, templateFfContent: string): string {
  const tail = templateFfContent.indexOf('\nconst r=')
  if (tail < 0) throw new Error('ไม่พบฟังก์ชัน pick ใน ff-content.js ของแม่แบบ (หา "const r=")')
  return `${HEADER}export const D = ${JSON.stringify(toLegacy(snapshot), null, 1)};\n${templateFfContent.slice(tail + 1)}`
}

/** site.js: ข้อมูลติดต่อจาก settings.contact และขนาดรูป + alt จากคลังสื่อ */
export function renderSiteJs(snapshot: SiteSnapshot): string {
  const { contact, url } = snapshot.settings
  const images: Record<string, { w: number; h: number; alt?: unknown }> = {}
  for (const m of snapshot.media) {
    if (m.kind !== 'image' || !m.w || !m.h) continue
    images[m.id] = m.alt ? { w: m.w, h: m.h, alt: m.alt } : { w: m.w, h: m.h }
  }
  const j = (v: unknown) => JSON.stringify(v)
  return `${HEADER}export const SITE_URL = (import.meta.env.VITE_SITE_URL || ${j(url)}).replace(/\\/$/, '')
export const PHONE = ${j(contact.phone)}
export const PHONE_TEL = ${j(`tel:${contact.phoneE164}`)}
export const EMAIL = ${j(contact.email)}

export const IMAGES = ${JSON.stringify(images, null, 1)}
`
}
