<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { textOf } from '@pnjtech/schema'
import { prefs } from '../theme'
import { useT } from '../i18n'
import { mediaSrc } from '../collections/sample'

// Modal list of the media library (design: Media.dc.html grid) used to pick
// the image of a "media" field.
const props = defineProps({
  media: { type: Array, required: true },
  current: { type: String, default: '' },
})
const emit = defineEmits(['pick', 'close'])

const t = useT({
  th: { title: 'เลือกจากคลังสื่อ', search: 'ค้นหารูป…', none: 'ไม่พบรูปที่ค้นหา', close: 'ปิด', used: 'ใช้อยู่' },
  en: { title: 'Choose from media library', search: 'Search images…', none: 'No images match', close: 'Close', used: 'Selected' },
})
const q = ref('')
const searchEl = ref(null)
const images = computed(() => {
  const needle = q.value.trim().toLowerCase()
  return props.media
    .filter((m) => m.kind === 'image')
    .filter((m) => !needle || m.id.includes(needle) || Object.values(m.alt || {}).some((a) => a.toLowerCase().includes(needle)))
})

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(async () => {
  document.addEventListener('keydown', onKey)
  await nextTick()
  searchEl.value?.focus()
})
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="sk-modal" @click.self="emit('close')">
    <div class="sk-modal-card" role="dialog" aria-modal="true" :aria-label="t.title">
      <header class="sk-modal-head">
        <h2>{{ t.title }}</h2>
        <button type="button" class="sk-btn sk-btn-sm" @click="emit('close')">{{ t.close }}</button>
      </header>
      <input ref="searchEl" v-model="q" type="search" class="sk-input" :placeholder="t.search" :aria-label="t.search" />
      <div class="sk-media-grid">
        <button
          v-for="m in images"
          :key="m.id"
          type="button"
          class="sk-media-tile"
          :class="{ 'is-on': m.id === current }"
          :aria-pressed="m.id === current"
          @click="emit('pick', m.id)"
        >
          <img :src="mediaSrc(m)" :width="m.w" :height="m.h" loading="lazy" alt="" />
          <span class="sk-mono">{{ m.id }}</span>
          <small>{{ textOf(m.alt, prefs.lang) }}</small>
        </button>
        <p v-if="!images.length" class="sk-muted" style="grid-column: 1 / -1; margin: 0">{{ t.none }}</p>
      </div>
    </div>
  </div>
</template>
