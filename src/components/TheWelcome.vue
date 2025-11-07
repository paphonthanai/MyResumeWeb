<script setup>

import { ref, computed } from 'vue'
import { inject, } from 'vue'
// เลือกภาษา
const lang = inject('lang')

 const content = {
  th: {
    Co: 'พีเอ็นเจ เทคโนโลยี',
    main_head: 'ด้านเทคนิค',
    main_content: 'พอร์ตฟอลิโอ',
    main_desc: 'ยินดีต้อนรับสู่ NPJ Tech — พอร์ตโฟลิโอที่สะอาดตา สร้างขึ้นด้วย Vue, Tailwind และ UX ที่ใช้งานจริง ไม่มีลูกเล่น',
  },
  en: {
    Co: 'PNJ Tech',
    lang: 'Switch To Thai',
    main_head: 'TECHNICAL',
    main_content: 'PORTFOLIO',
    main_desc: 'Welcome to NPJ Tech — A clean portfolio built with Vue, Tailwind and real-world UX. No gimmicks.',
  },
}

const t = computed(() => content[lang.value])

</script>

<template>
  <section class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 px-6 md:px-20 rounded-md shadow-md hover:shadow-sky-500/5">
    <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      
      <!-- Text Zone -->
      <div class="w-full md:w-1/2 text-white space-y-6">
        <h2 class="text-lg tracking-widest text-gray-400">{{ t.main_head }}</h2>
        <h1 class="text-5xl md:text-6xl font-extrabold font-bowlby leading-tight">
          {{ t.main_content}}
        </h1>
        <div class="h-1 w-24 bg-gray-500 mt-2"></div>
        <p class="text-lg text-gray-300">
          {{ t.main_desc }}
        </p>
      </div>

      <!-- Image Zone -->
      <div class="w-full md:w-1/2 group">
  <img
    src="./image/Me_cartoon.png"
    alt="profile"
    class="w-[280px] md:w-[300px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] mx-auto group-hover:hidden"
  />
  <img
    src="./image/Me2.png" 
    alt="profile-hover"
    class="w-[280px] md:w-[300px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] mx-auto hidden group-hover:block"
  />
</div>
    </div>
  </section>

  
</template>

<style scoped>
h1 {
  font-family: 'Bowlby One SC', cursive;
}
</style>