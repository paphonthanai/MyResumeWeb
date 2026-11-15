<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { pageByKey, nextPage } from '../../content/pages'

// One showcase page: sets the page's accent colours as CSS variables, draws
// its hero (title + motif), the page content (slot), and a large link on to
// the next page so the pages read as a tour.
const props = defineProps({
  page: { type: String, required: true },
  hero: { type: Boolean, default: true },
})

const lang = inject('lang')
const p = computed(() => pageByKey[props.page])
const t = computed(() => p.value[lang.value])
const next = computed(() => nextPage(props.page))
const nextT = computed(() => next.value?.[lang.value])

const vars = computed(() => ({
  '--accent': p.value.accent,
  '--accent-soft': p.value.soft,
  '--accent-2': p.value.alt,
}))

// Title with the accent phrase split out
const parts = computed(() => {
  const { title, accentWord } = t.value
  const i = accentWord ? title.indexOf(accentWord) : -1
  return i < 0 ? [title, '', ''] : [title.slice(0, i), accentWord, title.slice(i + accentWord.length)]
})

const work = import.meta.glob('../image/work/*-t.webp', { eager: true, import: 'default' })
const thumb = (id) => work[`../image/work/${id}-t.webp`]
const FAN = ['cctv-mount', 'robot-arm-red', 'board-repair', 'ctf-group', 'printer-3d']
</script>

<template>
  <div class="page" :class="`page-${p.key}`" :style="vars">
    <header v-if="props.hero" class="hero relative overflow-hidden" :class="`motif-${p.motif}`">
      <div class="hero-bg" aria-hidden="true"></div>

      <!-- Gallery: a fanned stack of real photos -->
      <div v-if="p.motif === 'photos'" class="fan" aria-hidden="true">
        <img v-for="(id, i) in FAN" :key="id" :src="thumb(id)" alt="" class="fan-card" :style="{ '--i': i - 2 }" />
      </div>

      <div class="relative mx-auto flex min-h-[50svh] max-w-6xl md:min-h-[64svh] flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-20">
        <h1 class="hero-title studio-enter max-w-4xl font-extrabold text-white" :class="p.motif === 'photos' && 'xl:max-w-[38rem]'" style="text-wrap: balance">
          {{ parts[0] }}<span class="hero-accent whitespace-nowrap">{{ parts[1] }}</span>{{ parts[2] }}
        </h1>
        <p class="studio-enter mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg" style="--delay: 0.12s">{{ t.sub }}</p>
      </div>
    </header>

    <slot></slot>

    <nav v-if="next" class="next mx-auto max-w-6xl px-6 pb-24 pt-8 md:px-10" :aria-label="lang === 'en' ? 'Next page' : 'หน้าถัดไป'">
      <RouterLink
        :to="next.to"
        class="next-link group flex items-end justify-between gap-6 border-t border-white/10 pt-8"
        :style="{ '--next': next.accent }"
      >
        <span>
          <span class="block text-sm text-white/45">{{ lang === 'en' ? 'Next' : 'หน้าถัดไป' }}</span>
          <span class="next-name mt-2 block text-4xl font-bold tracking-tight text-white md:text-6xl">{{ nextT.name }}</span>
        </span>
        <svg viewBox="0 0 24 24" class="next-arrow h-10 w-10 shrink-0 md:h-14 md:w-14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
          <path d="M4 12h16M14 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.page ::selection { background: color-mix(in srgb, var(--accent) 55%, transparent); color: #fff; }

.hero-title {
  font-size: clamp(2.75rem, 8.5vw, 6rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
}
.hero-accent { color: var(--accent-soft); }

/* Shared glow, tinted by the page */
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 55% at 85% 20%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%),
    radial-gradient(45% 40% at 10% 100%, color-mix(in srgb, var(--accent-2) 16%, transparent), transparent 70%);
}

/* Projects: fine diagonal scan lines */
.motif-lines .hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 22px);
  mask-image: radial-gradient(70% 80% at 80% 30%, #000, transparent 75%);
}

/* Skills: a blueprint grid */
.motif-grid .hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent-soft) 14%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent-soft) 14%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(75% 85% at 75% 25%, #000, transparent 78%);
}

/* Process: concentric rings */
.motif-rings .hero-bg::after {
  content: '';
  position: absolute;
  right: -12vw;
  top: -18vw;
  width: 70vw;
  height: 70vw;
  max-width: 900px;
  max-height: 900px;
  border-radius: 9999px;
  background: repeating-radial-gradient(circle, transparent 0 46px, color-mix(in srgb, var(--accent-soft) 22%, transparent) 46px 47px);
  mask-image: radial-gradient(circle, #000 30%, transparent 70%);
}

/* Pricing: a warm horizon */
.motif-horizon .hero-bg {
  background:
    radial-gradient(90% 60% at 50% 115%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 65%),
    radial-gradient(50% 30% at 50% 100%, color-mix(in srgb, var(--accent-2) 30%, transparent), transparent 70%);
}
.motif-horizon .hero-bg::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-soft), transparent);
}

/* Gallery: fanned photos on the right (hidden on narrow screens) */
.fan {
  position: absolute;
  right: 6vw;
  top: 50%;
  width: 260px;
  height: 320px;
  transform: translateY(-46%);
  display: none;
}
@media (min-width: 1200px) {
  .fan { display: block; }
}
.fan-card {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.25rem;
  border: 4px solid #f3efe7;
  box-shadow: 0 24px 50px -20px rgba(0, 0, 0, 0.8);
  transform: rotate(calc(var(--i) * 7deg)) translateX(calc(var(--i) * 34px));
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fan:hover .fan-card {
  transform: rotate(calc(var(--i) * 11deg)) translateX(calc(var(--i) * 62px));
}

/* Next page */
.next-arrow {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
}
.next-name { transition: color 0.3s ease; }
.next-link:hover .next-arrow { transform: translateX(8px); color: var(--next); }
.next-link:hover .next-name { color: var(--next); }
.next-link:focus-visible { outline: 2px solid var(--accent-soft); outline-offset: 6px; border-radius: 4px; }
</style>
