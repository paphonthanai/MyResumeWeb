<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { content } from '../../content/home'

const lang = inject('lang')
const t = computed(() => content[lang.value])
const base = computed(() => (lang.value === 'en' ? '/en' : '/'))
const signup = computed(() => `/app/login?mode=signup&lang=${lang.value}&plan=site-free`)
</script>

<template>
  <section class="mx-auto grid max-w-[1240px] items-center gap-14 px-6 pb-16 pt-14 md:pb-[72px] md:pt-[88px] lg:grid-cols-2">
    <div class="flex flex-col gap-7">
      <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.hero.eyebrow }}</p>
      <h1 class="text-[clamp(44px,6vw,76px)] font-bold leading-[1.08] text-pnj-text" style="text-wrap: balance">
        {{ t.hero.line1 }}<br />{{ t.hero.line2a }}<span class="text-pnj-gold">{{ t.hero.line2b }}</span>
      </h1>
      <p class="max-w-[540px] text-[19px] leading-[1.7] text-pnj-text2">{{ t.hero.body }}</p>
      <div class="flex flex-wrap gap-3">
        <RouterLink :to="signup" class="rounded-lg bg-pnj-gold px-[22px] py-3.5 text-sm font-semibold text-pnj-ongold transition-colors hover:bg-pnj-goldhi">{{ t.hero.primary }}</RouterLink>
        <RouterLink :to="{ path: base, hash: '#contact' }" class="rounded-lg border border-pnj-line2 px-[22px] py-3.5 text-sm font-semibold text-pnj-text transition-colors hover:border-pnj-gold hover:text-pnj-gold">{{ t.hero.secondary }}</RouterLink>
      </div>
    </div>

    <div class="flex flex-col gap-1.5 rounded-[14px] border border-pnj-line bg-pnj-surface p-2.5">
      <div class="flex justify-between px-4 pb-2 pt-3 font-mono text-xs text-pnj-faint">
        <span>{{ t.hero.stackHead }}</span><span>L5 → L1</span>
      </div>
      <div
        v-for="row in t.hero.stack"
        :key="row.n"
        class="grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-lg px-4 py-[18px] sm:grid-cols-[56px_1fr_auto] sm:gap-4"
        :class="row.live ? 'border-l-2 border-pnj-gold bg-pnj-s3' : 'bg-pnj-s2'"
      >
        <span class="font-mono text-sm text-pnj-faint">{{ row.n }}</span>
        <div>
          <div class="text-[17px] font-semibold text-pnj-text">{{ row.t }}</div>
          <div class="mt-0.5 text-sm text-pnj-muted">{{ row.s }}</div>
        </div>
        <span class="font-mono text-xs tracking-wider" :class="row.live ? 'text-pnj-ok' : 'text-pnj-faint'">{{ row.tag }}</span>
      </div>
    </div>
  </section>

  <section class="border-y border-pnj-line">
    <div class="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-9 gap-y-3.5 px-6 py-[26px]">
      <span class="font-mono text-xs uppercase tracking-[0.14em] text-pnj-gold">{{ t.clientsLabel }}</span>
      <span v-for="c in t.clients" :key="c" class="text-[15px] text-[#8A8377]">{{ c }}</span>
    </div>
  </section>
</template>
