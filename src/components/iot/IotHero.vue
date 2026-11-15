<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import handVideo from '../image/video/iot-hand.mp4'
import handPoster from '../image/video/iot-hand.webp'

// Full-screen video hero: a centred two-pill nav, and a short headline with
// a pill CTA in the bottom-left corner. Layout adapted from a hero design on
// motionsites.ai, in the site's dark palette with our own robot-hand clip.
const lang = inject('lang')
const en = computed(() => lang.value === 'en')
const home = computed(() => (en.value ? '/en' : '/'))
const toggleLang = () => { lang.value = en.value ? 'th' : 'en' }

const t = computed(() =>
  en.value
    ? {
        nav: [
          { label: 'Home', to: home.value },
          { label: 'Projects', to: `${home.value}#projects` },
          { label: 'Lab', to: `${home.value}#lab` },
          { label: 'Contact', to: '#inquiry' },
        ],
        badge: 'A robot hand from our R&D bench',
        title: 'IoT, robot arms and robots, designed and built by hand.',
        sub: 'Ready to grow into a system for your business.',
        cta: 'Plan an IoT project',
      }
    : {
        nav: [
          { label: 'หน้าแรก', to: home.value },
          { label: 'ผลงาน', to: `${home.value}#projects` },
          { label: 'Lab', to: `${home.value}#lab` },
          { label: 'ติดต่อ', to: '#inquiry' },
        ],
        badge: 'มือหุ่นยนต์ต้นแบบจากห้อง R&D',
        title: 'ระบบ IoT แขนกล และหุ่นยนต์ ที่ออกแบบและสร้างเองทุกชิ้น',
        sub: 'พร้อมต่อยอดเป็นระบบสำหรับธุรกิจของคุณ',
        cta: 'ปรึกษาโปรเจกต์ IoT',
      },
)
</script>

<template>
  <section class="relative min-h-[100svh] overflow-hidden bg-[#0c0c0c]">
    <!-- Background: the clip's own frame, blurred, behind the sharp video -->
    <img :src="handPoster" alt="" class="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" aria-hidden="true" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-[#0c0c0c]/60" aria-hidden="true"></div>

    <!-- Phone: the portrait clip fills the screen. Desktop: a tall framed clip on the right. -->
    <video
      :src="handVideo"
      :poster="handPoster"
      class="hero-video absolute inset-0 h-full w-full object-cover md:inset-auto md:right-[8vw] md:top-1/2 md:h-[78vh] md:w-auto md:-translate-y-1/2 md:rounded-[2rem] md:border md:border-white/10 md:shadow-[0_40px_120px_-30px_rgba(182,0,168,0.6)]"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    ></video>
    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 md:hidden" aria-hidden="true"></div>

    <div class="relative z-10 flex min-h-[100svh] flex-col">
      <nav class="flex items-center justify-center gap-2 px-4 pt-4 sm:gap-3 sm:px-8 sm:pt-6" aria-label="Main">
        <RouterLink :to="home" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md sm:h-11 sm:w-11" :aria-label="en ? 'Home' : 'หน้าแรก'">
          <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <polygon fill="#fff" points="20,4 23.5,14.5 34,11.5 27,20 34,28.5 23.5,25.5 20,36 16.5,25.5 6,28.5 13,20 6,11.5 16.5,14.5" />
          </svg>
        </RouterLink>
        <div class="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-md sm:gap-10 sm:px-8 sm:py-3">
          <RouterLink
            v-for="item in t.nav"
            :key="item.label"
            :to="item.to"
            class="text-[12px] font-medium text-white/75 transition-colors duration-200 hover:text-white sm:text-[14px]"
          >{{ item.label }}</RouterLink>
          <button type="button" class="text-[12px] font-medium text-white/50 transition-colors hover:text-white sm:text-[14px]" @click="toggleLang">{{ en ? 'TH' : 'EN' }}</button>
        </div>
      </nav>

      <div class="flex flex-1 items-end px-6 pb-10 sm:px-12 sm:pb-16 md:px-20 lg:px-28 lg:pb-20">
        <div class="max-w-sm">
          <a href="#work" class="group mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#d0b2ff] transition-colors hover:text-white">
            {{ t.badge }}
            <span class="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
          <h1 class="mb-3 text-[1.6rem] font-semibold leading-[1.2] tracking-tight text-white sm:text-[2rem]" style="text-wrap: balance">{{ t.title }}</h1>
          <p class="mb-4 text-[14px] text-white/55">{{ t.sub }}</p>
          <a
            href="#inquiry"
            class="group inline-flex items-center gap-2 rounded-full border border-[#d0b2ff] px-5 py-2.5 text-[13px] font-medium text-[#d0b2ff] transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
          >
            {{ t.cta }}
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .hero-video { aspect-ratio: 9 / 16; }
}
</style>
