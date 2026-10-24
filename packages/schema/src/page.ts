import { z } from 'zod'
import { Localized, LocaleCode } from './i18n.ts'
import { PageId } from './ids.ts'
import { Block } from './blocks.ts'

/** JSON-LD เพิ่มเติมของหน้า (LocalBusiness ใส่ทุกหน้าจาก settings.organization อยู่แล้ว) */
export const PageJsonLd = z.enum(['BreadcrumbList', 'VideoObject', 'FAQPage'])

/** หนึ่งหน้าของเว็บไซต์ — เก็บที่ tenants/{tid}/pages/{id} */
export const Page = z.object({
  id: PageId,
  /** path เต็มต่อภาษา เช่น { th: '/about', en: '/en/about' } */
  path: z.record(LocaleCode, z.string().regex(/^\/[a-z0-9/-]*$/)),
  seo: z.object({
    title: Localized,
    description: Localized,
    noindex: z.boolean().default(false),
  }),
  jsonLd: z.array(PageJsonLd).default([]),
  blocks: z.array(Block),
  status: z.enum(['draft', 'published']).default('draft'),
})
export type Page = z.infer<typeof Page>
