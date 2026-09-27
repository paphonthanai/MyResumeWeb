<script setup>
import UserLayout from '../layout/UserLayout.vue'

const education = [
  {
    major: 'Computer Information System',
    year: 'Aug 2014 – Jun 2015',
    name: 'Rajamangala university of technology Lanna Lampang',
    link: 'https://lpc.rmutl.ac.th/',
    descrip: "I studied for a bachelor's degree at Rajamangala university of technology lanna Lampang Department of Computer Information Systems Because I have knowledge in writing C#, C++ from the high school I study at.And being a student leader to help my friends understand programming better.At the same time, it made me understand and be more interested. While studying,I like to go to the university's IT room. Always go to see the work and study the code of the university's IT staff. I attended university for one year. After that, I took the police entrance exam to satisfy my needs at home and did not continue my studies because the salary was not enough to continue studying and after  i has a job at home stopped supporting me",
  },
  {
    major: 'High School',
    year: 'May 2011 – Jun 2014',
    name: 'Saroi Seri Wittaya School',
    link: 'https://sites.google.com/saroyseree.ac.th/saroyseree/home',
    descrip: 'I attended high school at Saroi Seri Wittaya School. Previously, I could fix computers when the teacher saw me. She taught me how to storyboard in C#. How to draw flowcharts and break down objects When I was in sixth grade, I found myself fascinated with the way people thought about communicating with computers. So I like programming. since then',
  },
]

const employmentTasks = [
  {
    text: "Code web design 101 for an agency website with html, css, javascript, php on Dreamweaver and use filezilla to transfer files between the client machine and the server's database of phpmyadmin.",
    note: 'Website above. My friend and I made it ourselves.',
  },
  {
    text: 'Design signs for various activities using',
    links: [
      { name: 'Photoshop', href: 'https://www.adobe.com/th_en/products/photoshop/landpa.html' },
      { name: 'Illustrator', href: 'https://www.adobe.com/th_en/products/illustrator/campaign/pricing.html' },
    ],
  },
  { text: 'Connect to lan system, Setup wi-fi signal, Setup wi-fi signal booster' },
  { text: 'Fix problems with the computer, Repair Notebook, PC, mobile phone, printer, coffee maker' },
]

const activities = [
  { name: 'WEB E-commerce', href: 'https://e-commerce-project-test-01.web.app/' },
  { name: 'CodePen', href: 'https://codepen.io/BaRon-Qube' },
  { name: 'CSS Battle', href: 'https://cssbattle.dev/player/lwWE4eMhEfcH9iY0J5mcVAJo6y63' },
  { name: 'Devlab', href: 'https://www.borntodev.com/devlab/certificate_online/de3efdad8f71fc986e7613eb4e7eb564' },
  { name: 'GitHub', href: 'https://github.com/paphonthanai' },
]

const languages = [
  {
    name: 'English',
    overall: 70,
    skills: [
      { name: 'Listen', value: 30, note: "I don't understand or translate if you speak too quickly." },
      { name: 'Speak', value: 97, note: 'I can talk to you so you can understand.' },
      { name: 'Read', value: 80, note: 'I can read a continuous passage or sentence and understand it.' },
      { name: 'Write', value: 60, note: 'I can write long sentences, but I often misspell words.' },
    ],
  },
  {
    name: 'Thai',
    overall: 100,
    skills: [
      { name: 'ฟัง (Listen)', value: 100 },
      { name: 'พูด (Speak)', value: 100 },
      { name: 'อ่าน (Read)', value: 100 },
      { name: 'เขียน (Write)', value: 100 },
    ],
  },
]
</script>

<template>
  <UserLayout>
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <p class="text-xs uppercase tracking-[0.25em] text-primary/90">Resume</p>
      <h1 class="mt-2 font-display text-4xl font-semibold text-base-content">Profile</h1>
      <p class="mt-5 max-w-2xl text-base leading-relaxed text-base-content/70">
        I am a technology enthusiast and have an ambition to understand as much technology as possible.
        To get the most benefit and achieve the highest goals. Currently, I have a desire to meet people
        and live in an environment that is conducive to my personal development towards that goal.
        And I hope I get that change. Thank You.
      </p>

      <div class="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <!-- Timeline -->
        <div class="space-y-14">
          <section>
            <h2 class="font-display text-2xl font-semibold text-base-content">Education</h2>
            <div class="mt-2 h-px w-14 bg-primary/60"></div>

            <div class="mt-8 space-y-10 border-l border-base-300 pl-8">
              <div v-for="(edu, i) in education" :key="i" class="relative">
                <span class="absolute -left-[calc(2rem+3px)] top-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <p class="font-display text-lg font-semibold text-base-content">{{ edu.major }}</p>
                  <p class="text-xs uppercase tracking-widest text-primary/80">{{ edu.year }}</p>
                </div>
                <a
                  :href="edu.link" target="_blank" rel="noopener noreferrer"
                  class="mt-1 inline-block text-sm font-medium text-base-content/80 underline-offset-4 hover:text-primary hover:underline"
                >
                  {{ edu.name }}
                </a>
                <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ edu.descrip }}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="font-display text-2xl font-semibold text-base-content">Employment</h2>
            <div class="mt-2 h-px w-14 bg-primary/60"></div>

            <div class="mt-8 border-l border-base-300 pl-8">
              <div class="relative">
                <span class="absolute -left-[calc(2rem+3px)] top-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <a href="http://www.bpp.go.th/" target="_blank" rel="noopener noreferrer" class="font-display text-lg font-semibold text-base-content underline-offset-4 hover:text-primary hover:underline">
                    Border Patrol Police
                  </a>
                  <p class="text-xs uppercase tracking-widest text-primary/80">Feb 2015 – Present</p>
                </div>
                <a
                  href="http://www.bpp.go.th/bpp24/home/indexbpp24.html" target="_blank" rel="noopener noreferrer"
                  class="mt-1 inline-block text-sm font-medium text-base-content/80 underline-offset-4 hover:text-primary hover:underline"
                >
                  Border Patrol Police Division 24
                </a>

                <ul class="mt-3 space-y-2">
                  <li v-for="(task, i) in employmentTasks" :key="i" class="flex gap-2 text-sm leading-relaxed text-base-content/60">
                    <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"></span>
                    <span>
                      {{ task.text }}
                      <template v-if="task.links">
                        <template v-for="(l, li) in task.links" :key="li">
                          <a :href="l.href" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">{{ l.name }}</a>
                          <span v-if="li < task.links.length - 1"> and </span>
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
            <h2 class="font-display text-xl font-semibold text-base-content">Activity</h2>
            <div class="mt-2 h-px w-12 bg-primary/60"></div>
            <p class="mt-4 text-sm text-base-content/60">You can view my activities and showcased work at:</p>
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
            <h2 class="font-display text-xl font-semibold text-base-content">Language</h2>
            <div class="mt-2 h-px w-12 bg-primary/60"></div>

            <div class="mt-5 space-y-6">
              <div v-for="(lang, li) in languages" :key="li">
                <div class="flex items-baseline justify-between">
                  <p class="font-display text-base font-semibold text-base-content">{{ lang.name }}</p>
                  <p class="text-xs text-base-content/40">{{ lang.overall }}%</p>
                </div>
                <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-300">
                  <div class="h-full rounded-full bg-primary" :style="{ width: lang.overall + '%' }"></div>
                </div>

                <ul class="mt-4 space-y-2">
                  <li v-for="(s, si) in lang.skills" :key="si">
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
  </UserLayout>
</template>
