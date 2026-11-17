<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, provide, watch } from 'vue'
import logo from '@/components/image/NewLogo_Gold.png'

// theme: a daisyUI theme for this page only (the site default, set on <html>, is "studio").
// bare: the page draws its own navigation, so the shared header is left out.
const props = defineProps({
  theme: { type: String, default: undefined },
  bare: { type: Boolean, default: false },
})

const route = useRoute()
// Initial language follows the route (e.g. "/en" prerenders in English for
// crawlers); the toggle button below still flips it client-side after that.
const lang = ref(route.meta.lang === 'en' ? 'en' : 'th')
provide('lang', lang)

const menuOpen = ref(false)
watch(() => route.fullPath, () => { menuOpen.value = false })

const en = computed(() => lang.value === 'en')
const home = computed(() => (en.value ? '/en' : '/'))
// Every page, for the footer and the phone menu; `top` ones also sit in the desktop header.
const nav = computed(() => [
  { label: en.value ? 'Home' : 'หน้าแรก', to: home.value, top: true },
  { label: en.value ? 'Projects' : 'ผลงาน', to: '/projects', top: true },
  { label: 'Lab', to: '/lab' },
  { label: en.value ? 'Gallery' : 'แกลเลอรี', to: '/gallery', top: true },
  { label: en.value ? 'Skills' : 'ทักษะ', to: '/skills', top: true },
  { label: en.value ? 'Process' : 'ขั้นตอนการทำงาน', to: '/process' },
  { label: en.value ? 'Pricing' : 'ราคา', to: '/pricing', top: true },
  { label: 'IoT', to: '/iot', top: true },
  { label: en.value ? 'Website Builder' : 'สร้างเว็บไซต์', to: en.value ? '/en/website-builder' : '/website-builder', top: true },
  { label: en.value ? 'About' : 'เกี่ยวกับ', to: '/about' },
  { label: en.value ? 'Blog' : 'บทความ', to: '/blog', top: true },
])
const topNav = computed(() => nav.value.filter((i) => i.top))
// The Website Builder and Pricing pages have their own inquiry form; elsewhere go to Pricing's.
const contactTo = computed(() => (route.path.includes('website-builder') || route.path === '/pricing' ? '#inquiry' : '/pricing#inquiry'))
const isActive = (to) => !to.includes('#') && route.path === to
</script>

<template>
  <div class="min-h-screen bg-base-100" :data-theme="props.theme">
    <header v-if="!props.bare" class="sticky top-0 z-30 border-b border-white/5 bg-base-100/80 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:h-[72px] md:px-8">
        <RouterLink :to="home" class="flex shrink-0 items-center gap-2.5">
          <img :src="logo" alt="PNJ Tech" width="50" height="32" class="logo-silver h-7 w-auto" />
          <span class="text-lg font-semibold tracking-tight text-white">PNJ<span class="font-light text-base-content/60"> tech</span></span>
        </RouterLink>

        <nav class="ml-4 hidden xl:block" aria-label="Main">
          <ul class="flex items-center gap-1 text-sm">
            <li v-for="item in topNav" :key="item.to">
              <RouterLink
                :to="item.to"
                class="rounded-full px-3.5 py-2 transition"
                :class="isActive(item.to) ? 'bg-white/10 text-white' : 'text-base-content/60 hover:text-white'"
              >{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex items-center gap-2">
          <button
            type="button"
            class="h-9 rounded-full border border-white/10 px-3.5 text-xs font-medium uppercase tracking-widest text-base-content/80 transition hover:border-white/30 hover:text-white"
            @click="lang = en ? 'th' : 'en'"
          >
            {{ en ? 'TH' : 'EN' }}
          </button>
          <!-- Members: PNJ Created Website customers' back office. Signed-in
               users are sent on to their dashboard by the login page. -->
          <RouterLink
            :to="`/app/login?mode=login&lang=${lang}`"
            :aria-label="en ? 'Members: sign in to PNJ Created Website' : 'สมาชิก เข้าสู่ระบบ PNJ Created Website'"
            :title="en ? 'Members' : 'สมาชิก'"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-base-content/80 transition hover:border-white/30 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </RouterLink>
          <RouterLink :to="contactTo" class="hidden h-9 items-center rounded-full bg-[#2a2a2a] px-5 text-sm font-medium text-white transition hover:bg-[#363636] sm:inline-flex">
            {{ en ? 'Contact' : 'ติดต่อ' }}
          </RouterLink>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a2a2a] text-white xl:hidden"
            :aria-expanded="menuOpen"
            aria-controls="site-menu"
            :aria-label="en ? 'Menu' : 'เมนู'"
            @click="menuOpen = !menuOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4" aria-hidden="true">
              <path v-if="menuOpen" stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
              <path v-else stroke-linecap="round" d="M5 9h14M5 15h14" />
            </svg>
          </button>
        </div>
      </div>

      <nav v-show="menuOpen" id="site-menu" class="border-t border-white/5 px-4 pb-5 pt-3 xl:hidden" aria-label="Main">
        <ul class="grid gap-1 sm:grid-cols-2">
          <li v-for="item in nav" :key="item.to">
            <RouterLink :to="item.to" class="block rounded-2xl px-4 py-3 text-base text-base-content/80 hover:bg-white/5 hover:text-white">{{ item.label }}</RouterLink>
          </li>
          <li>
            <RouterLink :to="contactTo" class="mt-2 block rounded-full bg-[#2a2a2a] px-4 py-3 text-center text-white">{{ en ? 'Contact' : 'ติดต่อ' }}</RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <slot></slot>

    <footer class="relative overflow-hidden border-t border-white/5 bg-base-100">
      <div class="mx-auto max-w-7xl px-6 pb-6 pt-16 md:px-8">
        <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div class="max-w-sm">
            <div class="flex items-center gap-2.5">
              <img :src="logo" alt="PNJ Tech" width="50" height="32" class="logo-silver h-8 w-auto" />
              <span class="text-lg font-semibold text-white">PNJ<span class="font-light text-base-content/60"> tech</span></span>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-base-content/55">
              {{ en ? 'Freelance software development — web, mobile, networks and robotics.' : 'พัฒนาซอฟต์แวร์แบบฟรีแลนซ์ ตั้งแต่เว็บ แอปมือถือ ระบบเครือข่าย ไปจนถึงหุ่นยนต์' }}
            </p>
          </div>

          <ul class="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            <li v-for="item in nav" :key="item.to">
              <RouterLink :to="item.to" class="text-base-content/60 transition hover:text-white">{{ item.label }}</RouterLink>
            </li>
          </ul>

          <div class="flex items-center gap-3">
            <a
              v-for="fb in [
                ['https://www.facebook.com/Paphonthanai.name', 'Facebook: Cyber Sage (ปราชญ์ไซเบอร์)'],
                ['https://www.facebook.com/profile.php?id=61552101745680', 'Facebook: PNJ Tech'],
              ]"
              :key="fb[0]"
              :href="fb[0]"
              target="_blank" rel="noopener noreferrer" :aria-label="fb[1]" :title="fb[1].replace('Facebook: ', '')"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-base-content/70 transition hover:border-white/30 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="fill-current" aria-hidden="true">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>
              </svg>
            </a>
            <a
              href="https://github.com/paphonthanai"
              target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-base-content/70 transition hover:border-white/30 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="fill-current">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/"
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-base-content/70 transition hover:border-white/30 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="fill-current">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.75s.784-1.75 1.75-1.75 1.75.787 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.271h-3v-4.5c0-1.074-.021-2.458-1.5-2.458s-1.731 1.174-1.731 2.382v4.576h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.561 2.839-1.561 3.033 0 3.591 1.996 3.591 4.59v4.738z"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Oversized wordmark along the bottom edge -->
        <p class="studio-heading mt-14 select-none text-center text-[22vw] font-black leading-[0.8] tracking-tighter md:text-[16vw]" aria-hidden="true">PNJ TECH</p>
        <p class="mt-6 text-center text-xs text-base-content/40">© {{ new Date().getFullYear() }} PNJ Tech. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* The gold logo, rendered silver to sit with the studio palette */
.logo-silver {
  filter: grayscale(1) brightness(1.7) contrast(1.05);
}
</style>
