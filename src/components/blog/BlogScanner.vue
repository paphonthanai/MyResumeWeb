<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import handPoster from '../image/video/iot-hand.webp'

// "Made for people, read by machines": a belt of mini web pages drifts left
// through a glowing scanner line. Right of the line each card is a page;
// at the line it dissolves into particles; left of it the same area shows
// that page's plain HTML. Idea adapted from the "Distill" comparison section
// on motionsites.ai, filled with mini versions of our own pages.

const lang = inject('lang')
const en = computed(() => lang.value === 'en')
const work = import.meta.glob('../image/work/*.webp', { eager: true, import: 'default' })
const photo = (id) => work[`../image/work/${id}-t.webp`]

const t = computed(() =>
  en.value
    ? {
        eyebrow: 'SEO · AI READABILITY',
        l1: 'Made for people.',
        l2: 'Understood by machines.',
        body: 'Every site we build looks good to people and ships clean, readable HTML that Google and AI agents understand at once. Drag the belt to compare.',
        cta: 'See PNJ Created Website',
        label: 'Read by machine',
        chars: 'chars',
      }
    : {
        eyebrow: 'SEO · AI READABILITY',
        l1: 'สร้างให้คนอ่าน',
        l2: 'ให้เครื่องเข้าใจ',
        body: 'ทุกเว็บที่เราสร้าง สวยสำหรับคน และมี HTML ที่สะอาดให้ Google และ AI อ่านเข้าใจได้ทันที ลองลากสายพานเพื่อเทียบดูได้',
        cta: 'ดู PNJ Created Website',
        label: 'เครื่องอ่านแล้ว',
        chars: 'ตัวอักษร',
      },
)

// Each card's plain-HTML twin. `url` goes in the comment block.
const CARDS = [
  {
    id: 'home',
    url: 'pnj.tech/',
    html: `<h1>PNJ Tech — ปพนธนัย ใจมา</h1>
<p>นักพัฒนาที่สร้างระบบใช้งานจริง
ตั้งแต่เว็บ แอป ไปจนถึงหุ่นยนต์</p>
<h2>บริการ</h2>
<ul>
  <li>พัฒนาเว็บไซต์และระบบจัดการ</li>
  <li>แอป Android และ iOS</li>
  <li>กล้องวงจรปิดและเครือข่าย</li>
  <li>IoT แขนกล และหุ่นยนต์</li>
</ul>
<a href="/pricing#inquiry">ปรึกษาโปรเจกต์</a>`,
  },
  {
    id: 'price',
    url: 'pnj.tech/website-builder#pricing',
    html: `<h1>PNJ Created Website — แพ็กเกจ</h1>
<p>เว็บบริษัทสองภาษา ที่ทีมของคุณ
แก้เองได้</p>
<h2>Free — ฿0 / เดือน</h2>
<ul>
  <li>ที่อยู่เว็บ .web.app</li>
</ul>
<h2>Light — ฿390 / เดือน</h2>
<h2>Core — ฿690 / เดือน</h2>
<a href="/app/login?mode=signup">ลงทะเบียนใช้งาน</a>`,
  },
  {
    id: 'iot',
    url: 'pnj.tech/iot',
    html: `<article>
<h1>IoT แขนกล และหุ่นยนต์</h1>
<p>มือหุ่นยนต์ต้นแบบ ออกแบบ
และพิมพ์ชิ้นส่วน 3 มิติเอง</p>
<h2>เครื่องมือ</h2>
<ul>
  <li>Arduino</li>
  <li>Servo motor</li>
  <li>3D printing</li>
</ul>
</article>`,
  },
  {
    id: 'gallery',
    url: 'pnj.tech/gallery',
    html: `<h1>ผลงานจริงจากหน้างาน</h1>
<figure>
  <img src="robot-arm-red.webp" alt="แขนกลสีแดง">
  <figcaption>R&amp;D หุ่นยนต์</figcaption>
</figure>
<figure>
  <img src="cctv-mount.webp" alt="ติดตั้งกล้องวงจรปิด">
  <figcaption>งานเครือข่าย</figcaption>
</figure>
<p>ภาพงานจริงกว่า 50 ภาพ</p>`,
  },
  {
    id: 'client',
    url: 'firefirstsafetyandtruck.com',
    html: `<h1>Fire First Safety &amp; Truck</h1>
<p>เร็ว. รอด. ปลอดภัย.</p>
<p>มากกว่ารถดับเพลิง
คือความปลอดภัยของทุกชีวิต</p>
<h2>บริการ</h2>
<ul>
  <li>รถดับเพลิง</li>
  <li>อุปกรณ์ดับเพลิง</li>
  <li>บริการฝึกอบรม</li>
</ul>`,
  },
  {
    id: 'blog',
    url: 'pnj.tech/blog',
    html: `<h1>บทความ</h1>
<article>
  <h2>Algorithm คืออะไร?</h2>
  <time>2025-09-28</time>
</article>
<article>
  <h2>ยินดีต้อนรับสู่ Blog ของ PNJ Tech</h2>
  <time>2025-09-27</time>
</article>`,
  },
]
const N = CARDS.length

// ---- engine ----
const stage = ref(null)
const belt = ref(null)
const fx = ref(null)
const counter = ref({ n: 0, pct: 0 })
let raf = 0
let io = null
let running = false

onMounted(() => {
  const cardEls = { value: [...belt.value.querySelectorAll('.card')] }
  const codeEls = { value: [...belt.value.querySelectorAll('.code')] }
  const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const ctx = fx.value.getContext('2d')
  const PAL = ['#7621b0', '#b600a8', '#d36ce3', '#e8400d', '#ffb06a', '#ffeed8', '#ffffff']
  let W, cw, ch, gap, Lx, dpr, bw, bh
  let off = 0
  let vel = 0
  let hover = 0
  let hovering = false
  let drag = null
  let last = 0
  let shownN = 0
  let crossing = -1
  const sparks = []

  const hash = (a, b, c) => {
    let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0
    h = Math.imul(h ^ (h >>> 13), 1274126177) | 0
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296
  }

  function measure() {
    W = window.innerWidth
    const r = cardEls.value[0].getBoundingClientRect()
    cw = r.width
    ch = r.height
    gap = parseFloat(getComputedStyle(stage.value).getPropertyValue('--gapx')) * W / 100
    Lx = W / 2
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    bw = belt.value.clientWidth
    bh = belt.value.clientHeight
    fx.value.width = bw * dpr
    fx.value.height = bh * dpr
    if (!off) off = W / 2 - 0.62 * cw
  }

  const auto = () => (reduced ? 0 : -0.075 * W)
  const mod = (a, n) => ((a % n) + n) % n

  function frame(now) {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 1 / 60)
    last = now
    hover += ((hovering ? 1 : 0) - hover) * Math.min(1, dt * 4)
    if (!drag) {
      const target = auto() * (1 - 0.65 * hover)
      vel += (target - vel) * (1 - Math.exp(-2.2 * dt))
      off += vel * dt
    }

    const span = cw + gap
    const period = span * N
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, bw, bh)
    const top = 70
    let cross = -1
    let crossP = 0

    for (let i = 0; i < N; i++) {
      const x = mod(off + i * span + span, period) - span
      const cut = Math.max(0, Math.min(cw, Lx - x))
      const card = cardEls.value[i]
      const code = codeEls.value[i]
      card.style.transform = `translate3d(${x}px,0,0)`
      code.style.transform = `translate3d(${x}px,0,0)`
      if (cut > 0) {
        card.style.clipPath = `inset(0 0 0 ${cut}px round 0 1.6vw 1.6vw 0)`
        const m = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`
        card.style.maskImage = m
        card.style.webkitMaskImage = m
        code.style.visibility = 'visible'
        code.style.clipPath = `inset(0 ${cw - cut}px 0 0)`
      } else {
        card.style.clipPath = ''
        card.style.maskImage = ''
        card.style.webkitMaskImage = ''
        code.style.visibility = 'hidden'
      }
      if (cut > 0 && cut < cw) { cross = i; crossP = cut / cw }

      // dissolve, only while part of the card is still right of the line
      if (cut > 0 && x + cw > Lx) {
        const hw = Math.min(150, x + cw - Lx)
        const g = ctx.createLinearGradient(Lx, 0, Lx + 150, 0)
        g.addColorStop(0, 'rgba(211,108,227,.4)')
        g.addColorStop(1, 'rgba(211,108,227,0)')
        ctx.fillStyle = g
        ctx.fillRect(Lx, top, hw, ch)

        const R = 0.3 * cw
        const rows = Math.ceil(ch / 3)
        const g0 = Math.floor(cut / 3)
        const g1 = Math.min(Math.ceil(cw / 3), Math.ceil((cut + R) / 3))
        const tw = Math.floor(now / 1000 * 9) + 97
        for (let gx = g0; gx < g1; gx++) {
          const sx = x + gx * 3
          const d = sx - Lx
          if (d < 0) continue
          const p = Math.pow(1 - d / R, 1.7)
          for (let row = -5; row < rows + 5; row++) {
            const inside = row >= 0 && row < rows
            const fade = inside ? 1 : 1 - (row < 0 ? -row : row - rows + 1) / 5
            const thr = inside ? p * 0.92 : p * 0.16 * fade
            if (hash(gx, row, i) >= thr) continue
            if (!reduced && hash(gx, row, tw) < 0.22) continue
            const h2 = hash(row, gx, i + 31)
            const col = d < 10 ? PAL[4 + Math.floor(h2 * 3)] : PAL[Math.floor(h2 * h2 * 7)]
            const s = 1.1 + h2 * 1.7
            const jx = reduced ? 0 : (hash(gx, row, i + 7) - 0.5) * 1.6
            const jy = reduced ? 0 : (hash(row, gx, i + 11) - 0.5) * 1.6
            ctx.fillStyle = col
            ctx.fillRect(sx + jx, top + row * 3 + jy, s, s)
          }
        }
        if (!reduced) {
          for (let k = 0; k < 3; k++) {
            if (Math.random() < 0.7 && sparks.length < 160) {
              sparks.push({
                x: Lx + Math.random() * 30,
                y: top - 10 + Math.random() * (ch + 20),
                vx: -30 + Math.random() * 70 + vel * 0.6,
                vy: (Math.random() - 0.5) * 50,
                s: 0.8 + Math.random() * 1.8,
                c: PAL[Math.floor(Math.random() * PAL.length)],
                life: 0.3 + Math.random() * 0.8,
              })
            }
          }
        }
      }
    }
    for (let k = sparks.length - 1; k >= 0; k--) {
      const s = sparks[k]
      s.life -= dt
      if (s.life <= 0) { sparks.splice(k, 1); continue }
      s.x += s.vx * dt
      s.y += s.vy * dt
      ctx.globalAlpha = Math.min(1, s.life * 2.2)
      ctx.fillStyle = s.c
      ctx.fillRect(s.x, s.y, s.s, s.s)
    }
    ctx.globalAlpha = 1

    // counter: characters of HTML "printed" so far for the crossing card
    if (cross >= 0) {
      const total = CARDS[cross].html.length
      const target = Math.round(total * crossP)
      if (cross !== crossing) { crossing = cross; shownN = target }
      shownN += (target - shownN) * Math.min(1, dt * 14)
      counter.value = { n: Math.round(shownN), pct: Math.round(crossP * 100) }
    }
  }

  // input
  const el = belt.value
  el.addEventListener('pointerenter', () => { hovering = true })
  el.addEventListener('pointerleave', () => { hovering = false })
  el.addEventListener('pointerdown', (e) => {
    el.setPointerCapture(e.pointerId)
    drag = { x: e.clientX, t: performance.now() }
    el.classList.add('dragging')
  })
  el.addEventListener('pointermove', (e) => {
    if (!drag) return
    const now = performance.now()
    const dx = e.clientX - drag.x
    off += dx
    vel = (dx / Math.max(8, now - drag.t)) * 1000 * 0.8 + vel * 0.2
    drag = { x: e.clientX, t: now }
  })
  const end = () => { drag = null; el.classList.remove('dragging') }
  el.addEventListener('pointerup', end)
  el.addEventListener('pointercancel', end)
  el.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { vel += -e.deltaX * 6; e.preventDefault() }
  }, { passive: false })

  measure()
  window.addEventListener('resize', measure)
  io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) { running = true; last = 0; raf = requestAnimationFrame(frame) }
    else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(raf) }
  })
  io.observe(stage.value)
  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    io?.disconnect()
    window.removeEventListener('resize', measure)
  })
})

const fmt = (n) => n.toLocaleString('en-US')
</script>

<template>
  <section ref="stage" class="scanner-stage relative h-[100svh] min-h-[640px] overflow-hidden">
    <!-- Hero copy -->
    <div class="hero-copy relative z-10 grid gap-[4vw] px-[8.9vw] pt-10 md:grid-cols-[1fr_34vw]">
      <div>
        <span class="eyebrow">{{ t.eyebrow }}</span>
        <h1 class="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-white md:text-[clamp(30px,3.4vw,58px)]">
          {{ t.l1 }}<br /><span class="glow-text">{{ t.l2 }}</span>
        </h1>
      </div>
      <div class="md:pt-9">
        <p class="text-[14px] leading-relaxed text-base-content/65 md:text-[clamp(14px,1.05vw,18px)]">{{ t.body }}</p>
        <RouterLink :to="en ? '/en/website-builder' : '/website-builder'" class="btn btn-shimmer mt-5 rounded-full px-6">{{ t.cta }} →</RouterLink>
      </div>
    </div>

    <!-- Belt -->
    <div ref="belt" class="belt" aria-hidden="true">
      <div class="codes">
        <div v-for="(c, i) in CARDS" :key="c.id" class="code">
          <pre class="code-html">{{ c.html }}</pre>
          <pre class="code-meta">&lt;!-- {{ c.html.length.toLocaleString('en-US') }} chars of HTML --&gt;
&lt;!-- readable by Google and AI --&gt;
&lt;!-- {{ c.url }} --&gt;</pre>
        </div>
      </div>

      <div class="cards">
        <!-- 1 Home -->
        <div class="card k-home" :style="{ backgroundImage: `linear-gradient(180deg, rgba(10,6,14,.3), transparent 30%, rgba(10,6,14,.7)), url(${photo('dev-workstation')})` }">
          <div class="k-nav"><span class="k-logo">PNJ<i> tech</i></span><span class="k-menu"><b>HOME</b><span>WORK</span><span>LAB</span></span></div>
          <div class="k-home-stats"><div><strong>50+</strong><small>{{ en ? 'real photos' : 'ภาพงานจริง' }}</small></div><span class="k-rule"></span><div><strong>5+</strong><small>{{ en ? 'years' : 'ปีประสบการณ์' }}</small></div></div>
          <p class="k-home-tag">{{ en ? 'A developer building real, working systems.' : 'นักพัฒนาที่สร้างระบบใช้งานจริง' }}</p>
        </div>
        <!-- 2 Pricing -->
        <div class="card k-price">
          <div class="k-nav"><span class="k-logo">PNJ<i> website</i></span><span class="k-menu"><span>FEATURES</span><b>PRICING</b><span>FAQ</span></span></div>
          <p class="k-price-big"><sup>฿</sup>390</p>
          <p class="k-mono k-price-sub">{{ en ? 'PER MONTH · LIGHT' : 'ต่อเดือน · LIGHT' }}</p>
          <ul class="k-plans"><li><span>Free</span><span>฿0</span></li><li><span>Light</span><span>฿390</span></li><li><span>Core</span><span>฿690</span></li></ul>
          <span class="k-pill">{{ en ? 'Sign up' : 'ลงทะเบียนใช้งาน' }}</span>
        </div>
        <!-- 3 IoT -->
        <div class="card k-iot">
          <div class="k-iot-bg" :style="{ backgroundImage: `url(${handPoster})` }"></div>
          <div class="k-nav"><span class="k-logo">PNJ<i> iot</i></span><span class="k-menu"><span>HOME</span><b>IOT</b><span>LAB</span></span></div>
          <p class="k-mono k-iot-kick">R&amp;D · IOT LAB</p>
          <p class="k-iot-title">{{ en ? 'A robot hand prototype, designed and 3D printed in-house' : 'มือหุ่นยนต์ต้นแบบ ออกแบบและพิมพ์ชิ้นส่วน 3 มิติเอง' }}</p>
          <div class="k-iot-stats"><div><strong>3D</strong><small>printed</small></div><div><strong>5</strong><small>fingers</small></div><div><strong>1</strong><small>servo board</small></div></div>
        </div>
        <!-- 4 Gallery -->
        <div class="card k-gallery">
          <div class="k-nav"><span class="k-logo">PNJ<i> tech</i></span><span class="k-menu"><span>HOME</span><b>GALLERY</b><span>LAB</span></span></div>
          <div class="k-tiles">
            <div :style="{ backgroundImage: `url(${photo('robot-arm-red')})` }"></div>
            <div :style="{ backgroundImage: `url(${photo('cctv-mount')})` }"></div>
            <p>{{ en ? 'Real work, ' : 'ผลงานจริงจาก' }}<em>{{ en ? 'on site.' : 'หน้างาน' }}</em></p>
          </div>
          <div class="k-foot"><span>{{ en ? 'Robotics · CCTV · Hardware' : 'หุ่นยนต์ · กล้อง · ฮาร์ดแวร์' }}</span><span>50+ photos</span></div>
        </div>
        <!-- 5 Client -->
        <div class="card k-client">
          <div class="k-nav"><span class="k-logo">FIRE FIRST</span><span class="k-menu"><b>HOME</b><span>TRUCKS</span><span>TRAINING</span></span></div>
          <p class="k-client-title">เร็ว.<br />รอด.<br />ปลอดภัย.</p>
          <ul class="k-specs"><li><span>{{ en ? 'Built with' : 'สร้างด้วย' }}</span><b>PNJ Website</b></li><li><span>{{ en ? 'Languages' : 'ภาษา' }}</span><b>TH · EN</b></li><li><span>SEO</span><b>{{ en ? 'every page' : 'ครบทุกหน้า' }}</b></li></ul>
        </div>
        <!-- 6 Blog -->
        <div class="card k-blog">
          <div class="k-nav"><span class="k-logo">PNJ<i> blog</i></span><span class="k-menu"><span>HOME</span><b>BLOG</b><span>ABOUT</span></span></div>
          <p class="k-blog-title">{{ en ? 'Blog' : 'บทความ' }} <em>{{ en ? 'notes from the bench' : 'บันทึกจากงานจริง' }}</em></p>
          <div class="k-posts">
            <div><i :style="{ backgroundImage: `url(${photo('algo-flowchart')})` }"></i><small>ALGORITHM</small><span>Algorithm คืออะไร?</span></div>
            <div><i :style="{ backgroundImage: `url(${photo('flutter-dev')})` }"></i><small>BLOG</small><span>ยินดีต้อนรับสู่ Blog</span></div>
            <div><i :style="{ backgroundImage: `url(${photo('ctf-room')})` }"></i><small>SECURITY</small><span>Cyber Security</span></div>
          </div>
        </div>
      </div>

      <canvas ref="fx" class="fx"></canvas>
    </div>

    <!-- Scanner line and counter -->
    <div class="scan" aria-hidden="true"><i></i><b></b></div>
    <div class="counter" aria-hidden="true">
      <span class="counter-label">{{ t.label }}</span>
      <span class="counter-pill"><span class="n">{{ fmt(counter.n) }} {{ t.chars }}</span><span class="p">{{ counter.pct }}%</span></span>
    </div>
  </section>
</template>

<style scoped>
.scanner-stage {
  --cw: 46vw;
  --ch: min(48vh, 30vw);
  --gapx: 4.75;
  --top: max(42vh, 300px);
}
@media (max-width: 767px) {
  .scanner-stage { --cw: 84vw; --ch: 54vw; --gapx: 7; --top: 58svh; }
  .hero-copy { padding: 18px 20px 0; gap: 14px; }
}

.belt {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--top) - 70px);
  height: calc(var(--ch) + 140px);
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
}
.belt.dragging { cursor: grabbing; }
.codes {
  position: absolute;
  inset: 0;
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 24vw);
  mask-image: linear-gradient(90deg, transparent 0, #000 24vw);
}
@media (max-width: 767px) {
  .codes { -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 30vw); mask-image: linear-gradient(90deg, transparent 0, #000 30vw); }
}
.cards { position: absolute; inset: 0; }
.fx { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.code,
.card {
  position: absolute;
  top: 70px;
  left: 0;
  width: var(--cw);
  height: var(--ch);
}
.code {
  container-type: inline-size;
  visibility: hidden;
  overflow: hidden;
}
.code pre {
  position: absolute;
  top: 0;
  margin: 0;
  font-family: 'SF Mono', Menlo, Consolas, 'Noto Sans Thai', monospace;
  font-size: 1.56cqw;
  line-height: 1.39;
  white-space: pre;
}
.code-html { left: 0; color: #7a7f88; }
.code-meta { left: 51%; color: #4a4f58; }

/* ---- Scanner and counter ---- */
.scan {
  position: absolute;
  left: 50%;
  top: calc(var(--top) - 14px);
  height: calc(var(--ch) + 40px);
  width: 0;
  z-index: 3;
  pointer-events: none;
}
.scan i {
  position: absolute;
  left: -2px;
  top: 0;
  width: 4px;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(180deg, #ffb06a, #d36ce3 12%, #b600a8 88%, #ffb06a);
  box-shadow: 0 0 10px 2px rgba(211, 108, 227, 0.85), 0 0 34px 10px rgba(182, 0, 168, 0.38);
}
.scan b {
  position: absolute;
  left: 0;
  top: 4%;
  width: 42px;
  height: 92%;
  background: linear-gradient(90deg, rgba(211, 108, 227, 0.5), transparent);
  filter: blur(6px);
}
.counter {
  position: absolute;
  left: 50%;
  top: calc(var(--top) - 64px);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transform: translateX(-50%);
  pointer-events: none;
}
.counter-label { font-size: 11.5px; color: #8b9098; }
.counter-pill {
  display: flex;
  height: 26px;
  overflow: hidden;
  border-radius: 9999px;
  box-shadow: 0 0 18px rgba(211, 108, 227, 0.35);
  font-family: 'SF Mono', Menlo, Consolas, 'Noto Sans Thai', monospace;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.counter-pill .n { display: flex; align-items: center; background: #b600a8; color: #fff; padding: 0 11px 0 13px; }
.counter-pill .p { display: flex; align-items: center; background: #ffeed8; color: #7621b0; padding: 0 12px 0 10px; font-size: 11px; }

/* ---- Mini pages (sized in cqw = 1% of card width) ---- */
.card {
  container-type: inline-size;
  overflow: hidden;
  border-radius: 1.6vw;
  color: #fff;
  background-size: cover;
  background-position: center;
  will-change: transform, clip-path;
}
@media (max-width: 767px) { .card { border-radius: 3vw; } }
.k-nav {
  position: absolute;
  left: 4.4cqw;
  right: 4.4cqw;
  top: 4cqw;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.k-logo { font-size: 4cqw; font-weight: 600; letter-spacing: -0.03em; }
.k-logo i { font-style: normal; font-weight: 300; opacity: 0.6; }
.k-menu { display: flex; gap: 3.4cqw; font-size: 1.32cqw; font-weight: 500; letter-spacing: 0.14em; opacity: 0.85; }
.k-menu b { font-weight: 500; border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 9999px; padding: 0.7cqw 1.6cqw; margin: -0.7cqw -1.6cqw; }
.k-mono { font-family: 'SF Mono', Menlo, Consolas, monospace; }

.k-home-stats { position: absolute; left: 4.4cqw; bottom: 5cqw; display: flex; gap: 4cqw; align-items: stretch; }
.k-home-stats strong { display: block; font-size: 9cqw; font-weight: 300; line-height: 0.9; letter-spacing: -0.04em; }
.k-home-stats small { font-size: 1.9cqw; opacity: 0.85; }
.k-rule { width: 1px; background: rgba(255, 255, 255, 0.35); }
.k-home-tag { position: absolute; right: 4.4cqw; bottom: 5cqw; width: 26cqw; font-size: 2.2cqw; line-height: 1.3; }

.k-price { background: radial-gradient(120% 90% at 20% 110%, #b600a8 0, #d36ce3 35%, #e9c6f2 62%, #f3e8f7 100%); color: #2a0a2e; }
.k-price .k-menu b { border-color: rgba(42, 10, 46, 0.6); }
.k-price-big { position: absolute; left: 4.4cqw; top: 30%; font-size: 13cqw; font-weight: 300; letter-spacing: -0.05em; line-height: 1; }
.k-price-big sup { font-size: 0.4em; vertical-align: 0.9em; }
.k-price-sub { position: absolute; left: 4.4cqw; top: 58%; font-size: 1.6cqw; opacity: 0.75; }
.k-plans { position: absolute; right: 4.4cqw; top: 30%; width: 36cqw; font-size: 2cqw; }
.k-plans li { display: flex; justify-content: space-between; border-top: 1px solid rgba(42, 10, 46, 0.25); padding: 1.4cqw 0; }
.k-pill { position: absolute; left: 4.4cqw; bottom: 5cqw; border-radius: 9999px; background: #2a0a2e; color: #f7e6f6; padding: 1.4cqw 3cqw; font-size: 1.8cqw; }

.k-iot { background: #140c14; }
.k-iot-bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; filter: blur(1.2cqw) saturate(1.1); transform: scale(1.12); }
.k-iot::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20, 8, 20, 0.2), rgba(20, 8, 20, 0.7)); }
.k-iot-kick, .k-iot-title, .k-iot-stats { position: absolute; z-index: 1; left: 4.4cqw; }
.k-iot-kick { top: 17%; font-size: 1.4cqw; }
.k-iot-title { top: 25%; width: 60cqw; font-size: 4.2cqw; font-weight: 600; line-height: 1.2; }
.k-iot-stats { right: 4.4cqw; bottom: 5cqw; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3cqw; }
.k-iot-stats div { border-top: 1px solid rgba(255, 255, 255, 0.35); padding-top: 1.2cqw; }
.k-iot-stats strong { display: block; font-size: 6cqw; font-weight: 300; line-height: 1; }
.k-iot-stats small { font-size: 1.6cqw; opacity: 0.8; }

.k-gallery { background: #161114; }
.k-tiles { position: absolute; left: 4.4cqw; right: 4.4cqw; top: 21%; height: 46%; display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 2cqw; }
.k-tiles div { border-radius: 1.4cqw; background-size: cover; background-position: center; }
.k-tiles p { align-self: center; font-size: 3.6cqw; font-weight: 600; line-height: 1.2; }
.k-tiles em { font-style: normal; opacity: 0.6; }
.k-foot { position: absolute; left: 4.4cqw; right: 4.4cqw; bottom: 5cqw; display: flex; justify-content: space-between; font-size: 1.6cqw; opacity: 0.7; }

.k-client { background: #ec3013; }
.k-client-title { position: absolute; left: 4.4cqw; bottom: 5cqw; font-size: 9cqw; font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; }
.k-specs { position: absolute; right: 4.4cqw; bottom: 5cqw; width: 30cqw; font-size: 1.7cqw; }
.k-specs li { display: flex; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, 0.4); padding: 1.2cqw 0; }
.k-specs b { font-weight: 600; }

.k-blog { background: #e9ecf1; color: #121a2a; }
.k-blog .k-menu { opacity: 0.7; }
.k-blog .k-menu b { border-color: rgba(18, 26, 42, 0.5); }
.k-blog-title { position: absolute; left: 4.4cqw; top: 21%; font-size: 5cqw; font-weight: 700; line-height: 1.05; }
.k-blog-title em { display: block; font-style: normal; font-weight: 400; color: #7621b0; font-size: 3.2cqw; }
.k-posts { position: absolute; left: 4.4cqw; right: 4.4cqw; bottom: 5cqw; display: grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 2cqw; }
.k-posts i { display: block; aspect-ratio: 4 / 3; border-radius: 1.2cqw; background-size: cover; background-position: center; }
.k-posts small { display: block; margin-top: 1cqw; font-family: 'SF Mono', Menlo, monospace; font-size: 1.2cqw; color: #6a7891; }
.k-posts span { display: block; font-size: 1.8cqw; font-weight: 600; line-height: 1.2; }
</style>
