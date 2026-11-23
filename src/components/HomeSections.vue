<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { vReveal } from '../utils/reveal'
import { clamp01, onScrollFrame } from '../utils/fade'
import SectionHeading from './SectionHeading.vue'
import { selectedPackage } from '../utils/inquiryState'

// part: 'process' or 'packages'. bare: the page already carries the title, so skip the heading.
const props = defineProps({ part: { type: String, default: 'process' }, bare: { type: Boolean, default: false } })
const lang = inject('lang')

// Copy is derived from the real work shown in the Skills section and the
// "client brief → flowchart → spec → dev plan" process already described
// there. Each package shows its regular price struck through and the
// current one (THB); the final price is still quoted per scope.
const PRICES = {
  starter: { was: 8999, now: 5999 },
  pro: { was: 69999, now: 49999 },
  enterprise: { was: 100000, now: 89999 },
}
const baht = (n) => `฿${n.toLocaleString('en-US')}`

const content = {
  th: {
    processKicker: 'Process',
    processTitle: 'ขั้นตอนการทำงาน',
    processAccent: 'การทำงาน',
    processIntro: 'ทำงานเป็นลำดับชัดเจน ลูกค้าเห็นภาพทุกขั้นก่อนลงมือพัฒนา',
    steps: [
      { title: 'คุยโจทย์', desc: 'ทำความเข้าใจปัญหา เป้าหมาย และกระบวนการทำงานจริงขององค์กร' },
      { title: 'วางแผนผังงาน', desc: 'สรุปเป็น flowchart และสเปกส่วนประกอบ ให้ผู้บริหารเข้าใจและอนุมัติได้' },
      { title: 'พัฒนา', desc: 'ลงมือพัฒนาตามแผน แบ่งเป็นช่วงเพื่อให้ตรวจงานได้ต่อเนื่อง' },
      { title: 'ทดสอบและส่งมอบ', desc: 'ทดสอบการใช้งานจริง ปรับแก้ แล้วส่งมอบระบบพร้อมใช้งาน' },
      { title: 'ดูแลต่อเนื่อง', desc: 'ดูแล แก้ไข และต่อยอดระบบให้เติบโตไปพร้อมธุรกิจ' },
    ],
    stepLabel: 'ขั้นที่',
    packagesKicker: 'Packages',
    packagesTitle: 'แพ็กเกจการทำงาน',
    packagesAccent: 'แพ็กเกจ',
    packagesIntro: 'ราคาขึ้นกับขอบเขตงานจริง บอกโจทย์มาแล้วจะประเมินและส่งใบเสนอราคาให้',
    packages: [
      { id: 'starter', name: 'เริ่มต้น', tag: 'Starter', for: 'ธุรกิจที่ต้องการหน้าเว็บหรือปรับปรุงเว็บเดิม', items: ['Landing page / เว็บบริษัท', 'แก้ไข ปรับปรุง เว็บที่มีอยู่', 'ฟอร์มติดต่อและ SEO พื้นฐาน'] },
      { id: 'pro', name: 'ประยุกต์', tag: 'Professional', featured: true, for: 'ระบบเว็บหรือแอปที่ใช้งานจริงในธุรกิจ', items: ['ระบบเว็บ / แอปมือถือตามโจทย์', 'ระบบล็อกอินและสิทธิ์ผู้ใช้', 'แดชบอร์ดและฐานข้อมูล', 'ฝึกสอนการใช้งานทีมงาน'] },
      { id: 'enterprise', name: 'องค์กร', tag: 'Enterprise', for: 'หน่วยงานหรือองค์กรที่ต้องการระบบเต็มรูปแบบ', items: ['ระบบหลายบทบาท หลายแพลตฟอร์ม', 'เชื่อมต่อ API และระบบภายนอก', 'ออกแบบความปลอดภัยและ CI/CD', 'ที่ปรึกษาและดูแลต่อเนื่อง'] },
    ],
    quote: 'ขอใบเสนอราคา',
    popular: 'ยอดนิยม',
    wasLabel: 'ราคาปกติ',
    nowLabel: 'ราคาพิเศษ',
    promoFirst: 'เป็นลูกค้ารายแรก ลดเลย',
    promoFirstSub: 'ราคาพิเศษด้านล่างสำหรับลูกค้ากลุ่มแรก',
    promoCare: 'เราดูแลให้ตลอดครึ่งปี',
    promoCareSub: 'บริการหลังการขาย / ประกัน',
    careWas: '3 เดือน',
    careNow: '6 เดือน',
  },
  en: {
    processKicker: 'Process',
    processTitle: 'How it works',
    processAccent: 'works',
    processIntro: 'A clear sequence, so you see the plan at every step before development starts.',
    steps: [
      { title: 'Understand the brief', desc: 'Learn the problem, the goal and how your organization actually works.' },
      { title: 'Plan the flow', desc: 'Summarize it as a flowchart and component spec your board can understand and approve.' },
      { title: 'Build', desc: 'Develop against the plan in stages so work can be reviewed continuously.' },
      { title: 'Test & deliver', desc: 'Test in real use, refine, then hand over a system that is ready to run.' },
      { title: 'Support', desc: 'Maintain, fix and extend the system as your business grows.' },
    ],
    stepLabel: 'Step',
    packagesKicker: 'Packages',
    packagesTitle: 'Ways to work together',
    packagesAccent: 'together',
    packagesIntro: 'Pricing depends on the real scope. Tell me what you need and I will estimate and send a quotation.',
    packages: [
      { id: 'starter', name: 'Starter', tag: 'Starter', for: 'Businesses that need a web presence or a refresh', items: ['Landing page / company site', 'Fixes and upgrades to an existing site', 'Contact form and basic SEO'] },
      { id: 'pro', name: 'Professional', tag: 'Professional', featured: true, for: 'Web or mobile systems used in real operations', items: ['Custom web system / mobile app', 'Sign-in and user permissions', 'Dashboards and database', 'Team onboarding'] },
      { id: 'enterprise', name: 'Enterprise', tag: 'Enterprise', for: 'Organizations that need a full system', items: ['Multi-role, multi-platform systems', 'API and third-party integration', 'Security design and CI/CD', 'Consulting and ongoing support'] },
    ],
    quote: 'Request a quote',
    popular: 'Popular',
    wasLabel: 'Regular price',
    nowLabel: 'Special price',
    promoFirst: 'Be one of the first clients, get the discount',
    promoFirstSub: 'The special prices below are for early clients',
    promoCare: 'Half a year of care',
    promoCareSub: 'After-sales support / warranty',
    careWas: '3 months',
    careNow: '6 months',
  },
}

const t = computed(() => content[lang.value])

function choosePackage(id) {
  selectedPackage.value = id
}

// Process: scroll position drives a glowing rail through the five steps.
// Desktop pins the section (sticky) and reads progress from the section;
// phones read it from the list as it passes the middle of the screen.
const sectionEl = ref(null)
const listEl = ref(null)
const progress = ref(0)
const active = computed(() => Math.min(4, Math.floor(progress.value * 5)))
let stop = null

onMounted(() => {
  if (props.part !== 'process') return
  stop = onScrollFrame(() => {
    const vh = window.innerHeight
    if (window.innerWidth >= 1024 && sectionEl.value) {
      const r = sectionEl.value.getBoundingClientRect()
      progress.value = clamp01(-r.top / Math.max(1, r.height - vh))
    } else if (listEl.value) {
      const r = listEl.value.getBoundingClientRect()
      progress.value = clamp01((vh * 0.55 - r.top) / Math.max(1, r.height))
    }
  })
})
onBeforeUnmount(() => stop?.())
</script>

<template>
  <!-- Process: a pinned scroll rail. The active step is shown large on the left. -->
  <section v-if="props.part === 'process'" id="process" ref="sectionEl" class="process">
    <div class="process-pin mx-auto grid max-w-6xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:py-0">
      <div>
        <SectionHeading v-if="!props.bare" :title="t.processTitle" :accent="t.processAccent" :intro="t.processIntro" />
        <p v-else class="max-w-md text-lg leading-relaxed text-white/60">{{ t.processIntro }}</p>

        <div class="mt-14 hidden lg:block" aria-hidden="true">
          <p class="font-mono text-sm tabular-nums text-white/40">
            <span class="text-white">{{ String(active + 1).padStart(2, '0') }}</span> / 05
          </p>
          <div class="relative mt-4 h-40">
            <div
              v-for="(step, i) in t.steps"
              :key="i"
              class="stage absolute inset-0"
              :class="i === active && 'is-on'"
            >
              <p class="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl" style="text-wrap: balance">{{ step.title }}</p>
              <p class="mt-4 max-w-md text-base leading-relaxed text-white/60">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <ol ref="listEl" class="rail relative" :style="{ '--p': progress }">
        <span class="rail-track" aria-hidden="true"><span class="rail-fill"></span></span>
        <li
          v-for="(step, i) in t.steps"
          :key="i"
          class="rail-step relative pb-10 pl-12 last:pb-0 lg:pb-12"
          :class="{ 'is-past': i <= active, 'is-on': i === active }"
        >
          <span class="rail-node" aria-hidden="true"></span>
          <p class="font-mono text-xs tabular-nums text-white/40">{{ t.stepLabel }} {{ i + 1 }}</p>
          <h3 class="mt-1 text-xl font-semibold text-white md:text-2xl">{{ step.title }}</h3>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-white/60 lg:hidden">{{ step.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- Packages: one row per package, read side by side like a price list -->
  <section v-if="props.part === 'packages'" id="packages" class="px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading v-if="!props.bare" :title="t.packagesTitle" :accent="t.packagesAccent" :intro="t.packagesIntro" />

      <!-- Launch offers, applying to every package below -->
      <ul v-reveal class="mb-8 grid gap-3 md:grid-cols-2" :class="props.bare ? '' : 'mt-14'">
        <li class="promo flex items-start gap-4 rounded-[1.5rem] p-5 md:p-6">
          <span class="promo-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 15 15 9M9.5 9.5h.01M14.5 14.5h.01M3 12l1.8-1.8V7.6a2.6 2.6 0 0 1 2.6-2.6h2.6L12 3l1.8 1.8h2.6a2.6 2.6 0 0 1 2.6 2.6v2.6L21 12l-1.8 1.8v2.6a2.6 2.6 0 0 1-2.6 2.6h-2.6L12 21l-1.8-1.8H7.6A2.6 2.6 0 0 1 5 16.4v-2.6Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <span>
            <span class="block text-lg font-semibold text-white">{{ t.promoFirst }}</span>
            <span class="mt-1 block text-sm text-white/60">{{ t.promoFirstSub }}</span>
          </span>
        </li>
        <li class="promo flex items-start gap-4 rounded-[1.5rem] p-5 md:p-6">
          <span class="promo-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Zm-3.2 9.2 2.2 2.2 4.4-4.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <span>
            <span class="block text-lg font-semibold text-white">{{ t.promoCare }}</span>
            <span class="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm text-white/60">
              {{ t.promoCareSub }}
              <del class="decoration-white/50 text-white/40">{{ t.careWas }}</del>
              <strong class="pkg-price text-base font-semibold">{{ t.careNow }}</strong>
            </span>
          </span>
        </li>
      </ul>

      <div>
        <article
          v-for="(p, i) in t.packages"
          :key="p.id"
          v-reveal="i"
          class="pkg group relative grid gap-6 px-2 py-9 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-center md:gap-10 md:px-8"
          :class="p.featured ? 'pkg-featured my-3 rounded-[1.75rem]' : 'border-t border-white/10 last:border-b'"
        >
          <div>
            <p class="flex items-center gap-3 text-sm text-white/45">
              {{ p.tag }}
              <span v-if="p.featured" class="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-black">{{ t.popular }}</span>
            </p>
            <h3 class="mt-1 text-4xl font-bold tracking-tight text-white md:text-5xl">{{ p.name }}</h3>
            <p v-if="PRICES[p.id]" class="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
              <span class="sr-only">{{ t.nowLabel }}</span>
              <span class="pkg-price text-3xl font-semibold tracking-tight">{{ baht(PRICES[p.id].now) }}</span>
              <span class="sr-only">{{ t.wasLabel }}</span>
              <del class="text-lg text-white/40 decoration-white/50">{{ baht(PRICES[p.id].was) }}</del>
            </p>
          </div>

          <div>
            <p class="text-base text-white/80">{{ p.for }}</p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="item in p.items"
                :key="item"
                class="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 transition-colors duration-300 group-hover:border-white/20"
              >{{ item }}</li>
            </ul>
          </div>

          <a
            href="#inquiry"
            @click="choosePackage(p.id)"
            :class="p.featured ? 'btn-glow' : 'pkg-cta'"
            class="justify-self-start whitespace-nowrap md:justify-self-end"
          >
            {{ t.quote }}
            <svg viewBox="0 0 16 16" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Package price, in the page's accent */
.pkg-price { color: var(--accent-soft, #fff); }
.promo {
  background: color-mix(in srgb, var(--accent, #e8400d) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-soft, #ffb38a) 25%, transparent);
}
.promo-icon {
  color: var(--accent-soft, #ffb38a);
  background: color-mix(in srgb, var(--accent, #e8400d) 22%, transparent);
}

/* ---- Process rail ---- */
@media (min-width: 1024px) {
  .process { height: 320svh; }
  .process-pin {
    position: sticky;
    top: 0;
    min-height: 100svh;
  }
}
.rail-track {
  position: absolute;
  left: 11px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.rail-fill {
  position: absolute;
  inset: 0;
  transform-origin: top;
  transform: scaleY(var(--p, 0));
  background: linear-gradient(180deg, var(--accent-soft, #d0b2ff), var(--accent, #b600a8) 55%, var(--accent-2, #e8400d));
}
.rail-node {
  position: absolute;
  left: 4px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  border: 2px solid #333;
  background: #0c0c0c;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s, box-shadow 0.4s;
}
.rail-step h3,
.rail-step p {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.rail-step:not(.is-past) h3 { opacity: 0.4; }
.rail-step.is-past .rail-node {
  border-color: var(--accent-soft, #d0b2ff);
  background: var(--accent, #b600a8);
}
.rail-step.is-on .rail-node {
  box-shadow: 0 4px 18px 2px color-mix(in srgb, var(--accent, #b600a8) 55%, transparent);
}
@media (min-width: 1024px) {
  .rail-step:not(.is-on) h3 { opacity: 0.35; }
}

/* The big step text on the left crossfades with a short blur */
.stage {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(14px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.stage.is-on {
  opacity: 1;
  filter: none;
  transform: none;
}

/* ---- Package rows ---- */
.pkg { transition: background-color 0.3s ease; }
.pkg:not(.pkg-featured):hover { background: rgba(255, 255, 255, 0.02); }
.pkg-featured {
  border: 1px solid transparent;
  background:
    linear-gradient(#141414, #141414) padding-box,
    linear-gradient(120deg, var(--accent-soft, #d0b2ff), var(--accent, #b600a8) 45%, var(--accent-2, #e8400d)) border-box;
  box-shadow: 0 30px 80px -40px color-mix(in srgb, var(--accent, #b600a8) 75%, transparent);
}
.pkg-featured + .pkg { border-top: 0; }
.pkg-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  color: #fff;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.pkg-cta:hover { border-color: rgba(255, 255, 255, 0.45); background: rgba(255, 255, 255, 0.04); }
</style>
