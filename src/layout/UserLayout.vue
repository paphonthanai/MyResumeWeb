<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, provide } from 'vue'
import logoGold from '@/components/image/NewLogo_Gold.png'

const route = useRoute()
// Initial language follows the route (e.g. "/en" prerenders in English for
// crawlers); the toggle button below still flips it client-side after that.
const lang = ref(route.meta.lang === 'en' ? 'en' : 'th')
provide('lang', lang)
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <header class="navbar sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur-md px-4 md:px-10">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 w-56 gap-1 rounded-box border border-base-300 bg-base-200 p-3 shadow-xl z-20">
            <li><RouterLink to="/" class="brand-nav-link">Home</RouterLink></li>
            <li><RouterLink to="/#portfolio" class="brand-nav-link">Portfolio</RouterLink></li>
            <li><RouterLink to="/#project" class="brand-nav-link">Project</RouterLink></li>
            <li><RouterLink to="/about" class="brand-nav-link">About</RouterLink></li>
            <li><RouterLink to="/blog" class="brand-nav-link">Blog</RouterLink></li>
            <li><RouterLink to="/#contact" class="brand-nav-link">Contact</RouterLink></li>
          </ul>
        </div>
        <RouterLink to="/" class="flex items-center gap-3 pl-1">
          <img :src="logoGold" alt="PNJ Tech" width="50" height="32" class="h-8 w-auto shrink-0" />
          <span class="hidden sm:block font-display text-xl tracking-[0.15em] text-base-content">
            PNJ <span class="text-primary">TECH</span>
          </span>
        </RouterLink>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="flex items-center gap-8 text-sm uppercase tracking-[0.12em]">
          <li><RouterLink to="/" class="brand-nav-link">Home</RouterLink></li>
          <li><RouterLink to="/#portfolio" class="brand-nav-link">Portfolio</RouterLink></li>
          <li><RouterLink to="/#project" class="brand-nav-link">Project</RouterLink></li>
          <li><RouterLink to="/about" class="brand-nav-link">About</RouterLink></li>
          <li><RouterLink to="/blog" class="brand-nav-link">Blog</RouterLink></li>
          <li><RouterLink to="/#contact" class="brand-nav-link">Contact</RouterLink></li>
        </ul>
      </div>

      <div class="navbar-end">
        <button
          @click="lang = lang === 'th' ? 'en' : 'th'"
          class="btn btn-sm rounded-full border border-primary/70 bg-transparent px-4 text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-content"
        >
          {{ lang === 'th' ? 'EN' : 'TH' }}
        </button>
      </div>
    </header>

    <slot></slot>

    <footer class="border-t border-base-300 bg-base-100">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <div class="flex flex-col items-center gap-6 text-center">
          <img :src="logoGold" alt="PNJ Tech" width="63" height="40" class="h-10 w-auto" />
          <div>
            <p class="font-display text-lg tracking-[0.15em] text-base-content">PNJ <span class="text-primary">TECH</span></p>
            <p class="mt-1 text-sm text-base-content/60">Freelance software development</p>
          </div>
          <div class="flex items-center gap-4">
            <a
              href="https://github.com/paphonthanai"
              target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content/70 transition hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="fill-current">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/"
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content/70 transition hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="fill-current">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.75s.784-1.75 1.75-1.75 1.75.787 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.271h-3v-4.5c0-1.074-.021-2.458-1.5-2.458s-1.731 1.174-1.731 2.382v4.576h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.561 2.839-1.561 3.033 0 3.591 1.996 3.591 4.59v4.738z"></path>
              </svg>
            </a>
          </div>
          <p class="text-xs text-base-content/40">© {{ new Date().getFullYear() }} PNJ Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.brand-nav-link {
  position: relative;
  color: rgb(var(--fallback-bc, 234 231 214) / 0.75);
  transition: color 0.2s ease;
  padding-bottom: 0.25rem;
}
.brand-nav-link:hover {
  color: #d4af37;
}
.brand-nav-link.router-link-exact-active {
  color: #d4af37;
}
.brand-nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: #d4af37;
}
</style>
