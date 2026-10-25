<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SkShell from '../components/SkShell.vue'
import { chrome, useT } from '../i18n'

// Placeholder for builder screens that are designed but not built yet.
const route = useRoute()
const nav = useT(chrome)
const t = useT({
  th: { title: 'หน้านี้กำลังพัฒนา', body: 'ออกแบบไว้แล้วและจะเปิดให้ใช้ในรุ่นถัดไป ระหว่างนี้แจ้งแก้เว็บไซต์ผ่านทีม PNJ Tech ได้', back: '← กลับหน้าภาพรวม' },
  en: { title: 'This page is on the way', body: 'It is designed and will open in an upcoming release. Until then, the PNJ Tech team can make changes for you.', back: '← Back to overview' },
})
const title = computed(() => nav.value.nav[route.meta.section] || '')
</script>

<template>
  <SkShell :title="title">
    <main class="sk-page">
      <section class="sk-card" style="padding: 40px 32px; max-width: 640px; display: flex; flex-direction: column; gap: 12px">
        <span class="sk-soon" style="align-self: flex-start">{{ nav.soon }}</span>
        <h2 style="font-size: 20px; font-weight: 600">{{ t.title }}</h2>
        <p class="sk-muted" style="margin: 0">{{ t.body }}</p>
        <RouterLink to="/app" class="sk-link" style="margin-top: 8px">{{ t.back }}</RouterLink>
      </section>
    </main>
  </SkShell>
</template>
