import { z } from 'zod'

// id ทุกชนิดใช้เป็นชื่อ document ใน Firestore และเป็นส่วนหนึ่งของ path ใน Storage จึงจำกัดตัวอักษร
const slugId = (what: string) =>
  z.string().regex(/^[a-z0-9][a-z0-9-]{0,62}$/, `${what} ต้องเป็น a-z, 0-9, - และยาวไม่เกิน 63 ตัว`)

export const TenantId = slugId('tenant id')
export const PageId = slugId('page id')
export const BlockId = slugId('block id')
export const CollectionId = slugId('collection id')
export const ItemId = slugId('item id')
export const MediaId = slugId('media id')
export const FormId = slugId('form id')

/** key ของ field ใน collection หรือ form เช่น title, phone */
export const FieldKey = z.string().regex(/^[a-z][a-zA-Z0-9]{0,39}$/, 'field key ต้องเป็น camelCase')
