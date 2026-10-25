<script setup>
import { computed, ref } from 'vue'
import { categoryFields, groupOptions, groupRefs, textOf } from '@pnjtech/schema'
import { prefs } from '../theme'
import { useT } from '../i18n'
import { mediaSrc } from '../collections/sample'
import SkLocalizedInput from './SkLocalizedInput.vue'
import SkMediaPicker from './SkMediaPicker.vue'

// Edit form for one collection item, generated from def.fields:
// text, number, boolean, localized (one box per site language),
// localizedList, media (picked from the media library) and — for fields a
// catalog block points at a category collection — a category chip picker.
const props = defineProps({
  def: { type: Object, required: true },
  data: { type: Object, required: true },
  snapshot: { type: Object, required: true },
  lang: { type: String, required: true },
  /** { [fieldKey]: string[] } problems for the current draft */
  errors: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['set'])

const t = useT({
  th: { pick: 'เลือกจากคลังสื่อ', change: 'เปลี่ยนรูป', clear: 'เอาออก', noImage: 'ยังไม่ได้เลือกรูป', add: '+ เพิ่ม', remove: 'ลบ', required: 'จำเป็น', unknown: 'ไม่มีหมวดนี้', categories: 'หมวดที่มีอยู่', item: 'ข้อที่' },
  en: { pick: 'Choose from library', change: 'Change image', clear: 'Remove', noImage: 'No image selected', add: '+ Add', remove: 'Delete', required: 'required', unknown: 'No such category', categories: 'Existing categories', item: 'Item' },
})

const langs = computed(() => props.snapshot.settings.langs)
const label = (f) => textOf(f.label, prefs.lang)
const groupRef = (f) => groupRefs(props.snapshot).find((r) => r.collection === props.def.id && r.field === f.key)
const options = (f) => groupOptions(props.snapshot, groupRef(f), prefs.lang)
const isCategory = (f) =>
  f.type === 'localized' && categoryFields(props.snapshot).some((c) => c.collection === props.def.id && c.field === f.key)

// Distinct values already used by the other items, offered as chips.
function categories(f) {
  const col = props.snapshot.collections.find((c) => c.def.id === props.def.id)
  const seen = new Map()
  for (const it of col?.items ?? []) {
    const v = it.data[f.key]
    if (v && textOf(v, props.lang)) seen.set(JSON.stringify(v), v)
  }
  return [...seen.values()]
}

const mediaById = (id) => props.snapshot.media.find((m) => m.id === id)
const picking = ref(null)
function pickMedia(id) {
  const f = picking.value
  emit('set', f.key, { ...(props.data[f.key] || {}), media: id })
  picking.value = null
}

function setNumber(f, raw) {
  emit('set', f.key, raw === '' ? (f.required ? 0 : undefined) : Number(raw))
}
function setListRow(f, i, row) {
  emit('set', f.key, (props.data[f.key] || []).map((x, j) => (j === i ? row : x)))
}
function addListRow(f) {
  emit('set', f.key, [...(props.data[f.key] || []), Object.fromEntries(langs.value.map((l) => [l, '']))])
}
function removeListRow(f, i) {
  emit('set', f.key, (props.data[f.key] || []).filter((_, j) => j !== i))
}
const sameLocalized = (a, b) => JSON.stringify(a) === JSON.stringify(b)
</script>

<template>
  <div class="sk-form">
    <div v-for="f in def.fields" :key="f.key" class="sk-form-field" :class="{ 'has-error': errors[f.key]?.length }">
      <div class="sk-form-label">
        <span>{{ label(f) }}<b v-if="f.required" class="sk-req" :title="t.required"> *</b></span>
        <span class="sk-mono sk-muted" style="font-size: 11px">{{ f.key }}</span>
      </div>

      <!-- category reference: pick from the categories collection -->
      <template v-if="f.type === 'text' && groupRef(f)">
        <div class="sk-chips" role="group" :aria-label="label(f)">
          <button
            v-for="o in options(f)"
            :key="o.value"
            type="button"
            class="sk-chip"
            :class="{ 'is-on': data[f.key] === o.value }"
            :aria-pressed="data[f.key] === o.value"
            @click="emit('set', f.key, o.value)"
          >{{ o.label }}</button>
          <span v-if="data[f.key] && !options(f).some((o) => o.value === data[f.key])" class="sk-chip is-bad">{{ t.unknown }}: {{ data[f.key] }}</span>
        </div>
      </template>

      <input
        v-else-if="f.type === 'text'"
        class="sk-input"
        :value="data[f.key] ?? ''"
        :aria-label="label(f)"
        :aria-invalid="errors[f.key]?.length ? 'true' : undefined"
        @input="emit('set', f.key, $event.target.value)"
      />

      <input
        v-else-if="f.type === 'number'"
        class="sk-input"
        type="number"
        inputmode="decimal"
        :value="data[f.key] ?? ''"
        :aria-label="label(f)"
        @input="setNumber(f, $event.target.value)"
      />

      <button
        v-else-if="f.type === 'boolean'"
        type="button"
        class="sk-switch"
        :class="{ on: data[f.key] === true }"
        role="switch"
        :aria-checked="data[f.key] === true"
        :aria-label="label(f)"
        @click="emit('set', f.key, data[f.key] !== true)"
      ><span></span></button>

      <template v-else-if="f.type === 'localized'">
        <SkLocalizedInput
          :model-value="data[f.key]"
          :langs="langs"
          :label="label(f)"
          :multiline="['title', 'name', 'quote', 'question', 'answer', 'description'].includes(f.key)"
          :invalid="!!errors[f.key]?.length"
          @update:model-value="emit('set', f.key, $event)"
        />
        <div v-if="isCategory(f)" class="sk-chips" role="group" :aria-label="t.categories">
          <button
            v-for="(c, i) in categories(f)"
            :key="i"
            type="button"
            class="sk-chip"
            :class="{ 'is-on': sameLocalized(c, data[f.key]) }"
            :aria-pressed="sameLocalized(c, data[f.key])"
            @click="emit('set', f.key, { ...c })"
          >{{ textOf(c, lang) }}</button>
        </div>
      </template>

      <template v-else-if="f.type === 'localizedList'">
        <div v-for="(row, i) in data[f.key] || []" :key="i" class="sk-list-row">
          <div class="sk-list-n sk-num" :aria-label="`${t.item} ${i + 1}`">{{ i + 1 }}</div>
          <SkLocalizedInput :model-value="row" :langs="langs" :label="`${label(f)} ${i + 1}`" @update:model-value="setListRow(f, i, $event)" />
          <button type="button" class="sk-btn sk-btn-sm" :aria-label="`${t.remove} ${i + 1}`" @click="removeListRow(f, i)">✕</button>
        </div>
        <button type="button" class="sk-btn sk-btn-sm" style="align-self: flex-start" @click="addListRow(f)">{{ t.add }}</button>
      </template>

      <template v-else-if="f.type === 'media'">
        <div class="sk-media-field">
          <div class="sk-media-thumb">
            <img v-if="mediaById(data[f.key]?.media)" :src="mediaSrc(mediaById(data[f.key].media))" alt="" />
            <span v-else class="sk-muted">{{ t.noImage }}</span>
          </div>
          <div class="sk-media-actions">
            <span v-if="data[f.key]?.media" class="sk-mono" style="font-size: 12px">{{ data[f.key].media }}</span>
            <button type="button" class="sk-btn sk-btn-sm" @click="picking = f">{{ data[f.key]?.media ? t.change : t.pick }}</button>
            <button v-if="data[f.key]?.media" type="button" class="sk-btn sk-btn-sm" @click="emit('set', f.key, undefined)">{{ t.clear }}</button>
          </div>
        </div>
      </template>

      <p v-for="(m, i) in errors[f.key] || []" :key="i" class="sk-field-error" role="alert">{{ m }}</p>
    </div>

    <SkMediaPicker
      v-if="picking"
      :media="snapshot.media"
      :current="data[picking.key]?.media"
      @pick="pickMedia"
      @close="picking = null"
    />
  </div>
</template>
