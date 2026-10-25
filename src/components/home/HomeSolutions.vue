<script setup>
import { computed, inject, ref } from 'vue'
import { content } from '../../content/home'

const lang = inject('lang')
const t = computed(() => content[lang.value])
const tab = ref('software')

const STATUS = { LIVE: 'text-pnj-ok', NEXT: 'text-pnj-gold', LATER: 'text-pnj-faint' }
</script>

<template>
  <section id="solutions" class="mx-auto max-w-[1240px] px-6 py-16 md:py-[100px]">
    <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.solutions.eyebrow }}</p>
    <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.solutions.title }}</h2>
    <p class="mt-4 max-w-[640px] text-[17px] leading-[1.7] text-pnj-muted">{{ t.solutions.lead }}</p>

    <div class="mt-10 flex flex-wrap gap-2.5" role="tablist">
      <button
        v-for="(x, i) in t.solutions.tabs"
        :key="x.id"
        type="button"
        role="tab"
        :aria-selected="tab === x.id"
        class="rounded-full border px-5 py-3 text-[15px] font-medium transition-colors"
        :class="tab === x.id ? 'border-pnj-gold bg-pnj-gold text-pnj-ongold' : 'border-pnj-line2 text-pnj-text2 hover:border-pnj-gold hover:text-pnj-gold'"
        @click="tab = x.id"
      >
        <span class="mr-2 font-mono text-xs opacity-70">0{{ i + 1 }}</span>{{ x.label }}
      </button>
    </div>

    <!-- Every panel is rendered (hidden when inactive) so the prerendered HTML carries all services. -->
    <div
      v-for="x in t.solutions.tabs"
      v-show="tab === x.id"
      :key="x.id"
      role="tabpanel"
      class="mt-8 grid gap-px overflow-hidden rounded-xl border border-pnj-line bg-pnj-line sm:grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="c in x.cells" :key="c.t" class="bg-pnj-surface p-7">
        <span v-if="c.st" class="mb-2.5 block font-mono text-xs tracking-wider" :class="STATUS[c.st]">{{ c.st }}</span>
        <h3 class="text-[19px] font-semibold text-pnj-text">{{ c.t }}</h3>
        <p class="mt-2 text-[15px] leading-[1.65] text-pnj-muted">{{ c.d }}</p>
      </div>
    </div>
  </section>
</template>
