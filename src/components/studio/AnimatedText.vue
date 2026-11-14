<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import { clamp01, onScrollFrame } from '../../utils/fade'

// Scroll-driven reveal: each character goes from 0.2 to full opacity in turn
// while the paragraph travels from 80% to 20% of the viewport height.
const props = defineProps({ text: { type: String, required: true } })

// Split into grapheme clusters, not code units: Thai vowels and tone marks
// must stay attached to their consonant.
const chars = computed(() => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(props.text)].map((s) => s.segment)
  }
  return Array.from(props.text)
})

const el = ref(null)
let spans = []
let stop = null

function update() {
  const r = el.value.getBoundingClientRect()
  const vh = window.innerHeight
  // 0 when the top reaches 80% of the viewport, 1 when the bottom reaches 20%.
  const progress = clamp01((vh * 0.8 - r.top) / (vh * 0.6 + r.height))
  const n = spans.length
  spans.forEach((s, i) => {
    s.style.opacity = 0.2 + 0.8 * clamp01((progress - i / n) * n)
  })
}

function collect() {
  spans = el.value ? [...el.value.querySelectorAll('span')] : []
}

onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  collect()
  stop = onScrollFrame(update)
})
watch(chars, async () => {
  if (!stop) return
  await nextTick()
  collect()
  update()
})
onBeforeUnmount(() => stop?.())
</script>

<template>
  <!-- The full sentence stays in the DOM as text for crawlers and screen readers -->
  <p ref="el"><span v-for="(c, i) in chars" :key="i">{{ c }}</span></p>
</template>
