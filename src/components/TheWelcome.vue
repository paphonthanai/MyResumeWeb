<script setup>
import { computed, inject } from 'vue'
import logoGold from './image/NewLogo_Gold.png'

// เลือกภาษา
const lang = inject('lang')

// "ปรึกษาโปรเจกต์" opens a Messenger chat with the owner directly.
const MESSENGER_URL = 'https://m.me/Paphonthanai.name'

const content = {
  th: {
    tagline: 'คุณมีระบบที่คนใช้จริง หรือแค่เว็บที่ดูดี',
    heroTitleLine1: 'เว็บสวยไม่พอ',
    heroTitleLine2: 'ถ้าระบบไม่ตอบโจทย์ธุรกิจ',
    heroDesc: 'ผมออกแบบเว็บและระบบจากปัญหาการใช้งานจริง เพื่อให้สามารถดูแลต่อ ขยายได้ และเติบโตไปพร้อมธุรกิจ',
    ctaButton: 'ปรึกษาโปรเจกต์',
    ctaSecondary: 'ดูบริการ',
    kicker: 'Fullstack Developer · PNJ Tech',
  },
  en: {
    tagline: 'Do you have a system people actually use, or just a nice-looking website?',
    heroTitleLine1: "A pretty website isn't enough",
    heroTitleLine2: "if it doesn't solve your business problem",
    heroDesc: 'I design websites and systems around real usage problems, so they stay maintainable, scale, and grow together with your business.',
    ctaButton: 'Discuss your project',
    ctaSecondary: 'View services',
    kicker: 'Fullstack Developer · PNJ Tech',
  },
}

const t = computed(() => content[lang.value])

// Floating capability chips around the logo (decorative; positions are %).
const chips = [
  { label: 'Web', style: 'top:6%;left:8%', delay: '0s' },
  { label: 'Mobile', style: 'top:18%;right:2%', delay: '-1.4s' },
  { label: 'AI', style: 'bottom:20%;left:0%', delay: '-2.6s' },
  { label: 'Robotics', style: 'bottom:6%;right:8%', delay: '-3.8s' },
]
</script>

<template>
  <section class="hero relative overflow-hidden border-b border-base-300 bg-base-100">
    <!-- Ambient layers: tech grid, drifting glows, slow scan line -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="hero-grid absolute inset-0"></div>
      <div class="hero-orb hero-orb-a absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"></div>
      <div class="hero-orb hero-orb-b absolute bottom-[-15%] left-[-10%] h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl"></div>
      <div class="hero-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
    </div>

    <div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
      <!-- Text zone: staggered entrance -->
      <div class="space-y-7">
        <p class="hero-rise text-xs uppercase tracking-[0.25em] text-primary/90" style="--d:0ms">
          <span class="hero-dot mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle"></span>{{ t.kicker }}
        </p>

        <p class="hero-rise text-base tracking-wide text-base-content/60" style="--d:120ms">
          {{ t.tagline }}
        </p>

        <h1 class="hero-rise font-display text-4xl font-semibold leading-[1.15] text-base-content md:text-5xl" style="--d:240ms">
          {{ t.heroTitleLine1 }}<br>
          <span class="hero-shine text-primary">{{ t.heroTitleLine2 }}</span>
        </h1>

        <div class="hero-line h-px w-20 bg-primary/60" style="--d:400ms"></div>

        <p class="hero-rise max-w-lg text-base leading-relaxed text-base-content/70" style="--d:480ms">
          {{ t.heroDesc }}
        </p>

        <div class="hero-rise flex flex-wrap items-center gap-3" style="--d:600ms">
          <a
            :href="MESSENGER_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-shimmer rounded-full border-primary px-8 text-primary-content"
          >
            {{ t.ctaButton }}
          </a>
          <a
            href="#services"
            class="btn rounded-full border-base-300 bg-transparent px-6 text-base-content/70 transition hover:border-primary hover:bg-transparent hover:text-primary"
          >
            {{ t.ctaSecondary }}
          </a>
        </div>
      </div>

      <!-- Visual zone: logo core, counter-rotating orbits, floating chips -->
      <div class="hero-visual relative mx-auto aspect-square w-full max-w-[22rem] md:max-w-[26rem]">
        <div class="hero-pulse absolute inset-[22%] rounded-full bg-primary/20 blur-2xl"></div>

        <div class="hero-ring hero-ring-a absolute inset-[6%] rounded-full border border-dashed border-primary/40">
          <span class="hero-node absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_rgba(212,175,55,0.7)]"></span>
        </div>
        <div class="hero-ring hero-ring-b absolute inset-[16%] rounded-full border border-primary/25">
          <span class="hero-node absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/80 shadow-[0_0_10px_2px_rgba(212,175,55,0.5)]"></span>
        </div>

        <div class="hero-core absolute inset-[27%] flex items-center justify-center rounded-full border border-primary/40 bg-base-200">
          <img :src="logoGold" alt="PNJ Tech" width="626" height="400" class="hero-logo w-3/4 object-contain" />
        </div>

        <span
          v-for="chip in chips"
          :key="chip.label"
          class="hero-chip absolute rounded-full border border-primary/40 bg-base-100/80 px-3 py-1 text-[11px] uppercase tracking-widest text-primary backdrop-blur"
          :style="`${chip.style};animation-delay:${chip.delay}`"
        >
          {{ chip.label }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tech grid that fades out toward the edges */
.hero-grid {
  background-image:
    linear-gradient(to right, rgba(212, 175, 55, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(212, 175, 55, 0.06) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%);
  mask-image: radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%);
}

@keyframes hero-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}
.hero-rise {
  animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0ms);
}

@keyframes hero-line {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.hero-line {
  transform-origin: left;
  animation: hero-line 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0ms);
}

@keyframes hero-spin { to { transform: rotate(360deg); } }
.hero-ring-a { animation: hero-spin 32s linear infinite; }
.hero-ring-b { animation: hero-spin 46s linear infinite reverse; }

@keyframes hero-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}
.hero-chip {
  animation: hero-float 6s ease-in-out infinite;
  cursor: default;
  transition: background-color 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s, scale 0.25s;
}
/* `scale` is independent of the float animation's `transform`, so they don't fight */
.hero-chip:hover {
  scale: 1.18;
  background-color: #d4af37;
  border-color: #d4af37;
  color: #0a0906;
  box-shadow: 0 0 18px 2px rgba(212, 175, 55, 0.55);
}
.hero-logo { animation: hero-float 7s ease-in-out infinite; }

@keyframes hero-pulse {
  0%, 100% { opacity: 0.55; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1.08); }
}
.hero-pulse { animation: hero-pulse 5s ease-in-out infinite; }

@keyframes hero-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-30px, 24px); }
}
.hero-orb-a { animation: hero-drift 16s ease-in-out infinite; }
.hero-orb-b { animation: hero-drift 20s ease-in-out infinite reverse; }

@keyframes hero-scan {
  0% { top: 0; opacity: 0; }
  10%, 90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.hero-scan { animation: hero-scan 9s linear infinite; }

@keyframes hero-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
.hero-dot { animation: hero-blink 2.2s ease-in-out infinite; }

/* Slow light sweep across the gold half of the headline */
@keyframes hero-shine {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.hero-shine {
  background-image: linear-gradient(100deg, #d4af37 40%, #f6e2a8 50%, #d4af37 60%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hero-shine 7s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-rise, .hero-line, .hero-ring-a, .hero-ring-b, .hero-chip, .hero-logo,
  .hero-pulse, .hero-orb-a, .hero-orb-b, .hero-scan, .hero-dot, .hero-shine {
    animation: none !important;
  }
  .hero-scan { display: none; }
  .hero-shine { -webkit-text-fill-color: currentColor; background: none; }
}
</style>
