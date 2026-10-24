<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import {
  categoryFields,
  findMissingLocales,
  groupOptions,
  groupRefs,
  itemDataSchema,
  itemTitle,
  newItem,
  textOf,
  thumbField,
} from '@pnjtech/schema'
import SkShell from '../components/SkShell.vue'
import SkItemForm from '../components/SkItemForm.vue'
import { chrome, useT } from '../i18n'
import '../collections/collections.css'
import { prefs } from '../theme'
import {
  deleteItem, downloadSnapshot, edited, issues, itemsOf, loadSample, mediaSrc, moveItem, resetSample, saveItem, setPublished, snapshot, status,
} from '../collections/sample'

// Collections (design: Collections.dc.html) — list every collection of the
// site, edit items with a form generated from the collection's fields, and
// check the result with validateSnapshot(). Runs on the Fire First sample;
// edits stay in this browser (see ../collections/sample.js).
const nav = useT(chrome)
const t = useT({
  th: {
    sampleTitle: 'โหมดตัวอย่าง · ข้อมูล Fire First',
    sampleBody: 'ที่นี่ใช้ข้อมูลเว็บ Fire First เป็นตัวอย่าง การแก้ไขเก็บในเบราว์เซอร์นี้เท่านั้น ไม่ได้บันทึกลงระบบ',
    export: 'ส่งออก snapshot (JSON)', reset: 'รีเซ็ตข้อมูลตัวอย่าง', resetAsk: 'ล้างการแก้ไขทั้งหมดและกลับไปใช้ข้อมูลตัวอย่างเดิม?', edited: 'มีการแก้ไข',
    loading: 'กำลังโหลดข้อมูลตัวอย่าง…',
    missingTitle: 'ยังไม่พบข้อมูลตัวอย่าง Fire First',
    missingBody: 'clone repo Fire First ไว้ที่ ../firefirst/web (หรือตั้งตัวแปร FIRE_FIRST_WEB ชี้ไปที่โฟลเดอร์ web ของ repo นั้น) แล้วเริ่ม npm run dev หรือ npm run build ใหม่',
    checkOk: 'ข้อมูลผ่านการตรวจ', checkBad: (n) => `พบปัญหา ${n} รายการ`, checkHint: 'ตรวจด้วย validateSnapshot() ทั้งเว็บไซต์ — กดที่รายการเพื่อไปยังจุดที่มีปัญหา',
    collections: 'Collection', all: 'ทั้งหมด', search: 'ค้นหา…', add: '+ เพิ่มรายการ', empty: 'ไม่มีรายการ', noMatch: 'ไม่พบรายการที่ค้นหา',
    colTitle: 'ชื่อ', colCat: 'หมวด', colPub: 'เผยแพร่', colOrder: 'ลำดับ', up: 'เลื่อนขึ้น', down: 'เลื่อนลง', open: 'แก้ไข',
    edit: 'แก้ไขรายการ', create: 'เพิ่มรายการใหม่', pickOne: 'เลือกรายการทางซ้ายเพื่อแก้ไข หรือเพิ่มรายการใหม่', unsaved: 'ยังไม่บันทึก', saved: 'บันทึกแล้ว',
    publishOn: 'เผยแพร่บนเว็บไซต์', publishHint: 'ปิดแล้วรายการนี้จะไม่แสดงบนเว็บ', save: 'บันทึก', revert: 'ยกเลิกการแก้ไข', del: 'ลบ', close: 'ปิด',
    delAsk: 'ลบรายการนี้?', discardAsk: 'มีการแก้ไขที่ยังไม่บันทึก ทิ้งการแก้ไขนี้?',
    fieldsBad: 'ฟอร์มนี้ยังมีช่องที่ไม่ผ่านการตรวจ', pickCategory: 'เลือกหมวดจากรายการ', required: 'จำเป็นต้องกรอก', missingLang: (l) => `ยังไม่มีข้อความภาษา ${l}`,
    itemsN: (n) => `${n} รายการ`, unpublished: 'ซ่อนอยู่',
  },
  en: {
    sampleTitle: 'Sample mode · Fire First data',
    sampleBody: 'This screen uses the Fire First website as sample data. Edits are kept in this browser only and are not saved to the platform.',
    export: 'Export snapshot (JSON)', reset: 'Reset sample data', resetAsk: 'Discard all edits and go back to the original sample data?', edited: 'Edited',
    loading: 'Loading sample data…',
    missingTitle: 'Fire First sample data not found',
    missingBody: 'Clone the Fire First repo to ../firefirst/web (or set FIRE_FIRST_WEB to its web folder), then restart npm run dev or npm run build.',
    checkOk: 'Data passes validation', checkBad: (n) => `${n} problem${n === 1 ? '' : 's'} found`, checkHint: 'Checked with validateSnapshot() across the whole site — click an entry to jump to it',
    collections: 'Collection', all: 'All', search: 'Search…', add: '+ Add item', empty: 'No items', noMatch: 'No items match your search',
    colTitle: 'Name', colCat: 'Category', colPub: 'Published', colOrder: 'Order', up: 'Move up', down: 'Move down', open: 'Edit',
    edit: 'Edit item', create: 'New item', pickOne: 'Pick an item on the left to edit it, or add a new one', unsaved: 'Unsaved', saved: 'Saved',
    publishOn: 'Publish on the website', publishHint: 'When off, this item is hidden on the site', save: 'Save', revert: 'Discard changes', del: 'Delete', close: 'Close',
    delAsk: 'Delete this item?', discardAsk: 'You have unsaved changes. Discard them?',
    fieldsBad: 'Some fields in this form need attention', pickCategory: 'Pick a category from the list', required: 'Required', missingLang: (l) => `Missing ${l} text`,
    itemsN: (n) => `${n} item${n === 1 ? '' : 's'}`, unpublished: 'Hidden',
  },
})

onMounted(loadSample)

const langs = computed(() => snapshot.value?.settings.langs ?? ['th', 'en'])
// Content language shown in lists: the UI language when the site has it.
const lang = computed(() => (langs.value.includes(prefs.lang) ? prefs.lang : langs.value[0]))
const otherLang = computed(() => langs.value.find((l) => l !== lang.value))

// ---- which collection / filter / search --------------------------------
const cid = ref('')
const cat = ref('')
const q = ref('')
watch(snapshot, (s) => {
  if (s && !s.collections.some((c) => c.def.id === cid.value)) cid.value = (s.collections.find((c) => c.def.id === 'works') ?? s.collections[0])?.def.id ?? ''
}, { immediate: true })

const col = computed(() => snapshot.value?.collections.find((c) => c.def.id === cid.value))
const def = computed(() => col.value?.def)
const items = computed(() => (col.value ? itemsOf(cid.value) : []))
const thumb = computed(() => def.value && thumbField(def.value))

// Category of an item: a reference to a categories collection (catalog), or
// the localized field a works grid filters by.
const groupRef = computed(() => snapshot.value && groupRefs(snapshot.value).find((r) => r.collection === cid.value))
const catField = computed(() => snapshot.value && categoryFields(snapshot.value).find((c) => c.collection === cid.value))
const hasCat = computed(() => !!(groupRef.value || catField.value))

function catKey(item) {
  if (groupRef.value) return String(item.data[groupRef.value.field] ?? '')
  if (catField.value) return textOf(item.data[catField.value.field], 'th') || textOf(item.data[catField.value.field], lang.value)
  return ''
}
function catLabel(item) {
  if (groupRef.value) {
    const o = groupOptions(snapshot.value, groupRef.value, lang.value).find((x) => x.value === catKey(item))
    return o?.label ?? catKey(item)
  }
  return catField.value ? textOf(item.data[catField.value.field], lang.value) : ''
}
const chips = computed(() => {
  if (!hasCat.value) return []
  const counts = new Map()
  for (const it of items.value) counts.set(catKey(it), (counts.get(catKey(it)) ?? 0) + 1)
  const labelOf = new Map()
  if (groupRef.value) for (const o of groupOptions(snapshot.value, groupRef.value, lang.value)) labelOf.set(o.value, o.label)
  for (const it of items.value) if (!labelOf.has(catKey(it))) labelOf.set(catKey(it), catLabel(it))
  return [...labelOf].map(([key, label]) => ({ key, label, n: counts.get(key) ?? 0 }))
})
watch(cid, () => { cat.value = ''; q.value = '' })

const rows = computed(() => {
  const needle = q.value.trim().toLowerCase()
  return items.value.filter((it) => {
    if (cat.value && catKey(it) !== cat.value) return false
    if (!needle) return true
    return JSON.stringify([it.id, it.data]).toLowerCase().includes(needle)
  })
})
const rowIds = computed(() => rows.value.map((r) => r.id))
const primary = (it) => itemTitle(def.value, it, lang.value)
const secondary = (it) => {
  if (!otherLang.value) return ''
  const s = itemTitle(def.value, it, otherLang.value)
  return s === primary(it) ? '' : s
}
const thumbSrc = (it) => {
  const id = thumb.value && it.data[thumb.value.key]?.media
  return id ? mediaSrc(snapshot.value.media.find((m) => m.id === id)) : ''
}

// ---- editing: a draft copy of one item, committed with "Save" ---------
const clone = (v) => JSON.parse(JSON.stringify(v))
const draft = ref(null)
const original = ref('')
const isNew = ref(false)
const justSaved = ref(false)
// A brand-new item starts blank, so only flag its fields once the user has typed or tried to save.
const touched = ref(false)
const dirty = computed(() => !!draft.value && (isNew.value || JSON.stringify(draft.value) !== original.value))

function confirmDiscard() {
  return !dirty.value || window.confirm(t.value.discardAsk)
}
function open(item, fresh = false) {
  draft.value = clone(item)
  original.value = JSON.stringify(item)
  isNew.value = fresh
  justSaved.value = false
  touched.value = !fresh
}
function closeEditor() {
  if (!confirmDiscard()) return
  draft.value = null
}
function select(item) {
  if (draft.value?.id === item.id && !isNew.value) return
  if (confirmDiscard()) open(item)
}
function selectCollection(id) {
  if (id === cid.value || !confirmDiscard()) return
  cid.value = id
  draft.value = null
}
function startNew() {
  if (!confirmDiscard()) return
  const item = newItem(def.value, items.value, langs.value)
  // Adding while a category chip is active starts in that category.
  if (groupRef.value && cat.value) item.data[groupRef.value.field] = cat.value
  open(item, true)
}
function setField(key, value) {
  if (value === undefined) delete draft.value.data[key]
  else draft.value.data[key] = value
  justSaved.value = false
  touched.value = true
}

const errors = computed(() => {
  const out = {}
  if (!draft.value || !touched.value) return out
  const add = (key, msg) => ((out[key] ??= []).includes(msg) ? 0 : out[key].push(msg))
  const r = itemDataSchema(def.value).safeParse(draft.value.data)
  if (!r.success) {
    for (const e of r.error.issues) {
      const key = e.path[0]
      if (key === undefined) continue
      add(key, e.message.includes('undefined') ? t.value.required : e.message)
    }
  }
  if (groupRef.value) {
    const f = groupRef.value.field
    if (!groupOptions(snapshot.value, groupRef.value, lang.value).some((o) => o.value === draft.value.data[f])) add(f, t.value.pickCategory)
  }
  for (const m of findMissingLocales(draft.value.data, langs.value)) {
    add(m.path.split(/[.[]/)[0], t.value.missingLang(m.missing.join(', ')))
  }
  return out
})
const hasErrors = computed(() => Object.keys(errors.value).length > 0)

function save() {
  touched.value = true
  saveItem(cid.value, draft.value, isNew.value)
  isNew.value = false
  original.value = JSON.stringify(draft.value)
  justSaved.value = true
}
function revert() {
  if (isNew.value) draft.value = null
  else open(JSON.parse(original.value))
}
function remove() {
  if (!window.confirm(t.value.delAsk)) return
  if (!isNew.value) deleteItem(cid.value, draft.value.id)
  draft.value = null
}
function move(item, dir) {
  moveItem(cid.value, item.id, dir, rowIds.value)
}
function togglePublished(item) {
  setPublished(cid.value, item.id, !item.published)
  if (draft.value?.id === item.id && !isNew.value) {
    draft.value.published = !item.published
    original.value = JSON.stringify({ ...JSON.parse(original.value), published: draft.value.published })
  }
}
function resetAll() {
  if (!window.confirm(t.value.resetAsk)) return
  draft.value = null
  resetSample()
}

// ---- validation panel --------------------------------------------------
const issuesOpen = ref(false)
// validateSnapshot() reports item problems as collections.<id>.items.<itemId>.<field> and
// missing translations as collections[i].items[j].data.<field>; both open the item.
function locate(path) {
  let m = /^collections\.([a-z0-9-]+)\.items\.([a-z0-9-]+)/.exec(path)
  if (m) {
    const c = snapshot.value.collections.find((x) => x.def.id === m[1])
    return c && { cid: m[1], item: c.items.find((x) => x.id === m[2]) }
  }
  m = /^collections\[(\d+)\]\.items\[(\d+)\]/.exec(path)
  const c = m && snapshot.value.collections[Number(m[1])]
  return c && { cid: c.def.id, item: c.items[Number(m[2])] }
}
const friendly = (message) => (message.includes('received undefined') ? t.value.required : message)
function openIssue(issue) {
  const hit = locate(issue.path)
  if (!hit?.item || !confirmDiscard()) return
  cid.value = hit.cid
  open(hit.item)
}
const issueCount = (id) => issues.value.filter((i) => i.path.startsWith(`collections.${id}.`)).length
</script>

<template>
  <SkShell :title="nav.nav.collections">
    <main class="sk-page sk-col">
      <p v-if="status === 'loading' || status === 'idle'" class="sk-muted">{{ t.loading }}</p>

      <section v-else-if="status === 'missing'" class="sk-card" style="padding: 32px; max-width: 640px; display: flex; flex-direction: column; gap: 10px">
        <h2 style="font-size: 18px; font-weight: 600">{{ t.missingTitle }}</h2>
        <p class="sk-muted" style="margin: 0">{{ t.missingBody }}</p>
      </section>

      <template v-else>
        <section class="sk-card sk-col-banner" aria-live="polite">
          <div style="min-width: 0">
            <div style="font-weight: 600">{{ t.sampleTitle }} <span v-if="edited" class="sk-pill sk-pill-warn" style="margin-left: 6px; padding: 1px 8px; font-size: 12px">{{ t.edited }}</span></div>
            <div class="sk-muted" style="font-size: 13px">{{ t.sampleBody }}</div>
          </div>
          <div class="sk-col-banner-actions">
            <button type="button" class="sk-btn sk-btn-sm" @click="downloadSnapshot">{{ t.export }}</button>
            <button type="button" class="sk-btn sk-btn-sm" :disabled="!edited" @click="resetAll">{{ t.reset }}</button>
          </div>
        </section>

        <section class="sk-card sk-col-check" :class="{ 'is-bad': issues.length }">
          <button type="button" class="sk-col-check-head" :aria-expanded="issuesOpen" :disabled="!issues.length" @click="issuesOpen = !issuesOpen">
            <span class="sk-pill" :class="issues.length ? 'sk-pill-bad' : 'sk-pill-ok'"><i></i>{{ issues.length ? t.checkBad(issues.length) : t.checkOk }}</span>
            <span class="sk-muted sk-hide-sm" style="font-size: 12px">{{ t.checkHint }}</span>
            <span v-if="issues.length" aria-hidden="true">{{ issuesOpen ? '▴' : '▾' }}</span>
          </button>
          <ul v-if="issuesOpen && issues.length" class="sk-col-issues">
            <li v-for="(i, n) in issues.slice(0, 100)" :key="n">
              <button type="button" class="sk-link" style="text-align: left; font-weight: 500" @click="openIssue(i)">
                <span class="sk-mono" style="font-size: 12px">{{ i.path }}</span> — {{ friendly(i.message) }}
              </button>
            </li>
            <li v-if="issues.length > 100" class="sk-muted">+ {{ issues.length - 100 }}</li>
          </ul>
        </section>

        <div class="sk-col-grid">
          <section class="sk-col-list" :aria-label="t.collections">
            <div class="sk-col-tabs" role="tablist" :aria-label="t.collections">
              <button
                v-for="c in snapshot.collections"
                :key="c.def.id"
                type="button"
                role="tab"
                class="sk-col-tab"
                :class="{ on: c.def.id === cid }"
                :aria-selected="c.def.id === cid"
                @click="selectCollection(c.def.id)"
              >
                {{ textOf(c.def.name, lang) }}
                <span class="sk-num">{{ c.items.length }}</span>
                <i v-if="issueCount(c.def.id)" class="sk-col-dot" :title="t.checkBad(issueCount(c.def.id))"></i>
              </button>
            </div>

            <div class="sk-col-tools">
              <div v-if="chips.length" class="sk-chips" role="group" :aria-label="t.colCat">
                <button type="button" class="sk-chip" :class="{ 'is-on': !cat }" :aria-pressed="!cat" @click="cat = ''">{{ t.all }} <span class="sk-num">{{ items.length }}</span></button>
                <button v-for="c in chips" :key="c.key" type="button" class="sk-chip" :class="{ 'is-on': cat === c.key }" :aria-pressed="cat === c.key" @click="cat = c.key">
                  {{ c.label }} <span class="sk-num">{{ c.n }}</span>
                </button>
              </div>
              <div class="sk-col-search">
                <input v-model="q" type="search" class="sk-input" style="height: 36px" :placeholder="t.search" :aria-label="t.search" />
                <button type="button" class="sk-btn sk-btn-sm sk-btn-primary" style="height: 36px" @click="startNew">{{ t.add }}</button>
              </div>
            </div>

            <div class="sk-card sk-col-table" :class="{ 'no-cat': !hasCat, 'no-thumb': !thumb }" role="table" :aria-label="textOf(def.name, lang)">
              <div class="sk-col-head" role="row">
                <span role="columnheader">{{ t.colTitle }}</span>
                <span v-if="hasCat" role="columnheader" class="sk-hide-sm">{{ t.colCat }}</span>
                <span role="columnheader" class="sk-hide-sm">{{ t.colPub }}</span>
                <span role="columnheader" class="sk-hide-sm" style="text-align: right">{{ t.colOrder }}</span>
              </div>
              <div v-for="(r, i) in rows" :key="r.id" class="sk-col-row" :class="{ 'is-sel': draft && draft.id === r.id && !isNew }" role="row">
                <button type="button" class="sk-col-pick" :aria-label="`${t.open}: ${primary(r)}`" @click="select(r)">
                  <span v-if="thumb" class="sk-col-thumb"><img v-if="thumbSrc(r)" :src="thumbSrc(r)" alt="" loading="lazy" /></span>
                  <span class="sk-col-title">
                    <b>{{ primary(r) }}</b>
                    <small v-if="secondary(r)">{{ secondary(r) }}</small>
                  </span>
                </button>
                <span v-if="hasCat" class="sk-col-cat" role="cell"><span v-if="catLabel(r)">{{ catLabel(r) }}</span></span>
                <button
                  type="button"
                  class="sk-switch"
                  :class="{ on: r.published }"
                  role="switch"
                  :aria-checked="r.published"
                  :aria-label="`${t.colPub}: ${primary(r)}`"
                  @click="togglePublished(r)"
                ><span></span></button>
                <span class="sk-col-move">
                  <button type="button" class="sk-btn sk-btn-sm" :disabled="i === 0" :aria-label="`${t.up}: ${primary(r)}`" @click="move(r, -1)">↑</button>
                  <button type="button" class="sk-btn sk-btn-sm" :disabled="i === rows.length - 1" :aria-label="`${t.down}: ${primary(r)}`" @click="move(r, 1)">↓</button>
                </span>
              </div>
              <p v-if="!rows.length" class="sk-muted" style="margin: 0; padding: 24px 16px">{{ items.length ? t.noMatch : t.empty }}</p>
            </div>
          </section>

          <aside class="sk-card sk-col-edit" :class="{ 'is-open': draft }" :aria-label="t.edit">
            <template v-if="draft">
              <div class="sk-col-edit-head">
                <span style="font-size: 16px; font-weight: 600">{{ isNew ? t.create : t.edit }}</span>
                <span style="display: flex; align-items: center; gap: 10px">
                  <span class="sk-muted" style="font-size: 12px" role="status">{{ dirty ? t.unsaved : justSaved ? t.saved : '' }}</span>
                  <button type="button" class="sk-btn sk-btn-sm" @click="closeEditor">{{ t.close }}</button>
                </span>
              </div>
              <div class="sk-col-edit-body">
                <p v-if="hasErrors" class="sk-alert sk-alert-bad" role="alert" style="margin: 0">{{ t.fieldsBad }}</p>
                <SkItemForm :def="def" :data="draft.data" :snapshot="snapshot" :lang="lang" :errors="errors" @set="setField" />
                <div class="sk-col-pub">
                  <div>
                    <div style="font-weight: 500">{{ t.publishOn }}</div>
                    <div class="sk-muted" style="font-size: 12px">{{ t.publishHint }}</div>
                  </div>
                  <button type="button" class="sk-switch lg" :class="{ on: draft.published }" role="switch" :aria-checked="draft.published" :aria-label="t.publishOn" @click="draft.published = !draft.published">
                    <span></span>
                  </button>
                </div>
              </div>
              <div class="sk-col-edit-foot">
                <button type="button" class="sk-btn sk-btn-primary" style="flex: 1" :disabled="!dirty" @click="save">{{ t.save }}</button>
                <button type="button" class="sk-btn" :disabled="!dirty && !isNew" @click="revert">{{ t.revert }}</button>
                <button type="button" class="sk-btn" style="color: var(--sk-bad)" @click="remove">{{ t.del }}</button>
              </div>
            </template>
            <p v-else class="sk-muted" style="margin: 0; padding: 32px 24px">{{ t.pickOne }}</p>
          </aside>
        </div>
      </template>
    </main>
  </SkShell>
</template>
