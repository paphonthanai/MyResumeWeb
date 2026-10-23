<script setup>
import { computed, inject, ref } from 'vue'
import { vReveal } from '../utils/reveal'
import { selectedPackage } from '../utils/inquiryState'
import { content, FIRE_FIRST_URL } from '../content/websiteBuilder'

const lang = inject('lang')
const t = computed(() => content[lang.value])

const ICONS = {
  edit: 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
  lang: 'm10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802',
  search: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  share: 'M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z',
  bolt: 'm3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
  inbox: 'M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z',
}

const faqOpen = ref(0)

function choose(id) {
  selectedPackage.value = id
}
</script>

<template>
  <!-- Hero -->
  <section class="relative overflow-hidden border-b border-base-300 bg-base-100">
    <div class="pointer-events-none absolute -top-32 right-[-10%] -z-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
    <div class="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-28">
      <div class="space-y-6">
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.kicker }}</p>
        <span class="inline-flex items-center gap-2 rounded-full border border-primary/50 px-3 py-1 text-xs text-primary">
          <span class="h-1.5 w-1.5 rounded-full bg-primary"></span>{{ t.badge }}
        </span>
        <h1 class="font-display text-4xl font-semibold leading-tight text-base-content md:text-5xl" style="text-wrap: balance">
          {{ t.title }}
        </h1>
        <p class="max-w-xl text-lg leading-relaxed text-base-content/65">{{ t.lead }}</p>
        <div class="flex flex-wrap gap-3 pt-2">
          <a href="#inquiry" class="btn btn-shimmer rounded-full border-primary px-7 text-primary-content">{{ t.ctaPrimary }}</a>
          <a :href="FIRE_FIRST_URL" target="_blank" rel="noopener" class="btn rounded-full border-primary/60 bg-transparent px-7 text-primary hover:bg-primary hover:text-primary-content">
            {{ t.ctaSecondary }} ↗
          </a>
        </div>
      </div>

      <!-- Editor mock: Thai/English fields beside a live preview (decorative) -->
      <div class="rounded-lg border border-base-300 bg-base-200/70 shadow-[0_30px_60px_-30px_rgba(212,175,55,0.35)]" aria-hidden="true">
        <div class="flex items-center gap-2 border-b border-base-300 px-4 py-3">
          <span class="h-2.5 w-2.5 rounded-full bg-base-300"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-base-300"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-base-300"></span>
          <span class="ml-3 truncate rounded bg-base-100 px-3 py-1 text-[11px] text-base-content/50">firefirstsafetyandtruck.com</span>
        </div>
        <div class="grid grid-cols-[0.9fr_1.1fr]">
          <div class="space-y-3 border-r border-base-300 p-4">
            <p class="text-[10px] uppercase tracking-widest text-base-content/40">{{ t.mock.field }}</p>
            <div>
              <p class="mb-1 text-[10px] text-primary/80">{{ t.mock.th }}</p>
              <div class="rounded border border-primary/50 bg-base-100 px-2 py-1.5 text-xs text-base-content/85">มากกว่ารถดับเพลิง คือความปลอดภัยของทุกชีวิต</div>
            </div>
            <div>
              <p class="mb-1 text-[10px] text-primary/80">{{ t.mock.en }}</p>
              <div class="rounded border border-base-300 bg-base-100 px-2 py-1.5 text-xs text-base-content/70">More than fire trucks — safety for every life</div>
            </div>
            <div class="flex items-center justify-between pt-2">
              <span class="text-[10px] text-success">✓ {{ t.mock.saved }}</span>
              <span class="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-content">{{ t.mock.publish }}</span>
            </div>
          </div>
          <!-- Miniature of the Fire First "Poster" design, in its own colors -->
          <div class="p-3">
            <div class="overflow-hidden rounded-sm bg-[#f3f2f2]">
              <div class="bg-[#ec3013] px-3 pb-4 pt-3 text-white">
                <p class="text-[7px] uppercase tracking-widest opacity-90">Fire trucks · Equipment · Training</p>
                <p class="mt-2 text-xl font-extrabold leading-none tracking-tight" style="font-family: Archivo, 'Noto Sans Thai', sans-serif">เร็ว.<br />รอด.<br />ปลอดภัย.</p>
              </div>
              <div class="space-y-1.5 px-3 py-3">
                <div class="h-1.5 w-4/5 bg-[#201e1d]"></div>
                <div class="h-1 w-full bg-[#201e1d]/25"></div>
                <div class="h-1 w-3/5 bg-[#201e1d]/25"></div>
                <div class="grid grid-cols-3 gap-1 pt-1.5">
                  <div class="h-6 bg-[#201e1d]/15"></div>
                  <div class="h-6 bg-[#201e1d]/15"></div>
                  <div class="h-6 bg-[#201e1d]/15"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section id="features" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.featuresKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.featuresTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
      </div>
      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(f, i) in t.features"
          :key="f.icon"
          v-reveal="i"
          class="group rounded-lg border border-base-300 bg-base-200/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" :d="ICONS[f.icon]" />
            </svg>
          </div>
          <h3 class="mt-5 font-display text-lg font-semibold text-base-content">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ f.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section id="how" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.stepsKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.stepsTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-2xl text-base-content/60">{{ t.stepsIntro }}</p>
      </div>
      <ol class="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        <div class="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block"></div>
        <li v-for="(s, i) in t.steps" :key="i" v-reveal="i" class="relative">
          <div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-base-100 font-display text-sm font-semibold text-primary">{{ i + 1 }}</div>
          <p class="mt-4 text-[11px] uppercase tracking-widest text-base-content/40">{{ t.stepLabel }} {{ i + 1 }}</p>
          <h3 class="mt-1 font-display text-base font-semibold text-base-content">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ s.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- First customer -->
  <section id="customer" class="border-b border-base-300 bg-base-200/30 px-6 py-20 md:px-10">
    <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.caseKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.caseTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-xl leading-relaxed text-base-content/65">{{ t.caseDesc }}</p>
        <a :href="FIRE_FIRST_URL" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline">
          {{ t.caseLink }} ↗
        </a>
      </div>
      <dl class="grid grid-cols-3 divide-x divide-base-300 rounded-lg border border-base-300 bg-base-100" v-reveal>
        <div v-for="s in t.caseStats" :key="s.label" class="flex flex-col-reverse p-5">
          <dt class="mt-2 text-xs leading-snug text-base-content/55">{{ s.label }}</dt>
          <dd class="font-display text-3xl font-semibold text-primary" style="font-variant-numeric: tabular-nums">{{ s.value }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.pricingKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.pricingTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-2xl text-base-content/60">{{ t.pricingIntro }}</p>
      </div>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(p, i) in t.plans"
          :key="p.id"
          v-reveal="i"
          class="relative flex flex-col rounded-lg border bg-base-200/40 p-6 transition duration-300 hover:-translate-y-1"
          :class="p.featured ? 'border-primary/70 shadow-[0_12px_40px_-16px_rgba(212,175,55,0.35)]' : 'border-base-300 hover:border-primary/40'"
        >
          <span v-if="p.featured" class="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary-content">{{ t.popular }}</span>
          <h3 class="font-display text-xl font-semibold text-base-content">{{ p.name }}</h3>
          <p class="mt-3 flex items-baseline gap-1">
            <span class="font-display text-4xl font-semibold text-primary" style="font-variant-numeric: tabular-nums">฿{{ p.price }}</span>
            <span class="text-sm text-base-content/50">{{ t.perMonth }}</span>
          </p>
          <ul class="mt-6 flex-1 space-y-3 text-sm text-base-content/75">
            <li v-for="item in p.items" :key="item" class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </li>
          </ul>
          <a
            href="#inquiry"
            @click="choose(p.id)"
            class="btn mt-8 rounded-full border-primary"
            :class="p.featured ? 'btn-shimmer text-primary-content' : 'bg-transparent text-primary hover:bg-primary hover:text-primary-content'"
          >{{ t.choose }}</a>
        </article>
      </div>

      <div v-reveal class="mt-8 flex flex-col gap-4 rounded-lg border border-base-300 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="font-display text-lg font-semibold text-base-content">{{ t.setupTitle }}</h3>
          <p class="mt-1 max-w-2xl text-sm text-base-content/60">{{ t.setupDesc }}</p>
        </div>
        <div class="flex shrink-0 items-center gap-5">
          <span class="font-display text-lg text-primary">{{ t.setupPrice }}</span>
          <a href="#inquiry" @click="choose('site-setup')" class="btn rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-content">{{ t.setupCta }}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-3xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.faqKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.faqTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
      </div>
      <div class="mt-8 divide-y divide-base-300 border-y border-base-300">
        <div v-for="(f, i) in t.faq" :key="i">
          <h3>
            <button
              :id="`wb-faq-q-${i}`"
              type="button"
              class="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg text-base-content transition hover:text-primary"
              :aria-expanded="faqOpen === i"
              :aria-controls="`wb-faq-a-${i}`"
              @click="faqOpen = faqOpen === i ? -1 : i"
            >
              <span>{{ f.q }}</span>
              <span class="text-primary" aria-hidden="true">{{ faqOpen === i ? '−' : '+' }}</span>
            </button>
          </h3>
          <!-- Answers stay in the HTML (hidden) so search engines can read them -->
          <p :id="`wb-faq-a-${i}`" role="region" :aria-labelledby="`wb-faq-q-${i}`" :hidden="faqOpen !== i" class="pb-5 text-base-content/65">{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
