<script setup>
import { computed, defineAsyncComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHeading from '../SectionHeading.vue'
import TechStack from './TechStack.vue'
import FastworkReviews from './FastworkReviews.vue'
import { pages } from '../../content/pages'
import { vReveal } from '../../utils/reveal'

// The homepage, in the same look as the blog page: eyebrow labels, white
// headings with one glowing phrase, dark rounded cards and the shimmer CTA.
// The text is prerendered HTML; the hero globe (a canvas in its own frame)
// loads after the page is up, into a box that already holds its space.
const TextPathStudies = defineAsyncComponent(() => import('../threeui/TextPathStudies.vue'))
const globeReady = ref(false)
// The globe's frame is a band as wide as the hero, centred on the globe slot
// (the study draws the globe at its canvas centre), so the globe keeps its
// place on the right while its frame spans the screen. The overflow past the
// right edge is clipped by the hero.
const heroRef = ref(null)
const slotRef = ref(null)
const band = ref({ left: '0px', width: '100%' })
function measureBand() {
  const hero = heroRef.value
  const slot = slotRef.value
  if (!hero || !slot) return
  // Layout offsets, not getBoundingClientRect: the slot's entrance animation
  // moves it with a transform while this first runs.
  let left = 0
  for (let el = slot; el && el !== hero; el = el.offsetParent) left += el.offsetLeft
  const centre = left + slot.offsetWidth / 2
  band.value = { left: `${-left}px`, width: `${centre * 2}px` }
}
let bandObserver = null
onMounted(() => {
  const start = () => { globeReady.value = true }
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 })
  else setTimeout(start, 600)
  measureBand()
  bandObserver = new ResizeObserver(measureBand)
  bandObserver.observe(heroRef.value)
})
onBeforeUnmount(() => bandObserver?.disconnect())

const lang = inject('lang')
const en = computed(() => lang.value === 'en')
const work = import.meta.glob('../image/work/*-t.webp', { eager: true, import: 'default' })
const photo = (id) => work[`../image/work/${id}-t.webp`]

// Client logos sit on light plates so dark and coloured marks stay legible.
// `invert` flips a white-on-transparent logo to dark for the light plate.
// Clients without a logo file show their name on the plate instead.
// `href` links to the client's own site or page.
const logos = import.meta.glob('../image/clients/*.webp', { eager: true, import: 'default' })
const logo = (id) => logos[`../image/clients/${id}.webp`]
const CLIENTS = [
  { id: 'kyoei', th: 'เคียวเออิ (ประเทศไทย)', en: 'Kyoei (Thailand)', href: 'https://www.kyoei-thai.co.th/th/' },
  { id: 'hodaka', th: 'โฮดากะ อีเอส (ประเทศไทย)', en: 'Hodaka ES (Thailand)', wide: true, href: 'https://hodaka.co.th/th/' },
  { id: 'mitkarn', th: 'มิตรกาญ', en: 'Mitkarn', href: 'https://www.facebook.com/Mittrakarn/' },
  { id: 'monoqlo', th: 'Monoqlo', en: 'Monoqlo', invert: true, href: 'https://en.monoqlo-th.com/' },
  { id: 'bpp24', th: 'สหกรณ์ออมทรัพย์ ตชด. 24', en: 'BPP24 Savings Cooperative', href: 'https://bpp24-coop.com/' },
  { id: 'fire-first', th: 'ไฟร์ เฟิร์ส เซฟตี้ แอนด์ ทรัค', en: 'Fire First Safety and Truck', href: 'https://firefirstsafetyandtruck.com/' },
  { id: 'bpp24-unit', th: 'กก.ตชด.24', en: 'BPP Sub-Division 24', href: 'http://164.115.20.79/bpp.go.th/bpp24/home/indexbpp24.html' },
]

// Fastwork profiles where the same work can be hired, with Fastwork's mark.
const FASTWORK = [
  { href: 'https://fastwork.com/user/0xname', label: 'fastwork.com' },
  { href: 'https://fastwork.co/user/0xname?source=web_marketplace_profile-menu_profile', label: 'fastwork.co' },
]
const FASTWORK_MARK = 'M69.2074 46.9341L54.3403 35.4828L54.6359 37.6972C54.7778 38.5982 54.8489 39.5089 54.8488 40.4209C54.8471 41.2128 54.7957 42.0039 54.6951 42.7893L65.6946 51.2683C66.7159 51.9933 67.4303 53.0739 67.6978 54.2985C67.9652 55.5231 67.7667 56.8036 67.1409 57.8894C66.5151 58.9751 65.5071 59.7879 64.3143 60.1688C63.1215 60.5496 61.8296 60.4711 60.6916 59.9485L44.1331 53.0919C46.3757 51.8277 48.2422 49.989 49.5412 47.7645C50.8402 45.54 51.525 43.0096 51.5253 40.4328C51.5225 39.507 51.4354 38.5835 51.2651 37.6736L47.4921 9.25262C47.1605 6.70642 45.9148 4.36803 43.9877 2.67382C42.0605 0.979611 39.5835 0.0453491 37.0189 0.0453491C34.4543 0.0453491 31.9773 0.979611 30.0502 2.67382C28.123 4.36803 26.8774 6.70642 26.5457 9.25262L24.0737 27.8683L25.836 26.5065C26.5473 25.9344 27.3026 25.4196 28.0951 24.967C28.7683 24.5797 29.4633 24.2318 30.1767 23.9249L32.01 10.1526C32.131 8.90814 32.7104 7.7533 33.6352 6.91308C34.5601 6.07286 35.7642 5.60741 37.013 5.60741C38.2618 5.60741 39.466 6.07286 40.3908 6.91308C41.3157 7.7533 41.895 8.90814 42.016 10.1526L44.3815 27.9157C41.7386 26.3625 38.6731 25.6853 35.6228 25.9809C32.5725 26.2766 29.6936 27.5298 27.3973 29.5617L4.79499 46.9696C2.75241 48.5287 1.34722 50.7795 0.842399 53.3009C0.337575 55.8224 0.767697 58.4416 2.05229 60.6685C3.33688 62.8953 5.38791 64.5772 7.82154 65.3994C10.2552 66.2216 12.9046 66.1277 15.2741 65.1353L32.6014 57.9709L30.5434 57.1183C29.6996 56.7836 28.8814 56.3879 28.0951 55.934C27.4191 55.5454 26.771 55.1101 26.1554 54.6314L13.3108 59.9485C12.1727 60.4711 10.8809 60.5496 9.68804 60.1688C8.49521 59.7879 7.48726 58.9751 6.86148 57.8894C6.23569 56.8036 6.03711 55.5231 6.30461 54.2985C6.5721 53.0739 7.28642 51.9933 8.30775 51.2683L22.5007 40.3262C22.5007 40.3262 22.5007 40.3972 22.5007 40.4328C22.5031 43.3978 23.4107 46.2913 25.1019 48.7254C26.7931 51.1594 29.187 53.0177 31.9627 54.0511L58.7519 65.0998C61.1204 66.0843 63.7657 66.1724 66.1943 65.3477C68.6228 64.5229 70.6687 62.8417 71.9503 60.6176C73.2318 58.3936 73.6614 55.7787 73.1588 53.2608C72.6563 50.743 71.256 48.4942 69.2192 46.9341H69.2074ZM28.0005 40.3972C28.0028 38.6224 28.5306 36.8881 29.5171 35.4135C30.5037 33.9389 31.9047 32.7903 33.543 32.1127C35.1814 31.4351 36.9837 31.259 38.722 31.6067C40.4603 31.9544 42.0566 32.8103 43.3092 34.0661C44.5619 35.3219 45.4145 36.9214 45.7595 38.6623C46.1045 40.4032 45.9263 42.2074 45.2473 43.8469C44.5684 45.4864 43.4193 46.8876 41.9453 47.8734C40.4712 48.8592 38.7383 49.3854 36.9657 49.3854C35.7874 49.3854 34.6206 49.1528 33.5321 48.7009C32.4436 48.2491 31.4548 47.5869 30.6222 46.7521C29.7895 45.9173 29.1294 44.9264 28.6795 43.8359C28.2297 42.7455 27.9989 41.577 28.0005 40.3972Z'

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
  {
    to: '/pricing#inquiry',
    th: ['กฎหมาย อบรม และคอร์สสอน', 'ให้ความรู้ด้านกฎหมาย จัดอบรม เปิดคอร์สสอน และแนะนำการใช้งานระบบและเครื่องมือต่างๆ ให้ทีมใช้งานได้เองอย่างมั่นใจ', ['กฎหมาย', 'อบรม', 'คอร์สสอน', 'แนะนำการใช้งาน']],
    en: ['Law, training & courses', 'Legal know-how, training sessions, courses, and guidance on using systems and tools, so your team can run them with confidence.', ['Law', 'Training', 'Courses', 'How-to guidance']],
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
        fastwork: 'Or hire me on Fastwork',
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
        fastwork: 'หรือจ้างงานผ่าน Fastwork',
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
  <!-- Hero: heading beside the globe, the introduction underneath -->
  <section ref="heroRef" class="relative overflow-hidden">
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="relative mx-auto grid max-w-6xl items-center gap-6 px-6 pt-12 md:px-10 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      <!-- The heading sits on the top layer, over the globe's wide frame -->
      <div class="relative z-20">
        <span class="eyebrow studio-enter">{{ t.eyebrow }}</span>
        <h1 class="studio-enter mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem]" style="--delay: 0.08s; text-wrap: balance">
          <span class="lg:whitespace-nowrap">{{ t.l1 }}</span><br /><span class="glow-text lg:whitespace-nowrap"><template v-for="(w, i) in t.l2.split(' ')" :key="i">{{ i ? ' ' : '' }}<span class="whitespace-nowrap">{{ w }}</span></template></span>
        </h1>
      </div>
      <!-- ThreeUI Globe Type Study: drag to turn, click to pin -->
      <div ref="slotRef" class="globe-slot studio-enter" style="--delay: 0.16s">
        <div v-if="globeReady" class="globe-frame" :style="band">
          <TextPathStudies
            mode="dark"
            :scale="1.00"
            :opacity="1.00"
            :hue="0"
            :saturation="1.00"
            :brightness="1.00"
            transparent
            fill-frame
          />
        </div>
      </div>
    </div>
    <div class="relative mx-auto max-w-6xl px-6 pb-14 pt-4 md:px-10 md:pb-20">
      <div class="studio-enter grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[1.4fr_auto] md:items-center" style="--delay: 0.22s">
        <p class="max-w-2xl text-base leading-relaxed text-base-content/70 md:text-lg">{{ t.lede }}</p>
        <div class="flex flex-wrap gap-3">
          <RouterLink to="/pricing#inquiry" class="btn btn-shimmer rounded-full border-0 px-7">{{ t.cta }} →</RouterLink>
          <RouterLink to="/projects" class="btn-glow">{{ t.cta2 }}</RouterLink>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-6xl px-6 pb-16 md:px-10">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-xs uppercase tracking-[0.14em] text-base-content/45">{{ t.clients }}</p>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="f in FASTWORK"
            :key="f.href"
            :href="f.href"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/80 transition hover:border-white/30 hover:text-white"
          >
            <svg viewBox="0 0 74 66" width="15" height="13" class="fill-current" aria-hidden="true"><path :d="FASTWORK_MARK" /></svg>
            {{ f.label }} ↗
          </a>
        </div>
      </div>
      <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <li v-for="c in CLIENTS" :key="c.id">
          <a :href="c.href" target="_blank" rel="noopener" class="group flex flex-col">
          <span class="client-plate">
            <img
              v-if="logo(c.id)"
              :src="logo(c.id)"
              :alt="c[L]"
              :title="c[L]"
              decoding="async"
              class="max-h-full w-auto object-contain mix-blend-multiply"
              :class="[c.wide ? 'max-w-full' : 'max-w-[85%]', c.invert && 'invert']"
            />
            <span v-else class="px-2 text-center text-sm font-semibold leading-tight text-neutral-700">{{ c[L] }}</span>
          </span>
          <span v-if="logo(c.id)" class="mt-2 line-clamp-1 text-center text-[11px] text-base-content/45 transition group-hover:text-white">{{ c[L] }} ↗</span>
          </a>
        </li>
      </ul>
    </div>

    <TechStack class="relative pb-16 md:pb-20" />
  </section>

  <!-- Reviews from FastWork -->
  <FastworkReviews />

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
        <li v-for="(c, i) in caps" :key="c.to" v-reveal="i" :class="caps.length % 2 && i === caps.length - 1 && 'sm:col-span-2'">
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
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-base-content/60">
            <span>{{ t.fastwork }}</span>
            <a
              v-for="f in FASTWORK"
              :key="f.href"
              :href="f.href"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <svg viewBox="0 0 74 66" width="18" height="16" class="fill-current" aria-hidden="true"><path :d="FASTWORK_MARK" /></svg>
              {{ f.label }} ↗
            </a>
          </div>
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
/* Square slot that places the globe. The frame inside it is widened to a
   full-width band by measureBand(); its ground is transparent, so the page
   background shows through. */
.globe-slot {
  position: relative;
  width: min(100%, 520px);
  aspect-ratio: 1;
  justify-self: center;
}
.globe-frame {
  position: absolute;
  top: 0;
  bottom: 0;
  animation: globe-in 0.9s ease both;
}
@keyframes globe-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .globe-frame { animation: none; }
}
@media (max-width: 1023px) {
  .globe-slot { width: min(100%, 420px); }
}

/* Light plate for a client logo */
.client-plate {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  height: 4.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: #f4f2ee;
  padding: 0.75rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}
.group:hover .client-plate {
  transform: translateY(-2px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6), 0 8px 24px rgba(0, 0, 0, 0.35);
}
.cover-fallback {
  background:
    radial-gradient(90% 80% at 20% 10%, rgba(208, 178, 255, 0.35), transparent 60%),
    radial-gradient(80% 90% at 90% 100%, rgba(232, 64, 13, 0.35), transparent 60%),
    #161616;
}
</style>
