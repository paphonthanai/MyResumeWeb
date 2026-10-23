import { z } from 'zod'
import { Localized } from './i18n.ts'
import { FieldKey, FormId } from './ids.ts'

export const FormField = z.object({
  key: FieldKey,
  type: z.enum(['text', 'tel', 'email', 'textarea']),
  label: Localized,
  required: z.boolean().default(false),
  maxLength: z.number().int().positive().max(5000).optional(),
  /** regex ของ <input pattern> และตรวจซ้ำฝั่ง Function */
  pattern: z.string().optional(),
  /** ค่า autocomplete ของ HTML เช่น name, tel, organization */
  autocomplete: z.string().optional(),
})
export type FormField = z.infer<typeof FormField>

/** ฟอร์มบนเว็บไซต์ — เก็บที่ tenants/{tid}/forms/{id} ส่วนข้อมูลที่ส่งเข้ามาอยู่ใน submissions */
export const Form = z.object({
  id: FormId,
  fields: z.array(FormField).min(1),
  submitLabel: Localized,
  sendingLabel: Localized,
  successMessage: Localized,
  /** ใส่ {phone} และ {email} ได้ renderer จะแทนด้วยข้อมูลติดต่อของบริษัท */
  errorMessage: Localized,
  notify: z.object({ emails: z.array(z.email()).default([]) }).default({ emails: [] }),
})
export type Form = z.infer<typeof Form>
