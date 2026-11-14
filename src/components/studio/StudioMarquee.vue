<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { items } from '../../content/workGallery'
import { onScrollFrame } from '../../utils/fade'

// Two rows of real work photos that slide sideways as the page scrolls:
// row 1 to the right, row 2 to the left. Each row is tripled so it never
// runs out while sliding.
const files = import.meta.glob('../image/work/*-t.webp', { eager: true, import: 'default' })
const thumb = (id) => files[`../image/work/${id}-t.webp`]

const half = Math.ceil(items.length / 2)
const triple = (list) => [...list, ...list, ...list]
const row1 = triple(items.slice(0, half))
const row2 = triple(items.slice(half))

const section = ref(null)
const rowA = ref(null)
const rowB = ref(null)
let stop = null

onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  stop = onScrollFrame(() => {
    const top = section.value.getBoundingClientRect().top + window.scrollY
    const offset = (window.scrollY - top + window.innerHeight) * 0.3
    // Start each row one copy to the left, so sliding either way never shows an empty edge.
    const copyA = rowA.value.scrollWidth / 3
    const copyB = rowB.value.scrollWidth / 3
    rowA.value.style.transform = `translateX(${offset - 200 - copyA}px)`
    rowB.value.style.transform = `translateX(${-(offset - 200) - copyB}px)`
  })
})
onBeforeUnmount(() => stop?.())
</script>

<template>
  <section ref="section" class="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" aria-hidden="true">
    <div class="flex flex-col gap-3">
      <div ref="rowA" class="flex w-max gap-3" style="will-change: transform; transform: translateX(-33.333%)">
        <img
          v-for="(item, i) in row1"
          :key="`a${i}`"
          :src="thumb(item.id)"
          alt=""
          loading="lazy"
          decoding="async"
          class="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      </div>
      <div ref="rowB" class="flex w-max gap-3" style="will-change: transform; transform: translateX(-33.333%)">
        <img
          v-for="(item, i) in row2"
          :key="`b${i}`"
          :src="thumb(item.id)"
          alt=""
          loading="lazy"
          decoding="async"
          class="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      </div>
    </div>
  </section>
</template>
