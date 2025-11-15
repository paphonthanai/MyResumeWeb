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
    status: 'สถานะ',
    customer: 'ลูกค้า',

    // Skills (ซ้าย)
    flutter: 'พัฒนาแอพมือถือด้วย Flutter + Dart',
    flutterDesc1: 'แอพพลิเคชั่นองค์กร/หน่วยงาน, การกรอกฟอร์มแบบ เสต็ป, การเข้าใช้งานผ่าน OTP',
    flutterDesc2: '💡 MVP พร้อมใช้งานจริงในสหกรณ์และอนุมัติโดยกรรมการ',
    flutterlink: 'https://bpp24-coop.com/',
    flutter_status: 'กำลังอยู่ระหว่างการอนุมัติโดยกรรมการ ⏳',
    flutter_customer: 'สหกรณ์ออมทรัพย์ตำรวจตระเวนชายแดนที่ 24',

    vue: 'สร้างระบบเว็บด้วย Vue.js + Firebase',
    vueDesc1: 'แดชบอร์ดหลายบทบาท กฎความปลอดภัยของ Firestore',
    vueDesc2: '💡 อัปเดตแบบเรียลไทม์ ตรรกะการอนุญาตระดับบอร์ด',
    vuelink: 'https://www.firsttelecom.co.th/',
    vue_status: 'เสร็จสมบูรณ์ ✅',
    vue_customer: 'บริษัท เฟิร์สท เทเลคอม ซีสเต็ม จำกัด',

    python: 'บอทและสคริปต์ Python',
    pythonDesc1: 'การสร้างชุด LLM เพื่อตรวจสอบตรรกะและวิเคราะห์ค่าฝุ่น',
    pythonDesc2: '💡 ใช้ในการคำนวณทำนายค่าฝุ่นด้วยโมเดล Random Forest และอื่นๆ',
    pythonlink: '#',
    python_status: 'เสร็จสมบูรณ์ ✅',
    python_customer: 'นักศึกษาปริญญาโท ใช้ประกอบรายงานวิทยานิพนธ์',

    php: 'แก้ไขเว็บไซต์ด้วย PHP + FTP SMTP',
    phpDesc1: 'PHPMailer, Hostneverdie SMTP Debug',
    phpDesc2: '💡 อัพเดทข่าวสาร ข้อมูลบนเว็บไซต์',
    phplink1: 'https://www.kyoei-thai.co.th/th/index.php',
    php_status: 'เสร็จสมบูรณ์ ✅',
    php_customer: 'บริษัท เคียวเออิ (ประเทศไทย) จำกัด',


    html: 'สร้าง UI ด้วย HTML / CSS / JavaScript',
    htmlDesc1: 'หน้า Landing page, สร้าง - แก้ไของค์ประกอบ UI',
    htmlDesc2: '💡 ใช้งานได้ทั้งแบบ CLI(VsCOde) และ UI(wix.com)',
    htmllink1: 'http://164.115.20.79/bpp.go.th/bpp24/',
    htmllink2: 'https://ttta-tapioca.org/',
    html_status: 'เสร็จสมบูรณ์ ✅',
    html_customer1: 'กองกำกับการตำรวจตระเวนชายแดนที่ 24',
    html_customer2: 'สมาคมการค้ามันสำปะหลังไทย',


    vb: 'แก้โปรแกรมเก่า VB และ Reverse Engineering',
    vbDesc1: 'Mods ซอฟต์แวร์รุ่นเก่า การแก้ไขพฤติกรรมไบนารี',
    vbDesc2: '💡 ใช้ในงานออฟไลน์และสัญญาจ้างส่วนตัว',
    vblink: 'https://www.facebook.com/kbpseafood/',
    vb_status: 'ยกเลิกสัญญา (ค้างชำระ)❌',
    vb_customer: 'KBP Seafood ',


    backendAPI: 'พัฒนา API และระบบ Backend',
    backendAPIDesc1: 'ออกแบบและพัฒนาระบบ API เชื่อมต่อธนาคาร เพื่อค้นหาสินเชื่อ',
    backendAPIDesc2: '💡 ปรับปรุงประสิทธิภาพและเสริมความปลอดภัยสำหรับระบบเชื่อมต่อขนาดใหญ่',
    backendAPIlink: 'http://www.homedd.co.th/',
    backendAPI_status: 'เสร็จสมบูรณ์ ✅',
    backendAPI_customer: 'บริษัท โฮม ดี ดี จำกัด',

    devOps: 'DevOps และ CI/CD',
    devOpsDesc1: 'ตั้งค่าและดูแลกระบวนการ CI/CD เพื่อให้การ deploy รวดเร็วและไม่มีสะดุด',
    devOpsDesc2: '💡 ลดเวลาการส่งมอบงานและเพิ่มความน่าเชื่อถือของระบบ',
    devOpslink1: 'https://www.firsttelecom.co.th/',
    devOpslink2: '#',
    devOps_status: 'เสร็จสมบูรณ์ ✅',
    devOps_customer1: 'บริษัท เฟิร์สท เทเลคอม ซีสเต็ม จำกัด',
    devOps_customer2: 'PNJ Tech (Ltd. soon)',

    security: 'Security & Data Protection',
    securityDesc1: 'วิเคราะห์ช่องโหว่ระบบและออกแบบมาตรการรักษาความปลอดภัยข้อมูล',
    securityDesc2: '💡 ปกป้องข้อมูลสำคัญขององค์กรและลูกค้า',
    securitylink1: 'https://www.firsttelecom.co.th/',
    securitylink2: 'https://hodaka.co.th/contact.php',
    securitylink3: 'https://www.kyoei-thai.co.th/th/index.php',
    security_status: 'เสร็จสมบูรณ์ ✅',
    security_customer1: 'บริษัท เฟิร์สท เทเลคอม ซีสเต็ม จำกัด',
    security_customer2: 'บริษัท โฮดากะ อีเอส (ประเทศไทย) จำกัด',
    security_customer3: 'บริษัท เคียวเออิ (ประเทศไทย) จำกัด',

    consulting: 'Consulting & Technical Training',
    consultingDesc1: 'ให้คำปรึกษาเชิงเทคนิคและจัดอบรมทีมงานภายใน',
    consultingDesc2: '💡 ยกระดับทักษะและประสิทธิภาพของทีมงาน',
    consultinglink1: 'https://www.firsttelecom.co.th/',
    consultinglink2: 'https://www.kyoei-thai.co.th/th/index.php',
    consultinglink3: 'http://www.homedd.co.th/',
    consulting_status: 'เสร็จสมบูรณ์ ✅',
    consulting_customer1: 'บริษัท เฟิร์สท เทเลคอม ซีสเต็ม จำกัด',
    consulting_customer2: 'บริษัท เคียวเออิ (ประเทศไทย) จำกัด',
    consulting_customer3: 'บริษัท โฮม ดี ดี จำกัด',

    systemThinking: 'อธิบายงานเทคนิคให้เข้าใจง่าย',
    systemDesc1: 'วางแผนผังงาน → ข้อมูลจำเพาะส่วนประกอบ → แผนการพัฒนา → สรุปข้อมูลลูกค้า',
    systemDesc2: '💡 แปลงานเทคนิคให้บอร์ดบริหารเข้าใจและอนุมัติได้',
    systemThinkinglink1: 'https://www.firsttelecom.co.th/',
    systemThinkinglink2: 'https://www.kyoei-thai.co.th/th/index.php',
    systemThinkinglink3: 'http://www.homedd.co.th/',
    systemThinkinglink4: '#',
    systemThinking_status1: 'เสร็จสมบูรณ์ ✅',
    systemThinking_status2: 'กำลังอยู่ระหว่างการอนุมัติ ⏳',
    systemThinking_customer1: 'บริษัท เฟิร์สท เทเลคอม ซีสเต็ม จำกัด',
    systemThinking_customer2: 'บริษัท เคียวเออิ (ประเทศไทย) จำกัด',
    systemThinking_customer3: 'บริษัท โฮม ดี ดี จำกัด',
    systemThinking_customer4: 'Your Company Here  ⏳',
  },

  en: {
    Co: 'PNJ Tech',
    lang: 'Switch To Thai',
    main_head: 'TECHNICAL',
    main_content: 'PORTFOLIO',
    main_desc: 'Welcome to NPJ Tech — A clean portfolio built with Vue, Tailwind and real-world UX. No gimmicks.',
    sectionTitle: 'Skills & Achievements',
    primaryStack: 'Primary Stack',
    fullstackCliDev: 'Fullstack CLI Dev',
    experience: 'Experience',
    experlemceDetail: '5+ Years Freelance — delivered real-world co-op finance apps',
    provenUxImpact: 'Proven UX Impact',
    provenDetail1: 'Approval time reduced from days ➔ minutes',
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
    status: 'Status',
    customer: 'Customer',

    // Skills (left block)
    flutter: 'Mobile App Development with Flutter + Dart',
    flutterDesc1: 'Applications for organizations/agencies, step-by-step form filling, OTP access',
    flutterDesc2: '💡 MVP ready and approved by cooperative board',
    flutterlink: 'https://bpp24-coop.com/',
    flutter_status: 'Pending board approval ⏳',
    flutter_customer: 'Border Patrol Police Savings Cooperative 24',

    vue: 'Web Systems with Vue.js + Firebase',
    vueDesc1: 'Multi-role dashboards, Firestore security rules',
    vueDesc2: '💡 Real-time updates with board-level permission logic',
    vuelink: 'https://www.firsttelecom.co.th/',
    vue_status: 'Completed ✅',
    vue_customer: 'First Telecom System Co., Ltd.',

    python: 'Python Bots & Scripts',
    pythonDesc1: 'Developed LLM suites for logic validation and air quality analysis',
    pythonDesc2: '💡 Used Random Forest models and others for pollution prediction',
    pythonlink: '#',
    python_status: 'Completed ✅',
    python_customer: 'Master’s student for thesis research',

    php: 'Website Fix with PHP + FTP SMTP',
    phpDesc1: 'PHPMailer, Hostneverdie SMTP Debug',
    phpDesc2: '💡 Updating news and website data',
    phplink1: 'https://www.kyoei-thai.co.th/th/index.php',
    php_status: 'Completed ✅',
    php_customer: 'Kyoei (Thailand) Co., Ltd.',

    html: 'UI Layout with HTML / CSS / JavaScript',
    htmlDesc1: 'Landing pages, UI element creation and fixes',
    htmlDesc2: '💡 Works with CLI (VSCode) and UI tools (wix.com)',
    htmllink1: 'http://164.115.20.79/bpp.go.th/bpp24/',
    htmllink2: 'https://ttta-tapioca.org/',
    html_status: 'Completed ✅',
    html_customer1: 'Border Patrol Police Region 24',
    html_customer2: 'Thai Tapioca Trade Association',

    vb: 'Legacy VB & Reverse Engineering',
    vbDesc1: 'Legacy software mods, binary behavior debugging',
    vbDesc2: '💡 Used in offline work and private contracts',
    vblink: 'https://www.facebook.com/kbpseafood/',
    vb_status: 'Contract cancelled (Outstanding payment) ❌',
    vb_customer: 'KBP Seafood',

    backendAPI: 'API & Backend Development',
    backendAPIDesc1: 'Designed and developed robust API systems connecting banks for loan searches',
    backendAPIDesc2: '💡 Improved efficiency and security for large-scale system integrations',
    backendAPIlink: 'http://www.homedd.co.th/',
    backendAPI_status: 'Completed ✅',
    backendAPI_customer: 'Home DD Co., Ltd.',

    devOps: 'DevOps & CI/CD',
    devOpsDesc1: 'Configured and maintained CI/CD pipelines for smooth, fast deployments',
    devOpsDesc2: '💡 Reduced delivery time and increased system reliability',
    devOpslink1: 'https://www.firsttelecom.co.th/',
    devOpslink2: '#',
    devOps_status: 'Completed ✅',
    devOps_customer1: 'First Telecom System Co., Ltd.',
    devOps_customer2: 'PNJ Tech (Ltd. soon)',

    security: 'Security & Data Protection',
    securityDesc1: 'Analyzed system vulnerabilities and designed security measures',
    securityDesc2: '💡 Protected critical data for organizations and clients',
    securitylink1: 'https://www.firsttelecom.co.th/',
    securitylink2: 'https://hodaka.co.th/contact.php',
    securitylink3: 'https://www.kyoei-thai.co.th/th/index.php',
    security_status: 'Completed ✅',
    security_customer1: 'First Telecom System Co., Ltd.',
    security_customer2: 'Hodaka ES (Thailand) Co., Ltd.',
    security_customer3: 'Kyoei (Thailand) Co., Ltd.',

    consulting: 'Consulting & Technical Training',
    consultingDesc1: 'Provided technical consulting and internal team training',
    consultingDesc2: '💡 Elevated team skills and efficiency',
    consultinglink1: 'https://www.firsttelecom.co.th/',
    consultinglink2: 'https://www.kyoei-thai.co.th/th/index.php',
    consultinglink3: 'http://www.homedd.co.th/',
    consulting_status: 'Completed ✅',
    consulting_customer1: 'First Telecom System Co., Ltd.',
    consulting_customer2: 'Kyoei (Thailand) Co., Ltd.',
    consulting_customer3: 'Home DD Co., Ltd.',

    systemThinking: 'Translating Complex Logic to Business Language',
    systemDesc1: 'Client brief → Flowchart → Component spec → Dev plan',
    systemDesc2: '💡 Translate technical work for the board to understand and approve',
    systemThinkinglink1: 'https://www.firsttelecom.co.th/',
    systemThinkinglink2: 'https://www.kyoei-thai.co.th/th/index.php',
    systemThinkinglink3: 'http://www.homedd.co.th/',
    systemThinkinglink4: '#',
    systemThinking_status1: 'Completed ✅',
    systemThinking_status2: 'Pending approval ⏳',
    systemThinking_customer1: 'First Telecom System Co., Ltd.',
    systemThinking_customer2: 'Kyoei (Thailand) Co., Ltd.',
    systemThinking_customer3: 'Home DD Co., Ltd.',
    systemThinking_customer4: 'Your Company Here  ⏳',
  }
};

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
      // { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
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
      // { name: 'After Effects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' },
      { name: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/768px-Adobe_Photoshop_CC_icon.svg.png?20200616073617' },
      { name: 'Illustrator', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/768px-Adobe_Illustrator_CC_icon.svg.png?20251029195730' },
      // { name: 'CapCut', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/98/CapCut_Logo.svg' },
      // { name: 'DaVinci Resolve', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/DaVinci_Resolve_17_logo.svg' },
    ],
  },
  {
  name: 'Security_CTF',
  items: [
    { name: 'BurpSuite', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/BurpSuite_Comunity_Edition.svg/825px-BurpSuite_Comunity_Edition.svg.png' },
    // { name: 'Wireshark', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wireshark/wireshark-original.svg' },
    { name: 'CyberChef', icon: 'https://cdn-1.webcatalog.io/catalog/cyberchef/cyberchef-icon-filled-256.webp?v=1714774077431' },
    { name: 'Ghidra', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ghidra_logo.svg/768px-Ghidra_logo.svg.png?20220727174502' },
    { name: 'IDA', icon: 'https://static.wikitide.net/zenithwiki/0/0d/IDAIcon.png' },
    { name: 'KaliLinux', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kali-dragon-icon.svg/768px-Kali-dragon-icon.svg.png?20211125065834' },
  ],
  },

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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-warning">{{ t.flutter_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.flutterlink" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-yellow-500 text-black hover:bg-yellow-500 hover:text-yellow-100"
              >
                {{ t.flutter_customer}}
              </a>
            </strong>
          </p>
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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.vue_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.vuelink" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-green-100 hover:bg-green-500 hover:text-green-100"
              >
                {{ t.vue_customer}}
              </a>
            </strong>
            
          </p>
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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.python_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.pythonlink" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-blue-500 text-white hover:bg-blue-500 hover:text-blue-100"
              >
                {{ t.python_customer}}
              </a>
            </strong>
            
          </p>
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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.php_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.phplink" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.php_customer}}
              </a>
            </strong>
            
          </p>
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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.html_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.htmllink1" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.html_customer1}}
              </a>
            </strong>
            
          </p>
          <p>
             <strong>
              <a :href="t.htmllink2" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.html_customer2}}
              </a>
            </strong>
            
          </p>
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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-error text-white">{{ t.vb_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.vblink" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-red-500 text-red-100 hover:bg-red-300 hover:text-red-800"
              >
                {{ t.vb_customer}}
              </a>
            </strong>
            
          </p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.backendAPI }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.backendAPIDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.backendAPIDesc2 }}</p>
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.backendAPI_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.backendAPIlink" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.backendAPI_customer}}
              </a>
            </strong>
            
          </p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.devOps }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.devOpsDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.devOpsDesc2 }}</p>
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.devOps_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.devOpslink1" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.devOps_customer1}}
              </a>
            </strong>
            <strong>
              <a :href="t.devOpslink2" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.devOps_customer2}}
              </a>
            </strong>
            
          </p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.security }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.securityDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.securityDesc2 }}</p>
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.security_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.securitylink1" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.security_customer1}}
              </a>
            </strong>
            <strong>
              <a :href="t.securitylink2" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.security_customer2}}
              </a>
            </strong>
            <strong>
              <a :href="t.securitylink3" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.security_customer3}}
              </a>
            </strong>
        
          </p>
        </div>

        <div class="mb-6">
          <div class="flex items-start space-x-2">
            <svg class="w-6 h-6 text-sky-400 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-white">
              <h3 class="text-lg font-semibold text-blue-400">{{ t.consulting }}</h3>
            </div>
          </div>
          <p class="text-sm text-orange-400">{{ t.consultingDesc1 }}</p>
          <p class="text-sm text-gray-400">{{ t.consultingDesc2 }}</p>
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.consulting_status }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.consultinglink1" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.consulting_customer1}}
              </a>
            </strong>
            <strong>
              <a :href="t.consultinglink2" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.consulting_customer2}}
              </a>
            </strong>
            <strong>
              <a :href="t.consultinglink3" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.consulting_customer3}}
              </a>
            </strong>
          </p>
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
          <p>
            <strong>{{ t.status }} : </strong>
            <strong>
              <span class="badge badge-success text-white">{{ t.systemThinking_status1 }}</span>
              <span class="badge badge-warning text-back">{{ t.systemThinking_status2 }}</span>
            </strong>

            <strong>

            </strong>
            
          </p>
          <p>
            <strong>{{ t.customer }} : </strong>
             <strong>
              <a :href="t.systemThinkinglink1" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.systemThinking_customer1}}
              </a>
            </strong>

            <strong>
              <a :href="t.systemThinkinglink2" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.systemThinking_customer2}}
              </a>
            </strong>

            <strong>
              <a :href="t.systemThinkinglink3" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-success text-white hover:bg-green-500 hover:text-green-100"
              >
                {{ t.systemThinking_customer3}}
              </a>
            </strong>

            <strong>
              <a :href="t.systemThinkinglink4" target="_blank" 
              rel="noopener noreferrer" 
              class="badge bg-yellow-500 text-black hover:bg-yellow-500 hover:text-yellow-100"
              >
                {{ t.systemThinking_customer4}}
              </a>
            </strong>
            
          </p>
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
            <div v-for="(category, index) in techCategories" :key="index" class="mb-2 ">
              <h3 class="text-sky-400 font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">
                {{ category.name }}
              </h3>

              <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-[12px] gap-8 text-center"
              >
                <div
                  v-for="tech in category.items"
                  :key="tech.name"
                  class="flex flex-col items-center justify-center group"
                >
                  <img
                    :src="tech.icon"
                    :alt="tech.name"
                    class="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span
                    class="text-gray-300 text-md font-semibold group-hover:text-sky-300 transition-colors"
                  >
                    {{ tech.name }}
                  </span>
                </div>
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
