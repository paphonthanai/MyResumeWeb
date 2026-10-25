<script setup>
import { computed, inject, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { content } from '../../content/home'
import { content as builder } from '../../content/websiteBuilder'
import { selectedPackage } from '../../utils/inquiryState'

const lang = inject('lang')
const t = computed(() => content[lang.value])
const base = computed(() => (lang.value === 'en' ? '/en' : '/'))
const yearly = ref(false)

// Monthly prices live with the Website Builder plans (one source of truth).
const monthly = Object.fromEntries(builder.th.plans.map((p) => [p.id, Number(p.price.replace(/,/g, ''))]))
const baht = (n) => `฿${n.toLocaleString('en-US')}`
function price(id) {
  const m = monthly[id]
  return baht(yearly.value ? m * 10 : m)
}
const signup = (id) => `/app/login?mode=signup&lang=${lang.value}&plan=${id}`
</script>

<template>
  <section id="pricing" class="bg-pnj-paper text-pnj-ink">
    <div class="mx-auto max-w-[1240px] px-6 py-16 md:py-[100px]">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-goldink">{{ t.pricing.eyebrow }}</p>
          <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2]" style="text-wrap: balance">{{ t.pricing.title }}</h2>
          <p class="mt-4 text-[17px] leading-[1.7] text-[#5C564C]">{{ t.pricing.lead }}</p>
        </div>
        <div class="inline-flex rounded-full bg-[#E6E1D6] p-1" role="group">
          <button
            type="button"
            class="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            :class="!yearly ? 'bg-white text-pnj-ink' : 'text-[#5C564C]'"
            :aria-pressed="!yearly"
            @click="yearly = false"
          >{{ t.pricing.monthly }}</button>
          <button
            type="button"
            class="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            :class="yearly ? 'bg-white text-pnj-ink' : 'text-[#5C564C]'"
            :aria-pressed="yearly"
            @click="yearly = true"
          >{{ t.pricing.yearly }}</button>
        </div>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="p in t.pricing.plans"
          :key="p.id"
          class="flex flex-col rounded-[14px] border p-7"
          :class="p.featured ? 'border-pnj-ink bg-pnj-ink text-pnj-text' : 'border-[#E0DACD] bg-white'"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-xl font-semibold">{{ p.name }}</h3>
              <p class="mt-0.5 text-sm" :class="p.featured ? 'text-pnj-muted' : 'text-[#6B6458]'">{{ p.tag }}</p>
            </div>
            <span v-if="p.featured" class="rounded-full bg-pnj-gold px-3 py-1 text-xs font-semibold text-pnj-ongold">{{ t.pricing.recommended }}</span>
          </div>
          <div class="mt-6 flex items-baseline gap-2">
            <span class="text-[38px] font-bold leading-none" :class="p.featured ? 'text-pnj-gold' : ''">{{ p.id === 'site-free' ? '฿0' : price(p.id) }}</span>
            <span class="text-sm" :class="p.featured ? 'text-pnj-muted' : 'text-[#6B6458]'">{{ p.id === 'site-free' ? t.pricing.forever : (yearly ? t.pricing.perYear : t.pricing.perMonth) }}</span>
          </div>
          <ul class="mt-6 flex-1 space-y-2 text-[15px] leading-[1.6]" :class="p.featured ? 'text-pnj-text2' : 'text-[#3A362F]'">
            <li v-for="it in p.items" :key="it">{{ it }}</li>
          </ul>
          <RouterLink
            :to="signup(p.id)"
            class="mt-7 rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors"
            :class="p.featured ? 'bg-pnj-gold text-pnj-ongold hover:bg-pnj-goldhi' : 'border border-pnj-ink text-pnj-ink hover:bg-pnj-ink hover:text-white'"
          >{{ p.cta }}</RouterLink>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap items-center justify-between gap-5 rounded-[14px] border border-[#E0DACD] bg-[#FBF9F4] p-7">
        <div>
          <h3 class="text-xl font-semibold">{{ t.pricing.setupTitle }}</h3>
          <p class="mt-1 text-[15px] text-[#5C564C]">{{ t.pricing.setupBody }}</p>
        </div>
        <RouterLink
          :to="{ path: base, hash: '#contact' }"
          class="rounded-lg bg-pnj-ink px-[22px] py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          @click="selectedPackage = 'site-setup'"
        >{{ t.pricing.setupCta }}</RouterLink>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-[1240px] px-6 py-16 md:py-[100px]">
    <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.process.eyebrow }}</p>
    <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.process.title }}</h2>
    <ol class="mt-10 grid gap-x-6 gap-y-8 border-t border-pnj-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
      <li v-for="(s, i) in t.process.steps" :key="s.t">
        <span class="font-mono text-sm text-pnj-gold">0{{ i + 1 }}</span>
        <h3 class="mt-3 text-lg font-semibold text-pnj-text">{{ s.t }}</h3>
        <p class="mt-1.5 text-[15px] leading-[1.6] text-pnj-muted">{{ s.d }}</p>
      </li>
    </ol>
  </section>
</template>
