// The site's showcase pages. Each one is its own small "site" with its own
// accent colours and hero motif, but they share the header, footer and type.
// Used by PageFrame (hero + next-page link) and the homepage's page index.
//
// accent / soft / alt feed the CSS variables --accent, --accent-soft and
// --accent-2 that the sections inside the page read.

export const pages = [
  {
    key: 'projects',
    to: '/projects',
    motif: 'lines',
    accent: '#b600a8',
    soft: '#d0b2ff',
    alt: '#e8400d',
    preview: 'robot-arm-tracked',
    th: {
      name: 'ผลงาน',
      title: 'ผลงานที่ส่งมอบจริง',
      accentWord: 'ส่งมอบจริง',
      sub: 'เลื่อนลงเพื่อเปิดโน้ตบุ๊ก แล้วดูงานทีละชิ้น ตั้งแต่แอปมือถือ ระบบเครือข่าย ไปจนถึงหุ่นยนต์',
    },
    en: {
      name: 'Projects',
      title: 'Work that shipped',
      accentWord: 'shipped',
      sub: 'Scroll to open the laptop and step through the work, from mobile apps and networks to robots.',
    },
  },
  {
    key: 'lab',
    to: '/lab',
    motif: 'none',
    accent: '#d0b2ff',
    soft: '#e4d4ff',
    alt: '#e8400d',
    preview: 'robot-arduino',
    th: { name: 'PNJ Lab', title: 'PNJ Lab', accentWord: '', sub: 'ห้องทดลองที่บันทึกงาน R&D ระหว่างทาง พร้อมกลุ่มอนุภาคที่ขยับตามเมาส์' },
    en: { name: 'PNJ Lab', title: 'PNJ Lab', accentWord: '', sub: 'A running log of R&D work, with a particle cloud that follows your cursor.' },
  },
  {
    key: 'gallery',
    to: '/gallery',
    motif: 'photos',
    accent: '#ff9f1c',
    soft: '#ffd27a',
    alt: '#ff5d3a',
    preview: 'cctv-mount',
    th: {
      name: 'แกลเลอรี',
      title: 'ผลงานจริงจากหน้างาน',
      accentWord: 'หน้างาน',
      sub: 'ภาพจากงานที่ลงมือทำจริง ตั้งแต่หุ่นยนต์ ติดตั้งกล้องวงจรปิด ซ่อมฮาร์ดแวร์ ไปจนถึงพัฒนาซอฟต์แวร์และการอบรมด้าน Cyber Security',
    },
    en: {
      name: 'Gallery',
      title: 'Real work, on site',
      accentWord: 'on site',
      sub: 'Photos from hands-on jobs: robotics, CCTV installs, hardware repair, software development and Cyber Security training.',
    },
  },
  {
    key: 'skills',
    to: '/skills',
    motif: 'grid',
    accent: '#14b8a6',
    soft: '#7ff5e0',
    alt: '#3b82f6',
    preview: 'dev-workstation',
    th: {
      name: 'ทักษะ',
      title: 'Skills & Achievements',
      accentWord: 'Achievements',
      sub: 'โปรเจกต์ที่ทำให้ลูกค้าจริง เทคโนโลยีที่ใช้ และรีวิวจากผู้ว่าจ้าง',
    },
    en: {
      name: 'Skills',
      title: 'Skills & Achievements',
      accentWord: 'Achievements',
      sub: 'Real client projects, the tools behind them, and reviews from the people who hired me.',
    },
  },
  {
    key: 'process',
    to: '/process',
    motif: 'rings',
    accent: '#7c5cff',
    soft: '#c4b5ff',
    alt: '#38bdf8',
    preview: 'algo-flowchart',
    th: {
      name: 'ขั้นตอนการทำงาน',
      title: 'ขั้นตอนการทำงาน',
      accentWord: 'การทำงาน',
      sub: 'จากโจทย์แรกจนถึงระบบที่ใช้งานจริง ห้าขั้นที่ลูกค้าเห็นภาพตลอดทาง',
    },
    en: {
      name: 'Process',
      title: 'How it works',
      accentWord: 'works',
      sub: 'From the first brief to a system in daily use: five steps, with the plan visible the whole way.',
    },
  },
  {
    key: 'pricing',
    to: '/pricing',
    motif: 'horizon',
    accent: '#e8400d',
    soft: '#ffb38a',
    alt: '#ffd166',
    preview: 'pcb-solder',
    th: {
      name: 'ราคา',
      title: 'แพ็กเกจการทำงาน',
      accentWord: 'แพ็กเกจ',
      sub: 'ราคาขึ้นกับขอบเขตงานจริง บอกโจทย์มาแล้วจะประเมินและส่งใบเสนอราคาให้',
    },
    en: {
      name: 'Pricing',
      title: 'Ways to work together',
      accentWord: 'together',
      sub: 'Pricing depends on the real scope. Tell me what you need and I will estimate and send a quotation.',
    },
  },
  {
    key: 'contact',
    to: '/contact',
    motif: 'dots',
    accent: '#0ea5e9',
    soft: '#a5e8ff',
    alt: '#b600a8',
    preview: 'laptop-dell',
    th: {
      name: 'ติดต่อ',
      title: 'คุยกันได้เลย',
      accentWord: 'คุยกัน',
      sub: 'ทักมาทางช่องทางที่สะดวก หรือเล่าโจทย์ไว้ในฟอร์ม แล้วจะติดต่อกลับโดยเร็วที่สุด',
    },
    en: {
      name: 'Contact',
      title: "Let's talk",
      accentWord: 'talk',
      sub: 'Reach me on whichever channel suits you, or leave the brief in the form and I will get back to you soon.',
    },
  },
]

export const pageByKey = Object.fromEntries(pages.map((p) => [p.key, p]))

// The page after `key` in the tour; the last page leads on to the IoT page.
const IOT = { key: 'iot', to: '/iot', accent: '#ff4d3d', th: { name: 'IoT และหุ่นยนต์' }, en: { name: 'IoT & robotics' } }
export function nextPage(key) {
  const i = pages.findIndex((p) => p.key === key)
  return pages[i + 1] || IOT
}
