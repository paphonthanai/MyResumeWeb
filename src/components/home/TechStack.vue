<script setup>
import { computed, inject } from 'vue'

// Tool logos in two rows that drift in opposite directions. Moved here from
// the skills page so the homepage can show it under the client list.
const lang = inject('lang', null)
const title = computed(() => (lang?.value === 'en' ? 'Primary Stack' : 'เทคโนโลยีหลักที่ใช้'))

const techCategories = [
  {
    name: 'Programming Languages',
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'VB.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    items: [
      { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    ],
  },
  {
    name: 'UI & Frontend',
    items: [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://www.svgrepo.com/show/374118/tailwind.svg' },
      { name: 'daisyUI', icon: 'https://img.daisyui.com/images/daisyui/mark-rotating.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    ],
  },
  {
    name: 'Backend & Database',
    items: [
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    name: 'Tools & IDE',
    items: [
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Visual Basic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'XAMPP', icon: 'https://www.apachefriends.org/images/xampp-logo-ac950edf.svg' },
    ],
  },
  {
    name: 'Design_Editing',
    items: [
      { name: 'PremierePro', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/768px-Adobe_Premiere_Pro_CC_icon.svg.png?20210729021549' },
      { name: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/768px-Adobe_Photoshop_CC_icon.svg.png?20200616073617' },
      { name: 'Illustrator', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/768px-Adobe_Illustrator_CC_icon.svg.png?20251029195730' },
    ],
  },
  {
    name: 'Security_CTF',
    items: [
      { name: 'BurpSuite', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/BurpSuite_Comunity_Edition.svg/825px-BurpSuite_Comunity_Edition.svg.png' },
      { name: 'CyberChef', icon: 'https://cdn-1.webcatalog.io/catalog/cyberchef/cyberchef-icon-filled-256.webp?v=1714774077431' },
      { name: 'Ghidra', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ghidra_logo.svg/768px-Ghidra_logo.svg.png?20220727174502' },
      { name: 'IDA', icon: 'https://static.wikitide.net/zenithwiki/0/0d/IDAIcon.png' },
      {
        name: 'KaliLinux',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kali-dragon-icon.svg/768px-Kali-dragon-icon.svg.png?20211125065834',
        // CC BY-SA 4.0: the author must be credited wherever the icon is shown.
        credit: {
          author: 'Abiss21',
          source: 'https://commons.wikimedia.org/wiki/File:Kali-dragon-icon.svg',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
        },
      },
    ],
  },
];

const allTech = techCategories.flatMap((c) => c.items)
const half = Math.ceil(allTech.length / 2)
const techRows = [allTech.slice(0, half), allTech.slice(half)]
// Black logos that would vanish on the dark page
const DARK_LOGOS = new Set(['GitHub', 'Next.js', 'Express'])
// Logos whose licence asks for attribution, credited under the rows
const credits = allTech.filter((t) => t.credit)
</script>

<template>
  <div>
    <h2 class="mx-auto max-w-6xl px-6 text-xs uppercase tracking-[0.14em] text-base-content/45 md:px-10">{{ title }}</h2>
    <div class="tech-stack mt-4 grid gap-4">
      <div v-for="(row, r) in techRows" :key="r" class="stack-row flex w-max gap-4" :class="r && 'is-rev'">
        <template v-for="copy in 2" :key="copy">
          <span
            v-for="tech in row"
            :key="tech.name + copy"
            class="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-3 pr-5"
            :aria-hidden="copy === 2"
          >
            <img :src="tech.icon" alt="" loading="lazy" width="24" height="24" class="h-6 w-6 object-contain" :class="DARK_LOGOS.has(tech.name) && 'invert'" />
            <span class="whitespace-nowrap text-sm text-white/75">{{ tech.name }}</span>
          </span>
        </template>
      </div>
    </div>
    <p v-if="credits.length" class="mx-auto mt-3 max-w-6xl px-6 text-[11px] leading-relaxed text-base-content/35 md:px-10">
      <span v-for="(c, i) in credits" :key="c.name">
        <template v-if="i">; </template>
        {{ c.name === 'KaliLinux' ? 'Kali Linux' : c.name }} icon:
        <a :href="c.credit.source" target="_blank" rel="noopener noreferrer" class="underline decoration-white/20 underline-offset-2 hover:text-white/70">{{ c.credit.author }}</a>,
        <a :href="c.credit.licenseUrl" target="_blank" rel="noopener noreferrer" class="underline decoration-white/20 underline-offset-2 hover:text-white/70">{{ c.credit.license }}</a>,
        via Wikimedia Commons
      </span>
    </p>
  </div>
</template>

<style scoped>
/* Logo rows: masked at the edges, paused on hover, still for reduced motion */
.tech-stack {
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.stack-row { animation: drift 48s linear infinite; }
.stack-row.is-rev { animation-direction: reverse; animation-duration: 56s; }
.tech-stack:hover .stack-row { animation-play-state: paused; }
@keyframes drift {
  to { transform: translateX(calc(-50% - 0.5rem)); }
}
@media (prefers-reduced-motion: reduce) {
  .tech-stack { mask-image: none; }
  .stack-row { animation: none; width: auto; flex-wrap: wrap; padding: 0 1.5rem; }
  .stack-row span[aria-hidden='true'] { display: none; }
}
</style>
