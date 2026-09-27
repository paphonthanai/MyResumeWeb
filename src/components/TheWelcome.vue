<script setup>

import { ref, computed } from 'vue'
import { inject, } from 'vue'
// เลือกภาษา
const lang = inject('lang')

 const content = {
  th: {
    tagline: 'คุณมีระบบที่คนใช้จริง หรือแค่เว็บที่ดูดี',
    heroTitleLine1: 'เว็บสวยไม่พอ',
    heroTitleLine2: 'ถ้าระบบไม่ตอบโจทย์ธุรกิจ',
    heroDesc: 'ผมออกแบบเว็บและระบบจากปัญหาการใช้งานจริง เพื่อให้สามารถดูแลต่อ ขยายได้ และเติบโตไปพร้อมธุรกิจ',
    ctaButton: 'ปรึกษาโปรเจกต์',
  },
  en: {
    tagline: 'Do you have a system people actually use, or just a nice-looking website?',
    heroTitleLine1: "A pretty website isn't enough",
    heroTitleLine2: "if it doesn't solve your business problem",
    heroDesc: 'I design websites and systems around real usage problems, so they stay maintainable, scale, and grow together with your business.',
    ctaButton: 'Discuss your project',
  },
}

const t = computed(() => content[lang.value])

</script>

<template>
  <section class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 px-6 md:px-20 rounded-md shadow-md hover:shadow-sky-500/5">
    <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      
      <!-- Text Zone -->
      <div class="w-full md:w-1/2 text-white space-y-6">
        <!-- Tagline, not a heading — the page's h1 is below -->
        <p class="text-lg tracking-widest text-gray-400">
          {{ t.tagline }}
        </p>

        <h1 class="text-5xl md:text-6xl font-extrabold font-bowlby leading-tight">
          {{ t.heroTitleLine1 }} <br>
          {{ t.heroTitleLine2 }}
        </h1>

        <div class="h-1 w-24 bg-gray-500 mt-2"></div>
        <p class="text-lg text-gray-300 max-w-xl">
          {{ t.heroDesc }}
        </p>
        <button class="mt-6 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md">
          {{ t.ctaButton }}
        </button>
      </div>

      <!-- Image Zone -->
      <div class="w-full md:w-1/2 group">
  <img
    src="./image/NewLogo_4_2.png"
    alt="profile"
    class="w-[280px] md:w-[300px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] mx-auto group-hover:hidden"
  />
  <img
    src="./image/NewLogo_4_2.png" 
    alt="profile-hover"
    class="w-[280px] md:w-[300px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] mx-auto hidden group-hover:block"
  />
</div>
    </div>
  </section>

  
</template>

<style scoped>
h1 {
  font-family: 'varela round', sans-serif;
}
</style>