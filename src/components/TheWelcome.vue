<script setup>

import { ref, computed } from 'vue'
import { inject, } from 'vue'
// เลือกภาษา
const lang = inject('lang')

 const content = {
  th: {
    Co: 'พีเอ็นเจ เทคโนโลยี',
    main_head: 'พอร์ตโฟลิโอ ด้านเทคนิค',
    main_content: 'พีเอ็นเจ เทคฯ',
    main_desc: 'ยินดีต้อนรับสู่ PNJ Tech — เราพัฒนาระบบครบวงจรด้วยทีม Full-Stack ที่ดูแลตั้งแต่ต้นจนจบ มุ่งเน้นคุณภาพและความเสถียร เพื่อส่งมอบบริการแบบ One-Stop Service ที่ใช้งานได้จริงและต่อเนื่อง',
  },
  en: {
    Co: 'PNJ Tech',
    lang: 'Switch To Thai',
    main_head: 'PORTFOLIO TECHNICAL',
    main_content: 'PNJ Tech',
    main_desc: 'Welcome to PNJ Tech — We develop end-to-end systems with a full-stack team that handles every stage of the process. We focus on quality and stability to deliver a true, seamless one-stop service that works reliably.',
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
  font-family: 'Bowlby One SC', cursive;
}
</style>