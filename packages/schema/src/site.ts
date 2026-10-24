import { z } from 'zod'
import { Localized, LocaleCode } from './i18n.ts'
import { MediaId, PageId } from './ids.ts'
import { Cta } from './link.ts'

/** ข้อมูลระดับเว็บไซต์ — เก็บที่ tenants/{tid}/settings/site */
export const SiteSettings = z.object({
  /** ภาษาแรกคือภาษาหลัก (URL ไม่มี prefix) */
  langs: z.array(LocaleCode).min(1),
  url: z.url(),
  brand: z.object({
    name: Localized,
    legal: Localized,
    slogan: Localized,
    /** โลโก้ตัวอักษรบนเมนู แยกบรรทัด เช่น ['FIRE', 'FIRST'] */
    wordmark: z.array(z.string().min(1)).min(1).max(3),
    tagline: z.string(),
    logo: MediaId,
    favicon: MediaId,
    touchIcon: MediaId.optional(),
  }),
  contact: z.object({
    phone: z.string(),
    /** รูปแบบสากลสำหรับลิงก์ tel: และ JSON-LD เช่น +66802544306 */
    phoneE164: z.string().regex(/^\+[1-9][0-9]{6,14}$/),
    email: z.email(),
    address: Localized,
    postal: z.object({
      street: z.string(),
      locality: z.string(),
      region: z.string(),
      postalCode: z.string(),
      country: z.string().length(2),
    }),
  }),
  nav: z.array(z.object({ page: PageId, label: Localized })).min(1),
  header: z.object({
    cta: Cta,
    /** ข้อความปุ่มโทร เช่น "โทร 080-254-4306" */
    call: Localized,
    /** ป้ายเหนือเบอร์โทร เช่น 24/7 */
    badge: z.string().optional(),
  }),
  footer: z.object({ closing: Localized, closingSub: Localized }),
  seo: z.object({
    siteName: z.string(),
    keywords: z.string().optional(),
    /** เพิ่มเลขเมื่อสร้างภาพ OG ใหม่ เพื่อให้ Facebook/LINE โหลดภาพใหม่ */
    ogVersion: z.string().default('1'),
  }),
  /** ข้อมูล JSON-LD ของบริษัท (LocalBusiness) */
  organization: z.object({
    type: z.enum(['LocalBusiness', 'Organization']),
    legalName: Localized,
    taxId: z.string().optional(),
    image: MediaId.optional(),
    founder: z.object({ name: z.string(), jobTitle: z.string() }).optional(),
    offers: z.array(z.object({ type: z.enum(['Product', 'Service']), name: z.string() })).default([]),
  }),
})
export type SiteSettings = z.infer<typeof SiteSettings>

/** ธีม — ค่าเริ่มต้นของแม่แบบ Poster มาจาก web/src/styles/modernist.css */
export const Theme = z.object({
  template: z.string(),
  colors: z.object({
    bg: z.string(),
    surface: z.string(),
    text: z.string(),
    accent: z.string(),
    accent2: z.string(),
  }),
  fonts: z.object({ heading: z.string(), body: z.string(), headingWeight: z.number().int() }),
  radius: z.number().nonnegative(),
})
export type Theme = z.infer<typeof Theme>
