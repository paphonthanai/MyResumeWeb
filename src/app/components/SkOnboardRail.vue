<script setup>
import { computed } from 'vue'
import { useT } from '../i18n'

// Left rail of the sign-up / onboarding screens: wordmark, intro, stepper.
const props = defineProps({
  current: { type: Number, required: true }, // 0 = account, 1–4 = onboarding steps
  email: { type: String, default: '' },
  subs: { type: Array, default: () => [] }, // optional live summaries per step
})

const t = useT({
  th: {
    title: 'สร้างเว็บไซต์สองภาษา\nใน 4 ขั้นตอน',
    intro: 'แก้ทุกอย่างได้ภายหลัง ไม่มีอะไรเผยแพร่จนกว่าคุณจะกด',
    steps: [['สร้างบัญชี', 'อีเมล หรือ Google'], ['ประเภทธุรกิจ', 'เลือกให้ใกล้เคียงที่สุด'], ['ข้อมูลบริษัท', 'ชื่อ TH/EN ที่อยู่ เบอร์ LINE'], ['แม่แบบ โลโก้ สี', 'Poster'], ['เตรียมร่างเว็บไซต์', '5 หน้า × 2 ภาษา']],
    account: 'บัญชี',
  },
  en: {
    title: 'A bilingual website\nin 4 steps',
    intro: 'Change anything later. Nothing goes live until you publish.',
    steps: [['Create account', 'Email or Google'], ['Business type', 'Pick the closest match'], ['Company details', 'Names, address, phone, LINE'], ['Template, logo, colour', 'Poster'], ['Prepare your draft', '5 pages × 2 languages']],
    account: 'Account',
  },
})

const steps = computed(() =>
  t.value.steps.map(([title, sub], i) => ({
    title,
    sub: props.subs[i] || sub,
    state: i < props.current ? 'done' : i === props.current ? 'current' : 'todo',
  })),
)
</script>

<template>
  <aside class="sk-onb-rail">
    <RouterLink to="/app/home" class="sk-wordmark"><i></i><span><b>PNJ Created Website</b><small>by PNJ Tech</small></span></RouterLink>
    <div class="sk-progress" aria-hidden="true"><span v-for="n in 5" :key="n" :class="{ on: n - 1 <= current }"></span></div>
    <div class="sk-onb-intro">
      <h2 style="white-space: pre-line">{{ t.title }}</h2>
      <p style="margin: 0; font-size: 14px; color: #9b9ea4">{{ t.intro }}</p>
    </div>
    <ol class="sk-onb-steps" style="list-style: none; margin: 0; padding: 0">
      <li v-for="(s, i) in steps" :key="i" class="sk-step" :class="`is-${s.state}`" :aria-current="s.state === 'current' ? 'step' : undefined">
        <span class="sk-step-dot">{{ s.state === 'done' ? '✓' : i }}</span>
        <div>
          <div class="sk-step-title">{{ s.title }}</div>
          <div class="sk-step-sub">{{ s.sub }}</div>
        </div>
      </li>
    </ol>
    <div v-if="email" class="sk-onb-account" style="margin-top: auto; font-size: 13px; color: #8b8e94">{{ t.account }}: {{ email }}</div>
  </aside>
</template>
