<script setup>
import { computed } from 'vue'
import { vReveal } from '../utils/reveal'

// Section heading in the studio style: an outlined eyebrow label, a heavy
// title with one glowing accent phrase, and an optional intro line.
//   <SectionHeading kicker="Process" title="ขั้นตอนการทำงาน" accent="การทำงาน" />
const props = defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, required: true },
  accent: { type: String, default: '' }, // part of `title` to glow; must appear in it
  intro: { type: String, default: '' },
  as: { type: String, default: 'h2' },
  center: { type: Boolean, default: false },
})

const parts = computed(() => {
  const i = props.accent ? props.title.indexOf(props.accent) : -1
  return i < 0
    ? [props.title, '', '']
    : [props.title.slice(0, i), props.accent, props.title.slice(i + props.accent.length)]
})
</script>

<template>
  <div v-reveal :class="props.center && 'text-center'">
    <span v-if="props.kicker" class="eyebrow">{{ props.kicker }}</span>
    <component
      :is="props.as"
      class="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl"
      style="text-wrap: balance"
    >{{ parts[0] }}<span v-if="parts[1]" class="glow-text">{{ parts[1] }}</span>{{ parts[2] }}</component>
    <p
      v-if="props.intro"
      class="mt-5 max-w-2xl text-base leading-relaxed text-base-content/60 md:text-lg"
      :class="props.center && 'mx-auto'"
    >{{ props.intro }}</p>
  </div>
</template>
