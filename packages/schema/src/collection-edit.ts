import type { CollectionDef, CollectionItem, FieldDef } from './collection.ts'
import type { LocaleCode } from './i18n.ts'
import type { Issue, SiteSnapshot } from './snapshot.ts'

// ตัวช่วยแก้ collection ในหลังบ้าน: เพิ่ม ลบ เรียงลำดับ และหา field ที่อ้างถึงหมวด
// ทุกฟังก์ชันไม่แก้ข้อมูลที่รับเข้ามา — คืนค่าใหม่เสมอ

/** ค่าเริ่มต้นของ field ตามชนิด — media ไม่มีค่าเริ่มต้น (ต้องเลือกจากคลังสื่อ) */
export function emptyFieldValue(f: FieldDef, langs: readonly LocaleCode[]): unknown {
  switch (f.type) {
    case 'text': return ''
    case 'localized': return Object.fromEntries(langs.map((l) => [l, '']))
    case 'localizedList': return []
    case 'number': return 0
    case 'boolean': return false
    case 'media': return undefined
  }
}

/** item.data เปล่าที่มีครบทุก field (ยกเว้น media ที่ต้องเลือกจากคลังสื่อ) */
export function emptyData(def: CollectionDef, langs: readonly LocaleCode[]): Record<string, unknown> {
  const data: Record<string, unknown> = {}
  for (const f of def.fields) {
    const v = emptyFieldValue(f, langs)
    if (v !== undefined) data[f.key] = v
  }
  return data
}

/** id ถัดไป: เลขล่าสุด + 1 เติมศูนย์ให้ยาวเท่าเดิม (01, 02, …) ถ้า id ไม่ใช่ตัวเลขใช้ item-N */
export function nextItemId(items: readonly CollectionItem[]): string {
  const taken = new Set(items.map((it) => it.id))
  const numeric = items.filter((it) => /^\d+$/.test(it.id))
  if (numeric.length || !items.length) {
    const width = Math.max(2, ...numeric.map((it) => it.id.length))
    let n = Math.max(0, ...numeric.map((it) => Number(it.id))) + 1
    while (taken.has(String(n).padStart(width, '0'))) n++
    return String(n).padStart(width, '0')
  }
  let n = items.length + 1
  while (taken.has(`item-${n}`)) n++
  return `item-${n}`
}

/** item ใหม่ต่อท้ายรายการ */
export function newItem(def: CollectionDef, items: readonly CollectionItem[], langs: readonly LocaleCode[]): CollectionItem {
  const order = items.reduce((m, it) => Math.max(m, it.order + 1), 0)
  return { id: nextItemId(items), order, published: true, data: emptyData(def, langs) }
}

/** เรียงตาม order แล้วเลขใหม่เป็น 0..n-1 (order ที่ซ้ำกันคงลำดับเดิม) */
export function renumber(items: readonly CollectionItem[]): CollectionItem[] {
  return [...items].sort((a, b) => a.order - b.order).map((it, order) => ({ ...it, order }))
}

export function removeItem(items: readonly CollectionItem[], id: string): CollectionItem[] {
  return renumber(items.filter((it) => it.id !== id))
}

/**
 * ย้าย item ขึ้น (-1) หรือลง (+1) สลับกับ item ข้างเคียง
 * visible คือ id ที่เห็นอยู่ในรายการตามลำดับ (เช่นหลังกรองหมวด) — สลับกับ item ที่เห็นถัดไป ไม่ใช่ item ที่ถูกซ่อน
 */
export function moveItem(items: readonly CollectionItem[], id: string, dir: -1 | 1, visible?: readonly string[]): CollectionItem[] {
  const sorted = renumber(items)
  const scope = visible ?? sorted.map((it) => it.id)
  const at = scope.indexOf(id)
  const other = scope[at + dir]
  if (at < 0 || other === undefined) return sorted
  const a = sorted.findIndex((it) => it.id === id)
  const b = sorted.findIndex((it) => it.id === other)
  ;[sorted[a], sorted[b]] = [sorted[b], sorted[a]]
  return sorted.map((it, order) => ({ ...it, order }))
}

/** แทน item ที่ id ตรงกัน (ใช้ตอนกดบันทึก) */
export function replaceItem(items: readonly CollectionItem[], item: CollectionItem): CollectionItem[] {
  return items.map((it) => (it.id === item.id ? item : it))
}

const TITLE_KEYS = ['title', 'name', 'question', 'quote']

/** field ที่ใช้เป็นชื่อรายการ: title/name/question/quote ก่อน ไม่มีก็ field ข้อความตัวแรก */
export function titleField(def: CollectionDef): FieldDef | undefined {
  for (const k of TITLE_KEYS) {
    const f = def.fields.find((x) => x.key === k && (x.type === 'localized' || x.type === 'text'))
    if (f) return f
  }
  return def.fields.find((f) => f.type === 'localized') ?? def.fields.find((f) => f.type === 'text')
}

/** ข้อความของค่า text/localized ในภาษาที่ขอ (ไม่มีค่าใช้ภาษาอื่นแทน) */
export function textOf(value: unknown, lang: LocaleCode): string {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ''
  const o = value as Record<string, unknown>
  const v = o[lang]
  if (typeof v === 'string' && v) return v
  return Object.values(o).find((x): x is string => typeof x === 'string' && x !== '') ?? ''
}

export function itemTitle(def: CollectionDef, item: CollectionItem, lang: LocaleCode): string {
  const f = titleField(def)
  return (f && textOf(item.data[f.key], lang)) || item.id
}

/** field รูปตัวแรกของ collection (ใช้ทำภาพย่อในตาราง) */
export function thumbField(def: CollectionDef): FieldDef | undefined {
  return def.fields.find((f) => f.type === 'media')
}

/** field ที่เก็บ key ของหมวดจาก collection อื่น (กำหนดโดย block catalog) */
export interface GroupRef {
  /** collection ของสินค้าและ field ที่เก็บ key ของหมวด */
  collection: string
  field: string
  /** collection ของหมวด และ field ที่เป็น key */
  groups: string
  groupKeyField: string
}

export function groupRefs(s: SiteSnapshot): GroupRef[] {
  const out: GroupRef[] = []
  for (const p of s.pages) {
    for (const b of p.blocks) {
      if (b.type !== 'catalog') continue
      out.push({ collection: b.source.collection, field: b.groupField, groups: b.groups.collection, groupKeyField: b.groupKeyField })
    }
  }
  return out
}

/** field ข้อความหลายภาษาที่ block worksGrid ใช้เป็นหมวดสำหรับปุ่มกรอง */
export function categoryFields(s: SiteSnapshot): { collection: string; field: string }[] {
  const out: { collection: string; field: string }[] = []
  for (const p of s.pages) {
    for (const b of p.blocks) if (b.type === 'worksGrid') out.push({ collection: b.source.collection, field: b.categoryField })
  }
  return out
}

export interface RefOption {
  value: string
  label: string
}

/** ตัวเลือกของ field อ้างอิงหมวด: ค่าที่เก็บ (key ของหมวด) กับชื่อหมวดที่แสดง */
export function groupOptions(s: SiteSnapshot, ref: GroupRef, lang: LocaleCode): RefOption[] {
  const col = s.collections.find((c) => c.def.id === ref.groups)
  if (!col) return []
  return [...col.items]
    .sort((a, b) => a.order - b.order)
    .map((it) => ({ value: String(it.data[ref.groupKeyField] ?? ''), label: itemTitle(col.def, it, lang) }))
}

/**
 * ตรวจ field อ้างอิงหมวดที่ validateSnapshot() ไม่ตรวจ: สินค้าที่ชี้ไปยัง key หมวดที่ไม่มีอยู่
 * (เช่น หลังลบหมวดที่ยังมีสินค้าอยู่) renderer จะไม่แสดงสินค้านั้นในหมวดใดเลย
 */
export function refIssues(s: SiteSnapshot): Issue[] {
  const issues: Issue[] = []
  for (const ref of groupRefs(s)) {
    const keys = new Set(groupOptions(s, ref, 'th').map((o) => o.value))
    const col = s.collections.find((c) => c.def.id === ref.collection)
    for (const it of col?.items ?? []) {
      const v = it.data[ref.field]
      if (typeof v === 'string' && !keys.has(v)) {
        issues.push({ path: `collections.${ref.collection}.items.${it.id}.${ref.field}`, message: `ไม่มีหมวด "${v}" ใน ${ref.groups}` })
      }
    }
  }
  return issues
}
