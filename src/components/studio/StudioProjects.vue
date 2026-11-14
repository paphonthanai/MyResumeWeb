<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { clamp01, onScrollFrame, vFade } from '../../utils/fade'
import { galleryFilter } from '../../utils/galleryState'
import websiteImage from '../image/Project/web-vue/01.png'
import loanAppImage from '../image/Project/AppsLone/01.png'

const lang = inject('lang')

const work = import.meta.glob('../image/work/*.webp', { eager: true, import: 'default' })
const img = (id, thumb = true) => work[`../image/work/${id}${thumb ? '-t' : ''}.webp`]

const content = {
  th: {
    title: 'ผลงาน',
    photos: 'ดูภาพผลงาน',
    live: 'ดูโปรเจกต์',
    client: 'ลูกค้า',
    personal: 'ส่วนตัว',
    product: 'ผลิตภัณฑ์',
  },
  en: {
    title: 'Projects',
    photos: 'See photos',
    live: 'Live Project',
    client: 'Client',
    personal: 'Personal',
    product: 'Product',
  },
}
const t = computed(() => content[lang.value])

// `gallery` opens the work gallery on that category; `to` links a live page.
const projects = computed(() => [
  {
    name: lang.value === 'th' ? 'แอปสหกรณ์ออมทรัพย์' : 'Co-op Loan App',
    kind: t.value.client,
    gallery: 'software',
    images: [img('flutter-dev'), loanAppImage, img('coop-app-home', false)],
  },
  {
    name: lang.value === 'th' ? 'ระบบกล้องวงจรปิดและ ANPR' : 'CCTV & ANPR System',
    kind: t.value.client,
    gallery: 'network',
    images: [img('cctv-web'), img('cctv-feeds'), img('cctv-mount', false)],
  },
  {
    name: lang.value === 'th' ? 'หุ่นยนต์และแขนกล' : 'Robotics & Robot Arms',
    kind: t.value.personal,
    gallery: 'robotics',
    images: [img('robot-arduino'), img('pcb-solder'), img('robot-arm-tracked', false)],
  },
  {
    name: 'PNJ Created Website',
    kind: t.value.product,
    to: lang.value === 'en' ? '/en/website-builder' : '/website-builder',
    images: [websiteImage, img('algo-flowchart'), img('dev-workstation', false)],
  },
])

const pad = (i) => String(i + 1).padStart(2, '0')

function openGallery(cat) {
  galleryFilter.value = cat
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
}

// Card stacking: while the list scrolls past, each card shrinks toward
// 1 - (cards after it) * 0.03, starting when its own turn in the scroll comes.
const list = ref(null)
const cards = ref([])
let stop = null

onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  stop = onScrollFrame(() => {
    const r = list.value.getBoundingClientRect()
    const progress = clamp01(-r.top / Math.max(1, r.height - window.innerHeight))
    const total = cards.value.length
    cards.value.forEach((card, i) => {
      const target = 1 - (total - 1 - i) * 0.03
      const start = i / total
      const local = clamp01((progress - start) / (1 - start))
      card.style.transform = `scale(${1 - (1 - target) * local})`
    })
  })
})
onBeforeUnmount(() => stop?.())
</script>

<template>
  <section id="projects" class="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
    <h2 v-fade="{ y: 40 }" class="studio-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14" style="font-size: clamp(3rem, 12vw, 160px)">
      {{ t.title }}
    </h2>

    <div ref="list" class="mx-auto max-w-6xl">
      <!-- All cards share one parent so each stays stuck until the list ends and they pile up -->
      <article
        v-for="(p, i) in projects"
        :key="i"
        ref="cards"
        class="sticky mb-[18vh] origin-top last:mb-0 rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        :style="{ top: `calc(var(--card-top) + ${i * 28}px)` }"
        style="will-change: transform"
      >
        <div class="flex flex-wrap items-end justify-between gap-4 px-2 pb-4 sm:pb-6">
          <div class="flex items-end gap-4 sm:gap-6">
            <span class="studio-heading font-black leading-none" style="font-size: clamp(3rem, 10vw, 140px)">{{ pad(i) }}</span>
            <div class="pb-1 sm:pb-3">
              <p class="text-xs uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">{{ p.kind }}</p>
              <h3 class="font-medium uppercase text-[#D7E2EA]" style="font-size: clamp(1rem, 2.2vw, 2.1rem)">{{ p.name }}</h3>
            </div>
          </div>
          <RouterLink v-if="p.to" :to="p.to" class="ghost-btn">{{ t.live }}</RouterLink>
          <button v-else type="button" class="ghost-btn" @click="openGallery(p.gallery)">{{ t.photos }}</button>
        </div>

        <div class="flex gap-3 sm:gap-4">
          <div class="flex w-[40%] flex-col gap-3 sm:gap-4">
            <img :src="p.images[0]" alt="" loading="lazy" class="w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[50px]" style="height: clamp(130px, 16vw, 230px)" />
            <img :src="p.images[1]" alt="" loading="lazy" class="w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[50px]" style="height: clamp(160px, 22vw, 340px)" />
          </div>
          <img :src="p.images[2]" :alt="p.name" loading="lazy" class="w-[60%] rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[50px]" style="height: calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 1rem)" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
#projects {
  --card-top: 6rem;
}
@media (min-width: 768px) {
  #projects { --card-top: 8rem; }
}
.ghost-btn {
  border-radius: 9999px;
  border: 2px solid #d7e2ea;
  color: #d7e2ea;
  padding: 0.75rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  transition: background-color 0.2s;
}
.ghost-btn:hover {
  background-color: rgb(215 226 234 / 0.1);
}
@media (min-width: 640px) {
  .ghost-btn { padding: 0.875rem 2.5rem; font-size: 1rem; }
}
</style>
