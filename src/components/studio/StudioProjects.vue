<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { clamp01, onScrollFrame } from '../../utils/fade'
import { galleryFilter } from '../../utils/galleryState'
import websiteImage from '../image/Project/web-vue/01.png'
import loanAppImage from '../image/Project/AppsLone/01.png'
import tmsDashboard from '../image/Project/transport/tms-dashboard.webp'
import tmsDriver from '../image/Project/transport/tms-driver.webp'
import tmsLogin from '../image/Project/transport/tms-login.webp'
import logo from '../image/NewLogo_Gold.png'
import robotVideo from '../image/video/case-robot.mp4'
import robotPoster from '../image/video/case-robot.webp'
import networkVideo from '../image/video/case-network.mp4'
import networkPoster from '../image/video/case-network.webp'
import hardwareVideo from '../image/video/case-hardware.mp4'
import hardwarePoster from '../image/video/case-hardware.webp'

// "Laptop dive": a closed laptop opens and turns square to camera as the
// section scrolls, its screen fills the view, and then each further screen
// of scrolling shows the next case on the laptop's display, framed by a
// punched ticket card and a short description. Idea adapted from the
// "Laptop Portfolio" design on motionsites.ai, built with our own media.

const lang = inject('lang')
const router = useRouter()
const en = computed(() => lang.value === 'en')

const work = import.meta.glob('../image/work/*.webp', { eager: true, import: 'default' })
const img = (id) => ({ type: 'img', src: work[`../image/work/${id}.webp`] })
const vid = (src, poster) => ({ type: 'video', src, poster })

const CASES = [
  // The flagship: a real client system in daily use, shown first.
  {
    th: 'ระบบบริหารจัดการงานขนส่งขนาดใหญ่',
    en: 'Large-scale transport management system',
    rows: { th: ['WEB PLATFORM · DRIVER APP', 'สร้างงาน · จ่ายงาน · วางบิล', 'ใช้งานจริงทุกวัน'], en: ['WEB PLATFORM · DRIVER APP', 'JOBS · DISPATCH · BILLING', 'IN DAILY USE'] },
    key: '// featured',
    desc: {
      th: '— รวมโปรแกรมสองตัวของลูกค้ารถบรรทุก 10 ล้อ ให้เหลือแพลตฟอร์มเดียว พร้อมแอปให้คนขับดูงานบนมือถือ',
      en: '— two programs merged into one platform for a 10-wheel truck operator, with a driver app on their phones.',
    },
    media: [{ type: 'img', src: tmsDashboard }, { type: 'img', src: tmsDriver }, { type: 'img', src: tmsLogin }, img('driver-app')],
    action: { to: { th: '/projects/transportation-management', en: '/projects/transportation-management' }, th: 'อ่านกรณีศึกษา', en: 'Read the case study' },
  },
  {
    th: 'พัฒนาแอปพลิเคชั่น Android and IOS',
    en: 'Android & iOS app development',
    rows: { th: ['FLUTTER · FIREBASE', 'ANDROID / IOS', 'แอปสหกรณ์ · แอปคนขับ'], en: ['FLUTTER · FIREBASE', 'ANDROID / IOS', 'CO-OP APP · DRIVER APP'] },
    key: '// apps',
    desc: {
      th: '— แอปมือถือที่ใช้งานจริงในองค์กร ตั้งแต่ระบบสมาชิก สินเชื่อ ไปจนถึงแอปสำหรับคนขับรถ',
      en: '— mobile apps used in real operations, from member and loan systems to a driver app.',
    },
    media: [{ type: 'img', src: loanAppImage }, img('coop-app-home'), img('coop-app-menu'), img('flutter-dev')],
    action: { gallery: 'software', th: 'ดูภาพผลงาน', en: 'See photos' },
  },
  {
    th: 'ติดตั้งกล้องวงจรปิดและติดตั้งระบบเครือข่าย',
    en: 'CCTV & network installation',
    rows: { th: ['CCTV · NVR · ANPR', 'LAN · WI-FI · ROUTER', 'ติดตั้งหน้างาน'], en: ['CCTV · NVR · ANPR', 'LAN · WI-FI · ROUTER', 'ON-SITE INSTALL'] },
    key: '// network',
    desc: {
      th: '— ออกแบบ เดินสาย และติดตั้งกล้องพร้อมระบบเครือข่าย ดูภาพสดได้ทั้งบนเว็บและมือถือ',
      en: '— design, cabling and installation of cameras and networks, with live view on web and mobile.',
    },
    media: [vid(networkVideo, networkPoster), img('cctv-mount'), img('cctv-feeds'), img('network-blueprint')],
    action: { gallery: 'network', th: 'ดูภาพผลงาน', en: 'See photos' },
  },
  {
    th: 'R&D ระบบ IOT แขนกล และ หุ่นยนต์ สำหรับอนาคต',
    en: 'R&D: IoT, robot arms and robots for the future',
    rows: { th: ['ARDUINO · SERVO · 3D PRINT', 'IOT / ROBOTICS', 'วิจัยและพัฒนา'], en: ['ARDUINO · SERVO · 3D PRINT', 'IOT / ROBOTICS', 'RESEARCH & DEVELOPMENT'] },
    key: '// iot lab',
    desc: {
      th: '— ออกแบบ พิมพ์ชิ้นส่วน เดินสาย และเขียนโปรแกรมควบคุมแขนกลและหุ่นยนต์เอง',
      en: '— designing, 3D printing, wiring and programming robot arms and robots in-house.',
    },
    media: [vid(robotVideo, robotPoster), img('robot-arm-red'), img('pcb-solder'), img('printer-3d')],
    action: { to: { th: '/iot', en: '/iot' }, th: 'ดูงาน IoT', en: 'See IoT work' },
  },
  {
    th: 'พัฒนาเว็บไซต์, Software และ ระบบการจัดการ',
    en: 'Websites, software & management systems',
    rows: { th: ['VUE · FIREBASE · PHP', 'WEB / SOFTWARE', 'ระบบหลังบ้าน'], en: ['VUE · FIREBASE · PHP', 'WEB / SOFTWARE', 'BACK-OFFICE SYSTEMS'] },
    key: '// web',
    desc: {
      th: '— เว็บไซต์บริษัท ระบบจัดการภายใน และ PNJ Created Website แพลตฟอร์มสร้างเว็บของเราเอง',
      en: '— company websites, internal systems, and PNJ Created Website, our own site builder.',
    },
    media: [{ type: 'img', src: websiteImage }, img('cctv-web'), img('algo-flowchart'), img('dev-workstation')],
    action: { to: { th: '/website-builder', en: '/en/website-builder' }, th: 'ดู PNJ Created Website', en: 'See PNJ Created Website' },
  },
  {
    th: 'อื่นๆเพิ่มเติม',
    en: 'And more',
    rows: { th: ['ฮาร์ดแวร์ · SECURITY · ดีไซน์', 'ซ่อม · อัปเกรด · อบรม', 'งานจริงกว่า 50 ภาพ'], en: ['HARDWARE · SECURITY · DESIGN', 'REPAIR · UPGRADE · TRAINING', '50+ REAL PHOTOS'] },
    key: '// more',
    desc: {
      th: '— ซ่อมและอัปเกรดคอมพิวเตอร์ การอบรม Cyber Security และงานออกแบบกราฟิก',
      en: '— computer repair and upgrades, Cyber Security training and graphic design.',
    },
    media: [vid(hardwareVideo, hardwarePoster), img('server-dell'), img('ctf-room'), img('design-ragnarok')],
    action: { gallery: 'all', th: 'ดูแกลเลอรีทั้งหมด', en: 'See the full gallery' },
  },
]
const N = CASES.length
const pad = (i) => String(i + 1).padStart(2, '0')

const t = computed(() => ({
  hint: en.value ? 'scroll into the work' : 'เลื่อนลงเพื่อเข้าไปดูผลงาน',
  prev: en.value ? 'previous' : 'ก่อนหน้า',
  next: en.value ? 'next' : 'ถัดไป',
}))

// ---- Scroll-driven pose ------------------------------------------------

const INTRO = 0.16 // share of the section's scroll spent opening and zooming
const sec = ref(null)
const laptop = ref(null)
const lid = ref(null)
const glow = ref(null)
const hint = ref(null)
const active = ref(-1) // case shown on the screen, -1 while still in the intro
const inView = ref(false)
let reduced = false
let stop = null
let io = null

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const lerp = (a, b, k) => a + (b - a) * k

// Laptop box is 800×520 units; the final scale makes the lid as large as the
// space left for it beside (desktop) or between (phone) the case UI.
function finalScale(W, H) {
  if (W <= 820) return Math.min((W * 0.94) / 800, (H * 0.42) / 520)
  return Math.min((W * 0.6) / 800, (H - 190) / 520)
}

function frame() {
  const el = sec.value
  if (!el) return
  const W = window.innerWidth
  const H = window.innerHeight
  const r = el.getBoundingClientRect()
  const p = clamp01(-r.top / Math.max(1, r.height - H))
  const a = reduced ? 1 : clamp01(p / INTRO)
  const e = ease(a)
  const s1 = finalScale(W, H)
  const s = lerp(s1 * 0.55, s1, e)
  const phone = W <= 820
  const ty = lerp(H * 0.06, phone ? H * 0.02 : H * 0.03, e)

  laptop.value.style.transform = `translate3d(0, ${ty}px, 0) scale(${s}) rotateX(${lerp(30, 0, e)}deg) rotateY(${lerp(-26, 0, e)}deg) rotateZ(${lerp(-4, 0, e)}deg)`
  // The lid opens over the first 60% of the intro.
  lid.value.style.transform = `rotateX(${lerp(-86, 0, ease(clamp01(a / 0.6)))}deg)`
  glow.value.style.opacity = String(0.35 + 0.65 * e)
  hint.value.style.opacity = String(1 - clamp01(a * 3))

  let i = -1
  if (a >= 0.98) i = Math.min(N - 1, Math.floor(((p - INTRO) / (1 - INTRO)) * N))
  if (a >= 0.98 && i < 0) i = 0
  if (i !== active.value) active.value = i
}

// Scroll the page to the middle of case i's stretch of the section.
function go(i) {
  const el = sec.value
  if (!el) return
  if (i < 0) i = 0
  if (i >= N) i = 0
  const top = el.getBoundingClientRect().top + window.scrollY
  const span = el.offsetHeight - window.innerHeight
  const p = INTRO + ((i + 0.5) / N) * (1 - INTRO)
  window.scrollTo({ top: top + p * span, behavior: reduced ? 'auto' : 'smooth' })
}

function openGallery(cat) {
  galleryFilter.value = cat
  router.push('/gallery')
}

onMounted(() => {
  reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  stop = onScrollFrame(frame)
  io = new IntersectionObserver(([en]) => { inView.value = en.isIntersecting }, { threshold: 0 })
  io.observe(sec.value)
})
onBeforeUnmount(() => {
  stop?.()
  io?.disconnect()
  clearTimeout(timer)
})

// ---- Screen media: one item at a time; images advance on a timer, a video when it ends.

const mediaIdx = ref(0)
const flash = ref(0)
let timer = null
const current = computed(() => (active.value < 0 ? null : CASES[active.value]))
const item = computed(() => current.value?.media[mediaIdx.value])

function schedule() {
  clearTimeout(timer)
  if (!current.value || !inView.value || item.value?.type === 'video') return
  timer = setTimeout(nextMedia, 3200)
}
function nextMedia() {
  const list = current.value?.media
  if (!list) return
  mediaIdx.value = (mediaIdx.value + 1) % list.length
}
watch(active, () => {
  mediaIdx.value = 0
  flash.value++
})
watch([item, inView], schedule)
</script>

<template>
  <section
    id="projects"
    ref="sec"
    class="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px]"
    style="height: 760svh"
    :aria-label="en ? 'Projects' : 'ผลงาน'"
  >
    <div class="sticky top-0 h-[100svh] overflow-hidden">
      <!-- violet/ember glow that strengthens as the camera pushes in -->
      <div ref="glow" class="dive-glow pointer-events-none absolute inset-0" style="opacity: 0.35" aria-hidden="true"></div>

      <!-- Intro hint -->
      <div ref="hint" class="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
        <span class="drip" aria-hidden="true"></span>
        {{ t.hint }}
      </div>

      <!-- The laptop -->
      <div class="absolute inset-0 flex items-center justify-center" style="perspective: 1800px" aria-hidden="true">
        <div ref="laptop" class="laptop" style="transform: translate3d(0, 6vh, 0) scale(0.6) rotateX(30deg) rotateY(-26deg) rotateZ(-4deg)">
          <div class="base">
            <div class="keys"></div>
            <div class="trackpad"></div>
          </div>
          <div ref="lid" class="lid" style="transform: rotateX(-86deg)">
            <div class="lid-back"><img :src="logo" alt="" class="lid-logo" /></div>
            <div class="lid-front">
              <div class="screen">
                <template v-if="item && inView">
                  <img v-if="item.type === 'video'" :src="item.poster" alt="" class="screen-backdrop" />
                  <img v-else :src="item.src" alt="" class="screen-backdrop" />
                  <Transition name="media" mode="out-in">
                    <video
                      v-if="item.type === 'video'"
                      :key="item.src"
                      :src="item.src"
                      :poster="item.poster"
                      class="screen-media"
                      autoplay
                      muted
                      playsinline
                      @ended="nextMedia"
                    ></video>
                    <img v-else :key="item.src" :src="item.src" alt="" class="screen-media kenburns" />
                  </Transition>
                </template>
                <div v-else class="screen-idle">
                  <img :src="logo" alt="" class="h-16 w-auto opacity-30" style="filter: grayscale(1) brightness(1.6)" />
                </div>
                <div :key="flash" class="screen-flash"></div>
                <div class="screen-sheen"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Case UI -->
      <template v-if="current">
        <Transition name="ticket" mode="out-in" appear>
          <article :key="active" class="ticket">
            <span class="hole" style="left: 12px; top: 12px"></span>
            <span class="hole" style="right: 12px; top: 12px"></span>
            <span class="hole" style="left: 12px; bottom: 12px"></span>
            <span class="hole" style="right: 12px; bottom: 12px"></span>
            <h3 class="ticket-title">{{ current[lang] }}</h3>
            <div class="ticket-rows">
              <p v-for="row in current.rows[lang]" :key="row">{{ row }}</p>
            </div>
          </article>
        </Transition>

        <Transition name="desc" mode="out-in" appear>
          <div :key="active" class="desc">
            <p class="desc-key">{{ current.key }}</p>
            <p class="desc-text">{{ current.desc[lang] }}</p>
            <RouterLink v-if="current.action.to" :to="current.action.to[lang]" class="btn-glow desc-cta">{{ current.action[lang] }} →</RouterLink>
            <button v-else type="button" class="btn-glow desc-cta" @click="openGallery(current.action.gallery)">{{ current.action[lang] }} →</button>
            <p class="desc-num">{{ pad(active) }} / {{ pad(N - 1) }}</p>
          </div>
        </Transition>

        <button type="button" class="nav-case prev" :class="{ dim: active === 0 }" :disabled="active === 0" @click="go(active - 1)">
          <span class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></span>
          <span class="l">{{ t.prev }}</span>
        </button>
        <button type="button" class="nav-case next" @click="go(active + 1)">
          <span class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          <span class="l">{{ t.next }}</span>
        </button>
      </template>
    </div>
  </section>
</template>

<style scoped>
.dive-glow {
  background:
    radial-gradient(45% 55% at 50% 45%, rgba(118, 33, 176, 0.45), transparent 70%),
    radial-gradient(35% 40% at 70% 80%, rgba(232, 64, 13, 0.18), transparent 70%);
}

/* Intro hint: a bead dripping down a thin line */
.drip {
  position: relative;
  width: 1.5px;
  height: 26px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
}
.drip::after {
  content: '';
  position: absolute;
  left: 0;
  top: -40%;
  width: 100%;
  height: 40%;
  background: #fff;
  animation: drip 1.6s cubic-bezier(0.6, 0, 0.4, 1) infinite;
}
@keyframes drip { to { top: 100%; } }

/* ---- Laptop (800×520 units) ---- */
.laptop {
  position: relative;
  width: 800px;
  height: 520px;
  flex-shrink: 0;
  transform-style: preserve-3d;
  will-change: transform;
}
.lid {
  position: absolute;
  inset: 0;
  transform-origin: 50% 100%;
  transform-style: preserve-3d;
}
.lid-front,
.lid-back {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  backface-visibility: hidden;
}
.lid-front {
  background: #0b0b0b;
  box-shadow: 0 0 0 3px #c7ccd1, 0 0 0 4px #8d9298, 0 40px 120px -30px rgba(182, 0, 168, 0.55);
  padding: 16px 16px 30px;
}
.lid-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #e9ecef 0%, #b9bec4 45%, #d9dde1 70%, #a7adb4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lid-logo {
  width: 90px;
  filter: grayscale(1) brightness(0.55) contrast(1.4);
  opacity: 0.7;
}
.base {
  position: absolute;
  left: -5%;
  top: 100%;
  width: 110%;
  height: 540px;
  transform-origin: 50% 0;
  transform: rotateX(90deg);
  border-radius: 0 0 30px 30px;
  background: linear-gradient(180deg, #cfd3d8 0%, #b6bbc1 100%);
  padding: 40px 60px 0;
}
.keys {
  height: 270px;
  border-radius: 10px;
  background-color: #1c1d1f;
  background-image:
    linear-gradient(90deg, transparent 92%, #b6bbc1 92%),
    linear-gradient(180deg, transparent 86%, #b6bbc1 86%);
  background-size: 47px 45px;
}
.trackpad {
  width: 300px;
  height: 170px;
  margin: 34px auto 0;
  border-radius: 14px;
  background: #c3c8cd;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

/* ---- Screen ---- */
.screen {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  background: #000;
}
.screen-backdrop {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  object-fit: cover;
  filter: blur(28px) brightness(0.45) saturate(1.2);
}
.screen-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.kenburns { animation: kenburns 3.4s ease-out both; }
@keyframes kenburns { from { transform: scale(1.06); } to { transform: scale(1); } }
.screen-idle {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(60% 60% at 50% 50%, #1a1a1a, #050505);
}
.screen-flash {
  position: absolute;
  inset: 0;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  animation: flash 0.6s ease-out;
}
@keyframes flash { 30% { opacity: 0.45; } to { opacity: 0; } }
.screen-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(115deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 38%);
}
.media-enter-active, .media-leave-active { transition: opacity 0.35s ease; }
.media-enter-from, .media-leave-to { opacity: 0; }

/* ---- Ticket card (top right) ---- */
.ticket {
  position: absolute;
  right: 32px;
  top: 40px;
  z-index: 5;
  width: 320px;
  border-radius: 4px;
  background: #fff;
  color: #0d0f0e;
  padding: 26px 30px 18px 40px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  transform-origin: 50% 0;
}
.hole {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #0c0c0c;
  box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.5);
}
.ticket-title {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.ticket-rows { margin-top: 10px; }
.ticket-rows p {
  border-bottom: 1.5px dotted #2a2a2a;
  padding: 4px 0 3px;
  text-align: right;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.ticket-enter-active { transition: none; animation: ticket-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.ticket-leave-active { transition: opacity 0.3s cubic-bezier(0.5, 0, 0.75, 0), transform 0.3s cubic-bezier(0.5, 0, 0.75, 0); }
.ticket-leave-to { opacity: 0; transform: translateY(-40px) rotate(4deg); }
@keyframes ticket-in {
  0% { opacity: 0; transform: translateY(-60px) rotate(-6deg); }
  70% { opacity: 1; transform: translateY(6px) rotate(1.2deg); }
  100% { transform: none; }
}

/* ---- Description (left) ---- */
.desc {
  position: absolute;
  left: 32px;
  top: 50%;
  z-index: 5;
  width: 210px;
  transform: translateY(-50%);
}
.desc-key { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
.desc-text { margin-top: 12px; font-size: 15px; line-height: 1.45; color: rgba(255, 255, 255, 0.85); }
.desc-cta { margin-top: 18px; padding: 0.6rem 1.1rem; font-size: 0.8rem; }
.desc-num { margin-top: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: rgba(255, 255, 255, 0.6); }
.desc-enter-active, .desc-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.desc-enter-from { opacity: 0; transform: translateY(calc(-50% + 14px)); }
.desc-leave-to { opacity: 0; transform: translateY(calc(-50% - 10px)); }

/* ---- Prev / next ---- */
.nav-case {
  position: absolute;
  bottom: 40px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.nav-case.prev { left: 60px; }
.nav-case.next { right: 60px; }
.nav-case .c {
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1.6px solid rgba(255, 255, 255, 0.9);
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.nav-case .c svg { width: 22px; height: 22px; }
.nav-case.next .c { background: #fff; color: #0c0c0c; }
.nav-case.next:hover .c { background: #ddd5ff; }
.nav-case:hover .c { transform: scale(1.08); }
.nav-case.dim { opacity: 0.4; cursor: default; }

/* ---- Phones and small tablets: ticket on top, laptop in the middle, text and buttons below ---- */
@media (max-width: 820px) {
  .ticket {
    left: 50%;
    right: auto;
    top: 18px;
    width: min(88vw, 360px);
    margin-left: calc(min(88vw, 360px) / -2);
    padding: 18px 22px 12px 30px;
  }
  .ticket-title { font-size: 19px; }
  .ticket-rows p { font-size: 10px; }
  .hole { width: 12px; height: 12px; }
  .desc {
    left: 6vw;
    right: 6vw;
    top: auto;
    bottom: 92px;
    width: auto;
    transform: none;
    text-align: center;
  }
  .desc-key { display: none; }
  .desc-text { margin-top: 0; font-size: 13.5px; }
  .desc-cta { margin-top: 10px; }
  .desc-num { display: none; }
  .desc-enter-from { transform: translateY(14px); }
  .desc-leave-to { transform: translateY(-10px); }
  .nav-case { bottom: 24px; flex-direction: row; gap: 10px; font-size: 12.5px; }
  .nav-case.prev { left: 6vw; }
  .nav-case.next { right: 6vw; flex-direction: row-reverse; }
  .nav-case .c { width: 42px; height: 42px; }
  .nav-case .c svg { width: 20px; height: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .drip::after, .kenburns, .screen-flash, .ticket-enter-active { animation: none; }
}
</style>
