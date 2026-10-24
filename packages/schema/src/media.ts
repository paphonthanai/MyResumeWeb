import { z } from 'zod'
import { Localized } from './i18n.ts'
import { MediaId } from './ids.ts'

/**
 * ไฟล์หนึ่งรายการในคลังสื่อ — ไฟล์จริงอยู่ที่ Storage `tenants/{tid}/media/original/{file}`
 * w/h ใช้ใส่ width/height ของ <img> กัน layout shift (แบบเดียวกับ FfImg.vue)
 */
export const Media = z.object({
  id: MediaId,
  kind: z.enum(['image', 'video']),
  file: z.string().min(1),
  mime: z.string().regex(/^(image|video)\/[a-z0-9.+-]+$/),
  w: z.number().int().positive().optional(),
  h: z.number().int().positive().optional(),
  bytes: z.number().int().nonnegative().optional(),
  /** ข้อความแทนรูปตั้งต้น ใช้เมื่อ block ไม่ได้ระบุ alt เอง */
  alt: Localized.optional(),
  /** ไฟล์ที่แปลงแล้ว เช่น webp */
  variants: z.array(z.object({ file: z.string().min(1), mime: z.string() })).default([]),
})
export type Media = z.infer<typeof Media>

/** การอ้างถึงรูป/วิดีโอจาก block หรือ collection item */
export const MediaRef = z.object({
  media: MediaId,
  alt: Localized.optional(),
  /** CSS object-position เช่น top, center */
  position: z.string().max(40).optional(),
})
export type MediaRef = z.infer<typeof MediaRef>
