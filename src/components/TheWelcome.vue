<script setup>
import { computed, inject } from 'vue'
import logoGold from './image/NewLogo_Gold.png'

// เลือกภาษา
const lang = inject('lang')

const content = {
  th: {
    tagline: 'คุณมีระบบที่คนใช้จริง หรือแค่เว็บที่ดูดี',
    heroTitleLine1: 'เว็บสวยไม่พอ',
    heroTitleLine2: 'ถ้าระบบไม่ตอบโจทย์ธุรกิจ',
    heroDesc: 'ผมออกแบบเว็บและระบบจากปัญหาการใช้งานจริง เพื่อให้สามารถดูแลต่อ ขยายได้ และเติบโตไปพร้อมธุรกิจ',
    ctaButton: 'ปรึกษาโปรเจกต์',
    kicker: 'Fullstack Developer · PNJ Tech',
  },
  en: {
    tagline: 'Do you have a system people actually use, or just a nice-looking website?',
    heroTitleLine1: "A pretty website isn't enough",
    heroTitleLine2: "if it doesn't solve your business problem",
    heroDesc: 'I design websites and systems around real usage problems, so they stay maintainable, scale, and grow together with your business.',
    ctaButton: 'Discuss your project',
    kicker: 'Fullstack Developer · PNJ Tech',
  },
}

const t = computed(() => content[lang.value])
</script>

<template>
  <section class="relative overflow-hidden border-b border-base-300 bg-base-100">
    <!-- Ambient gold glow, purely decorative -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"></div>
      <div class="absolute bottom-[-15%] left-[-10%] h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl"></div>
    </div>

    <div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
      <!-- Text Zone -->
      <div class="space-y-7">
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.kicker }}</p>

        <p class="text-base tracking-wide text-base-content/60">
          {{ t.tagline }}
        </p>

        <h1 class="font-display text-4xl font-semibold leading-[1.15] text-base-content md:text-5xl">
          {{ t.heroTitleLine1 }}<br>
          <span class="text-primary">{{ t.heroTitleLine2 }}</span>
        </h1>

        <div class="h-px w-20 bg-primary/60"></div>

        <p class="max-w-lg text-base leading-relaxed text-base-content/70">
          {{ t.heroDesc }}
        </p>

        <a
          href="#contact"
          class="btn rounded-full border-primary bg-primary px-8 text-primary-content transition hover:bg-transparent hover:text-primary"
        >
          {{ t.ctaButton }}
        </a>
      </div>

      <!-- Image Zone -->
      <div class="relative mx-auto">
        <div class="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-2xl"></div>
        <div class="flex h-64 w-64 items-center justify-center rounded-full border border-primary/40 bg-base-200 md:h-80 md:w-80">
          <img :src="logoGold" alt="PNJ Tech" width="626" height="400" class="w-40 md:w-52" />
        </div>
      </div>
    </div>
  </section>
</template>
