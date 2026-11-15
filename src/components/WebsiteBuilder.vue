<script setup>
import { computed, inject, ref } from 'vue'
import { vReveal } from '../utils/reveal'
import SectionHeading from './SectionHeading.vue'
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

// "ลงทะเบียนใช้งาน" and the plan buttons open the Website Builder sign-up
// (/app/login). The plan is remembered and saved on the new website.
function signupLink(plan) {
  return `/app/login?mode=signup&lang=${lang.value}${plan ? `&plan=${plan}` : ''}`
}
</script>

<template>
  <!-- Hero: centred headline over a glow, the editor mock below it -->
  <section class="relative overflow-hidden bg-base-100">
    <div class="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:px-10 md:pb-28 md:pt-24">
      <span class="eyebrow">{{ t.badge }}</span>
      <p class="mt-5 text-xs uppercase tracking-[0.25em] text-base-content/45">{{ t.kicker }}</p>
      <h1 class="mx-auto mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl" style="text-wrap: balance">
        {{ t.title.replace(t.titleAccent, '') }}<span class="glow-text">{{ t.titleAccent }}</span>
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-base-content/65">{{ t.lead }}</p>
      <div class="mt-9 flex flex-wrap justify-center gap-3">
        <RouterLink :to="signupLink()" class="btn btn-shimmer rounded-full px-8">{{ t.ctaPrimary }} →</RouterLink>
        <a :href="FIRE_FIRST_URL" target="_blank" rel="noopener" class="btn-glow">{{ t.ctaSecondary }} ↗</a>
      </div>
      <p class="mt-5 text-sm text-base-content/55">
        {{ t.haveAccount }}
        <RouterLink :to="`/app/login?mode=login&lang=${lang}`" class="text-white underline underline-offset-4 hover:text-primary">{{ t.signIn }}</RouterLink>
      </p>

      <!-- Editor mock: Thai/English fields beside a live preview (decorative) -->
      <div class="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-base-200/80 text-left shadow-[0_40px_120px_-40px_rgba(182,0,168,0.6)] backdrop-blur" aria-hidden="true">
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
  <section id="features" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :kicker="t.featuresKicker" :title="t.featuresTitle" :accent="t.featuresAccent" />
      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(f, i) in t.features"
          :key="f.icon"
          v-reveal="i"
          class="group card-studio p-7 hover:-translate-y-1"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white ring-1 ring-white/10 transition group-hover:bg-gradient-to-br group-hover:from-[#7621b0] group-hover:to-[#b600a8]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" :d="ICONS[f.icon]" />
            </svg>
          </div>
          <h3 class="mt-5 text-lg font-semibold text-base-content">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ f.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section id="how" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :kicker="t.stepsKicker" :title="t.stepsTitle" :accent="t.stepsAccent" :intro="t.stepsIntro" />
      <ol class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(s, i) in t.steps" :key="i" v-reveal="i" class="card-studio p-6 hover:-translate-y-1">
          <span class="step-num text-6xl font-black leading-none" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <p class="mt-6 text-[11px] uppercase tracking-widest text-base-content/40">{{ t.stepLabel }} {{ i + 1 }}</p>
          <h3 class="mt-1 text-base font-semibold text-base-content">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ s.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- First customer -->
  <section id="customer" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
      <div>
        <SectionHeading :kicker="t.caseKicker" :title="t.caseTitle" :accent="t.caseAccent" :intro="t.caseDesc" />
        <a v-reveal :href="FIRE_FIRST_URL" target="_blank" rel="noopener" class="btn-glow mt-8">
          {{ t.caseLink }} ↗
        </a>
      </div>
      <dl class="card-studio grid grid-cols-3 divide-x divide-white/10" v-reveal>
        <div v-for="s in t.caseStats" :key="s.label" class="flex flex-col-reverse p-5 md:p-7">
          <dt class="mt-2 text-xs leading-snug text-base-content/55">{{ s.label }}</dt>
          <dd class="glow-text text-3xl font-black lg:text-5xl" style="font-variant-numeric: tabular-nums">{{ s.value }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :kicker="t.pricingKicker" :title="t.pricingTitle" :accent="t.pricingAccent" :intro="t.pricingIntro" />
      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <article
          v-for="(p, i) in t.plans"
          :key="p.id"
          v-reveal="i"
          class="relative flex flex-col rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
          :class="p.featured ? 'featured-card' : 'card-studio'"
        >
          <span v-if="p.featured" class="absolute -top-3 left-6 rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-black">{{ t.popular }}</span>
          <h3 class="text-xl font-semibold text-base-content">{{ p.name }}</h3>
          <p class="mt-1 text-xs uppercase tracking-widest text-base-content/45">{{ p.tagline }}</p>
          <p class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-black text-white" style="font-variant-numeric: tabular-nums">฿{{ p.price }}</span>
            <span class="text-sm text-base-content/50">{{ t.perMonth }}</span>
          </p>
          <p v-if="p.price === '0'" class="mt-1 text-xs text-success">{{ t.freeNote }}</p>
          <ul class="mt-6 flex-1 space-y-3 text-sm text-base-content/75">
            <li v-for="item in p.items" :key="item.t || item" class="flex gap-2" :class="{ 'text-base-content/45': item.soon }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mt-0.5 h-4 w-4 shrink-0" :class="item.soon ? 'text-base-content/30' : 'text-primary'" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              <span>
                {{ item.t || item }}
                <span v-if="item.soon" class="ml-1 whitespace-nowrap rounded-full border border-base-content/20 px-1.5 py-px text-[10px] text-base-content/55">{{ t.soon }}</span>
              </span>
            </li>
          </ul>
          <RouterLink
            :to="signupLink(p.id)"
            class="mt-8"
            :class="p.featured ? 'btn-glow' : 'inline-flex justify-center rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-white/40'"
          >{{ t.choose }}</RouterLink>
        </article>
      </div>

      <div v-reveal class="card-studio mt-8 flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-base-content">{{ t.setupTitle }}</h3>
          <p class="mt-1 max-w-2xl text-sm text-base-content/60">{{ t.setupDesc }}</p>
        </div>
        <div class="flex shrink-0 items-center gap-5">
          <span class="text-lg font-semibold text-white">{{ t.setupPrice }}</span>
          <a href="#inquiry" @click="choose('site-setup')" class="btn btn-shimmer rounded-full px-6">{{ t.setupCta }}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-3xl">
      <SectionHeading :kicker="t.faqKicker" :title="t.faqTitle" :accent="t.faqAccent" />
      <div class="mt-10 space-y-3">
        <div v-for="(f, i) in t.faq" :key="i" class="card-studio px-6">
          <h3>
            <button
              :id="`wb-faq-q-${i}`"
              type="button"
              class="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium text-white transition hover:text-primary"
              :aria-expanded="faqOpen === i"
              :aria-controls="`wb-faq-a-${i}`"
              @click="faqOpen = faqOpen === i ? -1 : i"
            >
              <span>{{ f.q }}</span>
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white" aria-hidden="true">{{ faqOpen === i ? '−' : '+' }}</span>
            </button>
          </h3>
          <!-- Answers stay in the HTML (hidden) so search engines can read them -->
          <p :id="`wb-faq-a-${i}`" role="region" :aria-labelledby="`wb-faq-q-${i}`" :hidden="faqOpen !== i" class="pb-5 text-base-content/65">{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-glow {
  background:
    radial-gradient(40% 50% at 30% 20%, rgba(118, 33, 176, 0.35), transparent 70%),
    radial-gradient(35% 45% at 75% 30%, rgba(232, 64, 13, 0.18), transparent 70%);
}
.step-num {
  color: transparent;
  -webkit-text-stroke: 1px rgba(215, 226, 234, 0.35);
}
.featured-card {
  border: 1px solid transparent;
  background:
    linear-gradient(#151515, #151515) padding-box,
    linear-gradient(135deg, #d0b2ff, #b600a8 45%, #e8400d) border-box;
  box-shadow: 0 20px 60px -30px rgba(182, 0, 168, 0.7);
}
</style>
