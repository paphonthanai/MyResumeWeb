<script setup>
import { computed, inject } from 'vue'

// Rendered inside UserLayout's slot, so it can inject the shared th/en toggle.
const lang = inject('lang')

const content = {
  th: {
    kicker: 'Resume',
    title: 'โปรไฟล์',
    intro:
      'ผมเป็นคนชอบเทคโนโลยีและตั้งใจเรียนรู้เทคโนโลยีให้ได้มากที่สุด เพื่อให้เกิดประโยชน์สูงสุดและบรรลุเป้าหมายที่ตั้งไว้ ปัจจุบันผมอยากพบปะผู้คนและอยู่ในสภาพแวดล้อมที่ส่งเสริมการพัฒนาตัวเองไปสู่เป้าหมายนั้น และหวังว่าจะได้รับโอกาสดังกล่าว ขอบคุณครับ',
    education: 'การศึกษา',
    employment: 'ประวัติการทำงาน',
    activity: 'กิจกรรม',
    activityDesc: 'ดูกิจกรรมและผลงานของผมได้ที่:',
    language: 'ภาษา',
    present: 'ปัจจุบัน',
    and: ' และ ',
    bpp: 'ตำรวจตระเวนชายแดน',
    bppDiv: 'กองกำกับการตำรวจตระเวนชายแดนที่ 24',
    edu: [
      {
        major: 'ระบบสารสนเทศคอมพิวเตอร์',
        year: 'ส.ค. 2557 – มิ.ย. 2558',
        name: 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ลำปาง',
        descrip:
          'ผมศึกษาระดับปริญญาตรีที่มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ลำปาง สาขาระบบสารสนเทศคอมพิวเตอร์ เพราะมีพื้นฐานการเขียน C# และ C++ จากโรงเรียนมัธยม และเป็นหัวหน้าห้องคอยช่วยเพื่อน ๆ ให้เข้าใจการเขียนโปรแกรมมากขึ้น ซึ่งทำให้ผมเข้าใจและสนใจมากขึ้นไปอีก ระหว่างเรียนผมชอบไปห้อง IT ของมหาวิทยาลัย คอยดูงานและศึกษาโค้ดของเจ้าหน้าที่ IT ผมเรียนอยู่หนึ่งปี หลังจากนั้นสอบเข้าตำรวจเพื่อตอบโจทย์ทางบ้าน และไม่ได้เรียนต่อ เพราะรายได้ไม่พอที่จะเรียนต่อ และทางบ้านหยุดสนับสนุนหลังจากที่ผมมีงานทำ',
      },
      {
        major: 'มัธยมศึกษา',
        year: 'พ.ค. 2554 – มิ.ย. 2557',
        name: 'โรงเรียนสร้อยเสรีวิทยา',
        descrip:
          'ผมเรียนมัธยมที่โรงเรียนสร้อยเสรีวิทยา สมัยนั้นผมซ่อมคอมพิวเตอร์ได้ จนครูเห็นและสอนผมเขียนสตอรี่บอร์ดด้วย C# สอนวาดผังงาน (flowchart) และแยกส่วนของวัตถุ ตอน ม.6 ผมรู้สึกหลงใหลวิธีคิดของคนที่สื่อสารกับคอมพิวเตอร์ ผมจึงชอบการเขียนโปรแกรมมาตั้งแต่นั้น',
      },
    ],
    tasks: [
      {
        text: 'เขียนเว็บไซต์ของหน่วยงานด้วย HTML, CSS, JavaScript, PHP บน Dreamweaver ใช้ FileZilla ส่งไฟล์ระหว่างเครื่องกับเซิร์ฟเวอร์ และฐานข้อมูล phpMyAdmin',
        note: 'เว็บไซต์ข้างต้น ผมกับเพื่อนช่วยกันทำเอง',
      },
      { text: 'ออกแบบป้ายสำหรับกิจกรรมต่าง ๆ โดยใช้' },
      { text: 'เชื่อมต่อระบบ LAN ตั้งค่าสัญญาณ Wi-Fi และตัวขยายสัญญาณ Wi-Fi' },
      { text: 'แก้ปัญหาคอมพิวเตอร์ ซ่อมโน้ตบุ๊ก พีซี โทรศัพท์มือถือ เครื่องพิมพ์ เครื่องชงกาแฟ' },
    ],
    english: {
      name: 'ภาษาอังกฤษ',
      skills: [
        { name: 'ฟัง (Listen)', note: 'ถ้าพูดเร็วเกินไปผมจะฟังหรือแปลไม่ทัน' },
        { name: 'พูด (Speak)', note: 'พูดคุยให้เข้าใจกันได้' },
        { name: 'อ่าน (Read)', note: 'อ่านบทความหรือประโยคต่อเนื่องแล้วเข้าใจได้' },
        { name: 'เขียน (Write)', note: 'เขียนประโยคยาวได้ แต่มักสะกดผิด' },
      ],
    },
    thai: 'ภาษาไทย',
  },
  en: {
    kicker: 'Resume',
    title: 'Profile',
    intro:
      'I am a technology enthusiast and have an ambition to understand as much technology as possible. To get the most benefit and achieve the highest goals. Currently, I have a desire to meet people and live in an environment that is conducive to my personal development towards that goal. And I hope I get that change. Thank You.',
    education: 'Education',
    employment: 'Employment',
    activity: 'Activity',
    activityDesc: 'You can view my activities and showcased work at:',
    language: 'Language',
    present: 'Present',
    and: ' and ',
    bpp: 'Border Patrol Police',
    bppDiv: 'Border Patrol Police Division 24',
    edu: [
      {
        major: 'Computer Information System',
        year: 'Aug 2014 – Jun 2015',
        name: 'Rajamangala university of technology Lanna Lampang',
        descrip:
          "I studied for a bachelor's degree at Rajamangala university of technology lanna Lampang Department of Computer Information Systems Because I have knowledge in writing C#, C++ from the high school I study at.And being a student leader to help my friends understand programming better.At the same time, it made me understand and be more interested. While studying,I like to go to the university's IT room. Always go to see the work and study the code of the university's IT staff. I attended university for one year. After that, I took the police entrance exam to satisfy my needs at home and did not continue my studies because the salary was not enough to continue studying and after  i has a job at home stopped supporting me",
      },
      {
        major: 'High School',
        year: 'May 2011 – Jun 2014',
        name: 'Saroi Seri Wittaya School',
        descrip:
          'I attended high school at Saroi Seri Wittaya School. Previously, I could fix computers when the teacher saw me. She taught me how to storyboard in C#. How to draw flowcharts and break down objects When I was in sixth grade, I found myself fascinated with the way people thought about communicating with computers. So I like programming. since then',
      },
    ],
    tasks: [
      {
        text: "Code web design 101 for an agency website with html, css, javascript, php on Dreamweaver and use filezilla to transfer files between the client machine and the server's database of phpmyadmin.",
        note: 'Website above. My friend and I made it ourselves.',
      },
      { text: 'Design signs for various activities using' },
      { text: 'Connect to lan system, Setup wi-fi signal, Setup wi-fi signal booster' },
      { text: 'Fix problems with the computer, Repair Notebook, PC, mobile phone, printer, coffee maker' },
    ],
    english: {
      name: 'English',
      skills: [
        { name: 'Listen', note: "I don't understand or translate if you speak too quickly." },
        { name: 'Speak', note: 'I can talk to you so you can understand.' },
        { name: 'Read', note: 'I can read a continuous passage or sentence and understand it.' },
        { name: 'Write', note: 'I can write long sentences, but I often misspell words.' },
      ],
    },
    thai: 'Thai',
  },
}

const t = computed(() => content[lang.value])

// Non-text data (links, percentages) shared by both languages.
const eduLinks = ['https://lpc.rmutl.ac.th/', 'https://sites.google.com/saroyseree.ac.th/saroyseree/home']
const taskLinks = [
  null,
  [
    { name: 'Photoshop', href: 'https://www.adobe.com/th_en/products/photoshop/landpa.html' },
    { name: 'Illustrator', href: 'https://www.adobe.com/th_en/products/illustrator/campaign/pricing.html' },
  ],
  null,
  null,
]
const activities = [
  { name: 'WEB E-commerce', href: 'https://e-commerce-project-test-01.web.app/' },
  { name: 'CodePen', href: 'https://codepen.io/BaRon-Qube' },
  { name: 'CSS Battle', href: 'https://cssbattle.dev/player/lwWE4eMhEfcH9iY0J5mcVAJo6y63' },
  { name: 'Devlab', href: 'https://www.borntodev.com/devlab/certificate_online/de3efdad8f71fc986e7613eb4e7eb564' },
  { name: 'GitHub', href: 'https://github.com/paphonthanai' },
]
const englishValues = [30, 97, 80, 60]

const languages = computed(() => [
  {
    name: t.value.english.name,
    overall: 70,
    skills: t.value.english.skills.map((s, i) => ({ ...s, value: englishValues[i] })),
  },
  {
    name: t.value.thai,
    overall: 100,
    skills: [
      { name: 'ฟัง (Listen)', value: 100 },
      { name: 'พูด (Speak)', value: 100 },
      { name: 'อ่าน (Read)', value: 100 },
      { name: 'เขียน (Write)', value: 100 },
    ],
  },
])
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:px-10">
    <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.kicker }}</p>
    <h1 class="mt-2 font-display text-4xl font-semibold text-base-content">{{ t.title }}</h1>
    <p class="mt-5 max-w-2xl text-base leading-relaxed text-base-content/70">{{ t.intro }}</p>

    <div class="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
      <!-- Timeline -->
      <div class="space-y-14">
        <section>
          <h2 class="font-display text-2xl font-semibold text-base-content">{{ t.education }}</h2>
          <div class="mt-2 h-px w-14 bg-primary/60"></div>

          <div class="mt-8 space-y-10 border-l border-base-300 pl-8">
            <div v-for="(edu, i) in t.edu" :key="i" class="relative">
              <span class="absolute -left-[calc(2rem+3px)] top-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
              <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <p class="font-display text-lg font-semibold text-base-content">{{ edu.major }}</p>
                <p class="text-xs uppercase tracking-widest text-primary/80">{{ edu.year }}</p>
              </div>
              <a
                :href="eduLinks[i]" target="_blank" rel="noopener noreferrer"
                class="mt-1 inline-block text-sm font-medium text-base-content/80 underline-offset-4 hover:text-primary hover:underline"
              >
                {{ edu.name }}
              </a>
              <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ edu.descrip }}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-display text-2xl font-semibold text-base-content">{{ t.employment }}</h2>
          <div class="mt-2 h-px w-14 bg-primary/60"></div>

          <div class="mt-8 border-l border-base-300 pl-8">
            <div class="relative">
              <span class="absolute -left-[calc(2rem+3px)] top-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
              <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <a href="http://www.bpp.go.th/" target="_blank" rel="noopener noreferrer" class="font-display text-lg font-semibold text-base-content underline-offset-4 hover:text-primary hover:underline">
                  {{ t.bpp }}
                </a>
                <p class="text-xs uppercase tracking-widest text-primary/80">{{ lang === 'th' ? 'ก.พ. 2558' : 'Feb 2015' }} – {{ t.present }}</p>
              </div>
              <a
                href="http://www.bpp.go.th/bpp24/home/indexbpp24.html" target="_blank" rel="noopener noreferrer"
                class="mt-1 inline-block text-sm font-medium text-base-content/80 underline-offset-4 hover:text-primary hover:underline"
              >
                {{ t.bppDiv }}
              </a>

              <ul class="mt-3 space-y-2">
                <li v-for="(task, i) in t.tasks" :key="i" class="flex gap-2 text-sm leading-relaxed text-base-content/60">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"></span>
                  <span>
                    {{ task.text }}
                    <template v-if="taskLinks[i]">
                      <template v-for="(l, li) in taskLinks[i]" :key="li">
                        <a :href="l.href" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">{{ l.name }}</a>
                        <span v-if="li < taskLinks[i].length - 1">{{ t.and }}</span>
                      </template>
                    </template>
                    <em v-if="task.note" class="text-base-content/40"> — {{ task.note }}</em>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-10">
        <section>
          <h2 class="font-display text-xl font-semibold text-base-content">{{ t.activity }}</h2>
          <div class="mt-2 h-px w-12 bg-primary/60"></div>
          <p class="mt-4 text-sm text-base-content/60">{{ t.activityDesc }}</p>
          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="(a, i) in activities" :key="i">
              <a
                :href="a.href" target="_blank" rel="noopener noreferrer"
                class="block rounded-full border border-base-300 px-4 py-2 text-sm text-base-content/70 transition hover:border-primary/60 hover:text-primary"
              >
                {{ a.name }}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-base-content">{{ t.language }}</h2>
          <div class="mt-2 h-px w-12 bg-primary/60"></div>

          <div class="mt-5 space-y-6">
            <div v-for="(l, li) in languages" :key="li">
              <div class="flex items-baseline justify-between">
                <p class="font-display text-base font-semibold text-base-content">{{ l.name }}</p>
                <p class="text-xs text-base-content/40">{{ l.overall }}%</p>
              </div>
              <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-300">
                <div class="h-full rounded-full bg-primary" :style="{ width: l.overall + '%' }"></div>
              </div>

              <ul class="mt-4 space-y-2">
                <li v-for="(s, si) in l.skills" :key="si">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-base-content/60">{{ s.name }}</span>
                    <span class="text-base-content/40">{{ s.value }}%</span>
                  </div>
                  <div class="mt-1 h-1 w-full overflow-hidden rounded-full bg-base-300">
                    <div class="h-full rounded-full bg-primary/60" :style="{ width: s.value + '%' }"></div>
                  </div>
                  <p v-if="s.note" class="mt-1 text-[11px] text-base-content/40">{{ s.note }}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>
