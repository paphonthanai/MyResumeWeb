<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, provide } from 'vue'
import logoGold from '@/components/image/NewLogo_Gold.png'
import { content } from '../content/home'

const route = useRoute()
// Initial language follows the route (e.g. "/en" prerenders in English for
// crawlers); the toggle button below still flips it client-side after that.
const lang = ref(route.meta.lang === 'en' ? 'en' : 'th')
provide('lang', lang)

const t = computed(() => content[lang.value])
// Anchor links stay on the home page of the current language.
const home = computed(() => (lang.value === 'en' ? '/en' : '/'))
const nav = computed(() => [
  ['products', t.value.nav.products],
  ['solutions', t.value.nav.solutions],
  ['hardware', t.value.nav.hardware],
  ['work', t.value.nav.work],
  ['pricing', t.value.nav.pricing],
])
</script>

<template>
  <div class="min-h-screen bg-pnj-bg font-plex text-pnj-text antialiased">
    <slot name="banner"></slot>

    <header class="sticky top-0 z-30 border-b border-pnj-line bg-pnj-bg/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-7 gap-y-2 px-6 py-3.5">
        <RouterLink :to="home" class="flex items-center gap-2.5 text-pnj-text">
          <img :src="logoGold" alt="PNJ Tech" width="34" height="34" class="h-[34px] w-[34px] object-contain" />
          <span class="font-mono text-[15px] font-medium tracking-[0.12em]">PNJ TECH</span>
        </RouterLink>

        <nav class="order-last -mx-1 flex w-full gap-5 overflow-x-auto px-1 text-[15px] lg:order-none lg:mx-0 lg:w-auto lg:flex-1 lg:overflow-visible lg:px-0" aria-label="Main">
          <RouterLink v-for="[id, label] in nav" :key="id" :to="{ path: home, hash: '#' + id }" class="whitespace-nowrap text-pnj-text2 transition-colors hover:text-pnj-gold">{{ label }}</RouterLink>
        </nav>

        <div class="ml-auto flex items-center gap-3.5 text-sm lg:ml-0">
          <button
            type="button"
            class="font-mono text-pnj-muted transition-colors hover:text-pnj-gold"
            :aria-label="lang === 'th' ? 'Switch to English' : 'สลับเป็นภาษาไทย'"
            @click="lang = lang === 'th' ? 'en' : 'th'"
          >
            <span :class="lang === 'th' ? 'text-pnj-gold' : ''">TH</span> / <span :class="lang === 'en' ? 'text-pnj-gold' : ''">EN</span>
          </button>
          <RouterLink :to="`/app/login?mode=login&lang=${lang}`" class="text-pnj-text transition-colors hover:text-pnj-gold">{{ t.login }}</RouterLink>
          <RouterLink :to="{ path: home, hash: '#contact' }" class="rounded-md bg-pnj-gold px-4 py-2 font-semibold text-pnj-ongold transition-colors hover:bg-pnj-goldhi">{{ t.cta }}</RouterLink>
        </div>
      </div>
    </header>

    <slot></slot>

    <footer class="border-t border-pnj-line">
      <div class="mx-auto grid max-w-[1240px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-2.5">
            <img :src="logoGold" alt="PNJ Tech" width="28" height="28" class="h-7 w-7 object-contain" />
            <span class="font-mono text-sm font-medium tracking-[0.12em]">PNJ TECH</span>
          </div>
          <p class="mt-4 text-[15px] leading-[1.7] text-pnj-muted">{{ t.footer.tagline[0] }}<br />{{ t.footer.tagline[1] }}</p>
        </div>
        <div class="flex flex-col gap-2.5 text-[15px]">
          <span class="font-mono text-xs uppercase tracking-[0.14em] text-pnj-faint">{{ t.footer.product }}</span>
          <RouterLink :to="{ path: home, hash: '#products' }" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.productLinks.site }}</RouterLink>
          <RouterLink :to="{ path: home, hash: '#pricing' }" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.productLinks.pricing }}</RouterLink>
        </div>
        <div class="flex flex-col gap-2.5 text-[15px]">
          <span class="font-mono text-xs uppercase tracking-[0.14em] text-pnj-faint">{{ t.footer.services }}</span>
          <RouterLink :to="{ path: home, hash: '#solutions' }" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.serviceLinks.software }}</RouterLink>
          <RouterLink :to="{ path: home, hash: '#hardware' }" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.serviceLinks.hardware }}</RouterLink>
          <RouterLink :to="{ path: home, hash: '#solutions' }" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.serviceLinks.training }}</RouterLink>
        </div>
        <div class="flex flex-col gap-2.5 text-[15px]">
          <span class="font-mono text-xs uppercase tracking-[0.14em] text-pnj-faint">{{ t.footer.company }}</span>
          <RouterLink to="/about" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.companyLinks.founder }}</RouterLink>
          <RouterLink to="/blog" class="text-pnj-text2 hover:text-pnj-gold">{{ t.footer.companyLinks.blog }}</RouterLink>
          <div class="mt-1 flex gap-3">
            <a href="https://github.com/paphonthanai" target="_blank" rel="noopener noreferrer" class="text-pnj-text2 hover:text-pnj-gold">GitHub</a>
            <a href="https://www.facebook.com/Paphonthanai.name" target="_blank" rel="noopener noreferrer" class="text-pnj-text2 hover:text-pnj-gold">Facebook</a>
          </div>
        </div>
      </div>
      <div class="border-t border-pnj-line">
        <p class="mx-auto max-w-[1240px] px-6 py-5 text-[13px] text-[#5E584E]">© {{ new Date().getFullYear() }} PNJ Tech. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
