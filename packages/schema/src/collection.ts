import { z } from 'zod'
import { Localized } from './i18n.ts'
import { CollectionId, FieldKey, ItemId } from './ids.ts'
import { MediaRef } from './media.ts'

/**
 * ชนิดของ field ที่ลูกค้าสร้างได้
 * - text: ข้อความภาษาเดียว เช่น เบอร์โทร
 * - localized: ข้อความหลายภาษา
 * - localizedList: รายการข้อความหลายภาษา เช่น จุดเด่นของแพ็กเกจ
 */
export const FieldType = z.enum(['text', 'localized', 'localizedList', 'media', 'number', 'boolean'])
export type FieldType = z.infer<typeof FieldType>

export const FieldDef = z.object({
  key: FieldKey,
  type: FieldType,
  label: Localized,
  required: z.boolean().default(false),
})
export type FieldDef = z.infer<typeof FieldDef>

/** นิยามของ collection เช่น services, works, faq — เก็บที่ tenants/{tid}/collections/{id} */
export const CollectionDef = z
  .object({
    id: CollectionId,
    name: Localized,
    fields: z.array(FieldDef).min(1),
  })
  .refine((d) => new Set(d.fields.map((f) => f.key)).size === d.fields.length, {
    message: 'key ของ field ซ้ำกัน',
    path: ['fields'],
  })
export type CollectionDef = z.infer<typeof CollectionDef>

/** รายการหนึ่งใน collection — เก็บที่ tenants/{tid}/collections/{id}/items/{itemId} */
export const CollectionItem = z.object({
  id: ItemId,
  order: z.number().int().nonnegative(),
  published: z.boolean().default(true),
  data: z.record(FieldKey, z.unknown()),
})
export type CollectionItem = z.infer<typeof CollectionItem>

const FIELD_SCHEMA: Record<FieldType, z.ZodType> = {
  text: z.string(),
  localized: Localized,
  localizedList: z.array(Localized),
  media: MediaRef,
  number: z.number(),
  boolean: z.boolean(),
}

/** สร้าง schema ของ item.data ตามนิยาม field — field ที่ไม่ได้นิยามไว้จะไม่ผ่าน */
export function itemDataSchema(def: CollectionDef) {
  const shape: Record<string, z.ZodType> = {}
  for (const f of def.fields) shape[f.key] = f.required ? FIELD_SCHEMA[f.type] : FIELD_SCHEMA[f.type].optional()
  return z.strictObject(shape)
}

/** ref จาก block ไปยัง collection — field ใช้เมื่อ block แสดงแค่ field เดียว (เช่นคำใหญ่ใน hero) */
export const CollectionRef = z.object({
  collection: CollectionId,
  field: FieldKey.optional(),
  limit: z.number().int().positive().optional(),
})
export type CollectionRef = z.infer<typeof CollectionRef>
