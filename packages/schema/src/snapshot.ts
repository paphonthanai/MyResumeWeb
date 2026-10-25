import { z } from 'zod'
import { findMissingLocales } from './i18n.ts'
import { TenantId } from './ids.ts'
import { CollectionDef, CollectionItem, itemDataSchema, type CollectionRef } from './collection.ts'
import { Media, type MediaRef } from './media.ts'
import { Form } from './form.ts'
import { Page } from './page.ts'
import { SiteSettings, Theme } from './site.ts'
import type { Link } from './link.ts'

/**
 * เนื้อหาทั้งเว็บไซต์ ณ เวลาหนึ่ง — สิ่งที่ publishSite เขียนลง Storage แล้วส่งให้ renderer build
 * และเป็นรูปแบบไฟล์นำเข้า/ส่งออกข้อมูลของลูกค้า
 */
export const SiteSnapshot = z.object({
  schemaVersion: z.literal(1),
  tenant: z.object({ id: TenantId, name: z.string() }),
  settings: SiteSettings,
  theme: Theme,
  pages: z.array(Page).min(1),
  collections: z.array(z.object({ def: CollectionDef, items: z.array(CollectionItem) })),
  media: z.array(Media),
  forms: z.array(Form),
})
export type SiteSnapshot = z.infer<typeof SiteSnapshot>

export interface Issue {
  path: string
  message: string
}

/**
 * ตรวจ snapshot ก่อนเผยแพร่: รูปแบบข้อมูล, ref ที่ชี้ไปของที่ไม่มีอยู่, item ที่ไม่ตรงนิยาม, ภาษาที่ยังไม่ครบ
 * คืนรายการปัญหา (ว่าง = เผยแพร่ได้)
 */
export function validateSnapshot(input: unknown): Issue[] {
  const parsed = SiteSnapshot.safeParse(input)
  if (!parsed.success) {
    return parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))
  }
  const s = parsed.data
  const issues: Issue[] = []
  const pageIds = new Set(s.pages.map((p) => p.id))
  const mediaIds = new Set(s.media.map((m) => m.id))
  const formIds = new Set(s.forms.map((f) => f.id))
  const defs = new Map(s.collections.map((c) => [c.def.id, c.def]))

  dupes(s.pages.map((p) => p.id), 'pages', issues)
  dupes(s.media.map((m) => m.id), 'media', issues)
  dupes(s.collections.map((c) => c.def.id), 'collections', issues)
  dupes(s.forms.map((f) => f.id), 'forms', issues)

  // path ต้องมีครบทุกภาษาและไม่ซ้ำกันทั้งเว็บ
  const paths = new Set<string>()
  for (const p of s.pages) {
    for (const l of s.settings.langs) {
      const path = p.path[l]
      if (!path) issues.push({ path: `pages.${p.id}.path`, message: `ไม่มี path ภาษา ${l}` })
      else if (paths.has(path)) issues.push({ path: `pages.${p.id}.path.${l}`, message: `path ${path} ซ้ำกับหน้าอื่น` })
      else paths.add(path)
    }
  }

  const checkLink = (link: Link, at: string) => {
    if (link.kind === 'page' && !pageIds.has(link.page)) issues.push({ path: at, message: `ไม่มีหน้า ${link.page}` })
  }
  const checkMedia = (ref: MediaRef | string, at: string) => {
    const id = typeof ref === 'string' ? ref : ref.media
    if (!mediaIds.has(id)) issues.push({ path: at, message: `ไม่มีไฟล์ ${id} ในคลังสื่อ` })
  }
  const checkSource = (ref: CollectionRef, at: string) => {
    const def = defs.get(ref.collection)
    if (!def) issues.push({ path: at, message: `ไม่มี collection ${ref.collection}` })
    else if (ref.field && !def.fields.some((f) => f.key === ref.field)) {
      issues.push({ path: at, message: `collection ${ref.collection} ไม่มี field ${ref.field}` })
    }
  }

  for (const n of s.settings.nav) if (!pageIds.has(n.page)) issues.push({ path: 'settings.nav', message: `ไม่มีหน้า ${n.page}` })
  checkLink(s.settings.header.cta.link, 'settings.header.cta')
  for (const k of ['logo', 'favicon', 'touchIcon'] as const) {
    const id = s.settings.brand[k]
    if (id) checkMedia(id, `settings.brand.${k}`)
  }
  if (s.settings.organization.image) checkMedia(s.settings.organization.image, 'settings.organization.image')

  for (const p of s.pages) {
    dupes(p.blocks.map((b) => b.id), `pages.${p.id}.blocks`, issues)
    p.blocks.forEach((b, i) => {
      const at = `pages.${p.id}.blocks[${i}]`
      walkRefs(b, at, { link: checkLink, media: checkMedia, source: checkSource })
      if (b.type === 'contactBand' && !formIds.has(b.form)) issues.push({ path: at, message: `ไม่มีฟอร์ม ${b.form}` })
      if (b.type === 'worksGrid') checkSource({ collection: b.source.collection, field: b.categoryField }, `${at}.categoryField`)
      if (b.type === 'catalog') {
        checkSource({ collection: b.groups.collection, field: b.groupKeyField }, `${at}.groupKeyField`)
        checkSource({ collection: b.source.collection, field: b.groupField }, `${at}.groupField`)
      }
    })
  }

  for (const { def, items } of s.collections) {
    dupes(items.map((it) => it.id), `collections.${def.id}.items`, issues)
    const schema = itemDataSchema(def)
    for (const it of items) {
      const at = `collections.${def.id}.items.${it.id}`
      const r = schema.safeParse(it.data)
      if (!r.success) for (const e of r.error.issues) issues.push({ path: `${at}.${e.path.join('.')}`, message: e.message })
      walkRefs(it.data, at, { link: checkLink, media: checkMedia, source: checkSource })
    }
  }

  for (const m of findMissingLocales(s, s.settings.langs)) {
    issues.push({ path: m.path, message: `ยังไม่มีข้อความภาษา ${m.missing.join(', ')}` })
  }
  return issues
}

function dupes(ids: string[], at: string, issues: Issue[]) {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) issues.push({ path: at, message: `id ${id} ซ้ำ` })
    seen.add(id)
  }
}

interface RefVisitors {
  link: (l: Link, at: string) => void
  media: (m: MediaRef, at: string) => void
  source: (c: CollectionRef, at: string) => void
}

// เดินทั้ง object หา Link / MediaRef / CollectionRef จากรูปร่างของข้อมูล
function walkRefs(v: unknown, at: string, visit: RefVisitors): void {
  if (Array.isArray(v)) return v.forEach((x, i) => walkRefs(x, `${at}[${i}]`, visit))
  if (!v || typeof v !== 'object') return
  const o = v as Record<string, unknown>
  if (typeof o.kind === 'string' && ['page', 'url', 'tel', 'email'].includes(o.kind)) return visit.link(o as Link, at)
  if (typeof o.media === 'string') return visit.media(o as MediaRef, at)
  if (typeof o.collection === 'string') return visit.source(o as CollectionRef, at)
  for (const [k, x] of Object.entries(o)) walkRefs(x, `${at}.${k}`, visit)
}
