<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

const route = useRoute()

const siteUrl = 'https://myresume-ae906.web.app'
const defaultTitle = 'ปพนธนัย ใจมา (PNJ Tech) | Fullstack Developer Portfolio'
const defaultDescription = 'พอร์ตโฟลิโอและเรซูเม่ของปพนธนัย ใจมา (PNJ Tech) นักพัฒนาซอฟต์แวร์ฟรีแลนซ์ ประสบการณ์กว่า 5 ปี พัฒนาเว็บและแอปด้วย Vue.js, Flutter, Firebase, PHP รวมผลงานจริงและทักษะด้าน Security/CTF'
const ogImage = `${siteUrl}/favicon.ico`

const title = computed(() => route.meta.title || defaultTitle)
const description = computed(() => route.meta.description || defaultDescription)
const canonicalUrl = computed(() => siteUrl + (route.path === '/' ? '/' : route.path))

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

// "/" (th) and "/en" belong to the same hreflang group — tell crawlers
// they're language alternates of one page. AboutView has no group, so it
// gets no hreflang links (there's only one language for that page).
const linkTags = computed(() => {
  const links = [{ rel: 'canonical', href: canonicalUrl.value }]
  if (route.meta.hreflangGroup === 'home') {
    links.push(
      { rel: 'alternate', hreflang: 'th', href: `${siteUrl}/` },
      { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en` },
      { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` },
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
    { name: 'twitter:card', content: 'summary' },
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
  <div class="">
    <RouterView />
  </div>
</template>
