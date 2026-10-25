// Copy for the company home page (th/en), from the PNJ Tech design handoff.
//
// Client names, work rows and prices come from the owner's handoff and the
// existing Website Builder plans (src/content/websiteBuilder.js, ids must match
// firestore.rules inquiries.package). Nothing here is invented: items that
// are not shipped are labelled LIVE / NEXT / LATER or sit on the roadmap.

export const FIRE_FIRST_URL = 'https://firefirstsafetyandtruck.com'
export const HOME_DD_URL = 'http://www.homedd.co.th/test.php'
export const BPP24_OPS_URL = 'https://bpp24operator.web.app/#command'
export const EMAIL = 'Pj06052538@gmail.com'
export const MESSENGER_URL = 'https://m.me/Paphonthanai.name'

export const content = {
  th: {
    banner: 'เปิดรับลูกค้ากลุ่มแรก · Created Website เริ่มต้นฟรี ไม่ต้องใช้บัตรเครดิต',
    bannerLink: 'ดูแพ็กเกจ →',
    nav: { products: 'ผลิตภัณฑ์ SaaS', solutions: 'บริการ', hardware: 'ฮาร์ดแวร์ & งานระบบสาย', work: 'ผลงาน', pricing: 'ราคา' },
    login: 'เข้าสู่ระบบ',
    cta: 'ปรึกษาโปรเจกต์',

    hero: {
      eyebrow: 'TECHNOLOGY STARTUP · THAILAND',
      line1: 'From code',
      line2a: 'to ',
      line2b: 'Hardware',
      body: 'PNJ Tech ให้บริการ SaaS พัฒนาซอฟต์แวร์ และฮาร์ดแวร์ ติดตั้งระบบ Server ระบบกล้องวงจรปิด เดินสาย รวมถึงให้คำปรึกษาและบริการอบรมเพื่อพัฒนาประสิทธิภาพบุคลากร — ทีมเดียวที่เปลี่ยนจากกระดาษหรือความต้องการ เป็นผลลัพธ์ที่จับต้องได้จริง',
      primary: 'เริ่มใช้ Created Website ฟรี',
      secondary: 'คุยโจทย์กับทีม',
      stackHead: 'ONE TEAM · FULL STACK',
      stack: [
        { n: '05', t: 'ผลิตภัณฑ์ SaaS', s: 'Created Website · ระบบจอง · ร้านค้า', tag: 'LIVE', live: true },
        { n: '04', t: 'เว็บ & แอปมือถือ', s: 'Vue · Flutter · แดชบอร์ดหลายบทบาท', tag: 'APP' },
        { n: '03', t: 'API, คลาวด์ & ความปลอดภัย', s: 'เชื่อมธนาคาร · CI/CD · ทดสอบช่องโหว่', tag: 'CLOUD' },
        { n: '02', t: 'เครือข่าย, Server & CCTV', s: 'LAN · Wi-Fi · ระบบ Server · กล้องวงจรปิด', tag: 'NET' },
        { n: '01', t: 'อุปกรณ์ สายสัญญาณ & หุ่นยนต์', s: 'เดินสาย ติดตั้ง · IoT · Robotics · วัสดุงานระบบ', tag: 'WIRE' },
      ],
    },

    clientsLabel: 'ทำงานจริงกับ',
    clients: ['เฟิร์สท เทเลคอม ซีสเต็ม', 'เคียวเออิ (ประเทศไทย)', 'โฮม ดี ดี', 'มิตรกาญ', 'สหกรณ์ฯ ตชด. 24', 'Fire First Safety & Truck', 'สมาคมการค้ามันสำปะหลังไทย'],

    solutions: {
      eyebrow: 'SOLUTIONS',
      title: 'สี่สายงาน ทีมเดียวรับผิดชอบ',
      lead: 'ไม่ต้องประสานผู้รับเหมาหลายเจ้า ระบบซอฟต์แวร์กับเครือข่ายที่รองรับถูกออกแบบมาด้วยกันตั้งแต่ต้น',
      tabs: [
        {
          id: 'software', label: 'ซอฟต์แวร์', cells: [
            { t: 'เว็บแพลตฟอร์มองค์กร', d: 'แดชบอร์ดหลายบทบาท อัปเดตเรียลไทม์ พร้อมระบบสิทธิ์ผู้ใช้' },
            { t: 'แอปมือถือ', d: 'Flutter ฟอร์มเป็นขั้นตอน เข้าใช้งานด้วย OTP' },
            { t: 'API & Backend', d: 'เชื่อมระบบภายนอก เช่น ธนาคาร ปรับประสิทธิภาพสำหรับงานขนาดใหญ่' },
            { t: 'Security & DevOps', d: 'วิเคราะห์ช่องโหว่ ตั้งค่า CI/CD ให้ปล่อยงานได้ไม่สะดุด' },
            { t: 'AI & Data', d: 'โมเดลทำนาย สคริปต์ Python และงาน TrainModel MML' },
            { t: 'งานวิจัยด้านความปลอดภัย', d: 'Reverse engineering ไฟล์ .exe และเครื่องมือระดับดิสก์ (WakeSector)' },
            { t: 'ปรับปรุงระบบเดิม', d: 'แก้ไขเว็บ PHP และโปรแกรม VB รุ่นเก่าให้ใช้งานต่อได้' },
          ],
        },
        {
          id: 'saas', label: 'ผลิตภัณฑ์ SaaS', cells: [
            { st: 'LIVE', t: 'Created Website', d: 'เว็บบริษัทสองภาษา SEO ครบ ทีมแก้เองได้' },
            { st: 'NEXT', t: 'Booking', d: 'ระบบนัดหมายและจองบริการ ผูกกับเว็บบริษัท' },
            { st: 'NEXT', t: 'Shop', d: 'ร้านค้าออนไลน์ รับชำระผ่าน PromptPay' },
            { st: 'LATER', t: 'IoT Monitor', d: 'แดชบอร์ดอุปกรณ์และเซนเซอร์ที่ทีมเราติดตั้ง' },
          ],
        },
        {
          id: 'hardware', label: 'ฮาร์ดแวร์ & งานระบบสาย', cells: [
            { t: 'เครือข่าย LAN', d: 'สำรวจหน้างาน ออกแบบ เดินสาย Cat6 และจัดตู้ Rack' },
            { t: 'Wi-Fi องค์กร', d: 'ติดตั้ง Access Point และตัวขยายสัญญาณให้ครอบคลุม' },
            { t: 'IoT & เซนเซอร์', d: 'อุปกรณ์วัดค่า เชื่อมข้อมูลขึ้นแดชบอร์ด' },
            { t: 'ระบบ Server', d: 'ติดตั้งและตั้งค่าเซิร์ฟเวอร์สำหรับองค์กร' },
            { t: 'กล้องวงจรปิด (CCTV)', d: 'สำรวจ วางตำแหน่งกล้อง เดินสาย ติดตั้ง และตั้งค่าการดูย้อนหลัง' },
            { t: 'Robotics', d: 'ออกแบบและผลิตหุ่นยนต์ ตั้งแต่ระบบควบคุมถึงชิ้นงาน' },
          ],
        },
        {
          id: 'training', label: 'อบรม & ที่ปรึกษา', cells: [
            { t: 'อบรมทีมองค์กร', d: 'ยกระดับทักษะทีมพัฒนาและทีม IT ภายใน' },
            { t: 'คอร์สเขียนโปรแกรม', d: 'สำหรับบุคคล ตั้งแต่พื้นฐานถึงงานจริง' },
            { t: 'ที่ปรึกษาเชิงเทคนิค', d: 'แปลงงานเทคนิคเป็นแผนที่ผู้บริหารอนุมัติได้' },
          ],
        },
      ],
    },

    product: {
      eyebrow: 'PRODUCT 01 · CREATED WEBSITE',
      title: 'เว็บไซต์บริษัทสองภาษา ที่ทีมของคุณแก้เองได้',
      lead: 'หน้าเว็บโหลดเร็ว ติด Google ด้วย SEO ครบทุกหน้า และส่งคำขอใบเสนอราคาถึงทีมขายทันที',
      features: ['แก้ข้อความ รูป ราคาเอง', 'ไทย-อังกฤษ แยก URL', 'hreflang + sitemap อัตโนมัติ', 'การ์ดแชร์ Facebook / LINE', 'ไม่มีปลั๊กอินให้ถูกเจาะ', 'ฟอร์มใบเสนอราคา + แจ้งเตือน'],
      primary: 'ลงทะเบียนใช้งานฟรี',
      secondary: 'ดูเว็บลูกค้ารายแรก ↗',
      mock: { url: 'created website / sites / firefirst', field: 'หัวข้อหน้าแรก', th: 'ภาษาไทย', en: 'English', thText: 'มากกว่ารถดับเพลิง คือความปลอดภัยของทุกชีวิต', enText: 'More than fire trucks — safety for every life', saved: '✓ บันทึกฉบับร่างแล้ว', publish: 'เผยแพร่' },
      stats: [{ v: '5 × 2', l: 'หน้า ไทย/อังกฤษ' }, { v: '10', l: 'ภาพแชร์ลิงก์' }, { v: '19', l: 'ส่วนที่แก้ได้' }],
    },

    roadmap: {
      eyebrow: 'ROADMAP',
      title: 'แพลตฟอร์มที่โตไปพร้อมธุรกิจ',
      cols: [
        { h: 'ตอนนี้', items: ['เว็บบริษัทสองภาษา', 'ฟอร์มใบเสนอราคา', 'โดเมนของคุณเอง'] },
        { h: 'ไตรมาสถัดไป', items: ['จัดหน้าแบบลากวาง', 'แม่แบบหลายแบบ', 'ผู้ช่วย AI แปลภาษา & SEO'] },
        { h: 'ต่อจากนั้น', items: ['ร้านค้าออนไลน์ & PromptPay', 'ระบบนัดหมาย', 'หลายเว็บในบัญชีเดียว · API'] },
      ],
    },

    hardware: {
      eyebrow: 'HARDWARE · WIRING · MATERIALS',
      title: 'ฮาร์ดแวร์และวัสดุงานระบบสาย',
      lead: 'จัดหา ติดตั้ง และรับประกันงาน — ขอใบเสนอราคาแบบรายการวัสดุได้ในครั้งเดียว',
      cta: 'ขอใบเสนอราคาวัสดุ →',
      cards: [
        { img: 'ภาพ: สาย LAN / ไฟเบอร์', t: 'สายสัญญาณ & หัวต่อ', d: 'Cat6, Fiber, Patch panel' },
        { img: 'ภาพ: ตู้ Rack หน้างานจริง', t: 'ตู้ Rack & สวิตช์', d: 'จัดสาย ติดป้าย พร้อมเอกสารผังระบบ' },
        { img: 'ภาพ: Access Point / ตัวขยาย', t: 'อุปกรณ์ Wi-Fi', d: 'ครอบคลุมทั้งอาคาร ดูแลหลังติดตั้ง' },
        { img: 'ภาพ: บอร์ด IoT / หุ่นยนต์', t: 'IoT & ชุดหุ่นยนต์', d: 'เซนเซอร์ บอร์ดควบคุม ชิ้นงานต้นแบบ' },
      ],
    },

    work: {
      eyebrow: 'SELECTED WORK',
      title: 'ระบบที่องค์กรใช้งานจริง',
      rows: [
        { c: 'มิตรกาญ', p: 'ระบบบริหารงานขนส่ง เว็บ + แอปมือถือ', s: 'ใช้งานจริง', ok: true },
        { c: 'เฟิร์สท เทเลคอม ซีสเต็ม', p: 'แดชบอร์ดหลายบทบาท, CI/CD และ Security', s: 'ส่งมอบแล้ว', ok: true },
        { c: 'โฮม ดี ดี', p: 'API เชื่อมต่อธนาคารเพื่อค้นหาสินเชื่อ', s: 'ส่งมอบแล้ว', ok: true, href: HOME_DD_URL, link: 'ดูตัวอย่าง ↗' },
        { c: 'สหกรณ์ออมทรัพย์ ตชด. 24', p: 'แอปสินเชื่อสหกรณ์ Flutter + Firebase', s: 'รออนุมัติ', ok: false },
        { c: 'Fire First Safety & Truck', p: 'เว็บบริษัทสองภาษาบน Created Website', s: 'ใช้งานจริง', ok: true },
        { c: 'กก.ตชด.24', p: 'ศูนย์ปฏิบัติการ: แผนที่ดาวเทียมและเครื่องมือปฏิบัติการ (ต้นแบบ)', s: 'ต้นแบบ', ok: false, href: BPP24_OPS_URL, link: 'ดูต้นแบบ ↗' },
        { c: 'Geele ปทุม', p: 'ChargeGo แพลตฟอร์มสถานีชาร์จ EV (ต้นแบบ)', s: 'ต้นแบบ', ok: false },
        { c: 'เคียวเออิ (ประเทศไทย)', p: 'ดูแลและปรับปรุงเว็บไซต์บริษัท (PHP)', s: 'เคยดูแล', past: true },
        { c: 'Hodaka', p: 'ดูแลและปรับปรุงเว็บไซต์บริษัท (PHP)', s: 'เคยดูแล', past: true },
      ],
    },

    pricing: {
      eyebrow: 'PRICING · CREATED WEBSITE',
      title: 'เริ่มฟรี อัปเกรดเมื่อพร้อม',
      lead: 'ราคาเปิดตัวสำหรับลูกค้ากลุ่มแรก ต่อเว็บไซต์',
      monthly: 'รายเดือน',
      yearly: 'รายปี · ฟรี 2 เดือน',
      forever: 'ตลอดไป',
      perMonth: '/ เดือน',
      perYear: '/ ปี',
      recommended: 'แนะนำ',
      plans: [
        { id: 'site-free', name: 'Free', tag: 'ทดลองใช้', cta: 'เริ่มฟรี', items: ['5 หน้า ภาษาเดียว', 'ที่อยู่ .web.app', 'ป้าย Made with PNJ Tech'] },
        { id: 'site-light', name: 'Light', tag: 'เริ่มต้นออนไลน์', cta: 'เลือก Light', items: ['โดเมนของคุณเอง', '15 หน้า ไทย-อังกฤษ', 'ฟอร์มใบเสนอราคา + แจ้งเตือน', 'ผู้ร่วมแก้ไข 2 คน'] },
        { id: 'site-core', name: 'Core', tag: 'ดึงดูดลูกค้า', cta: 'เลือก Core', featured: true, items: ['ไม่จำกัดจำนวนหน้า', 'สินค้า ผลงาน FAQ', 'พื้นที่ 20 GB', 'ผู้ร่วมแก้ไข 5 คน'] },
        { id: 'site-business', name: 'Business', tag: 'ขยายแบรนด์', cta: 'เลือก Business', items: ['ทุกอย่างใน Core', 'พื้นที่ 50 GB', 'ผู้ร่วมแก้ไข 10 คน', 'ได้ฟีเจอร์ใหม่ก่อนใคร'] },
      ],
      setupTitle: 'ให้ทีมเราจัดทำเว็บให้',
      setupBody: 'ย้ายเว็บเดิมหรือทำใหม่ แล้วส่งมอบให้ทีมคุณดูแลต่อ · 15,000–35,000 บาท ครั้งเดียว',
      setupCta: 'ขอใบเสนอราคา',
    },

    process: {
      eyebrow: 'PROCESS',
      title: 'เห็นภาพทุกขั้นก่อนลงมือ',
      steps: [
        { t: 'คุยโจทย์', d: 'เข้าใจปัญหาและกระบวนการจริง' },
        { t: 'วางผังงาน', d: 'Flowchart และสเปกให้ผู้บริหารอนุมัติ' },
        { t: 'พัฒนา / ติดตั้ง', d: 'แบ่งช่วงให้ตรวจงานได้ต่อเนื่อง' },
        { t: 'ทดสอบ & ส่งมอบ', d: 'ทดสอบหน้างานจริง พร้อมเอกสาร' },
        { t: 'ดูแลต่อเนื่อง', d: 'ต่อยอดระบบไปพร้อมธุรกิจ' },
      ],
    },

    contact: {
      eyebrow: 'CONTACT',
      title: 'เล่าโจทย์มา เราประเมินให้',
      lead: 'ตอบกลับภายใน 1 วันทำการ พร้อมแนวทางและใบเสนอราคาเบื้องต้น',
      messenger: 'Messenger — ปรึกษาโปรเจกต์',
      interestLabel: 'สนใจเรื่อง',
      interests: ['เว็บไซต์ SaaS', 'ระบบ / แอปตามโจทย์', 'เครือข่าย & เดินสาย', 'IoT / หุ่นยนต์', 'อบรม'],
      interestPrefix: 'สนใจเรื่อง',
      name: 'ชื่อ / บริษัท',
      reach: 'อีเมลหรือเบอร์โทร',
      message: 'รายละเอียดโจทย์ เว็บไซต์เดิม (ถ้ามี)',
      send: 'ส่งข้อความ',
      sending: 'กำลังส่ง...',
      pdpa: 'เราใช้ข้อมูลนี้เพื่อติดต่อกลับเท่านั้น ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
      required: 'กรอกชื่อ ช่องทางติดต่อ และรายละเอียดให้ครบ',
      wait: 'ส่งบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่',
      failed: 'ส่งไม่สำเร็จ กรุณาลองใหม่ หรืออีเมลถึงเราโดยตรง',
      okTitle: 'ได้รับข้อความแล้ว',
      okBody: 'ทีม PNJ Tech จะติดต่อกลับเร็ว ๆ นี้',
    },

    footer: {
      tagline: ['เทคโนโลยีครบวงจร', 'From code to Hardware'],
      product: 'ผลิตภัณฑ์', productLinks: { site: 'Created Website', pricing: 'ราคา' },
      services: 'บริการ', serviceLinks: { software: 'ซอฟต์แวร์', hardware: 'ฮาร์ดแวร์ & งานระบบสาย', training: 'อบรม' },
      company: 'บริษัท', companyLinks: { founder: 'เกี่ยวกับผู้ก่อตั้ง', blog: 'บทความ' },
    },
  },

  en: {
    banner: 'Now onboarding early customers · Created Website is free to start, no credit card',
    bannerLink: 'See plans →',
    nav: { products: 'SaaS products', solutions: 'Services', hardware: 'Hardware & cabling', work: 'Work', pricing: 'Pricing' },
    login: 'Sign in',
    cta: 'Discuss a project',

    hero: {
      eyebrow: 'TECHNOLOGY STARTUP · THAILAND',
      line1: 'From code',
      line2a: 'to ',
      line2b: 'Hardware',
      body: 'PNJ Tech provides SaaS, software development and hardware: server setup, CCTV systems and cabling, plus consulting and training to build your people’s capability — one team that turns paperwork or a need into a result you can actually touch.',
      primary: 'Start Created Website free',
      secondary: 'Talk to the team',
      stackHead: 'ONE TEAM · FULL STACK',
      stack: [
        { n: '05', t: 'SaaS products', s: 'Created Website · Booking · Shop', tag: 'LIVE', live: true },
        { n: '04', t: 'Web & mobile apps', s: 'Vue · Flutter · multi-role dashboards', tag: 'APP' },
        { n: '03', t: 'API, cloud & security', s: 'Bank integrations · CI/CD · vulnerability testing', tag: 'CLOUD' },
        { n: '02', t: 'Network, servers & CCTV', s: 'LAN · Wi-Fi · server systems · CCTV', tag: 'NET' },
        { n: '01', t: 'Devices, cabling & robots', s: 'Cabling & installation · IoT · Robotics · materials', tag: 'WIRE' },
      ],
    },

    clientsLabel: 'Working with',
    clients: ['First Telecom System', 'Kyoei (Thailand)', 'Home DD', 'Mittrakarn', 'BPP24 Cooperative', 'Fire First Safety & Truck', 'Thai Tapioca Trade Association'],

    solutions: {
      eyebrow: 'SOLUTIONS',
      title: 'Four lines of work, one accountable team',
      lead: 'No juggling several contractors. The software and the network it runs on are designed together from the start.',
      tabs: [
        {
          id: 'software', label: 'Software', cells: [
            { t: 'Enterprise web platforms', d: 'Multi-role dashboards with real-time updates and user permissions' },
            { t: 'Mobile apps', d: 'Flutter, step-by-step forms, OTP sign-in' },
            { t: 'API & backend', d: 'Integrate external systems such as banks, tuned for large workloads' },
            { t: 'Security & DevOps', d: 'Vulnerability analysis and CI/CD so releases ship smoothly' },
            { t: 'AI & data', d: 'Prediction models, Python scripts and TrainModel MML work' },
            { t: 'Security research', d: 'Reverse engineering of .exe files and disk-level tooling (WakeSector)' },
            { t: 'Legacy upgrades', d: 'Keep older PHP sites and VB programs running' },
          ],
        },
        {
          id: 'saas', label: 'SaaS products', cells: [
            { st: 'LIVE', t: 'Created Website', d: 'Bilingual company sites with full SEO that your team edits' },
            { st: 'NEXT', t: 'Booking', d: 'Appointments and service booking tied to your company site' },
            { st: 'NEXT', t: 'Shop', d: 'Online store with PromptPay payments' },
            { st: 'LATER', t: 'IoT Monitor', d: 'A dashboard for the devices and sensors we install' },
          ],
        },
        {
          id: 'hardware', label: 'Hardware & cabling', cells: [
            { t: 'LAN networks', d: 'Site survey, design, Cat6 cabling and rack setup' },
            { t: 'Enterprise Wi-Fi', d: 'Access points and extenders for full coverage' },
            { t: 'IoT & sensors', d: 'Measuring devices feeding data to a dashboard' },
            { t: 'Server systems', d: 'Server installation and setup for organizations' },
            { t: 'CCTV systems', d: 'Survey, camera placement, cabling, installation and playback setup' },
            { t: 'Robotics', d: 'Robots designed and built, from control systems to parts' },
          ],
        },
        {
          id: 'training', label: 'Training & consulting', cells: [
            { t: 'Team training', d: 'Level up in-house development and IT teams' },
            { t: 'Programming courses', d: 'For individuals, from the basics to real work' },
            { t: 'Technical consulting', d: 'Turn technical work into plans executives can approve' },
          ],
        },
      ],
    },

    product: {
      eyebrow: 'PRODUCT 01 · CREATED WEBSITE',
      title: 'Bilingual company websites your team can edit',
      lead: 'Pages load fast, every page is set up for Google, and quote requests reach your sales team instantly.',
      features: ['Edit text, images, prices yourself', 'Thai and English, separate URLs', 'hreflang + sitemap, automatic', 'Facebook / LINE share cards', 'No plugins to get hacked', 'Quote form + notifications'],
      primary: 'Sign up free',
      secondary: 'See our first customer ↗',
      mock: { url: 'created website / sites / firefirst', field: 'Home page headline', th: 'Thai', en: 'English', thText: 'มากกว่ารถดับเพลิง คือความปลอดภัยของทุกชีวิต', enText: 'More than fire trucks — safety for every life', saved: '✓ Draft saved', publish: 'Publish' },
      stats: [{ v: '5 × 2', l: 'pages, Thai/English' }, { v: '10', l: 'share images' }, { v: '19', l: 'editable sections' }],
    },

    roadmap: {
      eyebrow: 'ROADMAP',
      title: 'A platform that grows with your business',
      cols: [
        { h: 'Now', items: ['Bilingual company website', 'Quote request form', 'Your own domain'] },
        { h: 'Next quarter', items: ['Drag-and-drop layout', 'Multiple templates', 'AI assistant for translation & SEO'] },
        { h: 'After that', items: ['Online store & PromptPay', 'Appointment booking', 'Multiple sites per account · API'] },
      ],
    },

    hardware: {
      eyebrow: 'HARDWARE · WIRING · MATERIALS',
      title: 'Hardware and cabling materials',
      lead: 'Supply, install and warranty — request a quote for the whole materials list in one go.',
      cta: 'Request a materials quote →',
      cards: [
        { img: 'Photo: LAN / fiber cable', t: 'Cabling & connectors', d: 'Cat6, fiber, patch panels' },
        { img: 'Photo: a real rack on site', t: 'Racks & switches', d: 'Dressed, labelled, with system diagrams' },
        { img: 'Photo: access point / extender', t: 'Wi-Fi equipment', d: 'Whole-building coverage, supported after install' },
        { img: 'Photo: IoT board / robot', t: 'IoT & robot kits', d: 'Sensors, control boards, prototypes' },
      ],
    },

    work: {
      eyebrow: 'SELECTED WORK',
      title: 'Systems organizations use every day',
      rows: [
        { c: 'Mittrakarn', p: 'Transport management system, web + mobile app', s: 'In use', ok: true },
        { c: 'First Telecom System', p: 'Multi-role dashboard, CI/CD and security', s: 'Delivered', ok: true },
        { c: 'Home DD', p: 'Bank-connected API for loan search', s: 'Delivered', ok: true, href: HOME_DD_URL, link: 'View demo ↗' },
        { c: 'BPP24 Savings Cooperative', p: 'Cooperative loan app, Flutter + Firebase', s: 'Pending approval', ok: false },
        { c: 'Fire First Safety & Truck', p: 'Bilingual company site on Created Website', s: 'In use', ok: true },
        { c: 'BPP24 Command', p: 'Operations center: satellite map and operations tools (prototype)', s: 'Prototype', ok: false, href: BPP24_OPS_URL, link: 'View prototype ↗' },
        { c: 'Geele Pathum', p: 'ChargeGo EV charging platform (prototype)', s: 'Prototype', ok: false },
        { c: 'Kyoei (Thailand)', p: 'Maintained and updated the company website (PHP)', s: 'Past client', past: true },
        { c: 'Hodaka', p: 'Maintained and updated the company website (PHP)', s: 'Past client', past: true },
      ],
    },

    pricing: {
      eyebrow: 'PRICING · CREATED WEBSITE',
      title: 'Start free, upgrade when ready',
      lead: 'Launch pricing for early customers, per website.',
      monthly: 'Monthly',
      yearly: 'Yearly · 2 months free',
      forever: 'forever',
      perMonth: '/ month',
      perYear: '/ year',
      recommended: 'Recommended',
      plans: [
        { id: 'site-free', name: 'Free', tag: 'Try it out', cta: 'Start free', items: ['5 pages, one language', '.web.app address', '"Made with PNJ Tech" badge'] },
        { id: 'site-light', name: 'Light', tag: 'Get online', cta: 'Choose Light', items: ['Your own domain', '15 pages, Thai + English', 'Quote form + notifications', '2 collaborators'] },
        { id: 'site-core', name: 'Core', tag: 'Attract customers', cta: 'Choose Core', featured: true, items: ['Unlimited pages', 'Products, projects, FAQ', '20 GB storage', '5 collaborators'] },
        { id: 'site-business', name: 'Business', tag: 'Grow your brand', cta: 'Choose Business', items: ['Everything in Core', '50 GB storage', '10 collaborators', 'New features first'] },
      ],
      setupTitle: 'Let our team build it for you',
      setupBody: 'We migrate your current site or build a new one, then hand it over for your team to run · 15,000–35,000 THB, one time',
      setupCta: 'Request a quote',
    },

    process: {
      eyebrow: 'PROCESS',
      title: 'See every step before we start',
      steps: [
        { t: 'Understand the brief', d: 'Learn the problem and how work really happens' },
        { t: 'Plan the flow', d: 'Flowchart and spec your executives can approve' },
        { t: 'Build / install', d: 'Staged, so work can be reviewed continuously' },
        { t: 'Test & hand over', d: 'Tested on site, with documentation' },
        { t: 'Ongoing support', d: 'Extend the system as the business grows' },
      ],
    },

    contact: {
      eyebrow: 'CONTACT',
      title: 'Tell us the brief, we will scope it',
      lead: 'We reply within one business day with an approach and a rough quote.',
      messenger: 'Messenger — discuss a project',
      interestLabel: 'Interested in',
      interests: ['SaaS website', 'Custom system / app', 'Network & cabling', 'IoT / robotics', 'Training'],
      interestPrefix: 'Interested in',
      name: 'Name / company',
      reach: 'Email or phone',
      message: 'Project details, current website (if any)',
      send: 'Send message',
      sending: 'Sending...',
      pdpa: 'We use this information only to get back to you, in line with Thailand’s PDPA.',
      required: 'Please fill in your name, a way to reach you, and the details.',
      wait: 'You are sending too often. Please wait a moment.',
      failed: 'Could not send. Please try again, or email us directly.',
      okTitle: 'Message received',
      okBody: 'The PNJ Tech team will be in touch soon.',
    },

    footer: {
      tagline: ['Full-service technology', 'From code to Hardware'],
      product: 'Products', productLinks: { site: 'Created Website', pricing: 'Pricing' },
      services: 'Services', serviceLinks: { software: 'Software', hardware: 'Hardware & cabling', training: 'Training' },
      company: 'Company', companyLinks: { founder: 'About the founder', blog: 'Articles' },
    },
  },
}
