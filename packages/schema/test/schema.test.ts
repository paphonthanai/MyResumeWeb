import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  findMissingLocales,
  firestoreViolations,
  itemDataSchema,
  validateSnapshot,
  CollectionDef,
  type SiteSnapshot,
} from '../src/index.ts'

const T = (th: string, en: string) => ({ th, en })

// เว็บไซต์เล็กที่สุดที่ผ่านการตรวจ ใช้เป็นฐานแล้วแก้ทีละจุดในแต่ละเทสต์
function minimal(): SiteSnapshot {
  return {
    schemaVersion: 1,
    tenant: { id: 'acme', name: 'Acme' },
    settings: {
      langs: ['th', 'en'],
      url: 'https://acme.example',
      brand: {
        name: T('แอคมี', 'Acme'),
        legal: T('บริษัท แอคมี จำกัด', 'Acme Co., Ltd.'),
        slogan: T('สโลแกน', 'Slogan'),
        wordmark: ['ACME'],
        tagline: 'Co., Ltd.',
        logo: 'logo',
        favicon: 'logo',
      },
      contact: {
        phone: '02-000-0000',
        phoneE164: '+6620000000',
        email: 'hi@acme.example',
        address: T('กรุงเทพฯ', 'Bangkok'),
        postal: { street: '1', locality: 'Bangkok', region: 'Bangkok', postalCode: '10100', country: 'TH' },
      },
      nav: [{ page: 'home', label: T('หน้าแรก', 'Home') }],
      header: { cta: { label: T('ติดต่อ', 'Contact'), link: { kind: 'page', page: 'home' } }, call: T('โทร', 'Call') },
      footer: { closing: T('ปิดท้าย', 'Closing'), closingSub: T('รอง', 'Sub') },
      seo: { siteName: 'Acme', ogVersion: '1' },
      organization: { type: 'Organization', legalName: T('บริษัท แอคมี จำกัด', 'Acme Co., Ltd.'), offers: [] },
    },
    theme: {
      template: 'poster',
      colors: { bg: '#fff', surface: '#eee', text: '#111', accent: '#e00', accent2: '#f55' },
      fonts: { heading: 'Archivo', body: 'Archivo', headingWeight: 800 },
      radius: 0,
    },
    pages: [
      {
        id: 'home',
        path: { th: '/', en: '/en' },
        seo: { title: T('หน้าแรก', 'Home'), description: T('คำอธิบาย', 'Description'), noindex: false },
        jsonLd: [],
        status: 'published',
        blocks: [{ id: 'faq', type: 'faq', heading: T('คำถาม', 'FAQ'), source: { collection: 'faq' } }],
      },
    ],
    collections: [
      {
        def: {
          id: 'faq',
          name: T('คำถาม', 'FAQ'),
          fields: [
            { key: 'question', type: 'localized', label: T('คำถาม', 'Question'), required: true },
            { key: 'answer', type: 'localized', label: T('คำตอบ', 'Answer'), required: true },
          ],
        },
        items: [{ id: '01', order: 0, published: true, data: { question: T('ถาม', 'Q'), answer: T('ตอบ', 'A') } }],
      },
    ],
    media: [{ id: 'logo', kind: 'image', file: 'logo.png', mime: 'image/png', w: 512, h: 512, variants: [] }],
    forms: [],
  }
}

test('เว็บไซต์ตัวอย่างผ่านการตรวจ', () => {
  assert.deepEqual(validateSnapshot(minimal()), [])
})

test('จับลิงก์ไปหน้าที่ไม่มี, รูปที่ไม่มี, collection ที่ไม่มี และฟอร์มที่ไม่มี', () => {
  const s = minimal()
  s.settings.header.cta.link = { kind: 'page', page: 'pricing' }
  s.pages[0].blocks.push(
    { id: 'photo', type: 'photo', image: { media: 'missing' } },
    { id: 'grid', type: 'serviceGrid', source: { collection: 'services' } },
    {
      id: 'contact',
      type: 'contactBand',
      heading: T('ติดต่อ', 'Contact'),
      form: 'contact',
      labels: { address: T('ที่อยู่', 'Address'), email: T('อีเมล', 'Email') },
    },
  )
  const messages = validateSnapshot(s).map((i) => i.message)
  assert.ok(messages.includes('ไม่มีหน้า pricing'))
  assert.ok(messages.includes('ไม่มีไฟล์ missing ในคลังสื่อ'))
  assert.ok(messages.includes('ไม่มี collection services'))
  assert.ok(messages.includes('ไม่มีฟอร์ม contact'))
})

test('จับ field ของ collection ที่ไม่มี และ item ที่ข้อมูลไม่ตรงนิยาม', () => {
  const s = minimal()
  s.pages[0].blocks.push({
    id: 'hero',
    type: 'hero',
    kicker: T('k', 'k'),
    words: { collection: 'faq', field: 'title' },
    lead: T('l', 'l'),
    cta: { label: T('c', 'c'), link: { kind: 'page', page: 'home' } },
    image: { media: 'logo' },
  })
  s.collections[0].items[0].data = { question: 'ไม่ใช่ Localized', extra: 1 }
  const issues = validateSnapshot(s)
  assert.ok(issues.some((i) => i.message === 'collection faq ไม่มี field title'))
  assert.ok(issues.some((i) => i.path.endsWith('.question')))
  assert.ok(issues.some((i) => i.path.includes('items.01')), 'ต้องจับ field extra และ answer ที่หายไป')
})

test('จับ path ซ้ำ และ id ของ block ซ้ำ', () => {
  const s = minimal()
  s.pages.push({ ...structuredClone(s.pages[0]), id: 'copy' })
  s.pages[0].blocks.push(structuredClone(s.pages[0].blocks[0]))
  const messages = validateSnapshot(s).map((i) => i.message)
  assert.ok(messages.includes('path / ซ้ำกับหน้าอื่น'))
  assert.ok(messages.includes('id faq ซ้ำ'))
})

test('จับข้อความที่ยังไม่ได้แปล', () => {
  const s = minimal()
  s.pages[0].seo.description = { th: 'คำอธิบาย', en: ' ' }
  assert.deepEqual(validateSnapshot(s), [{ path: 'pages[0].seo.description', message: 'ยังไม่มีข้อความภาษา en' }])
  assert.deepEqual(findMissingLocales({ a: { th: 'x' }, b: [{ th: 'y', en: 'z' }] }, ['th', 'en']), [
    { path: 'a', missing: ['en'] },
  ])
})

test('รูปแบบข้อมูลผิดคืนเป็นรายการปัญหา ไม่ throw', () => {
  const s = minimal() as unknown as Record<string, unknown>
  s.schemaVersion = 2
  const issues = validateSnapshot(s)
  assert.equal(issues[0].path, 'schemaVersion')
})

test('itemDataSchema ไม่รับ field ที่ไม่ได้นิยาม และบังคับ field required', () => {
  const def = CollectionDef.parse(minimal().collections[0].def)
  const schema = itemDataSchema(def)
  assert.ok(schema.safeParse({ question: T('q', 'q'), answer: T('a', 'a') }).success)
  assert.ok(!schema.safeParse({ question: T('q', 'q') }).success)
  assert.ok(!schema.safeParse({ question: T('q', 'q'), answer: T('a', 'a'), x: 1 }).success)
})

test('CollectionDef ไม่รับ key ซ้ำ', () => {
  const def = minimal().collections[0].def
  def.fields.push({ ...def.fields[0] })
  assert.ok(!CollectionDef.safeParse(def).success)
})

test('firestoreViolations จับ array ซ้อนและ undefined', () => {
  assert.deepEqual(firestoreViolations({ a: [[1]], b: undefined, c: [{ d: [1] }] }), ['a[0]: array ซ้อน array', 'b: undefined'])
})
