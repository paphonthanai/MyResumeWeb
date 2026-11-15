<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHeading from '../SectionHeading.vue'
import { pages } from '../../content/pages'
import webImage from '../image/Project/web-vue/01.png'

// The homepage's way into the rest of the site: one row per page, each in
// that page's own accent colour, with a photo that slides in on hover.
const lang = inject('lang')
const en = computed(() => lang.value === 'en')

const work = import.meta.glob('../image/work/*-t.webp', { eager: true, import: 'default' })
const thumb = (id) => work[`../image/work/${id}-t.webp`]

const rows = computed(() => [
  ...pages.map((p) => ({ key: p.key, to: p.to, color: p.soft, img: thumb(p.preview), name: p[lang.value].name, sub: p[lang.value].sub })),
  {
    key: 'iot',
    to: '/iot',
    color: '#ff7a6b',
    img: thumb('robot-arm-red'),
    name: en.value ? 'IoT & robotics' : 'IoT และหุ่นยนต์',
    sub: en.value ? 'Robot arms and IoT systems, designed and built by hand.' : 'แขนกลและระบบ IoT ที่ออกแบบและสร้างเองทุกชิ้น',
  },
  {
    key: 'builder',
    to: en.value ? '/en/website-builder' : '/website-builder',
    color: '#9ad0ff',
    img: webImage,
    name: en.value ? 'Website Builder' : 'สร้างเว็บไซต์',
    sub: en.value ? 'Bilingual company websites your team can edit.' : 'เว็บไซต์บริษัทสองภาษา ที่ทีมของคุณแก้เองได้',
  },
])

const COPY = {
  th: { title: 'แต่ละเรื่อง มีหน้าของตัวเอง', accent: 'หน้าของตัวเอง', intro: 'ผลงาน ภาพจากหน้างาน ทักษะ ขั้นตอน และราคา แยกเป็นหน้าเฉพาะ เลือกเข้าดูได้ตามที่สนใจ' },
  en: { title: 'Every topic has its own page', accent: 'its own page', intro: 'Projects, on-site photos, skills, process and pricing each live on a page of their own. Pick the one you want.' },
}
const t = computed(() => COPY[lang.value])
</script>

<template>
  <section id="explore" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :title="t.title" :accent="t.accent" :intro="t.intro" />

      <ul class="mt-14 border-t border-white/10">
        <li v-for="row in rows" :key="row.key" class="border-b border-white/10">
          <RouterLink :to="row.to" class="row group relative flex items-center gap-5 py-6 md:gap-8 md:py-7" :style="{ '--c': row.color }">
            <img :src="row.img" alt="" loading="lazy" class="h-14 w-14 shrink-0 rounded-xl object-cover md:hidden" />
            <span class="dot hidden h-2.5 w-2.5 shrink-0 rounded-full md:block" aria-hidden="true"></span>
            <span class="min-w-0 flex-1">
              <span class="name block text-2xl font-semibold tracking-tight text-white md:text-4xl">{{ row.name }}</span>
              <span class="mt-1.5 block max-w-xl text-sm leading-relaxed text-white/50 md:text-base">{{ row.sub }}</span>
            </span>
            <img :src="row.img" alt="" loading="lazy" class="peek pointer-events-none hidden md:block" />
            <svg viewBox="0 0 24 24" class="arrow h-6 w-6 shrink-0 md:h-8 md:w-8" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M4 12h16M14 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.dot { background: var(--c); box-shadow: 0 2px 12px color-mix(in srgb, var(--c) 60%, transparent); }
.name { transition: color 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.arrow { color: rgba(255, 255, 255, 0.35); transition: color 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.row:hover .name { color: var(--c); transform: translateX(6px); }
.row:hover .arrow { color: var(--c); transform: translateX(6px); }
.row:focus-visible { outline: 2px solid var(--c); outline-offset: 4px; border-radius: 8px; }

/* Desktop: the page's photo slides in beside the arrow */
.peek {
  position: absolute;
  right: 4.5rem;
  top: 50%;
  width: 150px;
  height: 104px;
  object-fit: cover;
  border-radius: 0.9rem;
  box-shadow: 0 20px 40px -18px rgba(0, 0, 0, 0.9);
  opacity: 0;
  transform: translateY(-50%) translateX(16px) rotate(4deg) scale(0.92);
  transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.row:hover .peek { opacity: 1; transform: translateY(-50%) rotate(-3deg) scale(1); }
</style>
