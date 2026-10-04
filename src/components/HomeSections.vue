<script setup>
import { computed, inject } from 'vue'
import { vReveal } from '../utils/reveal'
import { selectedPackage } from '../utils/inquiryState'

const props = defineProps({ part: { type: String, default: 'top' } }) // 'top' = services + process, 'packages'
const lang = inject('lang')

// Copy is derived from the real work shown in the Skills section and the
// "client brief → flowchart → spec → dev plan" process already described
// there. No prices are listed: packages describe scope, pricing is quoted.
const content = {
  th: {
    servicesKicker: 'Services',
    servicesTitle: 'บริการของเรา',
    servicesIntro: 'ออกแบบและพัฒนาระบบจากปัญหาการใช้งานจริง ตั้งแต่เว็บ แอปมือถือ ไปจนถึงระบบหลังบ้านและความปลอดภัย',
    services: [
      { icon: 'web', title: 'เว็บแพลตฟอร์มและระบบองค์กร', desc: 'แดชบอร์ดหลายบทบาท อัปเดตเรียลไทม์ พร้อมระบบสิทธิ์และกฎความปลอดภัยด้วย Vue.js + Firebase' },
      { icon: 'mobile', title: 'แอปพลิเคชันมือถือ', desc: 'แอปองค์กรด้วย Flutter + Dart ฟอร์มแบบเป็นขั้นตอน เข้าใช้งานผ่าน OTP พร้อมใช้งานจริง' },
      { icon: 'api', title: 'API และระบบ Backend', desc: 'ออกแบบ API เชื่อมต่อระบบภายนอก เช่น ธนาคาร ปรับประสิทธิภาพและความปลอดภัยสำหรับระบบขนาดใหญ่' },
      { icon: 'shield', title: 'Security, DevOps และที่ปรึกษา', desc: 'วิเคราะห์ช่องโหว่ ตั้งค่า CI/CD ให้ปล่อยงานได้ไม่สะดุด และให้คำปรึกษา/อบรมทีมภายใน' },
      { icon: 'code', title: 'แก้ไข/พัฒนาโปรแกรม TrainModel MML', desc: 'รับแก้ไข ปรับปรุง และพัฒนาต่อยอดโปรแกรม TrainModel MML ตามความต้องการใช้งาน' },
      { icon: 'chip', title: 'ออกแบบและผลิตหุ่นยนต์ (Robotics)', desc: 'ออกแบบและผลิตหุ่นยนต์ ตั้งแต่แนวคิด ระบบควบคุม ไปจนถึงชิ้นงานที่ใช้งานได้จริง' },
      { icon: 'course', title: 'คอร์สสอน/อบรมเทคโนโลยีและการเขียนโปรแกรม', desc: 'จัดคอร์สสอนและอบรมด้านเทคโนโลยีและการเขียนโปรแกรม สำหรับบุคคลและทีมงานองค์กร' },
    ],
    processKicker: 'Process',
    processTitle: 'ขั้นตอนการทำงาน',
    processIntro: 'ทำงานเป็นลำดับชัดเจน ลูกค้าเห็นภาพทุกขั้นก่อนลงมือพัฒนา',
    steps: [
      { title: 'คุยโจทย์', desc: 'ทำความเข้าใจปัญหา เป้าหมาย และกระบวนการทำงานจริงขององค์กร' },
      { title: 'วางแผนผังงาน', desc: 'สรุปเป็น flowchart และสเปกส่วนประกอบ ให้ผู้บริหารเข้าใจและอนุมัติได้' },
      { title: 'พัฒนา', desc: 'ลงมือพัฒนาตามแผน แบ่งเป็นช่วงเพื่อให้ตรวจงานได้ต่อเนื่อง' },
      { title: 'ทดสอบและส่งมอบ', desc: 'ทดสอบการใช้งานจริง ปรับแก้ แล้วส่งมอบระบบพร้อมใช้งาน' },
      { title: 'ดูแลต่อเนื่อง', desc: 'ดูแล แก้ไข และต่อยอดระบบให้เติบโตไปพร้อมธุรกิจ' },
    ],
    stepLabel: 'ขั้นที่',
    packagesKicker: 'Packages',
    packagesTitle: 'แพ็กเกจการทำงาน',
    packagesIntro: 'ราคาขึ้นกับขอบเขตงานจริง บอกโจทย์มาแล้วจะประเมินและส่งใบเสนอราคาให้',
    packages: [
      { id: 'starter', name: 'เริ่มต้น', tag: 'Starter', for: 'ธุรกิจที่ต้องการหน้าเว็บหรือปรับปรุงเว็บเดิม', items: ['Landing page / เว็บบริษัท', 'แก้ไข ปรับปรุง เว็บที่มีอยู่', 'ฟอร์มติดต่อและ SEO พื้นฐาน'] },
      { id: 'pro', name: 'ประยุกต์', tag: 'Professional', featured: true, for: 'ระบบเว็บหรือแอปที่ใช้งานจริงในธุรกิจ', items: ['ระบบเว็บ / แอปมือถือตามโจทย์', 'ระบบล็อกอินและสิทธิ์ผู้ใช้', 'แดชบอร์ดและฐานข้อมูล', 'ฝึกสอนการใช้งานทีมงาน'] },
      { id: 'enterprise', name: 'องค์กร', tag: 'Enterprise', for: 'หน่วยงานหรือองค์กรที่ต้องการระบบเต็มรูปแบบ', items: ['ระบบหลายบทบาท หลายแพลตฟอร์ม', 'เชื่อมต่อ API และระบบภายนอก', 'ออกแบบความปลอดภัยและ CI/CD', 'ที่ปรึกษาและดูแลต่อเนื่อง'] },
    ],
    quote: 'ขอใบเสนอราคา',
    popular: 'ยอดนิยม',
  },
  en: {
    servicesKicker: 'Services',
    servicesTitle: 'What I build',
    servicesIntro: 'Systems designed around real usage problems — from web and mobile apps to backends and security.',
    services: [
      { icon: 'web', title: 'Web platforms & internal systems', desc: 'Multi-role dashboards with real-time updates, permissions and security rules, built with Vue.js + Firebase.' },
      { icon: 'mobile', title: 'Mobile applications', desc: 'Organization apps in Flutter + Dart: step-by-step forms, OTP sign-in, ready for real use.' },
      { icon: 'api', title: 'APIs & backend', desc: 'APIs that integrate external systems such as banks, tuned for performance and security at scale.' },
      { icon: 'shield', title: 'Security, DevOps & consulting', desc: 'Vulnerability analysis, CI/CD for smooth deployments, plus technical consulting and team training.' },
      { icon: 'code', title: 'TrainModel MML fixes & development', desc: 'Fixing, improving and extending the TrainModel MML program to fit your needs.' },
      { icon: 'chip', title: 'Robotics design & fabrication', desc: 'Designing and building robots — from concept and control systems to working hardware.' },
      { icon: 'course', title: 'Technology & programming courses', desc: 'Courses and training in technology and programming, for individuals and organization teams.' },
    ],
    processKicker: 'Process',
    processTitle: 'How it works',
    processIntro: 'A clear sequence, so you see the plan at every step before development starts.',
    steps: [
      { title: 'Understand the brief', desc: 'Learn the problem, the goal and how your organization actually works.' },
      { title: 'Plan the flow', desc: 'Summarize it as a flowchart and component spec your board can understand and approve.' },
      { title: 'Build', desc: 'Develop against the plan in stages so work can be reviewed continuously.' },
      { title: 'Test & deliver', desc: 'Test in real use, refine, then hand over a system that is ready to run.' },
      { title: 'Support', desc: 'Maintain, fix and extend the system as your business grows.' },
    ],
    stepLabel: 'Step',
    packagesKicker: 'Packages',
    packagesTitle: 'Ways to work together',
    packagesIntro: 'Pricing depends on the real scope. Tell me what you need and I will estimate and send a quotation.',
    packages: [
      { id: 'starter', name: 'Starter', tag: 'Starter', for: 'Businesses that need a web presence or a refresh', items: ['Landing page / company site', 'Fixes and upgrades to an existing site', 'Contact form and basic SEO'] },
      { id: 'pro', name: 'Professional', tag: 'Professional', featured: true, for: 'Web or mobile systems used in real operations', items: ['Custom web system / mobile app', 'Sign-in and user permissions', 'Dashboards and database', 'Team onboarding'] },
      { id: 'enterprise', name: 'Enterprise', tag: 'Enterprise', for: 'Organizations that need a full system', items: ['Multi-role, multi-platform systems', 'API and third-party integration', 'Security design and CI/CD', 'Consulting and ongoing support'] },
    ],
    quote: 'Request a quote',
    popular: 'Popular',
  },
}

const t = computed(() => content[lang.value])

const ICONS = {
  web: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.4 3.75-5.4 3.75-9S14.5 5.4 12 3m0 18c-2.5-2.4-3.75-5.4-3.75-9S9.5 5.4 12 3M3.6 9h16.8M3.6 15h16.8',
  mobile: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  api: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  code: 'm6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z',
  chip: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z',
  course: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
  shield: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
}

function choosePackage(id) {
  selectedPackage.value = id
}
</script>

<template>
  <!-- Services -->
  <section v-if="props.part === 'top'" id="services" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.servicesKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.servicesTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-2xl text-base-content/60">{{ t.servicesIntro }}</p>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(s, i) in t.services"
          :key="i"
          v-reveal="i"
          class="group rounded-lg border border-base-300 bg-base-200/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_12px_30px_-12px_rgba(212,175,55,0.25)]"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" :d="ICONS[s.icon]" />
            </svg>
          </div>
          <h3 class="mt-5 font-display text-lg font-semibold leading-snug text-base-content">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section v-if="props.part === 'top'" id="process" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.processKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.processTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-2xl text-base-content/60">{{ t.processIntro }}</p>
      </div>

      <ol class="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-4">
        <!-- connecting line (desktop) -->
        <div class="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block"></div>
        <li v-for="(step, i) in t.steps" :key="i" v-reveal="i" class="relative">
          <div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-base-100 font-display text-sm font-semibold text-primary">
            {{ i + 1 }}
          </div>
          <p class="mt-4 text-[11px] uppercase tracking-widest text-base-content/40">{{ t.stepLabel }} {{ i + 1 }}</p>
          <h3 class="mt-1 font-display text-base font-semibold text-base-content">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ step.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- Packages -->
  <section v-if="props.part === 'packages'" id="packages" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto max-w-6xl">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.packagesKicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.packagesTitle }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 max-w-2xl text-base-content/60">{{ t.packagesIntro }}</p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article
          v-for="(p, i) in t.packages"
          :key="p.id"
          v-reveal="i"
          class="relative flex flex-col rounded-lg border bg-base-200/40 p-7 transition duration-300 hover:-translate-y-1"
          :class="p.featured ? 'border-primary/70 shadow-[0_12px_40px_-16px_rgba(212,175,55,0.35)]' : 'border-base-300 hover:border-primary/40'"
        >
          <span
            v-if="p.featured"
            class="absolute -top-3 left-7 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary-content"
          >
            {{ t.popular }}
          </span>
          <p class="text-xs uppercase tracking-[0.2em] text-primary/80">{{ p.tag }}</p>
          <h3 class="mt-1 font-display text-2xl font-semibold text-base-content">{{ p.name }}</h3>
          <p class="mt-2 text-sm text-base-content/55">{{ p.for }}</p>
          <ul class="mt-6 flex-1 space-y-3 text-sm text-base-content/75">
            <li v-for="item in p.items" :key="item" class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mt-0.5 h-4 w-4 shrink-0 text-primary">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </li>
          </ul>
          <a
            href="#inquiry"
            @click="choosePackage(p.id)"
            class="btn mt-8 rounded-full border-primary"
            :class="p.featured ? 'btn-shimmer text-primary-content' : 'bg-transparent text-primary hover:bg-primary hover:text-primary-content'"
          >
            {{ t.quote }}
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
