<script setup>
import { computed, inject } from 'vue'
import SectionHeading from '../SectionHeading.vue'
import { vReveal } from '../../utils/reveal'

// Moved here from the skills page. Real figures from the FastWork profile;
// review text stays in the customer's own words, untranslated.
const fastwork = {
  profileUrl: 'https://fastwork.co/user/0xname?source=web_marketplace_profile-menu_profile',
  rating: 4.8,
  orders: 5,
  clients: 3,
  repeatHires: 0,
  reviews: [
    { name: 'wlvczpgx', date: '25/01/2026', rating: 5.0, text: '', anonymous: false },
    { name: '', date: '18/12/2025', rating: 4.8, text: 'ทำงานรวดเร็วมาก เข้าใจในเนื้องานดีมากครับ แนะนำน้องคนนี้เลยย', anonymous: true },
  ],
}

const lang = inject('lang', null)
const t = computed(() =>
  lang?.value === 'en'
    ? { kicker: 'Reviews', title: 'Reviews from FastWork', accent: 'FastWork', orders: 'Orders', clients: 'Clients', repeat: 'Repeat hires', view: 'View profile', anonymous: '***** (anonymous account)' }
    : { kicker: 'Reviews', title: 'รีวิวจาก FastWork', accent: 'FastWork', orders: 'ออเดอร์', clients: 'ลูกค้า', repeat: 'จ้างซ้ำ', view: 'ดูโปรไฟล์', anonymous: '***** (บัญชีไม่ระบุชื่อ)' },
)
</script>

<template>
  <section class="border-t border-white/5">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading :kicker="t.kicker" :title="t.title" :accent="t.accent" />
        <a :href="fastwork.profileUrl" target="_blank" rel="noopener" class="shrink-0 text-sm text-base-content/70 underline-offset-4 transition hover:text-white hover:underline">{{ t.view }} ↗</a>
      </div>

      <div v-reveal class="card-studio mt-12 p-7 md:p-9">
        <p class="flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm text-white/60">
          <span class="inline-flex items-center gap-2 text-3xl font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 text-[#e8400d]" aria-hidden="true">
              <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
            </svg>
            {{ fastwork.rating.toFixed(1) }}
          </span>
          <span><b class="font-semibold text-white">{{ fastwork.orders }}</b> {{ t.orders }}</span>
          <span><b class="font-semibold text-white">{{ fastwork.clients }}</b> {{ t.clients }}</span>
          <span><b class="font-semibold text-white">{{ fastwork.repeatHires }}</b> {{ t.repeat }}</span>
        </p>
        <ul class="mt-6 grid gap-5 sm:grid-cols-2">
          <li v-for="(review, ri) in fastwork.reviews" :key="ri" class="border-t border-white/10 pt-5">
            <p class="flex items-center justify-between gap-3 text-sm">
              <span class="font-medium text-white/80">{{ review.anonymous ? t.anonymous : review.name }}</span>
              <span class="shrink-0 text-xs tabular-nums text-white/45">★ {{ review.rating.toFixed(1) }} · {{ review.date }}</span>
            </p>
            <p v-if="review.text" class="mt-2 text-sm leading-relaxed text-white/70">“{{ review.text }}”</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
