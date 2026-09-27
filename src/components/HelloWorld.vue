<script setup>
import { computed, inject } from 'vue'
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

const featuredProjects = [
  { title: 'Loan App System', desc: 'Flutter + Firebase for Co-op Lending' },
  { title: 'CyberSec Dashboard', desc: 'Node.js + Realtime Log Monitor' },
  { title: 'RE Toolkit CLI', desc: 'Reverse Binary / Stego Tools' },
]
</script>

<template>
  <section id="portfolio" class="border-b border-base-300 bg-base-100 py-20 px-6 md:px-10">
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <!-- Left Column: Skills -->
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.primaryStack }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">
          {{ t.sectionTitle }}
        </h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>

        <div class="mt-10 grid gap-5">
          <article
            v-for="(skill, i) in skills"
            :key="i"
            class="rounded-lg border border-base-300 bg-base-200/40 p-6 transition hover:border-primary/40"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :viewBox="ICONS[skill.icon].viewBox"
                  :fill="ICONS[skill.icon].stroke ? 'none' : 'currentColor'"
                  :stroke="ICONS[skill.icon].stroke ? 'currentColor' : undefined"
                  stroke-width="1.5"
                >
                  <path
                    :stroke-linecap="ICONS[skill.icon].stroke ? 'round' : undefined"
                    :stroke-linejoin="ICONS[skill.icon].stroke ? 'round' : undefined"
                    :fill-rule="ICONS[skill.icon].fillRule"
                    :clip-rule="ICONS[skill.icon].fillRule ? 'evenodd' : undefined"
                    :d="ICONS[skill.icon].d"
                  />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-display text-lg font-semibold leading-snug text-base-content">
                  {{ skill.title }}
                </h3>
                <p class="mt-1 text-sm text-base-content/70">{{ skill.desc1 }}</p>
                <p class="mt-1 text-sm text-base-content/50">{{ skill.desc2 }}</p>

                <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                  <span
                    v-for="(s, si) in skill.statuses"
                    :key="si"
                    class="inline-flex items-center gap-1.5"
                    :class="statusTextClass[s.variant]"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDotClass[s.variant]"></span>
                    {{ s.label }}
                  </span>
                </div>

                <div class="mt-3 flex flex-wrap gap-2">
                  <a
                    v-for="(c, ci) in skill.customers"
                    :key="ci"
                    :href="c.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full border border-base-300 px-3 py-1 text-xs text-base-content/60 transition hover:border-primary/60 hover:text-primary"
                  >
                    {{ c.name }}
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Right Column -->
      <div class="grid gap-6">
        <div class="rounded-lg border border-base-300 bg-base-200/40 p-7">
          <h4 class="font-display text-lg font-semibold text-base-content">{{ t.primaryStack }}</h4>
          <div class="mt-5 grid gap-6">
            <div v-for="(category, index) in techCategories" :key="index">
              <h5 class="mb-3 border-b border-base-300 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                {{ category.name }}
              </h5>
              <div class="grid grid-cols-3 gap-4 text-center sm:grid-cols-4">
                <div v-for="tech in category.items" :key="tech.name" class="group flex flex-col items-center gap-2">
                  <img
                    :src="tech.icon"
                    :alt="tech.name"
                    class="h-7 w-7 opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <span class="text-[11px] font-medium text-base-content/60 transition group-hover:text-primary">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 rounded-lg border border-base-300 bg-base-200/40 p-7">
          <div>
            <h4 class="font-display text-base font-semibold text-primary">{{ t.experience }}</h4>
            <p class="mt-2 text-sm text-base-content/70">{{ t.experlemceDetail }}</p>
          </div>
          <div>
            <h4 class="font-display text-base font-semibold text-primary">{{ t.provenUxImpact }}</h4>
            <p class="mt-2 text-sm text-base-content/70">{{ t.provenDetail1 }}</p>
            <p class="mt-1 text-sm text-base-content/70">{{ t.provenDetail2 }}</p>
          </div>
        </div>

        <div id="contact" class="grid grid-cols-1 gap-8 rounded-lg border border-base-300 bg-base-200/40 p-7 sm:grid-cols-2">
          <div>
            <h4 class="font-display text-base font-semibold text-primary">{{ t.recognition }}</h4>
            <ul class="mt-3 space-y-2 text-sm text-base-content/70">
              <li>
                <a href="https://www.borntodev.com/devlab/certificate" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">Certificate</a>
                in
                <a href="https://www.borntodev.com/devlab/profile/18960" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">DevLab</a>
                by
                <a href="https://www.borntodev.com/" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">BornToDev</a>
              </li>
              <li>
                <a href="https://cssbattle.dev/player/baronquibe" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">Stats</a>
                in
                <a href="https://cssbattle.dev/" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">CSSBattle</a>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1uEVPXvL2djxsjJTTpgLq-QNLn_Mg7moN/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">Certificate Cybersec</a>
                by
                <a href="https://www.facebook.com/RPCACyberClub" target="_blank" rel="noopener noreferrer" class="text-base-content/80 underline-offset-4 hover:text-primary hover:underline">RPCACyberClub</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-base font-semibold text-primary">{{ t.contact }}</h4>
            <div class="mt-3 space-y-3 text-sm">
              <div class="flex items-center gap-2 text-base-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 shrink-0 text-primary/70">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:Pj06052538@gmail.com" class="hover:text-primary">Pj06052538@gmail.com</a>
              </div>
              <div class="flex items-center gap-2 text-base-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-primary/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.75s.784-1.75 1.75-1.75 1.75.787 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.271h-3v-4.5c0-1.074-.021-2.458-1.5-2.458s-1.731 1.174-1.731 2.382v4.576h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.561 2.839-1.561 3.033 0 3.591 1.996 3.591 4.59v4.738z" />
                </svg>
                <a href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/" target="_blank" rel="noopener noreferrer" class="hover:text-primary">linkedin.com/in/npjtech</a>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 rounded-lg border border-base-300 bg-base-200/40 p-7 sm:grid-cols-4">
          <div>
            <p class="text-[11px] uppercase tracking-widest text-base-content/40">{{ t.projectStatus }}</p>
            <p class="mt-1 font-display text-lg font-semibold text-primary">In Progress</p>
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-widest text-base-content/40">{{ t.trustScore }}</p>
            <p class="mt-1 font-display text-lg font-semibold text-primary">99.5%</p>
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-widest text-base-content/40">{{ t.username }}</p>
            <p class="mt-1 text-sm text-base-content/70">npj.tech</p>
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-widest text-base-content/40">{{ t.github }}</p>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/paphonthanai" class="mt-1 block text-sm text-base-content/70 hover:text-primary">github.com/paphonthanai</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 📁 Featured Projects -->
    <div id="project" class="mx-auto mt-20 max-w-6xl">
      <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.featuredProjects }}</p>
      <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.featuredProjects }}</h2>
      <div class="mt-3 h-px w-16 bg-primary/60"></div>

      <div class="mt-10 grid gap-8 md:grid-cols-3">
        <div
          v-for="(project, i) in featuredProjects"
          :key="i"
          class="group overflow-hidden rounded-lg border border-base-300 bg-base-200/40 transition hover:border-primary/40"
        >
          <div class="overflow-hidden">
            <img
              src="./image/Code.png"
              :alt="`${project.title} project screenshot`"
              width="400" height="212" loading="lazy"
              class="w-full transition duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <p class="font-display text-lg font-semibold text-base-content">{{ project.title }}</p>
            <p class="mt-1 text-sm text-base-content/60">{{ project.desc }}</p>
            <button class="btn btn-sm mt-4 rounded-full border-primary/70 bg-transparent px-5 text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-content">
              {{ t.viewMore }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
