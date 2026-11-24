<script setup>
import { useHead } from '@unhead/vue'
import UserLayout from '../../layout/UserLayout.vue'
import driverApp from '../../components/image/work/driver-app.webp'
import tmsDashboard from '../../components/image/Project/transport/tms-dashboard.webp'
import tmsDriver from '../../components/image/Project/transport/tms-driver.webp'
import tmsLogin from '../../components/image/Project/transport/tms-login.webp'

// Case study for the transportation management system (formerly listed as
// Grab-Truck), written like a blog post. It lives
// in the repo (not Firestore) so it ships and prerenders with the site.
// The text is the owner's own write-up.
const siteUrl = 'https://myresume-ae906.web.app'

useHead({
  meta: [
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: `${siteUrl}${tmsDashboard}` },
  ],
})

const problems = [
  ['การทำงานแยกออกเป็นสองระบบ', 'การสร้างงานขนส่งและการวางบิลเป็นกระบวนการที่เกี่ยวข้องกัน แต่ต้องดำเนินการผ่านโปรแกรมคนละตัว ทำให้การจัดการข้อมูลและขั้นตอนการทำงานไม่ต่อเนื่องกัน'],
  ['ความซับซ้อนในการบริหารจัดการ', 'เจ้าหน้าที่ต้องทำงานผ่านหลายโปรแกรม ตั้งแต่การสร้างงานไปจนถึงการคำนวณยอดและวางบิล ส่งผลให้กระบวนการทำงานมีหลายขั้นตอน'],
  ['การเชื่อมโยงข้อมูลระหว่างบริษัทกับพนักงานขับรถ', 'การบริหารงานขนส่งไม่ได้มีเพียงเจ้าหน้าที่ภายในสำนักงานเท่านั้น แต่ยังมีพนักงานขับรถซึ่งเป็นส่วนสำคัญของการปฏิบัติงานจริง ลูกค้าจึงต้องการให้พนักงานขับรถสามารถเข้าถึงข้อมูลการมอบหมายงานผ่านโทรศัพท์มือถือได้สะดวกยิ่งขึ้น'],
]

const systems = [
  {
    name: 'Web Platform',
    for: 'สำหรับบริษัทและเจ้าหน้าที่',
    items: [
      'สร้างและบริหารจัดการงานขนส่ง',
      'จัดการข้อมูลการมอบหมายงาน',
      'เชื่อมโยงข้อมูลการขนส่งกับกระบวนการคำนวณยอด',
      'จัดการกระบวนการวางบิลภายในระบบเดียว',
      'ลดความจำเป็นในการสลับใช้งานหลายโปรแกรม',
    ],
  },
  {
    name: 'Mobile Application',
    for: 'สำหรับพนักงานขับรถ',
    items: [
      'รับงานขนส่งที่บริษัทมอบหมาย',
      'ตรวจสอบรายละเอียดงานผ่านโทรศัพท์มือถือ',
      'เชื่อมโยงข้อมูลการมอบหมายงานระหว่างบริษัทกับพนักงานขับรถ',
      'ช่วยให้พนักงานขับรถมีส่วนร่วมในกระบวนการทำงานผ่านระบบดิจิทัล',
    ],
  },
]

const beforeFlow = ['สร้างงานขนส่ง', 'โปรแกรมที่ 1', 'นำข้อมูลไปดำเนินการวางบิลและคำนวณยอดในโปรแกรมที่ 2']
const afterFlow = ['สร้างงานขนส่ง', 'มอบหมายงานให้พนักงานขับรถผ่านมือถือ', 'จัดการข้อมูลและคำนวณยอด', 'วางบิลภายในแพลตฟอร์มเดียว']
</script>

<template>
  <UserLayout>
    <div class="mx-auto max-w-3xl px-6 py-16 md:px-10">
      <article>
        <RouterLink to="/" class="text-sm text-base-content/50 transition hover:text-white">← กลับหน้าแรก</RouterLink>
        <p class="mt-8"><span class="eyebrow">Project Case Study · Transportation</span></p>
        <h1 class="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl" style="text-wrap: balance">
          ระบบบริหารจัดการงานขนส่งขนาดใหญ่
        </h1>
        <p class="mt-4 text-lg leading-relaxed text-base-content/70 md:text-xl">เว็บแพลตฟอร์มและแอปมือถือสำหรับบริหารงานขนส่งและงานภายในองค์กร ของธุรกิจรถบรรทุก 10 ล้อ</p>
        <ul class="mt-6 flex flex-wrap gap-2 text-xs">
          <li v-for="tag in ['Web Application', 'Mobile App', 'Custom Software']" :key="tag" class="rounded-full border border-white/15 px-3 py-1 text-white/80">{{ tag }}</li>
        </ul>

        <!-- At a glance: the two programs the customer had, and the one platform that replaced them -->
        <div class="mt-10 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <div class="card-studio p-5">
            <p class="text-xs uppercase tracking-[0.14em] text-base-content/45">ปัญหาของลูกค้า</p>
            <div class="mt-4 grid gap-3">
              <div v-for="[name, text] in [['โปรแกรมที่ 1', 'สร้างงานขนส่งและออกใบงาน'], ['โปรแกรมที่ 2', 'คำนวณยอดและวางบิล']]" :key="name" class="rounded-xl border border-white/10 px-4 py-3">
                <p class="font-semibold text-white">{{ name }}</p>
                <p class="mt-0.5 text-sm text-base-content/65">{{ text }}</p>
              </div>
            </div>
          </div>
          <p class="self-center text-center text-2xl text-primary/80" aria-hidden="true"><span class="md:hidden">↓</span><span class="hidden md:inline">→</span></p>
          <div class="card-studio border-primary/30 p-5">
            <p class="text-xs uppercase tracking-[0.14em] text-primary/80">PNJ Tech Solution</p>
            <p class="mt-4 text-xl font-bold text-white">Unified Transportation Platform</p>
            <p class="mt-3 text-sm text-white/85">สร้างงาน · จ่ายงาน · คำนวณยอด · วางบิล</p>
            <p class="mt-2 text-sm text-base-content/65">เชื่อมต่อพนักงานขับรถผ่านแอปมือถือ</p>
          </div>
        </div>

        <dl class="mt-8 grid gap-4 border-y border-white/10 py-5 text-sm sm:grid-cols-2">
          <div>
            <dt class="text-xs uppercase tracking-[0.14em] text-base-content/45">ประเภทโครงการ</dt>
            <dd class="mt-1.5 text-white/85">Web Application · Mobile Application · Transportation Management System</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-[0.14em] text-base-content/45">รูปแบบงาน</dt>
            <dd class="mt-1.5 text-white/85">พัฒนาซอฟต์แวร์ตามความต้องการของลูกค้า (Custom Software Development)</dd>
          </div>
        </dl>

        <!-- The system's own screens (dummy data) -->
        <figure class="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-base-200">
          <img :src="tmsDashboard" alt="แดชบอร์ดภาพรวมการดำเนินงานของระบบบริหารจัดการงานขนส่ง" width="1600" height="739" class="block w-full" />
          <figcaption class="px-4 py-2.5 text-xs text-base-content/55">แดชบอร์ดภาพรวม: รอจัดรถ กำลังขนส่ง รอตรวจ POD งานส่งเสร็จ และสรุปสถานะการเงิน</figcaption>
        </figure>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <figure class="overflow-hidden rounded-2xl border border-white/10 bg-base-200">
            <img :src="tmsDriver" alt="หน้าจอ Driver App ของพนักงานขับรถ" width="1600" height="738" loading="lazy" class="block w-full" />
            <figcaption class="px-4 py-2.5 text-xs text-base-content/55">Driver App: งานที่ได้รับมอบหมายและค่าเที่ยวล่าสุด</figcaption>
          </figure>
          <figure class="overflow-hidden rounded-2xl border border-white/10 bg-base-200">
            <img :src="tmsLogin" alt="หน้าเข้าสู่ระบบของระบบบริหารจัดการงานขนส่ง" width="1600" height="742" loading="lazy" class="block w-full" />
            <figcaption class="px-4 py-2.5 text-xs text-base-content/55">เข้าสู่ระบบด้วยอีเมลหรือรหัสคนขับ</figcaption>
          </figure>
        </div>
        <figure class="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-base-200">
          <img :src="driverApp" alt="หน้าจอแอปพนักงานขับรถบนมือถือ" width="647" height="1400" loading="lazy" class="mx-auto max-h-[70vh] w-auto" />
          <figcaption class="px-4 py-2.5 text-center text-xs text-base-content/55">แอปพนักงานขับรถบนมือถือ</figcaption>
        </figure>

        <div class="prose prose-invert prose-headings:text-white mt-12 max-w-none">
          <h2>ที่มาของโครงการ</h2>
          <p>ลูกค้าของเราเป็นผู้ประกอบธุรกิจขนส่งที่มีการใช้ซอฟต์แวร์ในการบริหารจัดการงานภายในองค์กรอยู่แล้ว แต่ปัญหาสำคัญคือกระบวนการทำงานยังถูกแยกออกเป็นสองระบบ</p>
          <p>ระบบแรกใช้สำหรับสร้างงานขนส่งและออกเอกสารใบงาน ส่วนระบบที่สองใช้สำหรับวางบิลและคำนวณยอดค่าใช้จ่าย</p>
          <p>แม้ทั้งสองระบบจะสามารถทำงานตามหน้าที่ของตัวเองได้ แต่การแยกกระบวนการทำงานออกจากกันทำให้การบริหารจัดการมีความซับซ้อน และต้องดำเนินงานผ่านโปรแกรมหลายตัว</p>

          <h2>ปัญหาที่ลูกค้าต้องการแก้ไข</h2>
        </div>
        <ol class="mt-6 grid gap-4">
          <li v-for="([name, text], i) in problems" :key="name" class="card-studio flex gap-4 p-5">
            <span class="text-2xl font-extrabold tabular-nums text-primary/80">{{ i + 1 }}</span>
            <span>
              <span class="block font-semibold text-white">{{ name }}</span>
              <span class="mt-1.5 block text-sm leading-relaxed text-base-content/65">{{ text }}</span>
            </span>
          </li>
        </ol>

        <div class="prose prose-invert prose-headings:text-white mt-12 max-w-none">
          <h2>แนวทางการแก้ปัญหาของ PNJ Tech</h2>
          <p>เราเริ่มต้นจากการศึกษากระบวนการทำงานเดิมของลูกค้า เพื่อทำความเข้าใจว่าทั้งสองระบบมีความเกี่ยวข้องกันอย่างไร และสามารถนำมารวมเป็นกระบวนการเดียวกันได้อย่างไร</p>
          <p>จากนั้นจึงพัฒนาระบบบริหารงานขนส่งขึ้นใหม่ โดยเชื่อมโยงกระบวนการสร้างงาน การจัดการข้อมูล การคำนวณยอด และการวางบิล ให้อยู่ภายในแพลตฟอร์มเดียวกัน</p>
          <p>พร้อมพัฒนาแอปพลิเคชันบนโทรศัพท์มือถือสำหรับพนักงานขับรถ เพื่อให้สามารถรับและตรวจสอบงานที่บริษัทมอบหมายได้โดยตรง</p>
          <p>แนวคิดการทำงานคล้ายกับแพลตฟอร์ม Grab แต่ปรับรูปแบบให้เหมาะกับธุรกิจขนส่งด้วยรถบรรทุก 10 ล้อ และกระบวนการบริหารงานภายในองค์กรของลูกค้าโดยเฉพาะ</p>

          <h2>ระบบที่พัฒนาขึ้น</h2>
        </div>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div v-for="s in systems" :key="s.name" class="card-studio p-6">
            <p class="text-lg font-semibold text-white">{{ s.name }}</p>
            <p class="text-sm text-primary/80">{{ s.for }}</p>
            <ul class="mt-4 space-y-2 text-sm leading-relaxed text-base-content/70">
              <li v-for="item in s.items" :key="item" class="flex gap-2"><span class="text-primary/70" aria-hidden="true">—</span>{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="prose prose-invert prose-headings:text-white mt-12 max-w-none">
          <h2>ผลลัพธ์ของการพัฒนา</h2>
          <p>จากเดิมที่ลูกค้าต้องใช้งานซอฟต์แวร์สองระบบแยกจากกัน เราได้พัฒนาแพลตฟอร์มใหม่ที่รวมกระบวนการสำคัญให้อยู่ในระบบเดียวกัน</p>
        </div>
        <div class="mt-6 grid gap-4">
          <div v-for="[label, flow, accent] in [['ก่อนพัฒนา', beforeFlow, false], ['หลังพัฒนา', afterFlow, true]]" :key="label" class="card-studio p-5">
            <p class="text-xs uppercase tracking-[0.14em]" :class="accent ? 'text-primary/80' : 'text-base-content/45'">{{ label }}</p>
            <ol class="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              <template v-for="(step, i) in flow" :key="step">
                <li v-if="i" aria-hidden="true" class="text-base-content/40">→</li>
                <li class="rounded-full border px-3 py-1" :class="accent ? 'border-primary/30 text-white' : 'border-white/10 text-white/70'">{{ step }}</li>
              </template>
            </ol>
          </div>
        </div>

        <div class="prose prose-invert prose-headings:text-white mt-8 max-w-none">
          <p>การพัฒนาครั้งนี้ช่วยลดความซับซ้อนของขั้นตอนการทำงาน ทำให้กระบวนการบริหารจัดการเชื่อมโยงกันมากขึ้น และเปิดโอกาสให้พนักงานขับรถเข้าถึงข้อมูลการทำงานผ่านโทรศัพท์มือถือได้โดยตรง</p>

          <h2>เทคโนโลยีไม่จำเป็นต้องเริ่มจากศูนย์ แต่ควรเริ่มจากปัญหา</h2>
          <p>โครงการนี้สะท้อนแนวทางการทำงานของ PNJ Tech ที่ไม่ได้มุ่งเน้นเพียงการพัฒนาซอฟต์แวร์ใหม่ แต่ให้ความสำคัญกับการทำความเข้าใจปัญหาและกระบวนการทำงานของลูกค้า</p>
          <p>เพราะบางครั้งสิ่งที่ธุรกิจต้องการ ไม่ใช่โปรแกรมที่มีฟังก์ชันมากขึ้น แต่เป็นระบบที่ช่วยให้การทำงานง่ายขึ้น</p>
        </div>

        <div class="card-studio mt-14 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-white"><span class="font-semibold">PNJ Tech</span> — เราแก้ปัญหา เพื่อลดขั้นตอนการทำงานและความซับซ้อนในการดำเนินธุรกิจ</p>
          <RouterLink to="/contact" class="btn-glow shrink-0 text-sm">ปรึกษาโครงการของคุณ →</RouterLink>
        </div>
      </article>
    </div>
  </UserLayout>
</template>
