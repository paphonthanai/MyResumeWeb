<script setup>
import { computed, inject, ref } from 'vue'
import { vReveal } from '../utils/reveal'
import SectionHeading from './SectionHeading.vue'
// เลือกภาษา
const lang = inject('lang')
// bare: the page already carries the title, so skip the heading
const props = defineProps({ bare: { type: Boolean, default: false } })

// เนื้อหาทั้งหมดแยกตามภาษา
const content = {
  th: {
    sectionTitle: 'Skills & Achievements',
    primaryStack: 'เทคโนโลยีหลักที่ใช้',
    fullstackCliDev: 'พัฒนาแบบไม่ใช้ GUI',
    experience: 'ประสบการณ์',
    experlemceDetail1: '-> ประสบการณ์ทำงานอิสระ 5 ปี',
    experlemceDetail2: '-> ประสบการณ์ทำงานในองค์กร 10 ปี',
    experlemceDetail3: '-> คลุกคลีและศึกษาเทคโนโลยีคอมพิวเตอร์กว่า 20 ปี',
    provenUxImpact: 'ผลลัพธ์การใช้งานจริง',
    provenDetail1: '— ส่งมอบผลงานที่ใช้งานได้จริง !!',
    provenDetail2: '— เข้าใจระบบและกระบวนการทำงานขององค์กรอย่างลึกซึ้ง',
    provenDetail3: '— พัฒนาระบบที่มีประสิทธิภาพและตอบโจทย์ผู้ใช้งาน',
    recognition: 'รางวัลและผลงานแข่งขัน',
    contact: 'ติดต่อ',
    messengerLabel: 'Messenger — ติดต่อสอบถาม / ปรึกษาโปรเจกต์',
    email: 'อีเมล',
    linkedin: 'ลิงก์อิน',
    projectStatus: 'สถานะโปรเจกต์',
    trustScore: 'คะแนนความน่าเชื่อถือ',
    username: 'ชื่อผู้ใช้',
    github: 'GitHub',
    status: 'สถานะ',
    customer: 'ลูกค้า',
    fastworkTitle: 'รีวิวจาก FastWork',
    fastworkOrders: 'ออเดอร์',
    fastworkClients: 'ลูกค้า',
    fastworkRepeat: 'จ้างซ้ำ',
    fastworkViewProfile: 'ดูโปรไฟล์',
    fastworkAnonymousName: '***** (บัญชีไม่ระบุชื่อ)',

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

    grabTruck: 'ระบบบริหารจัดการงานขนส่งและบริหารภายในองค์กรผ่านแพลตฟอร์มและมือถือ (Grab-Truck)',
    grabTruckDesc1: 'ระบบเว็บแพลตฟอร์มและแอปมือถือสำหรับบริหารจัดการงานขนส่งและกระบวนการทำงานภายในองค์กร',
    grabTruckDesc2: '💡 ใช้งานจริงในองค์กรของลูกค้า',
    grabTruck_status: 'ใช้งานจริง ✅',
    grabTruck_customer: 'บริษัทมิตรกาญ',

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
    sectionTitle: 'Skills & Achievements',
    primaryStack: 'Primary Stack',
    fullstackCliDev: 'Fullstack CLI Dev',
    experience: 'Experience',
    experlemceDetail1: '-> Over 5 years of freelance work experience',
    experlemceDetail2: '-> 10 years of experience working within organizations',
    experlemceDetail3: '-> More than 20 years immersed in computer technology',
    provenUxImpact: 'Proven Results',
    provenDetail1: '— Delivered practical and effective solutions',
    provenDetail2: '— Deep understanding of organizational systems and workflows',
    provenDetail3: '— Developed efficient systems tailored to user needs',
    recognition: 'Recognition',
    contact: 'Contact',
    messengerLabel: 'Messenger — questions / project consultation',
    email: 'Email',
    linkedin: 'LinkedIn',
    projectStatus: 'Project Status',
    trustScore: 'Trust Score',
    username: 'Username',
    github: 'GitHub',
    status: 'Status',
    customer: 'Customer',
    fastworkTitle: 'Reviews from FastWork',
    fastworkOrders: 'Orders',
    fastworkClients: 'Clients',
    fastworkRepeat: 'Repeat hires',
    fastworkViewProfile: 'View Profile',
    fastworkAnonymousName: '***** (anonymous account)',

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

    grabTruck: 'Transport & Internal Operations Management System via Web and Mobile (Grab-Truck)',
    grabTruckDesc1: 'A web platform and mobile app for managing transport operations and internal workflows',
    grabTruckDesc2: '💡 Actively used in production at the client organization',
    grabTruck_status: 'In active use ✅',
    grabTruck_customer: 'Mitkarn',

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
      { name: 'KaliLinux', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kali-dragon-icon.svg/768px-Kali-dragon-icon.svg.png?20211125065834' },
    ],
  },
];

// ไอคอนที่ใช้ร่วมกันระหว่าง skill card (path เดิมจากดีไซน์ก่อนหน้า)
const ICONS = {
  form: {
    viewBox: '0 0 24 24',
    stroke: true,
    d: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  },
  truck: {
    viewBox: '0 0 24 24',
    stroke: true,
    d: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v11.177m0-11.177L12.164 4.44a2.056 2.056 0 0 0-1.582-.859H5.25A2.25 2.25 0 0 0 3 5.83v8.42m10.5-7.677H12a2.25 2.25 0 0 0-2.25 2.25v8.427',
  },
  refresh: {
    viewBox: '0 0 24 24',
    d: 'M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z',
  },
  gear: {
    viewBox: '0 0 24 24',
    fillRule: 'evenodd',
    d: 'M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z',
  },
  check: {
    viewBox: '0 0 20 20',
    fillRule: 'evenodd',
    d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
  },
}

// ดึงค่าตามภาษาปัจจุบัน
const t = computed(() => content[lang.value])

// จัดรูปแบบทักษะทั้งหมดให้เป็น array เดียว (ข้อความ/ลิงก์ทั้งหมดยังมาจาก
// dictionary th/en ด้านบนเหมือนเดิม แค่จัดโครงสร้างใหม่ให้ loop/render ได้)
const skills = computed(() => {
  const v = t.value
  return [
    {
      icon: 'truck',
      title: v.grabTruck, desc1: v.grabTruckDesc1, desc2: v.grabTruckDesc2,
      statuses: [{ label: v.grabTruck_status, variant: 'success' }],
      customers: [{ name: v.grabTruck_customer, link: 'https://www.facebook.com/Mittrakarn/' }],
    },
    {
      icon: 'form',
      title: v.flutter, desc1: v.flutterDesc1, desc2: v.flutterDesc2,
      statuses: [{ label: v.flutter_status, variant: 'warning' }],
      customers: [{ name: v.flutter_customer, link: v.flutterlink }],
    },
    {
      icon: 'refresh',
      title: v.vue, desc1: v.vueDesc1, desc2: v.vueDesc2,
      statuses: [{ label: v.vue_status, variant: 'success' }],
      customers: [{ name: v.vue_customer, link: v.vuelink }],
    },
    {
      icon: 'gear',
      title: v.python, desc1: v.pythonDesc1, desc2: v.pythonDesc2,
      statuses: [{ label: v.python_status, variant: 'success' }],
      customers: [{ name: v.python_customer, link: v.pythonlink }],
    },
    {
      icon: 'check',
      title: v.php, desc1: v.phpDesc1, desc2: v.phpDesc2,
      statuses: [{ label: v.php_status, variant: 'success' }],
      customers: [{ name: v.php_customer, link: v.phplink1 }],
    },
    {
      icon: 'check',
      title: v.html, desc1: v.htmlDesc1, desc2: v.htmlDesc2,
      statuses: [{ label: v.html_status, variant: 'success' }],
      customers: [
        { name: v.html_customer1, link: v.htmllink1 },
        { name: v.html_customer2, link: v.htmllink2 },
      ],
    },
    {
      icon: 'check',
      title: v.vb, desc1: v.vbDesc1, desc2: v.vbDesc2,
      statuses: [{ label: v.vb_status, variant: 'error' }],
      customers: [{ name: v.vb_customer, link: v.vblink }],
    },
    {
      icon: 'check',
      title: v.backendAPI, desc1: v.backendAPIDesc1, desc2: v.backendAPIDesc2,
      statuses: [{ label: v.backendAPI_status, variant: 'success' }],
      customers: [{ name: v.backendAPI_customer, link: v.backendAPIlink }],
    },
    {
      icon: 'check',
      title: v.devOps, desc1: v.devOpsDesc1, desc2: v.devOpsDesc2,
      statuses: [{ label: v.devOps_status, variant: 'success' }],
      customers: [
        { name: v.devOps_customer1, link: v.devOpslink1 },
        { name: v.devOps_customer2, link: v.devOpslink2 },
      ],
    },
    {
      icon: 'check',
      title: v.security, desc1: v.securityDesc1, desc2: v.securityDesc2,
      statuses: [{ label: v.security_status, variant: 'success' }],
      customers: [
        { name: v.security_customer1, link: v.securitylink1 },
        { name: v.security_customer2, link: v.securitylink2 },
        { name: v.security_customer3, link: v.securitylink3 },
      ],
    },
    {
      icon: 'check',
      title: v.consulting, desc1: v.consultingDesc1, desc2: v.consultingDesc2,
      statuses: [{ label: v.consulting_status, variant: 'success' }],
      customers: [
        { name: v.consulting_customer1, link: v.consultinglink1 },
        { name: v.consulting_customer2, link: v.consultinglink2 },
        { name: v.consulting_customer3, link: v.consultinglink3 },
      ],
    },
    {
      icon: 'check',
      title: v.systemThinking, desc1: v.systemDesc1, desc2: v.systemDesc2,
      statuses: [
        { label: v.systemThinking_status1, variant: 'success' },
        { label: v.systemThinking_status2, variant: 'warning' },
      ],
      customers: [
        { name: v.systemThinking_customer1, link: v.systemThinkinglink1 },
        { name: v.systemThinking_customer2, link: v.systemThinkinglink2 },
        { name: v.systemThinking_customer3, link: v.systemThinkinglink3 },
        { name: v.systemThinking_customer4, link: v.systemThinkinglink4 },
      ],
    },
  ]
})

const statusDotClass = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}
const statusTextClass = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}



// ข้อมูลจริงจากโปรไฟล์ FastWork (ไม่แปลข้อความรีวิวจริงของลูกค้าข้ามภาษา
// เพื่อคงคำพูดต้นฉบับไว้ตามที่ลูกค้าเขียนจริง)
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

// Project index: one row is open at a time; desktop shows it in the side panel.
const activeSkill = ref(0)
const current = computed(() => skills.value[activeSkill.value])

// Stack marquee: every tool in two rows that drift in opposite directions.
const allTech = techCategories.flatMap((c) => c.items)
const half = Math.ceil(allTech.length / 2)
const techRows = [allTech.slice(0, half), allTech.slice(half)]
// Black logos that would vanish on the dark page
const DARK_LOGOS = new Set(['GitHub', 'Next.js', 'Express'])
</script>

<template>
  <section id="portfolio" class="overflow-hidden py-24">
    <div class="mx-auto max-w-6xl px-6 md:px-10">
      <SectionHeading v-if="!props.bare" :title="t.sectionTitle" accent="Achievements" />

      <!-- Project index + detail panel -->
      <div :class="!props.bare && 'mt-12'" class="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
        <ol class="border-t border-white/10">
          <li v-for="(skill, i) in skills" :key="i" class="border-b border-white/10">
            <button
              type="button"
              class="idx-row group flex w-full items-baseline gap-4 py-4 text-left md:gap-6"
              :class="i === activeSkill && 'is-on'"
              :aria-expanded="i === activeSkill"
              @click="activeSkill = i"
              @mouseenter="activeSkill = i"
            >
              <span class="w-6 shrink-0 font-mono text-xs tabular-nums text-white/35">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="min-w-0 flex-1">
                <span class="idx-title block text-base font-medium leading-snug md:text-lg">{{ skill.title }}</span>
                <span class="mt-1 block truncate text-xs text-white/40">{{ skill.customers.map((c) => c.name).join(' · ') }}</span>
              </span>
              <span class="h-2 w-2 shrink-0 self-center rounded-full" :class="statusDotClass[skill.statuses[0].variant]" aria-hidden="true"></span>
            </button>

            <!-- Phones: the open row shows its detail inline -->
            <div v-if="i === activeSkill" class="pb-6 pl-10 lg:hidden">
              <p class="text-sm leading-relaxed text-white/70">{{ skill.desc1 }}</p>
              <p class="mt-2 text-sm leading-relaxed text-white/50">{{ skill.desc2 }}</p>
              <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                <span v-for="(st, si) in skill.statuses" :key="si" class="inline-flex items-center gap-1.5" :class="statusTextClass[st.variant]">
                  <span class="h-1.5 w-1.5 rounded-full" :class="statusDotClass[st.variant]"></span>{{ st.label }}
                </span>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <component
                  :is="c.link && c.link !== '#' ? 'a' : 'span'"
                  v-for="(c, ci) in skill.customers"
                  :key="ci"
                  :href="c.link && c.link !== '#' ? c.link : undefined"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="client-chip"
                >{{ c.name }}</component>
              </div>
            </div>
          </li>
        </ol>

        <aside class="hidden lg:block">
          <div class="detail sticky top-24 overflow-hidden rounded-[1.75rem] p-9">
            <Transition name="swap" mode="out-in">
              <div :key="activeSkill">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[var(--accent-soft,#d0b2ff)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    :viewBox="ICONS[current.icon].viewBox"
                    :fill="ICONS[current.icon].stroke ? 'none' : 'currentColor'"
                    :stroke="ICONS[current.icon].stroke ? 'currentColor' : undefined"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path
                      :stroke-linecap="ICONS[current.icon].stroke ? 'round' : undefined"
                      :stroke-linejoin="ICONS[current.icon].stroke ? 'round' : undefined"
                      :fill-rule="ICONS[current.icon].fillRule"
                      :clip-rule="ICONS[current.icon].fillRule ? 'evenodd' : undefined"
                      :d="ICONS[current.icon].d"
                    />
                  </svg>
                </div>
                <h3 class="mt-6 text-2xl font-semibold leading-snug text-white" style="text-wrap: balance">{{ current.title }}</h3>
                <p class="mt-4 leading-relaxed text-white/70">{{ current.desc1 }}</p>
                <p class="mt-3 leading-relaxed text-white/50">{{ current.desc2 }}</p>

                <p class="mt-8 text-xs text-white/40">{{ t.status }}</p>
                <div class="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span v-for="(st, si) in current.statuses" :key="si" class="inline-flex items-center gap-2" :class="statusTextClass[st.variant]">
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDotClass[st.variant]"></span>{{ st.label }}
                  </span>
                </div>

                <p class="mt-6 text-xs text-white/40">{{ t.customer }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <component
                    :is="c.link && c.link !== '#' ? 'a' : 'span'"
                    v-for="(c, ci) in current.customers"
                    :key="ci"
                    :href="c.link && c.link !== '#' ? c.link : undefined"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="client-chip"
                  >{{ c.name }}</component>
                </div>
              </div>
            </Transition>
          </div>
        </aside>
      </div>
    </div>

    <!-- Stack: two drifting rows of tool logos -->
    <div class="mt-24">
      <h3 class="mx-auto max-w-6xl px-6 text-xl font-semibold text-white md:px-10">{{ t.primaryStack }}</h3>
      <div class="tech-stack mt-8 grid gap-4">
        <div v-for="(row, r) in techRows" :key="r" class="stack-row flex w-max gap-4" :class="r && 'is-rev'">
          <template v-for="copy in 2" :key="copy">
            <span
              v-for="tech in row"
              :key="tech.name + copy"
              class="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-3 pr-5"
              :aria-hidden="copy === 2"
            >
              <img :src="tech.icon" alt="" loading="lazy" class="h-6 w-6 object-contain" :class="DARK_LOGOS.has(tech.name) && 'invert'" />
              <span class="whitespace-nowrap text-sm text-white/75">{{ tech.name }}</span>
            </span>
          </template>
        </div>
      </div>
    </div>

    <!-- Experience, results, recognition, reviews and contact in one ruled grid -->
    <div class="mx-auto mt-24 max-w-6xl px-6 md:px-10">
      <div class="facts grid overflow-hidden rounded-[1.75rem] border border-white/10 md:grid-cols-2 lg:grid-cols-3">
        <div v-reveal class="fact">
          <h4 class="fact-h">{{ t.experience }}</h4>
          <ul class="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
            <li>{{ t.experlemceDetail1.replace('-> ', '') }}</li>
            <li>{{ t.experlemceDetail2.replace('-> ', '') }}</li>
            <li>{{ t.experlemceDetail3.replace('-> ', '') }}</li>
          </ul>
        </div>

        <div v-reveal="1" class="fact">
          <h4 class="fact-h">{{ t.provenUxImpact }}</h4>
          <ul class="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
            <li>{{ t.provenDetail1.replace('— ', '') }}</li>
            <li>{{ t.provenDetail2.replace('— ', '') }}</li>
            <li>{{ t.provenDetail3.replace('— ', '') }}</li>
          </ul>
        </div>

        <div v-reveal="2" class="fact">
          <h4 class="fact-h">{{ t.recognition }}</h4>
          <ul class="mt-4 space-y-2.5 text-sm text-white/60">
            <li>
              <a href="https://www.borntodev.com/devlab/certificate" target="_blank" rel="noopener noreferrer" class="fact-a">Certificate</a>
              in <a href="https://www.borntodev.com/devlab/profile/18960" target="_blank" rel="noopener noreferrer" class="fact-a">DevLab</a>
              by <a href="https://www.borntodev.com/" target="_blank" rel="noopener noreferrer" class="fact-a">BornToDev</a>
            </li>
            <li>
              <a href="https://cssbattle.dev/player/baronquibe" target="_blank" rel="noopener noreferrer" class="fact-a">Stats</a>
              in <a href="https://cssbattle.dev/" target="_blank" rel="noopener noreferrer" class="fact-a">CSSBattle</a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1uEVPXvL2djxsjJTTpgLq-QNLn_Mg7moN/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="fact-a">Certificate Cybersec</a>
              by <a href="https://www.facebook.com/RPCACyberClub" target="_blank" rel="noopener noreferrer" class="fact-a">RPCACyberClub</a>
            </li>
          </ul>
        </div>

        <div v-reveal class="fact lg:col-span-2">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h4 class="fact-h">{{ t.fastworkTitle }}</h4>
            <a :href="fastwork.profileUrl" target="_blank" rel="noopener noreferrer" class="fact-a text-sm">{{ t.fastworkViewProfile }} →</a>
          </div>
          <p class="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm text-white/60">
            <span class="inline-flex items-center gap-1.5 text-2xl font-semibold text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-[#e8400d]" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
              {{ fastwork.rating.toFixed(1) }}
            </span>
            <span><b class="font-semibold text-white">{{ fastwork.orders }}</b> {{ t.fastworkOrders }}</span>
            <span><b class="font-semibold text-white">{{ fastwork.clients }}</b> {{ t.fastworkClients }}</span>
            <span><b class="font-semibold text-white">{{ fastwork.repeatHires }}</b> {{ t.fastworkRepeat }}</span>
          </p>
          <ul class="mt-5 grid gap-4 sm:grid-cols-2">
            <li v-for="(review, ri) in fastwork.reviews" :key="ri" class="border-t border-white/10 pt-4">
              <p class="flex items-center justify-between text-sm">
                <span class="font-medium text-white/80">{{ review.anonymous ? t.fastworkAnonymousName : review.name }}</span>
                <span class="text-xs tabular-nums text-white/45">★ {{ review.rating.toFixed(1) }} · {{ review.date }}</span>
              </p>
              <p v-if="review.text" class="mt-2 text-sm leading-relaxed text-white/70">“{{ review.text }}”</p>
            </li>
          </ul>
        </div>

        <div id="contact" v-reveal="1" class="fact">
          <h4 class="fact-h">{{ t.contact }}</h4>
          <ul class="mt-4 space-y-3 text-sm text-white/70">
            <li><a href="mailto:Pj06052538@gmail.com" class="fact-a">Pj06052538@gmail.com</a></li>
            <li><a href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/" target="_blank" rel="noopener noreferrer" class="fact-a">LinkedIn — npjtech</a></li>
            <li><a href="https://www.facebook.com/Paphonthanai.name" target="_blank" rel="noopener noreferrer" class="fact-a">Facebook — Paphonthanai.name</a></li>
            <li><a href="https://m.me/Paphonthanai.name" target="_blank" rel="noopener noreferrer" class="fact-a">{{ t.messengerLabel }}</a></li>
            <li><a href="https://github.com/paphonthanai" target="_blank" rel="noopener noreferrer" class="fact-a">GitHub — paphonthanai</a></li>
          </ul>
          <p class="mt-6 text-xs text-white/40">{{ t.username }}: npj.tech · {{ t.trustScore }} 99.5%</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.idx-row { transition: color 0.25s ease; }
.idx-title { color: rgba(255, 255, 255, 0.55); transition: color 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.idx-row:hover .idx-title,
.idx-row.is-on .idx-title { color: #fff; }
.idx-row.is-on .idx-title { transform: translateX(6px); }
.idx-row:focus-visible { outline: 2px solid var(--accent-soft, #d0b2ff); outline-offset: 2px; border-radius: 6px; }

.detail {
  border: 1px solid #262626;
  background:
    radial-gradient(120% 70% at 100% 0%, color-mix(in srgb, var(--accent, #b600a8) 22%, transparent), transparent 60%),
    radial-gradient(90% 60% at 0% 100%, color-mix(in srgb, var(--accent-2, #e8400d) 12%, transparent), transparent 60%),
    #141414;
  box-shadow: 0 30px 80px -40px color-mix(in srgb, var(--accent, #b600a8) 55%, transparent);
}
.swap-enter-active,
.swap-leave-active { transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), filter 0.28s, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
.swap-enter-from { opacity: 0; filter: blur(6px); transform: translateY(8px); }
.swap-leave-to { opacity: 0; filter: blur(6px); transform: translateY(-6px); }

.client-chip {
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: border-color 0.2s ease, color 0.2s ease;
}
a.client-chip:hover { border-color: var(--accent-soft, #d0b2ff); color: #fff; }

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

.facts { background: #101010; }
.fact {
  padding: 2rem;
  border-color: rgba(255, 255, 255, 0.1);
  border-style: solid;
  border-width: 0 0 1px 0;
}
@media (min-width: 768px) {
  .fact { border-right-width: 1px; }
}
.fact-h { font-size: 1.05rem; font-weight: 600; color: #fff; }
.fact-a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--accent-soft, #d0b2ff) 40%, transparent);
  text-underline-offset: 4px;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}
.fact-a:hover { color: #fff; text-decoration-color: var(--accent-soft, #d0b2ff); }
</style>
