<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHeading from '../SectionHeading.vue'
import { pages } from '../../content/pages'
import { vReveal } from '../../utils/reveal'

// The homepage, in the same look as the blog page: eyebrow labels, white
// headings with one glowing phrase, dark rounded cards and the shimmer CTA.
// Plain HTML and CSS only (no WebGL), so it renders straight from the
// prerendered page.
const lang = inject('lang')
const en = computed(() => lang.value === 'en')
const work = import.meta.glob('../image/work/*-t.webp', { eager: true, import: 'default' })
const photo = (id) => work[`../image/work/${id}-t.webp`]

// Client logos sit on light plates so dark and coloured marks stay legible.
// `invert` flips a white-on-transparent logo to dark for the light plate.
// Clients without a logo file show their name on the plate instead.
const logos = import.meta.glob('../image/clients/*.webp', { eager: true, import: 'default' })
const logo = (id) => logos[`../image/clients/${id}.webp`]
const CLIENTS = [
  { id: 'first-telecom', th: 'เฟิร์สท เทเลคอม ซีสเต็ม', en: 'First Telecom System' },
  { id: 'kyoei', th: 'เคียวเออิ (ประเทศไทย)', en: 'Kyoei (Thailand)' },
  { id: 'hodaka', th: 'โฮดากะ อีเอส (ประเทศไทย)', en: 'Hodaka ES (Thailand)', wide: true },
  { id: 'mitkarn', th: 'มิตรกาญ', en: 'Mitkarn' },
  { id: 'monoqlo', th: 'Monoqlo', en: 'Monoqlo', invert: true },
  { id: 'home-dd', th: 'โฮม ดี ดี', en: 'Home DD' },
  { id: 'bpp24', th: 'สหกรณ์ออมทรัพย์ ตชด. 24', en: 'BPP24 Savings Cooperative' },
]

const CAPS = [
  {
    to: '/projects',
    th: ['แอป Android และ iOS', 'แอปสำหรับองค์กรและหน่วยงาน ตั้งแต่ฟอร์มทีละขั้น การเข้าใช้งานด้วย OTP ไปจนถึงระบบที่กรรมการอนุมัติใช้งานจริง', ['Flutter', 'Dart', 'OTP', 'Firebase']],
    en: ['Android & iOS apps', 'Apps for companies and agencies, from step-by-step forms and OTP sign-in to systems approved by the board.', ['Flutter', 'Dart', 'OTP', 'Firebase']],
  },
  {
    to: '/website-builder',
    th: ['เว็บไซต์ ซอฟต์แวร์ และระบบจัดการ', 'เว็บบริษัท แดชบอร์ดหลายบทบาท API และระบบหลังบ้าน พร้อม CI/CD ให้ส่งมอบงานได้เร็ว', ['Vue.js', 'PHP', 'API', 'CI/CD']],
    en: ['Websites, software & management systems', 'Company sites, multi-role dashboards, APIs and back offices, with CI/CD for fast, steady delivery.', ['Vue.js', 'PHP', 'API', 'CI/CD']],
  },
  {
    to: '/gallery',
    th: ['กล้องวงจรปิดและระบบเครือข่าย', 'ติดตั้งกล้อง เดินสาย ตั้งค่า NVR และเราเตอร์ ให้ระบบดูภาพได้ทั้งหน้างานและบนมือถือ', ['CCTV', 'NVR', 'Router', 'เดินสาย']],
    en: ['CCTV & networking', 'Cameras, cabling, NVR and router setup, so footage works on site and on your phone.', ['CCTV', 'NVR', 'Router', 'Cabling']],
  },
  {
    to: '/iot',
    th: ['IoT แขนกล และหุ่นยนต์', 'งานวิจัยและพัฒนาที่ลงมือทำจริง ตั้งแต่เซนเซอร์ตัวเดียวไปจนถึงแขนกลทั้งชุด', ['Arduino', '3D Printing', 'Sensors', 'R&D']],
    en: ['IoT, robot arms & robots', 'Hands-on R&D, from a single sensor to a complete robot arm.', ['Arduino', '3D Printing', 'Sensors', 'R&D']],
  },
]

const PROJECTS = [
  { id: 'driver-app', to: '/skills', th: ['Web · Mobile · ขนส่ง', 'Grab-Truck', 'ระบบบริหารงานขนส่งและงานภายในองค์กร ทั้งเว็บแพลตฟอร์มและแอปมือถือ ใช้งานจริงที่บริษัทมิตรกาญ'], en: ['Web · Mobile · Logistics', 'Grab-Truck', 'A web platform and mobile app for transport and internal operations, in daily use at Mitkarn.'] },
  { id: 'coop-app-home', to: '/projects', th: ['Flutter · OTP · แบบฟอร์ม', 'แอปสหกรณ์ ตชด. 24', 'แอปของสหกรณ์ออมทรัพย์ตำรวจตระเวนชายแดนที่ 24 กรอกฟอร์มทีละขั้นและเข้าใช้งานด้วย OTP'], en: ['Flutter · OTP · Forms', 'BPP24 Cooperative App', 'A savings cooperative app with step-by-step forms and OTP sign-in, built for the Border Patrol Police cooperative.'] },
  { id: 'web-vue', to: '/skills', th: ['Vue · Firebase · Dashboard', 'First Telecom', 'แดชบอร์ดหลายบทบาท อัปเดตแบบเรียลไทม์ พร้อมกฎความปลอดภัยของ Firestore ให้บริษัท เฟิร์สท เทเลคอม ซีสเต็ม'], en: ['Vue · Firebase · Dashboard', 'First Telecom', 'Multi-role, real-time dashboards with Firestore security rules for First Telecom System.'] },
  { id: 'app-flow', to: '/skills', th: ['API · Backend · การเงิน', 'Home DD', 'ระบบ API เชื่อมต่อธนาคารเพื่อค้นหาสินเชื่อ ให้บริษัท โฮม ดี ดี'], en: ['API · Backend · Finance', 'Home DD', 'An API that connects to banks to search for loans, built for Home DD.'] },
  { id: 'cctv-mount', to: '/gallery', th: ['CCTV · Network · หน้างาน', 'กล้องวงจรปิดและเครือข่าย', 'ติดตั้งกล้อง เดินสายสัญญาณ และตั้งค่าเครื่องบันทึก NVR ที่หน้างานจริง'], en: ['CCTV · Network · On site', 'CCTV & networking', 'Mounting cameras, running cable and setting up NVR recorders on real sites.'] },
  { id: 'robot-arm-red', to: '/iot', th: ['IoT · Robotics · R&D', 'แขนกลและหุ่นยนต์', 'ออกแบบ พิมพ์ชิ้นส่วน 3 มิติ เดินสาย และเขียนโปรแกรมควบคุมเองทุกขั้นตอน'], en: ['IoT · Robotics · R&D', 'Robot arms & robots', 'Designed, 3D printed, wired and programmed in-house, every step of the way.'] },
  { id: 'board-repair', to: '/gallery', th: ['ซ่อม · อัปเกรด · ฮาร์ดแวร์', 'ซ่อมและอัปเกรดเครื่อง', 'ซ่อมบอร์ด อัปเกรดการ์ดจอ แรม และ SSD ให้เครื่องเก่ากลับมาใช้งานได้'], en: ['Repair · Upgrade · Hardware', 'Repair & upgrades', 'Board repair and GPU, RAM and SSD upgrades that bring old machines back.'] },
  { id: 'ctf-group', to: '/gallery', th: ['Security · CTF · อบรม', 'Cyber Security', 'อบรมและแข่ง CTF พร้อมวิเคราะห์ช่องโหว่และวางมาตรการรักษาความปลอดภัยให้องค์กร'], en: ['Security · CTF · Training', 'Cyber Security', 'CTF training and competitions, plus vulnerability reviews and security measures for companies.'] },
]

// The two public identities, each with its own Facebook page.
const IDENTITIES = [
  {
    key: 'sage',
    href: 'https://www.facebook.com/Paphonthanai.name',
    mark: '🧠💻',
    th: ['Cyber Sage (ปราชญ์ไซเบอร์)', 'ตัวตนส่วนตัว', 'เล่าเรื่อง Cyber Security เทคโนโลยี และสิ่งที่ได้เรียนรู้จากการลงมือทำจริง'],
    en: ['Cyber Sage', 'Personal identity', 'Cyber Security, technology and lessons learned from hands-on work.'],
  },
  {
    key: 'pnj',
    href: 'https://www.facebook.com/profile.php?id=61552101745680',
    mark: 'PNJ',
    th: ['PNJ Tech', 'ตัวตนของงาน', 'รับพัฒนาเว็บ แอป ระบบเครือข่าย กล้องวงจรปิด และ IoT ติดตามผลงานและติดต่องานได้ที่เพจ'],
    en: ['PNJ Tech', 'The business', 'Web, apps, networks, CCTV and IoT. Follow the work and get in touch on the page.'],
  },
]

const t = computed(() =>
  en.value
    ? {
        eyebrow: 'Freelance · 5+ years',
        l1: 'Real, working systems,',
        l2: 'from web and apps to robots.',
        lede: 'I am Paphonthanai Jaima (PNJ Tech). I work with businesses, companies and public agencies to turn real problems into apps, websites, networks and IoT that ship and stay in use.',
        cta: 'Request a quote',
        cta2: 'See the work',
        clients: 'Clients I have worked with',
        idKicker: 'Identities',
        idTitle: 'Two sides, one person',
        idAccent: 'one person',
        follow: 'Follow on Facebook',
        servicesKicker: 'Services',
        servicesTitle: 'What I build',
        servicesAccent: 'build',
        workKicker: 'Work',
        workTitle: 'Work that shipped',
        workAccent: 'shipped',
        workIntro: 'Eight builds from real clients and the R&D bench, from a transport system and a cooperative app to robot arms and CCTV.',
        all: 'All projects',
        pagesKicker: 'Explore',
        pagesTitle: 'Every page, its own story',
        pagesAccent: 'its own story',
        blog: ['Blog', 'Notes and techniques from real projects.'],
        about: ['About', 'Education, experience and background.'],
        endTitle: 'Got a project in mind?',
        endAccent: 'project',
        endBody: 'Tell me what you need, from a one-page website to a company system or a complete robot arm. Pricing depends on the real scope; the quotation is free.',
      }
    : {
        eyebrow: 'Freelance · 5+ ปี',
        l1: 'สร้างระบบที่ใช้งานได้จริง',
        l2: 'ตั้งแต่เว็บ แอป ถึงหุ่นยนต์',
        lede: 'ผม ปพนธนัย ใจมา (PNJ Tech) ทำงานกับธุรกิจ องค์กร และหน่วยงาน เปลี่ยนโจทย์จริงให้เป็นแอป เว็บไซต์ ระบบเครือข่าย และงาน IoT ที่ส่งมอบและใช้งานได้จริง',
        cta: 'ขอใบเสนอราคา',
        cta2: 'ดูผลงาน',
        clients: 'ลูกค้าที่เคยร่วมงาน',
        idKicker: 'Identities',
        idTitle: 'สองตัวตน คนเดียวกัน',
        idAccent: 'คนเดียวกัน',
        follow: 'ติดตามบน Facebook',
        servicesKicker: 'Services',
        servicesTitle: 'งานที่รับทำ',
        servicesAccent: 'รับทำ',
        workKicker: 'Work',
        workTitle: 'ผลงานที่ส่งมอบจริง',
        workAccent: 'ส่งมอบจริง',
        workIntro: 'แปดงานจากลูกค้าจริงและห้อง R&D ตั้งแต่ระบบขนส่ง แอปสหกรณ์ ไปจนถึงแขนกลและกล้องวงจรปิด',
        all: 'ดูผลงานทั้งหมด',
        pagesKicker: 'Explore',
        pagesTitle: 'แต่ละหน้า มีเรื่องของตัวเอง',
        pagesAccent: 'เรื่องของตัวเอง',
        blog: ['บทความ', 'เรื่องเล่าจากงานจริง เทคนิค และสิ่งที่ได้เรียนรู้'],
        about: ['เกี่ยวกับ', 'ประวัติการศึกษาและประสบการณ์ทำงาน'],
        endTitle: 'มีโปรเจกต์ในใจ?',
        endAccent: 'โปรเจกต์',
        endBody: 'เล่าโจทย์มาได้เลย ตั้งแต่เว็บไซต์หน้าเดียวไปจนถึงระบบองค์กรหรือแขนกลทั้งชุด ราคาขึ้นกับขอบเขตงานจริง ประเมินและส่งใบเสนอราคาให้ฟรี',
      },
)

const L = computed(() => (en.value ? 'en' : 'th'))
const identities = computed(() => IDENTITIES.map((d) => ({ key: d.key, href: d.href, mark: d.mark, name: d[L.value][0], role: d[L.value][1], body: d[L.value][2] })))
const caps = computed(() => CAPS.map((c) => ({ to: c.to === '/website-builder' && en.value ? '/en/website-builder' : c.to, title: c[L.value][0], body: c[L.value][1], tags: c[L.value][2] })))
const projects = computed(() => PROJECTS.map((p) => ({ id: p.id, to: p.to, cat: p[L.value][0], title: p[L.value][1], body: p[L.value][2] })))
const pageCards = computed(() => [
  ...pages.map((p) => ({ to: p.to, name: p[L.value].name, sub: p[L.value].sub, img: photo(p.preview) })),
  { to: '/iot', name: en.value ? 'IoT & robotics' : 'IoT และหุ่นยนต์', sub: en.value ? 'Robot hands and arms, designed and printed in-house.' : 'มือและแขนหุ่นยนต์ ออกแบบและพิมพ์ชิ้นส่วนเอง', img: photo('robot-arm-tracked') },
])
</script>

<template>
  <!-- Hero: same two-column layout as the blog page's opening section -->
  <section class="relative overflow-hidden">
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="relative mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-end">
      <div>
        <span class="eyebrow studio-enter">{{ t.eyebrow }}</span>
        <h1 class="studio-enter mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl" style="--delay: 0.08s; text-wrap: balance">
          {{ t.l1 }}<br /><span class="glow-text">{{ t.l2 }}</span>
        </h1>
      </div>
      <div class="studio-enter" style="--delay: 0.16s">
        <p class="text-base leading-relaxed text-base-content/65 md:text-lg">{{ t.lede }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/pricing#inquiry" class="btn btn-shimmer rounded-full border-0 px-7">{{ t.cta }} →</RouterLink>
          <RouterLink to="/projects" class="btn-glow">{{ t.cta2 }}</RouterLink>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-6xl px-6 pb-16 md:px-10">
      <p class="text-xs uppercase tracking-[0.14em] text-base-content/45">{{ t.clients }}</p>
      <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <li v-for="c in CLIENTS" :key="c.id" class="flex flex-col">
          <span class="client-plate">
            <img
              v-if="logo(c.id)"
              :src="logo(c.id)"
              :alt="c[L]"
              :title="c[L]"
              decoding="async"
              class="max-h-full w-auto object-contain"
              :class="[c.wide ? 'max-w-full' : 'max-w-[85%]', c.invert && 'invert']"
            />
            <span v-else class="px-2 text-center text-sm font-semibold leading-tight text-neutral-700">{{ c[L] }}</span>
          </span>
          <span v-if="logo(c.id)" class="mt-2 line-clamp-1 text-center text-[11px] text-base-content/45">{{ c[L] }}</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Identities: Cyber Sage (personal) and PNJ Tech (business) -->
  <section class="border-t border-white/5">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <SectionHeading :kicker="t.idKicker" :title="t.idTitle" :accent="t.idAccent" />
      <ul class="mt-12 grid gap-4 md:grid-cols-2">
        <li v-for="(d, i) in identities" :key="d.key" v-reveal="i">
          <a :href="d.href" target="_blank" rel="noopener noreferrer" class="card-studio group flex h-full flex-col p-7 hover:-translate-y-0.5">
            <span class="flex items-center gap-4">
              <span class="cover-fallback flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl" aria-hidden="true">
                <span :class="d.key === 'pnj' && 'studio-heading font-black tracking-tighter'">{{ d.mark }}</span>
              </span>
              <span class="min-w-0">
                <span class="block text-xs uppercase tracking-[0.14em] text-base-content/45">{{ d.role }}</span>
                <span class="mt-1 block text-xl font-semibold text-white transition group-hover:text-primary">{{ d.name }}</span>
              </span>
            </span>
            <span class="mt-4 block text-sm leading-relaxed text-base-content/60">{{ d.body }}</span>
            <span class="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-base-content/80 transition group-hover:text-white">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/></svg>
              {{ t.follow }} ↗
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- Services -->
  <section class="border-t border-white/5">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <SectionHeading :kicker="t.servicesKicker" :title="t.servicesTitle" :accent="t.servicesAccent" />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2">
        <li v-for="(c, i) in caps" :key="c.to" v-reveal="i">
          <RouterLink :to="c.to" class="card-studio group flex h-full flex-col p-7 hover:-translate-y-0.5">
            <span class="text-xs text-base-content/40">0{{ i + 1 }}</span>
            <h3 class="mt-3 text-xl font-semibold leading-snug text-white transition group-hover:text-primary">{{ c.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ c.body }}</p>
            <ul class="mt-auto flex flex-wrap gap-1.5 pt-6">
              <li v-for="tag in c.tags" :key="tag" class="rounded-full bg-white/5 px-3 py-1 text-xs text-base-content/70">{{ tag }}</li>
            </ul>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- Work: cards like the blog list, cover on top and text underneath -->
  <section class="border-t border-white/5">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading :kicker="t.workKicker" :title="t.workTitle" :accent="t.workAccent" :intro="t.workIntro" />
        <RouterLink to="/projects" class="shrink-0 text-sm text-base-content/70 underline-offset-4 transition hover:text-white hover:underline">{{ t.all }} →</RouterLink>
      </div>
      <div class="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <RouterLink v-for="(p, i) in projects" :key="p.id" v-reveal="i % 4" :to="p.to" class="group block">
          <div class="aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-base-200">
            <img :src="photo(p.id)" :alt="p.title" loading="lazy" decoding="async" width="480" height="300" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <p class="mt-4 text-xs text-base-content/45">{{ p.cat }}</p>
          <h3 class="mt-1 text-lg font-semibold leading-snug text-white transition group-hover:text-primary">{{ p.title }}</h3>
          <p class="mt-1.5 line-clamp-2 text-sm text-base-content/55">{{ p.body }}</p>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Pages index -->
  <section class="border-t border-white/5">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <SectionHeading :kicker="t.pagesKicker" :title="t.pagesTitle" :accent="t.pagesAccent" />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(p, i) in pageCards" :key="p.to" v-reveal="i % 3">
          <RouterLink :to="p.to" class="card-studio group flex h-full items-center gap-4 p-4 hover:-translate-y-0.5">
            <img :src="p.img" alt="" loading="lazy" decoding="async" width="96" height="96" class="h-20 w-20 shrink-0 rounded-xl object-cover" />
            <span class="min-w-0">
              <span class="block font-semibold text-white transition group-hover:text-primary">{{ p.name }} →</span>
              <span class="mt-1 line-clamp-2 block text-sm text-base-content/55">{{ p.sub }}</span>
            </span>
          </RouterLink>
        </li>
        <li v-for="(p, i) in [[ '/blog', ...t.blog ], [ '/about', ...t.about ]]" :key="p[0]" v-reveal="i">
          <RouterLink :to="p[0]" class="card-studio group flex h-full items-center gap-4 p-4 hover:-translate-y-0.5">
            <span class="cover-fallback flex h-20 w-20 shrink-0 items-center justify-center rounded-xl" aria-hidden="true">
              <span class="studio-heading text-xl font-black tracking-tighter">PNJ</span>
            </span>
            <span class="min-w-0">
              <span class="block font-semibold text-white transition group-hover:text-primary">{{ p[1] }} →</span>
              <span class="mt-1 line-clamp-2 block text-sm text-base-content/55">{{ p[2] }}</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- Closing call to action -->
  <section class="border-t border-white/5">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div v-reveal class="card-studio relative overflow-hidden p-8 text-center md:p-14">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="relative">
          <SectionHeading :title="t.endTitle" :accent="t.endAccent" :intro="t.endBody" center />
          <RouterLink to="/pricing#inquiry" class="btn btn-shimmer mt-8 rounded-full border-0 px-8">{{ t.cta }} →</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Soft violet and ember light behind the hero, like the blog cover fallback */
.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(50% 60% at 15% 0%, rgba(208, 178, 255, 0.14), transparent 70%),
    radial-gradient(45% 55% at 90% 100%, rgba(232, 64, 13, 0.12), transparent 70%);
}
/* Light plate for a client logo */
.client-plate {
  display: flex;
  height: 4.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: #f4f2ee;
  padding: 0.75rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}
.cover-fallback {
  background:
    radial-gradient(90% 80% at 20% 10%, rgba(208, 178, 255, 0.35), transparent 60%),
    radial-gradient(80% 90% at 90% 100%, rgba(232, 64, 13, 0.35), transparent 60%),
    #161616;
}
</style>
