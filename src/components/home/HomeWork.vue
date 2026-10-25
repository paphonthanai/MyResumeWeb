<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { content } from '../../content/home'

const lang = inject('lang')
const t = computed(() => content[lang.value])
const base = computed(() => (lang.value === 'en' ? '/en' : '/'))
</script>

<template>
  <section id="hardware" class="mx-auto max-w-[1240px] px-6 py-16 md:py-[100px]">
    <div class="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.hardware.eyebrow }}</p>
        <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.hardware.title }}</h2>
        <p class="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-pnj-muted">{{ t.hardware.lead }}</p>
      </div>
      <RouterLink :to="{ path: base, hash: '#contact' }" class="rounded-lg border border-pnj-gold px-[22px] py-3 text-sm font-semibold text-pnj-gold transition-colors hover:bg-pnj-gold hover:text-pnj-ongold">{{ t.hardware.cta }}</RouterLink>
    </div>

    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="c in t.hardware.cards" :key="c.t">
        <!-- Placeholder until real job-site photos are supplied -->
        <div
          class="flex aspect-[4/3] items-center justify-center rounded-[10px] border border-pnj-line p-4 text-center font-mono text-xs text-pnj-faint"
          style="background: repeating-linear-gradient(135deg, #151310 0 10px, #1A1814 10px 20px)"
        >{{ c.img }}</div>
        <h3 class="mt-4 text-lg font-semibold text-pnj-text">{{ c.t }}</h3>
        <p class="mt-1 text-[15px] text-pnj-muted">{{ c.d }}</p>
      </div>
    </div>
  </section>

  <section id="work" class="border-y border-pnj-line bg-pnj-surface">
    <div class="mx-auto max-w-[1240px] px-6 py-16 md:py-[100px]">
      <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.work.eyebrow }}</p>
      <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.work.title }}</h2>
      <div class="mt-10 border-t border-pnj-line">
        <div
          v-for="r in t.work.rows"
          :key="r.c"
          class="grid items-baseline gap-x-6 gap-y-1 border-b border-pnj-line py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_auto]"
        >
          <div class="text-[15px] text-pnj-muted">{{ r.c }}</div>
          <div class="text-[19px] font-semibold text-pnj-text">{{ r.p }}</div>
          <div class="flex items-baseline gap-4">
            <a v-if="r.href" :href="r.href" target="_blank" rel="noopener noreferrer" class="text-sm text-pnj-gold hover:text-pnj-goldhi">{{ r.link }}</a>
            <span class="font-mono text-xs" :class="r.ok ? 'text-pnj-ok' : r.past ? 'text-pnj-faint' : 'text-pnj-gold'">{{ r.s }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
