<script setup>
import { computed, inject } from 'vue'
import { vFade } from '../../utils/fade'
import AnimatedText from './AnimatedText.vue'
import ContactButton from './ContactButton.vue'
import robot from '../image/work/robot-arm-red-t.webp'
import board from '../image/work/pcb-solder-t.webp'
import cctv from '../image/work/cctv-mount-t.webp'
import mascot from '../image/work/design-mascot-t.webp'

const lang = inject('lang')

const content = {
  th: {
    title: 'เกี่ยวกับผม',
    body: 'ด้วยประสบการณ์พัฒนาซอฟต์แวร์มากกว่าห้าปี ผมออกแบบเว็บ แอป และระบบหลังบ้านจากปัญหาการใช้งานจริง และยังลงมือติดตั้งกล้องวงจรปิด ซ่อมฮาร์ดแวร์ และสร้างหุ่นยนต์ด้วยตัวเอง ผมชอบทำงานกับธุรกิจที่อยากได้ระบบที่ช่วยงานได้จริง มาสร้างสิ่งที่ใช้งานได้จริงไปด้วยกันครับ!',
  },
  en: {
    title: 'About me',
    body: "With more than five years of software development experience, I design websites, apps and back-office systems around real usage problems, and I get hands-on with CCTV installs, hardware repair and robotics too. I enjoy working with businesses that want systems that actually do the job. Let's build something that works, together!",
  },
}
const t = computed(() => content[lang.value])

// Corner photos from the work gallery, each tilted a little. The tilt sits on
// the image itself: v-fade animates the wrapper's transform and would undo it.
const corners = [
  { src: robot, cls: 'left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]', rot: '-rotate-6', fade: { delay: 0.1, x: -80, y: 0, duration: 0.9 } },
  { src: board, cls: 'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]', rot: 'rotate-6', fade: { delay: 0.25, x: -80, y: 0, duration: 0.9 } },
  { src: cctv, cls: 'right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]', rot: 'rotate-6', fade: { delay: 0.15, x: 80, y: 0, duration: 0.9 } },
  { src: mascot, cls: 'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]', rot: '-rotate-3', fade: { delay: 0.3, x: 80, y: 0, duration: 0.9 } },
]
</script>

<template>
  <section id="about" class="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10">
    <div v-for="(c, i) in corners" :key="i" v-fade="c.fade" class="pointer-events-none absolute" :class="c.cls" aria-hidden="true">
      <img :src="c.src" alt="" loading="lazy" :class="c.rot" class="aspect-[4/5] w-full rounded-3xl object-cover opacity-80 shadow-2xl shadow-black/60" />
    </div>

    <div class="relative flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
      <div class="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <h2 v-fade="{ delay: 0, y: 40 }" class="studio-heading text-center font-black uppercase leading-none tracking-tight" style="font-size: clamp(3rem, 12vw, 160px)">
          {{ t.title }}
        </h2>
        <AnimatedText
          :text="t.body"
          class="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style="font-size: clamp(1rem, 2vw, 1.35rem)"
        />
      </div>
      <ContactButton />
    </div>
  </section>
</template>
