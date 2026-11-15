<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LandingPageFrame from '../components/threeui/LandingPageFrame.vue'

// The homepage is ThreeUI's Sublevel Studio design rebuilt with PNJ Tech's
// content (scripts/build-pnj-home.py), shown full screen in its own frame.
// Links inside it open in the main window, so the sandbox also allows
// top-level navigation after a click.
const route = useRoute()
const en = computed(() => route.meta.lang === 'en')
const src = computed(() => (en.value ? '/landing-pages/pnj-home-en.html' : '/landing-pages/pnj-home.html'))

// The same headline and links as plain HTML, so the prerendered page carries
// real content for search engines and screen readers that skip the frame.
const t = computed(() =>
  en.value
    ? {
        h1: 'Paphonthanai Jaima (PNJ Tech): a developer building real, working systems, from web and apps to robots',
        lede: 'Android and iOS apps, websites and management systems, CCTV and networking, IoT, robot arms and robots.',
        links: [['/projects', 'Projects'], ['/gallery', 'Gallery'], ['/skills', 'Skills'], ['/process', 'Process'], ['/pricing', 'Pricing'], ['/iot', 'IoT'], ['/en/website-builder', 'Website Builder'], ['/blog', 'Blog'], ['/about', 'About']],
      }
    : {
        h1: 'ปพนธนัย ใจมา (PNJ Tech) นักพัฒนาที่สร้างระบบใช้งานจริง ตั้งแต่เว็บ แอป ไปจนถึงหุ่นยนต์',
        lede: 'แอป Android และ iOS เว็บไซต์และระบบจัดการ กล้องวงจรปิดและเครือข่าย IoT แขนกล และหุ่นยนต์',
        links: [['/projects', 'ผลงาน'], ['/gallery', 'แกลเลอรี'], ['/skills', 'ทักษะ'], ['/process', 'ขั้นตอนการทำงาน'], ['/pricing', 'ราคา'], ['/iot', 'IoT'], ['/website-builder', 'สร้างเว็บไซต์'], ['/blog', 'บทความ'], ['/about', 'เกี่ยวกับ']],
      },
)
</script>

<template>
  <main class="home-frame">
    <div class="sr-only">
      <h1>{{ t.h1 }}</h1>
      <p>{{ t.lede }}</p>
      <nav aria-label="Pages">
        <ul>
          <li v-for="[to, label] in t.links" :key="to"><RouterLink :to="to">{{ label }}</RouterLink></li>
        </ul>
      </nav>
    </div>
    <LandingPageFrame
      :key="src"
      :source-url="src"
      :title="en ? 'PNJ Tech homepage' : 'หน้าแรก PNJ Tech'"
      sandbox-extra="allow-top-navigation-by-user-activation"
    />
  </main>
</template>

<style scoped>
.home-frame {
  width: 100%;
  height: 100svh;
}
</style>
