<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ContactButton from './ContactButton.vue'
import portrait from './portrait.webp'

const lang = inject('lang')

const content = {
  th: {
    nav: [
      { label: 'เกี่ยวกับ', href: '#about' },
      { label: 'ราคา', href: '/pricing' },
      { label: 'ผลงาน', href: '/projects' },
      { label: 'ติดต่อ', href: '#inquiry' },
    ],
    tagline: 'นักพัฒนาที่สร้างระบบใช้งานจริง ตั้งแต่เว็บ แอป ไปจนถึงหุ่นยนต์',
    portraitAlt: 'ภาพการ์ตูนของปพนธนัย ใจมา',
    members: 'สมาชิก',
  },
  en: {
    nav: [
      { label: 'About', href: '#about' },
      { label: 'Price', href: '/pricing' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '#inquiry' },
    ],
    tagline: 'a developer building real, working systems from web and mobile to robotics',
    portraitAlt: 'Illustrated portrait of Paphonthanai Jaima',
    members: 'Members',
  },
}
const t = computed(() => content[lang.value])

// Magnet: the portrait drifts toward the cursor while it is within PADDING px
// of the image's edge, by the cursor's offset from its centre / STRENGTH.
const PADDING = 150
const STRENGTH = 3
const magnet = ref(null)
const pos = ref({ x: 0, y: 0, active: false })

function onMove(e) {
  const el = magnet.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  const near =
    e.clientX > r.left - PADDING && e.clientX < r.right + PADDING &&
    e.clientY > r.top - PADDING && e.clientY < r.bottom + PADDING
  pos.value = near
    ? { x: (e.clientX - cx) / STRENGTH, y: (e.clientY - cy) / STRENGTH, active: true }
    : { x: 0, y: 0, active: false }
}

const magnetStyle = computed(() => ({
  transform: `translate3d(${pos.value.x}px, ${pos.value.y}px, 0)`,
  transition: pos.value.active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
  willChange: 'transform',
}))

onMounted(() => {
  if (window.matchMedia?.('(pointer: fine)').matches) window.addEventListener('mousemove', onMove, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('mousemove', onMove))
</script>

<template>
  <section class="relative flex h-screen flex-col" style="overflow-x: clip">
    <nav
      class="studio-enter relative z-20 flex items-center gap-3 px-5 pt-6 text-[11px] font-medium uppercase tracking-wider text-[#D7E2EA] sm:gap-4 sm:px-6 sm:text-sm md:gap-10 md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      style="--fy: -20px"
    >
      <div class="flex flex-1 items-center justify-between">
        <a v-for="item in t.nav" :key="item.href" :href="item.href" class="transition-opacity duration-200 hover:opacity-70">
          {{ item.label }}
        </a>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <button
          type="button"
          class="rounded-full border border-[#D7E2EA]/60 px-3 py-0.5 text-[11px] tracking-widest transition hover:bg-[#D7E2EA]/10 md:text-xs"
          @click="lang = lang === 'th' ? 'en' : 'th'"
        >
          {{ lang === 'th' ? 'EN' : 'TH' }}
        </button>
        <!-- Members: PNJ Created Website customers' back office -->
        <RouterLink
          :to="`/app/login?mode=login&lang=${lang}`"
          :aria-label="t.members"
          :title="t.members"
          class="flex h-7 w-7 items-center justify-center rounded-full border border-[#D7E2EA]/60 transition hover:bg-[#D7E2EA]/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-3.5 w-3.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </RouterLink>
      </div>
    </nav>

    <div class="overflow-hidden">
      <h1
        class="studio-heading studio-enter mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
        style="--delay: 0.15s; --fy: 40px"
      >
        Hi, i&apos;m PNJ
      </h1>
    </div>

    <div class="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
      <p
        class="studio-enter max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
        style="--delay: 0.35s; --fy: 20px; font-size: clamp(0.75rem, 1.4vw, 1.5rem)"
      >
        {{ t.tagline }}
      </p>
      <div class="studio-enter relative z-20" style="--delay: 0.5s; --fy: 20px">
        <ContactButton />
      </div>
    </div>

    <!-- Positioning, entrance and magnet each get their own element: all three use transform -->
    <div class="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
      <div class="studio-enter" style="--delay: 0.6s">
        <div ref="magnet" :style="magnetStyle">
          <img :src="portrait" :alt="t.portraitAlt" width="998" height="1496" class="pointer-events-none mx-auto block max-h-[78vh] w-auto select-none sm:max-h-[86vh]" fetchpriority="high" />
        </div>
      </div>
    </div>
  </section>
</template>
