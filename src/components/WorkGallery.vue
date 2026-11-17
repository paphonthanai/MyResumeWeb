<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { vReveal } from '../utils/reveal'
import SectionHeading from './SectionHeading.vue'
import { categories, items } from '../content/workGallery'
import { galleryFilter as active } from '../utils/galleryState'

const lang = inject('lang')
// bare: the page already carries the title, so skip the heading
const props = defineProps({ bare: { type: Boolean, default: false } })

// `<id>-t.webp` is the grid thumbnail, `<id>.webp` the full image.
const files = import.meta.glob('./image/work/*.webp', { eager: true, import: 'default' })
const src = (id, thumb) => files[`./image/work/${id}${thumb ? '-t' : ''}.webp`]

const content = {
  th: {
    kicker: 'Portfolio',
    title: 'ผลงานจริงจากหน้างาน',
    accent: 'หน้างาน',
    intro: 'ภาพจากงานที่ลงมือทำจริง ตั้งแต่หุ่นยนต์ ติดตั้งกล้องวงจรปิด ซ่อมฮาร์ดแวร์ ไปจนถึงพัฒนาซอฟต์แวร์และการอบรมด้าน Cyber Security',
    more: 'ดูเพิ่มเติม',
    close: 'ปิด',
    prev: 'ภาพก่อนหน้า',
    next: 'ภาพถัดไป',
  },
  en: {
    kicker: 'Portfolio',
    title: 'Real work, on site',
    accent: 'on site',
    intro: 'Photos from hands-on jobs — robotics, CCTV installs, hardware repair, software development and Cyber Security training.',
    more: 'Show more',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
  },
}
const t = computed(() => content[lang.value])

// Short category tag shown beside each caption
const TAGS = {
  robotics: { th: 'หุ่นยนต์', en: 'Robotics' },
  network: { th: 'เครือข่าย', en: 'Network' },
  hardware: { th: 'ฮาร์ดแวร์', en: 'Hardware' },
  software: { th: 'ซอฟต์แวร์', en: 'Software' },
  security: { th: 'Security', en: 'Security' },
  design: { th: 'ดีไซน์', en: 'Design' },
}

// "All" deals one photo per category in turn, so the strip starts with every kind of work.
const byCat = categories.slice(1).map((c) => items.filter((i) => i.cat === c.id))
const mixed = Array.from({ length: Math.max(...byCat.map((l) => l.length)) }, (_, r) => byCat.map((l) => l[r])).flat().filter(Boolean)

const filtered = computed(() => (active.value === 'all' ? mixed : items.filter((i) => i.cat === active.value)))
const countFor = (id) => (id === 'all' ? items.length : items.filter((i) => i.cat === id).length)

// Frames cycle through a few shapes so the strip reads like a contact sheet.
const SHAPES = ['4 / 5', '1 / 1', '3 / 4', '5 / 4', '4 / 5', '3 / 4']

// Filmstrip: native horizontal scroll with snap, arrows, a progress bar,
// and click-and-drag for mouse users.
const strip = ref(null)
const stripProgress = ref(0)
const atStart = ref(true)
const atEnd = ref(false)
function onStripScroll() {
  const el = strip.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  stripProgress.value = max > 0 ? el.scrollLeft / max : 1
  atStart.value = el.scrollLeft < 4
  atEnd.value = el.scrollLeft > max - 4
}
function page(d) {
  const el = strip.value
  if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: 'smooth' })
}
watch(active, () => {
  strip.value?.scrollTo({ left: 0 })
  requestAnimationFrame(onStripScroll)
})

let drag = null
let dragged = false
function onDown(e) {
  if (e.pointerType !== 'mouse' || !strip.value) return
  drag = { x: e.clientX, left: strip.value.scrollLeft }
  dragged = false
}
function onMove(e) {
  if (!drag) return
  const dx = e.clientX - drag.x
  if (Math.abs(dx) > 5 && !dragged) {
    dragged = true
    strip.value.classList.add('is-dragging')
  }
  if (dragged) strip.value.scrollLeft = drag.left - dx
}
function onUp() {
  if (!drag) return
  drag = null
  strip.value?.classList.remove('is-dragging')
}
function openAt(i) {
  if (dragged) { dragged = false; return }
  open.value = i
}
onMounted(onStripScroll)

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
  <section id="gallery" class="overflow-hidden" :class="props.bare ? 'pb-24' : 'py-24'">
    <div class="mx-auto max-w-6xl px-6 md:px-10">
      <SectionHeading v-if="!props.bare" :title="t.title" :accent="t.accent" :intro="t.intro" />

      <div class="flex flex-wrap items-center justify-between gap-4" :class="!props.bare && 'mt-10'">
        <div class="pill-group w-fit" role="tablist">
          <button
            v-for="c in categories"
            :key="c.id"
            type="button"
            role="tab"
            :aria-selected="active === c.id"
            class="pill"
            @click="active = c.id"
          >
            {{ c[lang] }} <span class="opacity-50">{{ countFor(c.id) }}</span>
          </button>
        </div>
        <div class="hidden gap-2 md:flex">
          <button type="button" class="strip-btn" :disabled="atStart" :aria-label="t.prev" @click="page(-1)">
            <svg viewBox="0 0 16 16" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <button type="button" class="strip-btn" :disabled="atEnd" :aria-label="t.next" @click="page(1)">
            <svg viewBox="0 0 16 16" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Filmstrip: starts aligned with the content column, bleeds off the right edge -->
    <ul
      ref="strip"
      class="strip mt-8 flex gap-4 overflow-x-auto pb-2 md:gap-5"
      @scroll.passive="onStripScroll"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointerleave="onUp"
    >
      <li v-for="(item, i) in filtered" :key="item.id" class="frame shrink-0" :style="{ '--ar': SHAPES[i % SHAPES.length] }">
        <button type="button" class="group block w-full text-left" draggable="false" @click="openAt(i)">
          <span class="block overflow-hidden rounded-2xl bg-base-200" :style="{ aspectRatio: 'var(--ar)' }">
            <img
              :src="src(item.id, true)"
              :alt="item[lang]"
              loading="lazy"
              decoding="async"
              draggable="false"
              class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />
          </span>
          <span class="mt-3 flex items-start justify-between gap-3 px-1">
            <span class="text-sm font-medium leading-snug text-white/90">{{ item[lang] }}</span>
            <span class="mt-0.5 shrink-0 text-xs text-white/45">{{ TAGS[item.cat][lang] }}</span>
          </span>
        </button>
      </li>
    </ul>

    <div class="mx-auto mt-6 flex max-w-6xl items-center gap-4 px-6 md:px-10" aria-hidden="true">
      <span class="relative h-px flex-1 bg-white/10">
        <span class="absolute inset-y-0 left-0 w-full origin-left bg-[var(--accent,#fff)]" :style="{ transform: `scaleX(${Math.max(0.04, stripProgress)})` }"></span>
      </span>
      <span class="font-mono text-xs tabular-nums text-white/45">{{ filtered.length }}</span>
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
          <img :src="src(current.id)" :alt="current[lang]" class="max-h-[80vh] w-auto rounded-2xl object-contain" />
          <figcaption class="mt-3 text-center text-sm text-white/80">
            {{ current[lang] }} <span class="text-white/40">· {{ open + 1 }}/{{ filtered.length }}</span>
          </figcaption>
        </figure>
        <button type="button" class="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-sm text-white hover:border-white hover:bg-white/10" :aria-label="t.close" @click="open = -1">✕</button>
        <button type="button" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 px-3 py-2 text-white hover:border-white hover:bg-white/10 md:left-6" :aria-label="t.prev" @click="step(-1)">‹</button>
        <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 px-3 py-2 text-white hover:border-white hover:bg-white/10 md:right-6" :aria-label="t.next" @click="step(1)">›</button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
/* Left padding lines the first frame up with the content column above */
.strip {
  --gutter: max(1.5rem, calc((100vw - 72rem) / 2 + 2.5rem));
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  scroll-padding-left: var(--gutter);
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: grab;
}
.strip::-webkit-scrollbar { display: none; }
@media (max-width: 767px) {
  .strip { --gutter: 1.5rem; }
}
.strip.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}
.frame {
  scroll-snap-align: start;
  height: auto;
  width: calc(min(58vh, 460px) * var(--ar));
  max-width: 78vw;
}
.strip-btn {
  display: inline-flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  transition: border-color 0.2s ease, opacity 0.2s ease;
}
.strip-btn:hover:not(:disabled) { border-color: rgba(255, 255, 255, 0.5); }
.strip-btn:disabled { opacity: 0.3; cursor: default; }
</style>
