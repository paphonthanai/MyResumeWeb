<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import robotVideo from '../image/video/case-robot.mp4'
import robotPoster from '../image/video/case-robot.webp'
import networkVideo from '../image/video/case-network.mp4'
import networkPoster from '../image/video/case-network.webp'
import hardwareVideo from '../image/video/case-hardware.mp4'
import hardwarePoster from '../image/video/case-hardware.webp'
import handVideo from '../image/video/iot-hand.mp4'
import handPoster from '../image/video/iot-hand.webp'
import { categories, items } from '../../content/workGallery'
import { galleryFilter } from '../../utils/galleryState'
import { useRouter } from 'vue-router'

// "PNJ Lab": a full-screen particle cloud stirred by the cursor, with a
// column of work clips on the left and notes on the right. Layout and
// particle idea adapted from the AXON design on motionsites.ai.

const lang = inject('lang')
const router = useRouter()
const en = computed(() => lang.value === 'en')

const work = import.meta.glob('../image/work/*.webp', { eager: true, import: 'default' })
const photo = (id) => work[`../image/work/${id}-t.webp`]

const CARDS = [
  { cat: 'robotics', video: handVideo, poster: handPoster, a: { th: 'มือหุ่นยนต์\nต้นแบบ', en: 'Robot hand\nprototype' }, b: { th: 'IoT / R&D\nศึกษา', en: 'IoT / R&D\nstudy' } },
  { cat: 'robotics', video: robotVideo, poster: robotPoster, a: { th: 'แขนกล\nฐานตีนตะขาบ', en: 'Robot arm\ntracked base' }, b: { th: 'หุ่นยนต์\nทดสอบ', en: 'Robotics\ntest run' } },
  { cat: 'network', video: networkVideo, poster: networkPoster, a: { th: 'ระบบเครือข่าย\nจำลอง', en: 'Network\nsimulation' }, b: { th: 'วางแผน\nก่อนติดตั้ง', en: 'Plan\nbefore install' } },
  { cat: 'hardware', video: hardwareVideo, poster: hardwarePoster, a: { th: 'อัปเกรด\nSSD โน้ตบุ๊ก', en: 'Laptop\nSSD upgrade' }, b: { th: 'ฮาร์ดแวร์\nซ่อม', en: 'Hardware\nrepair' } },
  { cat: 'robotics', img: 'printer-3d', a: { th: 'พิมพ์ชิ้นส่วน\n3 มิติ', en: '3D printed\nparts' }, b: { th: 'R&D\nชิ้นส่วน', en: 'R&D\nparts' } },
  { cat: 'robotics', img: 'pcb-solder', a: { th: 'บัดกรี\nแผงวงจร', en: 'Soldering\nboards' }, b: { th: 'อิเล็กทรอนิกส์\nงานมือ', en: 'Electronics\nbench' } },
  { cat: 'network', img: 'cctv-mount', a: { th: 'ติดตั้ง\nกล้องวงจรปิด', en: 'CCTV\ninstall' }, b: { th: 'เครือข่าย\nหน้างาน', en: 'Network\non site' } },
  { cat: 'software', img: 'flutter-dev', a: { th: 'แอปมือถือ\nFlutter', en: 'Mobile app\nFlutter' }, b: { th: 'ซอฟต์แวร์\nพัฒนา', en: 'Software\nbuild' } },
  { cat: 'security', img: 'ctf-room', a: { th: 'อบรม\nCyber Security', en: 'Cyber Security\ntraining' }, b: { th: 'Security\nอบรม', en: 'Security\ncourse' } },
  { cat: 'design', img: 'design-ragnarok', a: { th: 'งานออกแบบ\nกราฟิก', en: 'Graphic\ndesign' }, b: { th: 'ดีไซน์\nสื่อ', en: 'Design\nmedia' } },
]

const chip = ref('all')
const cards = computed(() => (chip.value === 'all' ? CARDS : CARDS.filter((c) => c.cat === chip.value)))

const copy = computed(() =>
  en.value
    ? {
        sub: 'Research & development',
        info: 'Work in progress is shared as it is built. Move your cursor over the cloud to stir it.',
        aims: [
          'A logbook of hands-on research: IoT, robot arms, networks and the software that ties them together.',
          'It keeps the work in view and gives every new project a place to grow.',
        ],
        exploring: ['IoT & sensors', 'Robot arms', 'Networks & CCTV', 'Real-time apps'],
        gallery: 'Gallery',
        mail: 'Messenger',
      }
    : {
        sub: 'วิจัยและพัฒนา',
        info: 'งานที่กำลังทำจะเผยแพร่ระหว่างทาง ลองขยับเมาส์บนกลุ่มอนุภาคดูได้เลย',
        aims: [
          'บันทึกงานวิจัยที่ลงมือทำจริง ทั้ง IoT แขนกล ระบบเครือข่าย และซอฟต์แวร์ที่เชื่อมทุกอย่างเข้าด้วยกัน',
          'เพื่อให้เห็นงานต่อเนื่อง และให้ทุกโปรเจกต์ใหม่มีที่ให้เติบโต',
        ],
        exploring: ['IoT และเซนเซอร์', 'แขนกลและหุ่นยนต์', 'เครือข่ายและกล้อง', 'แอปแบบเรียลไทม์'],
        gallery: 'แกลเลอรี',
        mail: 'Messenger',
      },
)

function openGallery() {
  galleryFilter.value = 'all'
  router.push('/gallery')
}

// ---- WebGL: loaded and run only while the section is on screen ----
const root = ref(null)
const canvas = ref(null)
const list = ref(null)
const glOk = ref(true)
let lab = null
let io = null
let visible = false

function onPointer(e) {
  const p = e.touches ? e.touches[0] : e
  if (p) lab?.setMouse(p.clientX, p.clientY)
}
function playVideos(on) {
  list.value?.querySelectorAll('video').forEach((v) => (on ? v.play().catch(() => {}) : v.pause()))
}
function onVisibility() {
  if (document.hidden) lab?.stop()
  else if (visible) lab?.start()
}

onMounted(() => {
  io = new IntersectionObserver(async ([entry]) => {
    visible = entry.isIntersecting
    playVideos(visible)
    if (!visible) { lab?.stop(); return }
    if (!lab && glOk.value) {
      try {
        const { createLab } = await import('./labParticles.js')
        lab = createLab(canvas.value, { mobile: window.innerWidth <= 760 })
      } catch (err) {
        console.warn('Lab particles unavailable', err)
        glOk.value = false
        return
      }
    }
    if (visible) lab?.start()
  }, { rootMargin: '100px 0px' })
  io.observe(root.value)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  io?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  lab?.dispose()
})
</script>

<template>
  <section
    id="lab"
    ref="root"
    class="lab relative h-[100svh] min-h-[620px] overflow-hidden bg-black"
    @mousemove="onPointer"
    @touchstart.passive="onPointer"
    @touchmove.passive="onPointer"
  >
    <canvas ref="canvas" class="absolute inset-0 h-full w-full" :class="{ 'lab-fallback': !glOk }" aria-hidden="true"></canvas>

    <div class="pointer-events-none absolute inset-0">
      <!-- Brand -->
      <div class="blend absolute left-6 top-6 flex items-center gap-3.5">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18.5" stroke="#fff" stroke-width="1.6" />
          <polygon fill="#fff" points="20,8 22.6,15.6 30.4,13.6 25,19.6 30.4,26.4 22.6,24.4 20,32 17.4,24.4 9.6,26.4 15,19.6 9.6,13.6 17.4,15.6" />
        </svg>
        <div>
          <p class="text-[20px] leading-none text-white">PNJ LAB</p>
          <p class="mt-1 text-[11px] text-[#8a8a8a]">{{ copy.sub }}</p>
        </div>
      </div>

      <!-- Counter -->
      <div class="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#0a0a0a] text-[14px] text-white">{{ items.length }}</div>

      <!-- Tags -->
      <div class="lab-side pointer-events-auto absolute left-6 top-[104px] flex w-[320px] flex-wrap gap-1.5">
        <button
          v-for="c in categories.filter((c) => c.id === 'all' || CARDS.some((k) => k.cat === c.id))"
          :key="c.id"
          type="button"
          class="px-[9px] py-[5px] text-[11px]"
          :class="chip === c.id ? 'bg-[#e6e6e6] text-black' : 'bg-[#1c1c1c] text-[#cfcfcf] hover:text-white'"
          @click="chip = c.id"
        >{{ c[lang] }}</button>
      </div>

      <!-- Card list -->
      <div ref="list" class="lab-side lab-list pointer-events-auto absolute bottom-0 left-6 top-[200px] w-[320px] overflow-y-auto">
        <article v-for="c in cards" :key="c.a.en" class="border-t border-[#2a2a2a] py-[18px]">
          <div class="h-40 overflow-hidden rounded-sm bg-[#0a0a0a]">
            <video v-if="c.video" :src="c.video" :poster="c.poster" class="h-full w-full object-cover" muted loop playsinline preload="none"></video>
            <img v-else :src="photo(c.img)" alt="" loading="lazy" class="h-full w-full object-cover" />
          </div>
          <div class="mt-2.5 flex justify-between gap-4 text-[12px]">
            <p class="whitespace-pre-line text-white">{{ c.a[lang] }}</p>
            <p class="whitespace-pre-line text-right text-[#8a8a8a]">{{ c.b[lang] }}</p>
          </div>
        </article>
      </div>

      <!-- Notes -->
      <div class="lab-about blend absolute right-[90px] top-1/2 w-[380px] -translate-y-1/2 space-y-[2.2em]">
        <div>
          <h2 class="lab-h">[info]</h2>
          <p class="lab-p">{{ copy.info }}</p>
        </div>
        <div>
          <h2 class="lab-h">[aims]</h2>
          <p v-for="a in copy.aims" :key="a" class="lab-p">{{ a }}</p>
        </div>
        <div>
          <h2 class="lab-h">[exploring]</h2>
          <ul class="list-inside list-disc">
            <li v-for="x in copy.exploring" :key="x">{{ x }}</li>
          </ul>
        </div>
        <div class="pointer-events-auto">
          <h2 class="lab-h">[connect]</h2>
          <a href="/gallery" class="lab-a" @click.prevent="openGallery">{{ copy.gallery }} -> PNJ Tech</a>
          <a href="https://m.me/Paphonthanai.name" target="_blank" rel="noopener noreferrer" class="lab-a">{{ copy.mail }} -> Paphonthanai.name</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lab {
  font-family: 'SF Mono', Menlo, Consolas, 'Liberation Mono', 'Noto Sans Thai', monospace;
  font-size: 13px;
  line-height: 1.35;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ddd;
}
.blend { mix-blend-mode: plus-lighter; }
.lab-h { margin-bottom: 1em; font-size: 13px; color: #d36ce3; }
.lab-p { margin-bottom: 1em; text-align: justify; }
.lab-a {
  display: block;
  margin: 4px 0;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.3s;
}
.lab-a:hover { opacity: 0.7; }
.lab-list { scrollbar-width: none; }
.lab-list::-webkit-scrollbar { display: none; }
.lab-fallback {
  background: radial-gradient(40% 45% at 62% 50%, rgba(211, 108, 227, 0.25), transparent 70%);
}
@media (max-width: 1100px) {
  .lab-about { right: 24px; width: 320px; }
}
@media (max-width: 760px) {
  .lab-side { display: none; }
  .lab-about {
    left: 24px;
    right: 24px;
    top: auto;
    bottom: 24px;
    width: auto;
    transform: none;
  }
  .lab-p { text-align: left; }
}
</style>
