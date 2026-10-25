<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { content } from '../../content/home'

const lang = inject('lang')
const t = computed(() => content[lang.value])
const base = computed(() => (lang.value === 'en' ? '/en' : '/'))
</script>

<template>
  <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 bg-pnj-gold px-6 py-2.5 text-center font-plex text-sm font-medium text-pnj-ongold">
    <span>{{ t.banner }}</span>
    <RouterLink :to="{ path: base, hash: '#pricing' }" class="underline underline-offset-2">{{ t.bannerLink }}</RouterLink>
  </div>
</template>
