<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { prefs, themeVars } from '../theme'
import '../sk.css'

// Root of every builder screen: applies the builder tokens (light/dark) and
// loads the builder fonts. Builder pages are private, so keep them out of
// search results.
useHead({
  htmlAttrs: { lang: computed(() => prefs.lang) },
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  link: [{
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap',
  }],
})

const vars = computed(() => themeVars(prefs.dark))
</script>

<template>
  <div class="sk" :style="vars" :data-dark="prefs.dark ? '1' : '0'">
    <slot />
  </div>
</template>
