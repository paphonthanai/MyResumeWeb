<script setup>
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import { vReveal } from '../utils/reveal'
import { categories, items } from '../content/workGallery'

const lang = inject('lang')

// `<id>-t.webp` is the grid thumbnail, `<id>.webp` the full image.
const files = import.meta.glob('./image/work/*.webp', { eager: true, import: 'default' })
const src = (id, thumb) => files[`./image/work/${id}${thumb ? '-t' : ''}.webp`]

const content = {
  th: {
    kicker: 'Portfolio',
    title: 'ผลงานจริงจากหน้างาน',
    intro: 'ภาพจากงานที่ลงมือทำจริง ตั้งแต่หุ่นยนต์ ติดตั้งกล้องวงจรปิด ซ่อมฮาร์ดแวร์ ไปจนถึงพัฒนาซอฟต์แวร์และการแข่งขันด้าน Cybersecurity',
    more: 'ดูเพิ่มเติม',
    close: 'ปิด',
    prev: 'ภาพก่อนหน้า',
    next: 'ภาพถัดไป',
  },
  en: {
    kicker: 'Portfolio',
    title: 'Real work, on site',
    intro: 'Photos from hands-on jobs — robotics, CCTV installs, hardware repair, software development and cybersecurity competitions.',
    more: 'Show more',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
  },
}
const t = computed(() => content[lang.value])

const active = ref('all')
const expanded = ref(false)
const PAGE = 12

// "All" deals one photo per category in turn, so the first page shows every kind of work.
const byCat = categories.slice(1).map((c) => items.filter((i) => i.cat === c.id))
const mixed = Array.from({ length: Math.max(...byCat.map((l) => l.length)) }, (_, r) => byCat.map((l) => l[r])).flat().filter(Boolean)

const filtered = computed(() => (active.value === 'all' ? mixed : items.filter((i) => i.cat === active.value)))
const visible = computed(() => (expanded.value ? filtered.value : filtered.value.slice(0, PAGE)))
const countFor = (id) => (id === 'all' ? items.length : items.filter((i) => i.cat === id).length)

watch(active, () => { expanded.value = false })

// Lightbox: index into `filtered`, so prev/next stay inside the chosen category.
const open = ref(-1)
const current = computed(() => filtered.value[open.value])

function onKey(e) {
  if (e.key === 'Escape') open.value = -1
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}
function step(d) {
  const n = filtered.value.length
  open.value = (open.value + d + n) % n
}
watch(open, (i) => {
  if (typeof window === 'undefined') return
  if (i >= 0) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
  document.body.style.overflow = i >= 0 ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="gallery" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.kicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.title }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-2xl text-base-content/60">{{ t.intro }}</p>
      </div>

      <div class="mt-8 flex flex-wrap gap-2" role="tablist">
        <button
          v-for="c in categories"
          :key="c.id"
          type="button"
          role="tab"
          :aria-selected="active === c.id"
          class="rounded-full border px-4 py-1.5 text-xs tracking-wide transition"
          :class="active === c.id
            ? 'border-primary bg-primary text-primary-content'
            : 'border-base-300 text-base-content/60 hover:border-primary/60 hover:text-primary'"
          @click="active = c.id"
        >
          {{ c[lang] }} <span class="opacity-60">· {{ countFor(c.id) }}</span>
        </button>
      </div>

      <ul class="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4">
        <li v-for="(item, i) in visible" :key="item.id" class="mb-4 break-inside-avoid">
          <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-lg border border-base-300 bg-base-200 text-left transition hover:border-primary/50"
            @click="open = i"
          >
            <img
              :src="src(item.id, true)"
              :alt="item[lang]"
              loading="lazy"
              decoding="async"
              class="w-full transition duration-500 group-hover:scale-105"
            />
            <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-2.5 pt-8 text-xs leading-snug text-white/90">
              {{ item[lang] }}
            </span>
          </button>
        </li>
      </ul>

      <div v-if="!expanded && filtered.length > PAGE" class="mt-4 text-center">
        <button
          type="button"
          class="btn btn-sm rounded-full border-primary/70 bg-transparent px-6 text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-content"
          @click="expanded = true"
        >
          {{ t.more }} ({{ filtered.length - PAGE }})
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="current"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="current[lang]"
        @click.self="open = -1"
      >
        <figure class="flex max-h-full max-w-5xl flex-col items-center">
          <img :src="src(current.id)" :alt="current[lang]" class="max-h-[80vh] w-auto rounded-md object-contain" />
          <figcaption class="mt-3 text-center text-sm text-white/80">
            {{ current[lang] }} <span class="text-white/40">· {{ open + 1 }}/{{ filtered.length }}</span>
          </figcaption>
        </figure>
        <button type="button" class="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-sm text-white hover:border-primary hover:text-primary" :aria-label="t.close" @click="open = -1">✕</button>
        <button type="button" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 px-3 py-2 text-white hover:border-primary hover:text-primary md:left-6" :aria-label="t.prev" @click="step(-1)">‹</button>
        <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 px-3 py-2 text-white hover:border-primary hover:text-primary md:right-6" :aria-label="t.next" @click="step(1)">›</button>
      </div>
    </Teleport>
  </section>
</template>
