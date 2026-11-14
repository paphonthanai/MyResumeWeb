<script setup>
import { computed, inject } from 'vue'
import { vFade } from '../../utils/fade'

const lang = inject('lang')

const content = {
  th: {
    title: 'บริการ',
    services: [
      { name: 'เว็บแพลตฟอร์มและระบบองค์กร', desc: 'แดชบอร์ดหลายบทบาท อัปเดตเรียลไทม์ พร้อมระบบสิทธิ์และกฎความปลอดภัยด้วย Vue.js + Firebase' },
      { name: 'แอปพลิเคชันมือถือ', desc: 'แอปองค์กรด้วย Flutter + Dart ฟอร์มแบบเป็นขั้นตอน เข้าใช้งานผ่าน OTP พร้อมใช้งานจริง' },
      { name: 'API และระบบ Backend', desc: 'ออกแบบ API เชื่อมต่อระบบภายนอก เช่น ธนาคาร ปรับประสิทธิภาพและความปลอดภัยสำหรับระบบขนาดใหญ่' },
      { name: 'Security, DevOps และที่ปรึกษา', desc: 'วิเคราะห์ช่องโหว่ ตั้งค่า CI/CD ให้ปล่อยงานได้ไม่สะดุด และให้คำปรึกษา/อบรมทีมภายใน' },
      { name: 'แก้ไข/พัฒนาโปรแกรม TrainModel MML', desc: 'รับแก้ไข ปรับปรุง และพัฒนาต่อยอดโปรแกรม TrainModel MML ตามความต้องการใช้งาน' },
      { name: 'ออกแบบและผลิตหุ่นยนต์', desc: 'ออกแบบและผลิตหุ่นยนต์ ตั้งแต่แนวคิด ระบบควบคุม ไปจนถึงชิ้นงานที่ใช้งานได้จริง' },
      { name: 'คอร์สสอน/อบรมเทคโนโลยี', desc: 'จัดคอร์สสอนและอบรมด้านเทคโนโลยีและการเขียนโปรแกรม สำหรับบุคคลและทีมงานองค์กร' },
    ],
  },
  en: {
    title: 'Services',
    services: [
      { name: 'Web platforms & internal systems', desc: 'Multi-role dashboards with real-time updates, permissions and security rules, built with Vue.js + Firebase.' },
      { name: 'Mobile applications', desc: 'Organization apps in Flutter + Dart: step-by-step forms, OTP sign-in, ready for real use.' },
      { name: 'APIs & backend', desc: 'APIs that integrate external systems such as banks, tuned for performance and security at scale.' },
      { name: 'Security, DevOps & consulting', desc: 'Vulnerability analysis, CI/CD for smooth deployments, plus technical consulting and team training.' },
      { name: 'TrainModel MML development', desc: 'Fixing, improving and extending the TrainModel MML program to fit your needs.' },
      { name: 'Robotics design & fabrication', desc: 'Designing and building robots — from concept and control systems to working hardware.' },
      { name: 'Technology & programming courses', desc: 'Courses and training in technology and programming, for individuals and organization teams.' },
    ],
  },
}
const t = computed(() => content[lang.value])
const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="services" class="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
    <h2 v-fade="{ y: 40 }" class="mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style="font-size: clamp(3rem, 12vw, 160px)">
      {{ t.title }}
    </h2>

    <ol class="mx-auto max-w-5xl">
      <li
        v-for="(s, i) in t.services"
        :key="i"
        v-fade="{ delay: i * 0.1 }"
        class="flex items-start gap-6 border-b py-8 first:border-t sm:gap-10 sm:py-10 md:gap-14 md:py-12"
        style="border-color: rgba(12, 12, 12, 0.15)"
      >
        <span class="shrink-0 font-black tabular-nums leading-none" style="font-size: clamp(3rem, 10vw, 140px)">{{ pad(i) }}</span>
        <div class="flex flex-col gap-2 pt-1 sm:gap-3 md:pt-3">
          <h3 class="font-medium uppercase" style="font-size: clamp(1rem, 2.2vw, 2.1rem)">{{ s.name }}</h3>
          <p class="max-w-2xl font-light leading-relaxed opacity-60" style="font-size: clamp(0.85rem, 1.6vw, 1.25rem)">{{ s.desc }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
