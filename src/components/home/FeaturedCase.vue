<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { vReveal } from '../../utils/reveal'
import dashboard from '../image/Project/transport/tms-dashboard.webp'
import driver from '../image/Project/transport/tms-driver.webp'
import login from '../image/Project/transport/tms-login.webp'

// The flagship case on the homepage: the large transport management system,
// a real client system in daily use. Screens are the system's own (dummy data).
const lang = inject('lang')
const en = computed(() => lang.value === 'en')

const t = computed(() =>
  en.value
    ? {
        kicker: 'Featured work · In daily use',
        title: 'A large-scale transport management system',
        accent: 'transport management',
        lede: 'A 10-wheel truck operator ran jobs in one program and billing in another. We built one platform for creating jobs, dispatching drivers, calculating totals and billing, plus a driver app on their phones.',
        before: 'Before',
        beforeText: '2 separate programs: jobs here, billing there',
        after: 'After',
        afterText: 'One platform: create · dispatch · calculate · bill',
        points: [
          ['Web platform', 'Office staff run jobs, documents, payroll and billing in one place'],
          ['Driver app', 'Drivers see assigned jobs and trip pay on their phones'],
          ['Live dashboard', 'Jobs waiting, on the road, awaiting POD and done, with revenue at a glance'],
        ],
        screens: ['Operations dashboard', 'Driver app', 'Sign-in'],
        read: 'Read the case study',
        talk: 'Talk about your system',
      }
    : {
        kicker: 'ผลงานเด่น · ใช้งานจริงทุกวัน',
        title: 'ระบบบริหารจัดการงานขนส่งขนาดใหญ่',
        accent: 'งานขนส่ง',
        lede: 'ลูกค้าธุรกิจรถบรรทุก 10 ล้อ เคยต้องออกงานในโปรแกรมหนึ่ง แล้วไปวางบิลอีกโปรแกรมหนึ่ง เราสร้างแพลตฟอร์มเดียวที่รวมการสร้างงาน จ่ายงานให้คนขับ คำนวณยอด และวางบิล พร้อมแอปให้คนขับรถดูงานบนมือถือ',
        before: 'ก่อน',
        beforeText: 'โปรแกรม 2 ตัวแยกกัน ออกงานที่หนึ่ง วางบิลอีกที่หนึ่ง',
        after: 'หลัง',
        afterText: 'แพลตฟอร์มเดียว สร้างงาน · จ่ายงาน · คำนวณยอด · วางบิล',
        points: [
          ['เว็บแพลตฟอร์ม', 'เจ้าหน้าที่จัดการงานขนส่ง เอกสารขาย เงินเดือน และวางบิลในที่เดียว'],
          ['แอปคนขับ', 'คนขับรถเห็นงานที่ได้รับมอบหมายและค่าเที่ยวบนมือถือ'],
          ['แดชบอร์ดภาพรวม', 'รอจัดรถ กำลังขนส่ง รอตรวจ POD และส่งเสร็จ พร้อมสรุปรายได้ในหน้าเดียว'],
        ],
        screens: ['แดชบอร์ดภาพรวมการดำเนินงาน', 'แอปพนักงานขับรถ', 'หน้าเข้าสู่ระบบ'],
        read: 'อ่านกรณีศึกษา',
        talk: 'ปรึกษาระบบของคุณ',
      },
)

const parts = computed(() => {
  const { title, accent } = t.value
  const i = title.indexOf(accent)
  return i < 0 ? [title, '', ''] : [title.slice(0, i), accent, title.slice(i + accent.length)]
})
</script>

<template>
  <section id="featured-case" class="featured relative overflow-hidden border-t border-white/5">
    <div class="featured-glow pointer-events-none absolute inset-0" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div v-reveal>
          <p><span class="eyebrow">{{ t.kicker }}</span></p>
          <h2 class="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl" style="text-wrap: balance">
            {{ parts[0] }}<span class="text-primary">{{ parts[1] }}</span>{{ parts[2] }}
          </h2>
          <p class="mt-5 text-base leading-relaxed text-base-content/70 md:text-lg">{{ t.lede }}</p>

          <div class="mt-7 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 p-4">
              <p class="text-xs uppercase tracking-[0.14em] text-base-content/45">{{ t.before }}</p>
              <p class="mt-1.5 text-sm text-white/70">{{ t.beforeText }}</p>
            </div>
            <div class="rounded-2xl border border-primary/40 bg-primary/[0.06] p-4">
              <p class="text-xs uppercase tracking-[0.14em] text-primary/90">{{ t.after }}</p>
              <p class="mt-1.5 text-sm text-white">{{ t.afterText }}</p>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/projects/transportation-management" class="btn btn-shimmer rounded-full border-0 px-7">{{ t.read }} →</RouterLink>
            <RouterLink to="/contact" class="btn-glow">{{ t.talk }}</RouterLink>
          </div>
        </div>

        <!-- Screens: the dashboard in a browser frame, the driver app and sign-in beneath -->
        <div v-reveal="1">
          <figure class="frame">
            <div class="frame-bar" aria-hidden="true"><i></i><i></i><i></i></div>
            <img :src="dashboard" :alt="t.screens[0]" width="1600" height="739" decoding="async" class="block w-full" />
          </figure>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <figure v-for="([src, label], i) in [[driver, t.screens[1]], [login, t.screens[2]]]" :key="i" class="frame">
              <img :src="src" :alt="label" width="1600" height="738" loading="lazy" decoding="async" class="block w-full" />
              <figcaption class="px-3 py-2 text-[11px] text-base-content/55">{{ label }}</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <ul class="mt-12 grid gap-4 md:grid-cols-3">
        <li v-for="([name, body], i) in t.points" :key="name" v-reveal="i" class="card-studio p-6">
          <p class="font-semibold text-white">{{ name }}</p>
          <p class="mt-2 text-sm leading-relaxed text-base-content/65">{{ body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.featured-glow {
  background:
    radial-gradient(45% 50% at 80% 35%, rgba(37, 99, 235, 0.22), transparent 70%),
    radial-gradient(35% 40% at 10% 90%, rgba(118, 33, 176, 0.18), transparent 70%);
}
.frame {
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #111;
  box-shadow: 0 30px 80px -30px rgba(37, 99, 235, 0.45);
}
.frame-bar {
  display: flex;
  gap: 6px;
  padding: 10px 12px;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.frame-bar i {
  width: 9px;
  height: 9px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.18);
}
</style>
