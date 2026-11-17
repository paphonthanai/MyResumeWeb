<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

const route = useRoute()

// Site-wide background: ThreeUI's Constellation Field, fixed behind every
// public page. It mounts once here (so it keeps running across page changes)
// and only after the page is idle, so it never delays the first paint.
// The admin and Website Builder app keep their own plain backgrounds.
const ConstellationField = defineAsyncComponent(() => import('./components/threeui/ConstellationField.vue'))
const showBackground = ref(false)
const publicPage = computed(() => !/^\/(admin|app)(\/|$)/.test(route.path))
onMounted(() => {
  const start = () => { showBackground.value = true }
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 2500 })
  else setTimeout(start, 1200)
})

const siteUrl = 'https://myresume-ae906.web.app'
const defaultTitle = 'ปพนธนัย ใจมา (PNJ Tech) | Fullstack Developer Portfolio'
const defaultDescription = 'พอร์ตโฟลิโอและเรซูเม่ของปพนธนัย ใจมา (PNJ Tech) นักพัฒนาซอฟต์แวร์ฟรีแลนซ์ ประสบการณ์กว่า 5 ปี พัฒนาเว็บและแอปด้วย Vue.js, Flutter, Firebase, PHP รวมผลงานจริงและทักษะด้าน Security/CTF'
const ogImage = `${siteUrl}/og-image.png`

const title = computed(() => route.meta.title || defaultTitle)
const description = computed(() => route.meta.description || defaultDescription)
// meta.canonical points alias URLs (e.g. /app/home) at their main page.
const canonicalUrl = computed(() => siteUrl + (route.meta.canonical || (route.path === '/' ? '/' : route.path)))

// Person schema: only real profile links that exist elsewhere on this site
// (see HelloWorld.vue / AboutView.vue) — no fabricated social URLs.
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'ปพนธนัย ใจมา',
  alternateName: 'PNJ Tech',
  jobTitle: 'Fullstack Developer',
  url: siteUrl,
  image: ogImage,
  description: defaultDescription,
  sameAs: [
    'https://github.com/paphonthanai',
    'https://www.facebook.com/Paphonthanai.name',
    'https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/',
    'https://codepen.io/BaRon-Qube',
    'https://cssbattle.dev/player/lwWE4eMhEfcH9iY0J5mcVAJo6y63',
    'https://www.borntodev.com/devlab/profile/18960',
  ],
}

const htmlLang = computed(() => route.meta.lang || 'th')

// Pages with a Thai and an English URL (e.g. "/" and "/en") list both in
// meta.alternates — tell crawlers they're language alternates of one page.
// AboutView has none, so it gets no hreflang links (only one language).
const linkTags = computed(() => {
  const links = [{ rel: 'canonical', href: canonicalUrl.value }]
  const alt = route.meta.alternates
  if (alt) {
    links.push(
      { rel: 'alternate', hreflang: 'th', href: siteUrl + alt.th },
      { rel: 'alternate', hreflang: 'en', href: siteUrl + alt.en },
      { rel: 'alternate', hreflang: 'x-default', href: siteUrl + alt.th },
    )
  }
  return links
})

const robotsContent = computed(() => (route.meta.noindex ? 'noindex, nofollow' : 'index, follow'))

useHead({
  htmlAttrs: {
    lang: htmlLang,
  },
  title,
  meta: [
    { name: 'robots', content: robotsContent },
    { name: 'description', content: description },
    { property: 'og:type', content: 'profile' },
    { property: 'og:site_name', content: 'PNJ Tech' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:locale', content: computed(() => (htmlLang.value === 'en' ? 'en_US' : 'th_TH')) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ],
  link: linkTags,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(personSchema),
    },
  ],
})
</script>

<template>
  <div class="site-bg" :class="publicPage && 'is-on'" aria-hidden="true">
    <ConstellationField
      v-if="showBackground && publicPage"
      mode="dark"
      :speed="1.00"
      :size="1.00"
      :stroke-width="1.00"
      :length="1.00"
      :density="1.00"
      :opacity="1.00"
      :hue="0"
      :saturation="1.00"
      :brightness="1.00"
      tabindex="-1"
    />
  </div>
  <div class="relative z-[1]">
    <RouterView />
  </div>
</template>

<style>
/* Fixed layer behind every page; the frame inside never takes pointer input. */
.site-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.site-bg.is-on {
  background: #070914;
}
.site-bg iframe {
  pointer-events: none;
  animation: site-bg-in 1.2s ease both;
}
@keyframes site-bg-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .site-bg iframe { animation: none; }
}
</style>
