<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { content, FIRE_FIRST_URL } from '../../content/home'

const lang = inject('lang')
const t = computed(() => content[lang.value])
const base = computed(() => (lang.value === 'en' ? '/en' : '/'))
const colTop = ['border-pnj-ok', 'border-pnj-gold', 'border-pnj-line2']
const colText = ['text-pnj-ok', 'text-pnj-gold', 'text-pnj-faint']
</script>

<template>
  <section id="products" class="border-y border-pnj-line bg-pnj-surface">
    <div class="mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-16 md:py-[100px] lg:grid-cols-2">
      <div>
        <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.product.eyebrow }}</p>
        <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.product.title }}</h2>
        <p class="mt-4 max-w-[540px] text-[17px] leading-[1.7] text-pnj-muted">{{ t.product.lead }}</p>
        <ul class="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          <li v-for="f in t.product.features" :key="f" class="flex gap-2.5 text-[15px] text-pnj-text2">
            <span class="text-pnj-gold" aria-hidden="true">—</span>{{ f }}
          </li>
        </ul>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink :to="{ path: base, hash: '#pricing' }" class="rounded-lg bg-pnj-gold px-[22px] py-3.5 text-sm font-semibold text-pnj-ongold transition-colors hover:bg-pnj-goldhi">{{ t.product.primary }}</RouterLink>
          <a :href="FIRE_FIRST_URL" target="_blank" rel="noopener" class="rounded-lg border border-pnj-line2 px-[22px] py-3.5 text-sm font-semibold text-pnj-text transition-colors hover:border-pnj-gold hover:text-pnj-gold">{{ t.product.secondary }}</a>
        </div>
      </div>

      <!-- Editor mock (decorative) -->
      <div class="overflow-hidden rounded-xl border border-pnj-line bg-pnj-bg" aria-hidden="true">
        <div class="flex items-center gap-2 border-b border-pnj-line px-4 py-3">
          <span class="h-2.5 w-2.5 rounded-full bg-pnj-line2"></span><span class="h-2.5 w-2.5 rounded-full bg-pnj-line2"></span><span class="h-2.5 w-2.5 rounded-full bg-pnj-line2"></span>
          <span class="ml-3 truncate font-mono text-xs text-pnj-faint">{{ t.product.mock.url }}</span>
        </div>
        <div class="space-y-3 p-5">
          <div class="font-mono text-xs uppercase tracking-wider text-pnj-faint">{{ t.product.mock.field }}</div>
          <div class="rounded-lg border border-pnj-gold bg-pnj-surface p-4">
            <span class="mb-1 block font-mono text-xs text-pnj-gold">{{ t.product.mock.th }}</span>
            <span class="text-base text-pnj-text">{{ t.product.mock.thText }}</span>
          </div>
          <div class="rounded-lg border border-pnj-line bg-pnj-surface p-4">
            <span class="mb-1 block font-mono text-xs text-pnj-faint">{{ t.product.mock.en }}</span>
            <span class="text-base text-pnj-text">{{ t.product.mock.enText }}</span>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-sm text-pnj-ok">{{ t.product.mock.saved }}</span>
            <span class="rounded-md bg-pnj-gold px-4 py-2 text-sm font-semibold text-pnj-ongold">{{ t.product.mock.publish }}</span>
          </div>
        </div>
        <div class="grid grid-cols-3 border-t border-pnj-line">
          <div v-for="s in t.product.stats" :key="s.v" class="border-r border-pnj-line p-4 last:border-r-0">
            <div class="text-[26px] font-bold text-pnj-gold">{{ s.v }}</div>
            <div class="text-[13px] text-pnj-muted">{{ s.l }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-[1240px] px-6 py-16 md:py-[100px]">
    <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.roadmap.eyebrow }}</p>
    <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.roadmap.title }}</h2>
    <div class="mt-10 grid gap-8 md:grid-cols-3">
      <div v-for="(c, i) in t.roadmap.cols" :key="c.h" class="border-t-2 pt-5" :class="colTop[i]">
        <div class="font-mono text-sm uppercase tracking-wider" :class="colText[i]">{{ c.h }}</div>
        <ul class="mt-3 text-[17px] leading-[1.9] text-pnj-text2">
          <li v-for="it in c.items" :key="it">{{ it }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
