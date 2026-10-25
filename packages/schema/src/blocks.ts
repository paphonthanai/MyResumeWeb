import { z } from 'zod'
import { Localized } from './i18n.ts'
import { BlockId, FieldKey, FormId } from './ids.ts'
import { Cta, Link } from './link.ts'
import { MediaRef } from './media.ts'
import { CollectionRef } from './collection.ts'

// section ของแม่แบบ "Poster" (ดีไซน์เว็บ Fire First) — 1 block = 1 <section> ใน src/pages/*.vue
// แม่แบบอื่นเพิ่ม block ของตัวเองได้ โดยเพิ่มเข้า Block union ด้านล่าง

const base = { id: BlockId }
/** เลขกำกับหัวข้อ เช่น "01" ที่ใช้ในหน้าแรก */
const sectionNumber = z.string().max(4).optional()

export const HeroBlock = z.object({
  ...base,
  type: z.literal('hero'),
  kicker: Localized,
  /** คำใหญ่ซ้อนกัน เช่น "เร็ว. / รอด. / ปลอดภัย." ดึงจาก field หนึ่งของ collection */
  words: CollectionRef.required({ field: true }),
  lead: Localized,
  cta: Cta,
  image: MediaRef,
})

export const VideoBlock = z.object({
  ...base,
  type: z.literal('video'),
  video: MediaRef,
  poster: MediaRef,
  title: Localized,
  label: Localized,
  /** สำหรับ JSON-LD VideoObject */
  durationIso: z.string().regex(/^PT(\d+M)?(\d+S)?$/),
  uploadDate: z.iso.date(),
})

export const IntroBlock = z.object({
  ...base,
  type: z.literal('intro'),
  /** <h1> ของหน้า */
  heading: Localized,
  body: Localized,
  cta: Cta,
})

export const ServiceListBlock = z.object({
  ...base,
  type: z.literal('serviceList'),
  number: sectionNumber,
  heading: Localized,
  source: CollectionRef,
  /** ทุกแถวลิงก์ไปที่เดียวกัน */
  link: Link,
})

export const PhotoStripBlock = z.object({
  ...base,
  type: z.literal('photoStrip'),
  images: z.array(MediaRef).min(1).max(6),
})

export const WorksMosaicBlock = z.object({
  ...base,
  type: z.literal('worksMosaic'),
  number: sectionNumber,
  heading: Localized,
  source: CollectionRef,
  more: Cta,
})

export const ReviewsBlock = z.object({
  ...base,
  type: z.literal('reviews'),
  number: sectionNumber,
  heading: Localized,
  source: CollectionRef,
  /** ป้ายใต้หัวข้อ เช่น "ข้อความตัวอย่าง — แทนที่ด้วยรีวิวจริง" */
  note: Localized.optional(),
})

export const TitleBandBlock = z.object({
  ...base,
  type: z.literal('titleBand'),
  kicker: Localized,
  heading: Localized,
})

export const PhotoBlock = z.object({
  ...base,
  type: z.literal('photo'),
  image: MediaRef,
  caption: Localized.optional(),
})

export const ProfileBlock = z.object({
  ...base,
  type: z.literal('profile'),
  body: Localized,
  person: z.object({ name: Localized, role: Localized }),
  facts: z.array(z.object({ label: Localized, value: Localized })),
})

export const ValuesRowBlock = z.object({
  ...base,
  type: z.literal('valuesRow'),
  source: CollectionRef,
})

export const PageHeadingBlock = z.object({
  ...base,
  type: z.literal('pageHeading'),
  heading: Localized,
})

export const ServiceGridBlock = z.object({
  ...base,
  type: z.literal('serviceGrid'),
  source: CollectionRef,
})

export const CardGridBlock = z.object({
  ...base,
  type: z.literal('cardGrid'),
  heading: Localized,
  source: CollectionRef,
})

export const PricingListBlock = z.object({
  ...base,
  type: z.literal('pricingList'),
  heading: Localized,
  source: CollectionRef,
  cta: Cta,
})

export const WorksGridBlock = z.object({
  ...base,
  type: z.literal('worksGrid'),
  heading: Localized,
  source: CollectionRef,
  /** field ที่ใช้ทำปุ่มกรองหมวด */
  categoryField: FieldKey,
  allLabel: Localized,
  filterLabel: Localized,
})

/**
 * แคตตาล็อกสินค้าแบ่งหมวด: หมวดมาจาก collection หนึ่ง (ลำดับ + ชื่อ)
 * ส่วนสินค้ามาจากอีก collection ที่มี field ชี้ไปยัง key ของหมวด
 */
export const CatalogBlock = z.object({
  ...base,
  type: z.literal('catalog'),
  heading: Localized,
  /** ข้อความใต้หัวข้อ เช่น "ขนาดและรุ่นอื่นสั่งได้" */
  note: Localized.optional(),
  groups: CollectionRef,
  /** field ใน collection หมวด ที่สินค้าใช้อ้างถึง */
  groupKeyField: FieldKey,
  source: CollectionRef,
  /** field ในสินค้าที่เก็บ key ของหมวด */
  groupField: FieldKey,
})

export const ContactBandBlock = z.object({
  ...base,
  type: z.literal('contactBand'),
  heading: Localized,
  form: FormId,
  /** ป้ายกำกับข้อมูลติดต่อ (เบอร์ อีเมล ที่อยู่ มาจาก settings.contact) */
  labels: z.object({ address: Localized, email: Localized }),
})

export const MapBlock = z.object({
  ...base,
  type: z.literal('map'),
  query: z.string().min(1),
  zoom: z.number().int().min(1).max(20).default(13),
  title: Localized,
})

export const FaqBlock = z.object({
  ...base,
  type: z.literal('faq'),
  heading: Localized,
  source: CollectionRef,
})

export const Block = z.discriminatedUnion('type', [
  HeroBlock,
  VideoBlock,
  IntroBlock,
  ServiceListBlock,
  PhotoStripBlock,
  WorksMosaicBlock,
  ReviewsBlock,
  TitleBandBlock,
  PhotoBlock,
  ProfileBlock,
  ValuesRowBlock,
  PageHeadingBlock,
  ServiceGridBlock,
  CardGridBlock,
  PricingListBlock,
  WorksGridBlock,
  CatalogBlock,
  ContactBandBlock,
  MapBlock,
  FaqBlock,
])
export type Block = z.infer<typeof Block>
export type BlockType = Block['type']
export type BlockOf<T extends BlockType> = Extract<Block, { type: T }>
