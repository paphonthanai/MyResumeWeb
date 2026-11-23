<script setup>
import { computed, inject } from 'vue'
import { vReveal } from '../../utils/reveal'

const lang = inject('lang')
const en = computed(() => lang.value === 'en')

// Every way to reach me. `main` channels get the large cards up top.
const CHANNELS = [
  {
    id: 'messenger', main: true,
    href: 'https://m.me/Paphonthanai.name',
    label: 'Messenger',
    value: 'm.me/Paphonthanai.name',
    th: 'ตอบเร็วที่สุด ทักมาได้ทุกเรื่อง', en: 'Fastest reply, for anything',
    icon: 'M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.15.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.98-.87c.17-.08.36-.09.53-.04.91.25 1.88.38 2.91.38 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z',
  },
  {
    id: 'phone', main: true,
    href: 'tel:+66959167424',
    label: 'Phone',
    value: '095-916-7424',
    th: 'โทรหาเนมได้โดยตรง', en: 'Call me directly (ask for Nem)',
    icon: 'M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z',
  },
  {
    id: 'line', main: true,
    href: 'https://line.me/ti/p/~nerononame',
    label: 'LINE',
    value: 'nerononame',
    th: 'แอดไลน์ คุยงานและส่งไฟล์ได้สะดวก', en: 'Add me on LINE to chat and share files',
    icon: 'M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314',
  },
  {
    id: 'email',
    href: 'mailto:Pj06052538@gmail.com',
    label: 'Email',
    value: 'Pj06052538@gmail.com',
    th: 'สำหรับเอกสาร ใบเสนอราคา และงานทางการ', en: 'For documents, quotations and formal work',
    icon: 'M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.2.3 6.25 5.2a.85.85 0 0 0 1.1 0l6.25-5.2A.9.9 0 0 0 18.5 5.5h-13a.9.9 0 0 0-.3.3Z',
  },
  {
    id: 'fb-pnj',
    href: 'https://www.facebook.com/profile.php?id=61552101745680',
    label: 'Facebook',
    value: 'PNJ Tech',
    th: 'เพจงานบริการและผลงาน', en: 'The business page and its work',
    icon: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07',
  },
  {
    id: 'fb-me',
    href: 'https://www.facebook.com/Paphonthanai.name',
    label: 'Facebook',
    value: 'Cyber Sage (ปราชญ์ไซเบอร์)',
    th: 'เรื่อง Cyber Security และเทคโนโลยี', en: 'Cyber Security and tech writing',
    icon: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/',
    label: 'LinkedIn',
    value: 'npjtech',
    th: 'ประวัติการทำงาน', en: 'Work history',
    icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.75s.784-1.75 1.75-1.75 1.75.787 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.271h-3v-4.5c0-1.074-.021-2.458-1.5-2.458s-1.731 1.174-1.731 2.382v4.576h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.561 2.839-1.561 3.033 0 3.591 1.996 3.591 4.59v4.738z',
  },
  {
    id: 'github',
    href: 'https://github.com/paphonthanai',
    label: 'GitHub',
    value: 'paphonthanai',
    th: 'โค้ดและโปรเจกต์ส่วนตัว', en: 'Code and side projects',
    icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    id: 'fastwork',
    href: 'https://fastwork.co/user/0xname',
    label: 'Fastwork',
    value: '0xname',
    th: 'จ้างงานผ่านแพลตฟอร์ม พร้อมรีวิวจากลูกค้า', en: 'Hire through the platform, with client reviews',
    viewBox: '0 0 74 66',
    icon: 'M69.2074 46.9341L54.3403 35.4828L54.6359 37.6972C54.7778 38.5982 54.8489 39.5089 54.8488 40.4209C54.8471 41.2128 54.7957 42.0039 54.6951 42.7893L65.6946 51.2683C66.7159 51.9933 67.4303 53.0739 67.6978 54.2985C67.9652 55.5231 67.7667 56.8036 67.1409 57.8894C66.5151 58.9751 65.5071 59.7879 64.3143 60.1688C63.1215 60.5496 61.8296 60.4711 60.6916 59.9485L44.1331 53.0919C46.3757 51.8277 48.2422 49.989 49.5412 47.7645C50.8402 45.54 51.525 43.0096 51.5253 40.4328C51.5225 39.507 51.4354 38.5835 51.2651 37.6736L47.4921 9.25262C47.1605 6.70642 45.9148 4.36803 43.9877 2.67382C42.0605 0.979611 39.5835 0.0453491 37.0189 0.0453491C34.4543 0.0453491 31.9773 0.979611 30.0502 2.67382C28.123 4.36803 26.8774 6.70642 26.5457 9.25262L24.0737 27.8683L25.836 26.5065C26.5473 25.9344 27.3026 25.4196 28.0951 24.967C28.7683 24.5797 29.4633 24.2318 30.1767 23.9249L32.01 10.1526C32.131 8.90814 32.7104 7.7533 33.6352 6.91308C34.5601 6.07286 35.7642 5.60741 37.013 5.60741C38.2618 5.60741 39.466 6.07286 40.3908 6.91308C41.3157 7.7533 41.895 8.90814 42.016 10.1526L44.3815 27.9157C41.7386 26.3625 38.6731 25.6853 35.6228 25.9809C32.5725 26.2766 29.6936 27.5298 27.3973 29.5617L4.79499 46.9696C2.75241 48.5287 1.34722 50.7795 0.842399 53.3009C0.337575 55.8224 0.767697 58.4416 2.05229 60.6685C3.33688 62.8953 5.38791 64.5772 7.82154 65.3994C10.2552 66.2216 12.9046 66.1277 15.2741 65.1353L32.6014 57.9709L30.5434 57.1183C29.6996 56.7836 28.8814 56.3879 28.0951 55.934C27.4191 55.5454 26.771 55.1101 26.1554 54.6314L13.3108 59.9485C12.1727 60.4711 10.8809 60.5496 9.68804 60.1688C8.49521 59.7879 7.48726 58.9751 6.86148 57.8894C6.23569 56.8036 6.03711 55.5231 6.30461 54.2985C6.5721 53.0739 7.28642 51.9933 8.30775 51.2683L22.5007 40.3262C22.5007 40.3262 22.5007 40.3972 22.5007 40.4328C22.5031 43.3978 23.4107 46.2913 25.1019 48.7254C26.7931 51.1594 29.187 53.0177 31.9627 54.0511L58.7519 65.0998C61.1204 66.0843 63.7657 66.1724 66.1943 65.3477C68.6228 64.5229 70.6687 62.8417 71.9503 60.6176C73.2318 58.3936 73.6614 55.7787 73.1588 53.2608C72.6563 50.743 71.256 48.4942 69.2192 46.9341H69.2074ZM28.0005 40.3972C28.0028 38.6224 28.5306 36.8881 29.5171 35.4135C30.5037 33.9389 31.9047 32.7903 33.543 32.1127C35.1814 31.4351 36.9837 31.259 38.722 31.6067C40.4603 31.9544 42.0566 32.8103 43.3092 34.0661C44.5619 35.3219 45.4145 36.9214 45.7595 38.6623C46.1045 40.4032 45.9263 42.2074 45.2473 43.8469C44.5684 45.4864 43.4193 46.8876 41.9453 47.8734C40.4712 48.8592 38.7383 49.3854 36.9657 49.3854C35.7874 49.3854 34.6206 49.1528 33.5321 48.7009C32.4436 48.2491 31.4548 47.5869 30.6222 46.7521C29.7895 45.9173 29.1294 44.9264 28.6795 43.8359C28.2297 42.7455 27.9989 41.577 28.0005 40.3972Z',
  },
]
const main = CHANNELS.filter((c) => c.main)
const rest = CHANNELS.filter((c) => !c.main)
// mailto: and tel: open the visitor's own app; web links open in a new tab.
const external = (c) => c.href.startsWith('http')
const linkAttrs = (c) => (external(c) ? { target: '_blank', rel: 'noopener noreferrer' } : {})

const ADDRESS = 'อาคารเลขที่ 295/26 กองกำกับการตำรวจตระเวนชายแดนที่ 24 เลขที่ 187 หมู่ 4 ถนนนิตตโย ต.หนองบัว อ.เมือง จ.อุดรธานี 41000'
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('กองกำกับการตำรวจตระเวนชายแดนที่ 24 อุดรธานี')}`
const PIN = 'M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
</script>

<template>
  <section class="px-6 py-16 md:px-10 md:py-20" :aria-label="en ? 'Contact channels' : 'ช่องทางติดต่อ'">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-5 md:grid-cols-3">
        <a
          v-for="c in main"
          :key="c.id"
          v-reveal
          :href="c.href"
          v-bind="linkAttrs(c)"
          class="channel channel-main card-studio group flex flex-col gap-8 p-7 md:p-9"
        >
          <span class="flex items-center justify-between">
            <span class="icon-wrap flex h-14 w-14 items-center justify-center rounded-2xl">
              <svg :viewBox="c.viewBox || '0 0 24 24'" class="h-6 w-6 fill-current" aria-hidden="true"><path :d="c.icon" /></svg>
            </span>
            <svg viewBox="0 0 24 24" class="arrow h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span>
            <span class="block text-xs uppercase tracking-widest text-base-content/50">{{ c.label }}</span>
            <span class="mt-2 block break-all text-2xl font-semibold tracking-tight text-white lg:text-3xl">{{ c.value }}</span>
            <span class="mt-2 block text-sm text-base-content/60">{{ en ? c.en : c.th }}</span>
          </span>
        </a>
      </div>

      <ul class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="c in rest" :key="c.id" v-reveal>
          <a
            :href="c.href"
            v-bind="linkAttrs(c)"
            class="channel card-studio group flex h-full items-start gap-4 p-5"
          >
            <span class="icon-wrap flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <svg :viewBox="c.viewBox || '0 0 24 24'" class="h-[18px] w-[18px] fill-current" aria-hidden="true"><path :d="c.icon" /></svg>
            </span>
            <span class="min-w-0">
              <span class="block text-xs uppercase tracking-widest text-base-content/50">{{ c.label }}</span>
              <span class="mt-1 block truncate font-medium text-white">{{ c.value }}</span>
              <span class="mt-1 block text-xs leading-relaxed text-base-content/55">{{ en ? c.en : c.th }}</span>
            </span>
          </a>
        </li>
      </ul>

      <address v-reveal class="card-studio mt-5 flex flex-col gap-5 p-7 not-italic md:flex-row md:items-center md:justify-between md:p-9">
        <span class="flex items-start gap-4">
          <span class="icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" :d="PIN" /></svg>
          </span>
          <span>
            <span class="block text-xs uppercase tracking-widest text-base-content/50">{{ en ? 'Address' : 'ที่อยู่' }}</span>
            <span class="mt-2 block max-w-3xl leading-relaxed text-white">{{ ADDRESS }}</span>
          </span>
        </span>
        <a
          :href="MAP_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="channel inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2.5 text-sm text-white md:self-center"
        >
          {{ en ? 'Open in Google Maps' : 'เปิดใน Google Maps' }}
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </address>
    </div>
  </section>
</template>

<style scoped>
.channel {
  transition: border-color 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.channel:hover { border-color: color-mix(in srgb, var(--accent-soft) 45%, transparent); transform: translateY(-3px); }
.channel:focus-visible { outline: 2px solid var(--accent-soft); outline-offset: 4px; }
.icon-wrap {
  color: var(--accent-soft);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-soft) 22%, transparent);
}
.channel-main .arrow { color: rgba(255, 255, 255, 0.4); transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease; }
.channel-main:hover .arrow { color: var(--accent-soft); transform: translate(4px, -4px); }
</style>
