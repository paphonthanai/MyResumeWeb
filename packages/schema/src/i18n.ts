import { z } from 'zod'

/** รหัสภาษา เช่น th, en, zh-CN */
export const LocaleCode = z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/, 'รหัสภาษาต้องเป็นแบบ th หรือ zh-CN')
export type LocaleCode = z.infer<typeof LocaleCode>

/**
 * ข้อความหลายภาษา เช่น { th: 'หน้าแรก', en: 'Home' }
 * schema ไม่บังคับว่าต้องครบทุกภาษา เพราะฉบับร่างอาจยังแปลไม่เสร็จ — ตรวจตอนเผยแพร่ด้วย findMissingLocales()
 */
export const Localized = z.record(LocaleCode, z.string())
export type Localized = z.infer<typeof Localized>

export interface MissingLocale {
  path: string
  missing: LocaleCode[]
}

/** หา Localized ทุกตัวในข้อมูลที่ยังขาดภาษาที่เว็บไซต์เปิดใช้ หรือเป็นข้อความว่าง */
export function findMissingLocales(value: unknown, langs: readonly LocaleCode[], path = ''): MissingLocale[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => findMissingLocales(v, langs, `${path}[${i}]`))
  if (!value || typeof value !== 'object') return []
  const entries = Object.entries(value)
  if (isLocalized(entries, langs)) {
    const missing = langs.filter((l) => !(value as Localized)[l]?.trim())
    return missing.length ? [{ path, missing }] : []
  }
  return entries.flatMap(([k, v]) => findMissingLocales(v, langs, path ? `${path}.${k}` : k))
}

// object ที่ทุก key เป็นภาษาที่เว็บไซต์ใช้ และทุกค่าเป็น string ถือว่าเป็น Localized
function isLocalized(entries: [string, unknown][], langs: readonly LocaleCode[]) {
  return entries.length > 0 && entries.every(([k, v]) => langs.includes(k) && typeof v === 'string')
}
