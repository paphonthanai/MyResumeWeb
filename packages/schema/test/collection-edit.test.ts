import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  categoryFields,
  emptyData,
  groupOptions,
  groupRefs,
  itemDataSchema,
  itemTitle,
  moveItem,
  newItem,
  nextItemId,
  refIssues,
  removeItem,
  renumber,
  textOf,
  type CollectionDef,
  type CollectionItem,
  type SiteSnapshot,
} from '../src/index.ts'

const T = (th: string, en: string) => ({ th, en })
const LANGS = ['th', 'en']

const def: CollectionDef = {
  id: 'catalog',
  name: T('สินค้า', 'Products'),
  fields: [
    { key: 'group', type: 'text', label: T('หมวด', 'Category'), required: true },
    { key: 'image', type: 'media', label: T('รูป', 'Image'), required: true },
    { key: 'title', type: 'localized', label: T('ชื่อ', 'Name'), required: true },
    { key: 'features', type: 'localizedList', label: T('สเปก', 'Specs'), required: false },
    { key: 'stock', type: 'number', label: T('สต็อก', 'Stock'), required: false },
    { key: 'hot', type: 'boolean', label: T('แนะนำ', 'Hot'), required: false },
  ],
}

const item = (id: string, order: number): CollectionItem => ({ id, order, published: true, data: {} })
const ids = (items: CollectionItem[]) => items.map((it) => it.id)

test('item ใหม่มีทุก field ยกเว้นรูป และ id/order ต่อท้ายรายการ', () => {
  const created = newItem(def, [item('01', 0), item('02', 1)], LANGS)
  assert.equal(created.id, '03')
  assert.equal(created.order, 2)
  assert.deepEqual(created.data, { group: '', title: { th: '', en: '' }, features: [], stock: 0, hot: false })
  assert.deepEqual(Object.keys(emptyData(def, LANGS)), ['group', 'title', 'features', 'stock', 'hot'])
})

test('item ใหม่ต้องเลือกรูปก่อนจึงผ่าน itemDataSchema', () => {
  const data = { ...newItem(def, [], LANGS).data }
  assert.equal(itemDataSchema(def).safeParse(data).success, false)
  assert.equal(itemDataSchema(def).safeParse({ ...data, image: { media: 'cone' } }).success, true)
})

test('id ถัดไปไม่ซ้ำแม้ลบกลางรายการหรือ id ไม่ใช่ตัวเลข', () => {
  assert.equal(nextItemId([]), '01')
  assert.equal(nextItemId([item('01', 0), item('03', 1)]), '04')
  assert.equal(nextItemId([item('99', 0)]), '100')
  assert.equal(nextItemId([item('a', 0), item('b', 1)]), 'item-3')
})

test('ลบแล้วเลข order ต่อเนื่องกัน', () => {
  const out = removeItem([item('a', 0), item('b', 1), item('c', 2)], 'b')
  assert.deepEqual(out.map((it) => [it.id, it.order]), [['a', 0], ['c', 1]])
})

test('ย้ายขึ้นลงสลับกับตัวข้างเคียง และไม่ล้นปลายรายการ', () => {
  const list = [item('a', 0), item('b', 1), item('c', 2)]
  assert.deepEqual(ids(moveItem(list, 'b', -1)), ['b', 'a', 'c'])
  assert.deepEqual(ids(moveItem(list, 'b', 1)), ['a', 'c', 'b'])
  assert.deepEqual(ids(moveItem(list, 'a', -1)), ['a', 'b', 'c'])
  assert.deepEqual(ids(moveItem(list, 'c', 1)), ['a', 'b', 'c'])
  assert.deepEqual(moveItem(list, 'c', -1).map((it) => it.order), [0, 1, 2])
})

test('ย้ายเมื่อกรองอยู่ สลับกับ item ที่เห็นถัดไป ข้าม item ที่ถูกซ่อน', () => {
  const list = [item('a', 0), item('x', 1), item('b', 2), item('y', 3), item('c', 4)]
  assert.deepEqual(ids(moveItem(list, 'b', -1, ['a', 'b', 'c'])), ['b', 'x', 'a', 'y', 'c'])
  assert.deepEqual(ids(moveItem(list, 'b', 1, ['a', 'b', 'c'])), ['a', 'x', 'c', 'y', 'b'])
})

test('renumber เรียงตาม order เดิม', () => {
  const out = renumber([item('b', 5), item('a', 2)])
  assert.deepEqual(out.map((it) => [it.id, it.order]), [['a', 0], ['b', 1]])
})

test('ชื่อรายการเลือก title/name ก่อน และถอยไปภาษาอื่นถ้าภาษาที่ขอว่าง', () => {
  const it: CollectionItem = { id: '01', order: 0, published: true, data: { group: 'x', title: { th: '', en: 'Cone' } } }
  assert.equal(itemTitle(def, it, 'th'), 'Cone')
  assert.equal(itemTitle(def, { ...it, data: {} }, 'th'), '01')
  assert.equal(textOf('abc', 'th'), 'abc')
  assert.equal(textOf(undefined, 'th'), '')
})

const snapshot = {
  pages: [{
    blocks: [
      { type: 'catalog', groups: { collection: 'catalog-groups' }, groupKeyField: 'key', source: { collection: 'catalog' }, groupField: 'group' },
      { type: 'worksGrid', source: { collection: 'works' }, categoryField: 'category' },
    ],
  }],
  collections: [{
    def: { id: 'catalog-groups', name: T('หมวด', 'Groups'), fields: [{ key: 'key', type: 'text', label: T('รหัส', 'Key'), required: true }, { key: 'name', type: 'localized', label: T('ชื่อ', 'Name'), required: true }] },
    items: [
      { id: '02', order: 1, published: true, data: { key: 'fire', name: T('ดับเพลิง', 'Fire') } },
      { id: '01', order: 0, published: true, data: { key: 'traffic', name: T('จราจร', 'Traffic') } },
    ],
  }],
} as unknown as SiteSnapshot

test('หา field อ้างอิงหมวดและหมวดของปุ่มกรองจาก block', () => {
  assert.deepEqual(groupRefs(snapshot), [{ collection: 'catalog', field: 'group', groups: 'catalog-groups', groupKeyField: 'key' }])
  assert.deepEqual(categoryFields(snapshot), [{ collection: 'works', field: 'category' }])
})

test('ตัวเลือกหมวดเรียงตาม order ใช้ key เป็นค่าและชื่อหมวดเป็นป้าย', () => {
  const [ref] = groupRefs(snapshot)
  assert.deepEqual(groupOptions(snapshot, ref, 'en'), [{ value: 'traffic', label: 'Traffic' }, { value: 'fire', label: 'Fire' }])
  assert.deepEqual(groupOptions(snapshot, { ...ref, groups: 'nope' }, 'en'), [])
})

test('สินค้าที่ชี้ไปหมวดที่ไม่มีอยู่ถูกรายงาน', () => {
  const withItems = {
    ...snapshot,
    collections: [
      ...snapshot.collections,
      {
        def: { id: 'catalog', name: T('สินค้า', 'Products'), fields: [{ key: 'group', type: 'text', label: T('หมวด', 'Category'), required: true }] },
        items: [
          { id: '01', order: 0, published: true, data: { group: 'fire' } },
          { id: '02', order: 1, published: true, data: { group: 'gone' } },
        ],
      },
    ],
  } as unknown as SiteSnapshot
  assert.deepEqual(refIssues(withItems), [{ path: 'collections.catalog.items.02.group', message: 'ไม่มีหมวด "gone" ใน catalog-groups' }])
  assert.deepEqual(refIssues(snapshot), [])
})
