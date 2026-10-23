import { z } from 'zod'
import { Localized } from './i18n.ts'
import { PageId } from './ids.ts'

/** ลิงก์ไปหน้าในเว็บ (renderer สร้าง URL ตามภาษาเอง), เว็บภายนอก, โทร หรืออีเมล */
export const Link = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('page'), page: PageId }),
  z.object({ kind: z.literal('url'), href: z.url() }),
  z.object({ kind: z.literal('tel'), number: z.string().regex(/^\+?[0-9-]{6,20}$/) }),
  z.object({ kind: z.literal('email'), address: z.email() }),
])
export type Link = z.infer<typeof Link>

/** ปุ่มหรือลิงก์ที่มีข้อความ */
export const Cta = z.object({ label: Localized, link: Link })
export type Cta = z.infer<typeof Cta>
