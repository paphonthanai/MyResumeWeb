<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHeading from '../SectionHeading.vue'
import { items } from '../../content/workGallery'
import robotVideo from '../image/video/case-robot.mp4'
import robotPoster from '../image/video/case-robot.webp'

const lang = inject('lang')
const work = import.meta.glob('../image/work/*.webp', { eager: true, import: 'default' })
const photo = (id) => work[`../image/work/${id}-t.webp`]
const robotics = items.filter((i) => i.cat === 'robotics').slice(0, 6)

const COPY = {
  th: { kicker: 'R&D', title: 'งาน IoT และหุ่นยนต์ที่ลงมือทำจริง', accent: 'ลงมือทำจริง', intro: 'ออกแบบ พิมพ์ชิ้นส่วน 3 มิติ บัดกรี เดินสาย และเขียนโปรแกรมควบคุมเองทุกขั้นตอน', lab: 'ดู PNJ Lab', gallery: 'ดูแกลเลอรีทั้งหมด' },
  en: { kicker: 'R&D', title: 'IoT and robotics, built by hand', accent: 'built by hand', intro: 'Designed, 3D printed, soldered, wired and programmed in-house, every step of the way.', lab: 'See PNJ Lab', gallery: 'See the full gallery' },
}
const t = computed(() => COPY[lang.value])
const home = computed(() => (lang.value === 'en' ? '/en' : '/'))
</script>

<template>
  <section id="work" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :kicker="t.kicker" :title="t.title" :accent="t.accent" :intro="t.intro" />

      <div class="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div class="overflow-hidden rounded-3xl border border-white/5 bg-black">
          <video :src="robotVideo" :poster="robotPoster" class="h-full max-h-[620px] w-full object-cover" autoplay muted loop playsinline preload="metadata"></video>
        </div>
        <ul class="grid grid-cols-2 gap-4">
          <li v-for="item in robotics" :key="item.id">
            <img :src="photo(item.id)" :alt="item[lang]" loading="lazy" class="aspect-square w-full rounded-2xl border border-white/5 object-cover" />
            <p class="mt-2 px-1 text-sm leading-snug text-white/85">{{ item[lang] }}</p>
          </li>
        </ul>
      </div>

      <div class="mt-10 flex flex-wrap gap-3">
        <RouterLink :to="`${home}#lab`" class="btn-glow">{{ t.lab }} →</RouterLink>
        <RouterLink :to="`${home}#gallery`" class="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-white/40">{{ t.gallery }}</RouterLink>
      </div>
    </div>
  </section>
</template>
