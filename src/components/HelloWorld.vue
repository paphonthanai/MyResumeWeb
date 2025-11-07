<script setup>
import { ref, computed } from 'vue'
import { inject, } from 'vue'
// เลือกภาษา
const lang = inject('lang')

// เนื้อหาทั้งหมดแยกตามภาษา
const content = {
  th: {
    
    sectionTitle: 'Skills & Achievements',
    primaryStack: 'เทคโนโลยีหลักที่ใช้',
    fullstackCliDev: 'พัฒนาแบบไม่ใช้ GUI',
    experience: 'ประสบการณ์',
    experlemceDetail: 'ประสบการณ์ทำงานอิสระมากกว่า 5 ปี — ส่งมอบแอปทางการเงินในโลกแห่งความเป็นจริง',
    provenUxImpact: 'ผลลัพธ์การใช้งานจริง',
    provenDetail1: 'ลดระยะเวลาอนุมัติจากวันเป็นนาที',
    provenDetail2: 'ใช้งานโดยสหกรณ์ 99 ล้านบาท/ปี (ผู้ใช้มากกว่า 800 ราย)',
    recognition: 'รางวัลและผลงานแข่งขัน',
    contact: 'ติดต่อ',
    email: 'อีเมล',
    linkedin: 'ลิงก์อิน',
    projectStatus: 'สถานะโปรเจกต์',
    trustScore: 'คะแนนความน่าเชื่อถือ',
    username: 'ชื่อผู้ใช้',
    github: 'GitHub',
    featuredProjects: 'โปรเจกต์เด่น',
    viewMore: 'ดูเพิ่มเติม',

    // Skills (ซ้าย)
    flutter: 'พัฒนาแอพมือถือด้วย Flutter + Dart',
    flutterDesc1: 'แอพพลิเคชั่นองค์กร/หน่วยงาน, การกรอกฟอร์มแบบ เสต็ป, การเข้าใช้งานผ่าน OTP',
    flutterDesc2: '💡 MVP พร้อมใช้งานจริงในสหกรณ์และอนุมัติโดยกรรมการ',

    vue: 'สร้างระบบเว็บด้วย Vue.js + Firebase',
    vueDesc1: 'แดชบอร์ดหลายบทบาท กฎความปลอดภัยของ Firestore',
    vueDesc2: '💡 อัปเดตแบบเรียลไทม์ ตรรกะการอนุญาตระดับบอร์ด',

    python: 'บอทและสคริปต์ Python',
    pythonDesc1: 'การสร้างชุด PDF, การตรวจสอบตรรกะ, การชดเชย Cheat Engine',
    pythonDesc2: '💡 ใช้ในการ reverse-engineering โปรแกรมในเครื่อง',

    php: 'แก้ระบบฟอร์มด้วย PHP + SMTP',
    phpDesc1: 'PHPMailer, Hostneverdie SMTP Debug',
    phpDesc2: '💡 ส่งอีเมลจริงได้ พร้อม Debug HELO และ ErrorInfo',

    html: 'สร้าง UI ด้วย HTML / CSS / JavaScript',
    htmlDesc1: 'หน้า Landing page, แบบฟอร์มการตรวจสอบ, องค์ประกอบ UI',
    htmlDesc2: '💡 ใช้งานร่วมกับ Tailwind หรือ CSS native layout',

    vb: 'แก้โปรแกรมเก่า VB และ Reverse Engineering',
    vbDesc1: 'Mods ซอฟต์แวร์รุ่นเก่า การแก้ไขพฤติกรรมไบนารี',
    vbDesc2: '💡 ใช้ในงานออฟไลน์และสัญญาจ้างส่วนตัว',

    systemThinking: 'อธิบายงานเทคนิคให้เข้าใจง่าย',
    systemDesc1: 'สรุปข้อมูลลูกค้า → แผนผังงาน → ข้อมูลจำเพาะส่วนประกอบ → แผนการพัฒนา',
    systemDesc2: '💡 แปลงานเทคนิคให้บอร์ดบริหารเข้าใจและอนุมัติได้',
  },

  en: {
    Co: 'PNJ Tech',
    lang: 'Switch To Thai',
    main_head : 'TECHNICAL',
    main_content: 'PORTFOLIO',
    main_desc: 'Welcome to NPJ Tech — A clean portfolio built with Vue, Tailwind and real-world UX. No gimmicks.',
    sectionTitle: 'Skills & Achievements',
    primaryStack: 'Primary Stack',
    fullstackCliDev: 'Fullstack CLI Dev',
    experience: 'Experience',
    experlemceDetail: '5+ Years Freelance — delivered real-world co-op finance apps',
    provenUxImpact: 'Proven UX Impact',
    provenDetail1: 'Approval time reduced from days ➔ minutes ',
    provenDetail2: 'Adopted by ฿99M/year cooperative (800+ users)',
    recognition: 'Recognition',
    contact: 'Contact',
    email: 'Email',
    linkedin: 'LinkedIn',
    projectStatus: 'Project Status',
    trustScore: 'Trust Score',
    username: 'Username',
    github: 'GitHub',
    featuredProjects: 'Featured Projects',
    viewMore: 'View More',

    // Skills (left block)
    flutter: 'Mobile App Development with Flutter + Dart',
    flutterDesc1: 'Application for organizations/agencies, step-by-step form filling, OTP access',
    flutterDesc2: '💡 MVP is in the cooperative and has been approved by the board.',

    vue: 'Web Systems via Vue.js + Firebase',
    vueDesc1: 'Multi-role dashboard, Firestore security rules',
    vueDesc2: '💡 Real-time updates, Board-level permission logic',

    python: 'Python Bots and Automation',
    pythonDesc1: 'PDF batch gen, logic validation, Cheat Engine offset',
    pythonDesc2: '💡 Used to reverse-engineer programs on the machine.',

    php: 'Form Fix with PHP + SMTP',
    phpDesc1: 'PHPMailer, Hostneverdie SMTP Debug',
    phpDesc2: '💡 Real mail with Debug HELO and ErrorInfo',

    html: 'UI Layout with HTML / CSS / JavaScript',
    htmlDesc1: 'Landing page, validation form, UI flow',
    htmlDesc2: '💡 Works with Tailwind or CSS native layout',

    vb: 'Legacy VB & Reverse Engineering',
    vbDesc1: 'Legacy software mods, debugging binary behaviors',
    vbDesc2: '💡 Use in offline work and personal contracts',

    systemThinking: 'Translating Complex Logic to Business Language',
    systemDesc1: 'Client brief → Flowchart → Component spec → Dev plan',
    systemDesc2: '💡 Translate technical work for the board to understand and approve.',
  }
};

const techStack = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Tailwind', icon: 'https://www.svgrepo.com/show/374118/tailwind.svg' },
];

// ดึงค่าตามภาษาปัจจุบัน
const t = computed(() => content[lang.value])

</script>

<style>
h2 {
  font-family: 'Bowlby One SC', cursive;
  text-shadow: 2px 2px 10px #020202;
}

h3,
h4 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

p {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.text-shadow-lg {
  text-shadow: 0px 0px 8px rgb(0, 0, 0);
}
</style>

<template>
  <section class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 px-6 md:px-20 rounded-md shadow-md hover:shadow-sky-500/5
  ">
    <div class="
    max-w-7xl mx-auto grid 
    md:grid-cols-2 gap-10
    ">
      <!-- Left Column -->
      <div class="
      shadow-[0_8px_20px_rgba(0,0,0,0.5)] 
      hover:shadow-red-500/10 px-8 
      py-10 rounded-md
      border border-white/10
      ">
        <h2 class="
          text-2xl font-bold text-yellow-400 
          mb-6 ">
          {{ t.sectionTitle }}
        </h2>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6 mt-1 text-yellow-500">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <div>
              <h3 class="
              text-lg font-semibold text-blue-400
              ">{{ t.flutter }}</h3>
            </div>
          </div>
          <p class="
          text-sm text-orange-400
          ">{{ t.flutterDesc1 }}</p>
          <p class="
          text-sm text-gray-400
          ">{{ t.flutterDesc2 }}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 mt-1 text-sky-500">
              <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
            </svg>


            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.vue }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.vueDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.vueDesc2 }}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 mt-1 text-green-400">
              <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
            </svg>

            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.python }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.pythonDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.pythonDesc2 }}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.php }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.phpDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.phpDesc2 }}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.html }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.htmlDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.htmlDesc2 }}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.vb }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.vbDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.vbDesc2 }}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.systemThinking }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.systemDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.systemDesc2 }}</p>
        </div>
      </div>



      <!-- Right Column -->
      <div class="grid gap-6 text-sm text-gray-200">
        <div
          class="
          grid grid-rows gap-6 
          shadow-[0_8px_20px_rgba(0,0,0,0.5)] 
          hover:shadow-sky-500/10 
          px-8 py-10 rounded-md
          border border-white/10"
        >
          <div>
            <h4 class="font-bold text-red-500 text-lg">{{ t.primaryStack }}</h4>
            <br>
            <div class="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 text-[12px] gap-8 text-center">
              <div
                v-for="tech in techStack"
                :key="tech.name"
                class="flex flex-col items-center justify-center group"
              >
                <img
                  :src="tech.icon"
                  :alt="tech.name"
                  class="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110"
                />
                <span class="text-gray-300 text-md font-semibold group-hover:text-sky-300 transition-colors">
                  {{ tech.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="
          grid grid-cols-2 gap-6 
          shadow-[0_8px_20px_rgba(0,0,0,0.5)] 
          px-8 py-10 rounded-md
          border border-white/10 
          hover:shadow-sky-500/10">
          <div>
            <h4 class="font-bold text-red-500 text-lg">{{ t.experience }}</h4>
            <p class="text-gray-400">{{ t.experlemceDetail }}</p>
          </div>

          <div>
            <h4 class="font-bold text-cyan-400 text-lg">{{ t.provenUxImpact }}</h4>
            <p class="text-gray-400">{{ t.provenDetail1 }}</p>
            <p class="text-gray-400">{{ t.provenDetail2 }}</p>
          </div>
        </div>

        <div
          class="
          grid grid-cols-2 gap-6 
          shadow-[0_8px_20px_rgba(0,0,0,0.5)] 
          px-8 py-10 rounded-md
          border border-white/10 
          hover:shadow-sky-500/10">
          <div>
            <h4 class="font-bold text-red-500 text-lg"> {{ t.recognition }}</h4>
            <p class="text-gray-400 text-md">
              ->
              <a 
                href="https://www.borntodev.com/devlab/certificate" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                Certificate
              </a>
              in 
              <a 
                href="https://www.borntodev.com/devlab/profile/18960" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                DevLab
              </a>
              by
              <a 
                href="https://www.borntodev.com/" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                BornToDev
              </a>
            </p>

            <!-- Cssbattle -->
            <p class="text-gray-400 text-md">
            ->
              <a 
                href="https://cssbattle.dev/player/baronquibe" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                Stats
              </a>
              in 
              <a 
                href="https://cssbattle.dev/" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                Cssbattle
              </a>
            </p>

            <!-- Cssbattle -->
            <p class="text-gray-400 text-md">
            ->
              <a 
                href="https://drive.google.com/file/d/1uEVPXvL2djxsjJTTpgLq-QNLn_Mg7moN/view?usp=sharing" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                Certificate Cybersec
              </a>
              by
              <a 
                href="https://www.facebook.com/RPCACyberClub" 
                target="_blank" 
                class="text-sky-300 hover:underline underline-offset-4 transition"
              >
                RPCACyberClub
              </a>
              <img src="https://scontent.fkkc1-1.fna.fbcdn.net/v/t39.30808-6/305461311_498588532270737_1115774101095350383_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=HKyS5F5whnkQ7kNvwGVBfjl&_nc_oc=Adno3TDIa9F6GFIGiJL3IZ377cR_liOfWIFwzsA5WTUtVQiSTv6lUVg3GBbJbrlkXbM&_nc_zt=23&_nc_ht=scontent.fkkc1-1.fna&_nc_gid=wrKD6iTAGrqQ9u4okzojDA&oh=00_AfgI-0TioZ_VocsuT427xR-dbHhv3ndILNpiANYr17hRtg&oe=69138E1D" alt="">
            </p>
            
          </div>

          <div>
            <h4 class="font-bold text-cyan-400 text-lg">{{ t.contact }}</h4>
            <div class="text-sm text-white space-y-2">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6 pr-1 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>Pj06052538@gmail.com</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.75s.784-1.75 1.75-1.75 1.75.787 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.271h-3v-4.5c0-1.074-.021-2.458-1.5-2.458s-1.731 1.174-1.731 2.382v4.576h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.561 2.839-1.561 3.033 0 3.591 1.996 3.591 4.59v4.738z" />
                </svg>
                <span>
                  <a href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/">linkedin.com/in/npjtech</a>
                  </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="
          grid grid-cols-2 gap-6 
          shadow-[0_8px_20px_rgba(0,0,0,0.5)] 
          px-8 py-10 rounded-md
          border border-white/10 
          hover:shadow-sky-500/10">
          <div>
            <p class="uppercase text-xs text-gray-500">Project Status</p>
            <p class="font-bold text-red-500 text-lg">In Progress</p>
          </div>
          <div>
            <p class="uppercase text-xs text-gray-500">Trust Score</p>
            <p class="font-bold text-cyan-400 text-lg">99.5%</p>
          </div>
          <div>
            <p class="uppercase text-xs text-gray-500">Username</p>
            <p>npj.tech</p>
          </div>
          <div>
            <p class="uppercase text-xs text-gray-500">GitHub</p>
            <p class="text-blue-300"><a target="_blank" href="https://github.com/paphonthanai">github.com/paphonthanai</a></p>
          </div>
        </div>

      </div>

    </div>
    <!-- 📁 Featured Projects -->
    <div class="max-w-7xl mx-auto mt-6 md:grid-cols-2 gap-10 ">
      <h2 class="
      text-2xl font-bold text-yellow-400 text-shadow-lg
      my-6 ml-6 ">Featured Projects</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="
        backdrop-blur-md bg-gradient-to-r from-slate-900/5 via-slate-800 to-slate-900/5 
        border border-white/10
        p-4 rounded-md shadow-md 
        transform transition-transform duration-300 
        hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/10">
          <img src="./image/Code.png" class="w-full rounded-md mb-3" />
          <p class="text-lg font-semibold">Loan App System</p>
          <p class="text-sm text-gray-400">Flutter + Firebase for Co-op Lending</p>
          <button
            class="border border-white text-white px-3 py-1 mt-4 rounded hover:bg-white hover:text-slate-900 transition-all duration-200">
            View More
          </button>
        </div>
        <div class="
        backdrop-blur-md bg-gradient-to-r from-slate-900/5 via-slate-800 to-slate-900/5 
        border border-white/10 
        p-4 rounded-md shadow-md
        transform transition-transform duration-300 hover:scale-105 hover:shadow-sky-500/10">
          <img src="./image/Code.png" class="w-full rounded-md mb-3" />
          <p class="text-lg font-semibold">CyberSec Dashboard</p>
          <p class="text-sm text-gray-400">Node.js + Realtime Log Monitor</p>
          <button
            class="
            border border-white 
            text-white 
            px-3 py-1 mt-4 rounded 
            hover:bg-white hover:text-slate-900 
            transition-all duration-200">
            View More
          </button>
        </div>
        <div class="
        backdrop-blur-md bg-gradient-to-r from-slate-900/5 via-slate-800 to-slate-900/5 
        border border-white/10 
        p-4 rounded-md shadow-md
        transform transition-transform duration-300 
        hover:scale-105 hover:shadow-sky-500/10">
          <img src="./image/Code.png" class="w-full rounded-md mb-3" />
          <p class="text-lg font-semibold">RE Toolkit CLI</p>
          <p class="text-sm text-gray-400">Reverse Binary / Stego Tools</p>
          <button
            class="
            border border-white text-white 
            px-3 py-1 mt-4 rounded hover:bg-white 
            hover:text-slate-900 transition-all duration-200">
            View More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
