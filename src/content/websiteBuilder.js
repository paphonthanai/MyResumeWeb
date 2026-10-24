// Copy for the Website Builder sales page (th/en), shared by the page
// sections and the page's JSON-LD.
//
// The product is in early access: today PNJ Tech builds and publishes each
// site, and the self-serve editor opens to customers one by one — the copy
// says so rather than promising a finished product. Plan ids must match
// firestore.rules (inquiries.package).
//
// Plan items are either a string or { t, soon: true } for a feature that is
// on the roadmap but not available yet — the card shows a "soon" badge.

export const FIRE_FIRST_URL = 'https://firefirstsafetyandtruck.com'

export const content = {
  th: {
    kicker: 'PNJ Created Website · บริการโดย PNJ Tech',
    badge: 'เปิดรับลูกค้ากลุ่มแรก',
    title: 'เว็บไซต์บริษัทสองภาษา ที่ทีมของคุณแก้เองได้',
    lead: 'แพลตฟอร์มสร้างเว็บไซต์องค์กรสำหรับธุรกิจไทย หน้าเว็บโหลดเร็ว ติด Google ด้วย SEO ครบทุกหน้า และส่งคำขอใบเสนอราคาถึงทีมขายทันที',
    ctaPrimary: 'ลงทะเบียนใช้งาน',
    ctaSecondary: 'ดูเว็บลูกค้ารายแรก',
    haveAccount: 'มีบัญชีแล้ว?',
    signIn: 'เข้าสู่ระบบ',
    mock: { th: 'ภาษาไทย', en: 'English', field: 'หัวข้อหน้าแรก', saved: 'บันทึกฉบับร่างแล้ว', publish: 'เผยแพร่' },

    featuresKicker: 'Features',
    featuresTitle: 'ทุกอย่างที่เว็บบริษัทต้องมี',
    features: [
      { icon: 'edit', title: 'แก้เนื้อหาเองได้', desc: 'เปลี่ยนข้อความ รูป ราคา และผลงานผ่านหน้าจัดการ ไม่ต้องรอนักพัฒนา' },
      { icon: 'lang', title: 'ไทย-อังกฤษในตัว', desc: 'แต่ละภาษามี URL ของตัวเอง กรอกสองภาษาคู่กันในหน้าจอเดียว' },
      { icon: 'search', title: 'SEO ครบทุกหน้า', desc: 'title, description, hreflang, sitemap และข้อมูลธุรกิจสำหรับ Google ตั้งให้อัตโนมัติ' },
      { icon: 'share', title: 'การ์ดแชร์ลิงก์', desc: 'ภาพตัวอย่างเวลาแชร์ลิงก์ใน Facebook และ LINE แยกทุกหน้าและทุกภาษา' },
      { icon: 'bolt', title: 'โหลดเร็ว ปลอดภัย', desc: 'หน้าเว็บสร้างเป็นไฟล์สำเร็จรูป ไม่มีปลั๊กอินให้ต้องอัปเดตหรือถูกเจาะ' },
      { icon: 'inbox', title: 'ฟอร์มขอใบเสนอราคา', desc: 'ข้อความจากลูกค้าเข้ากล่องข้อความของบริษัท พร้อมแจ้งเตือนทีมขาย' },
    ],

    stepsKicker: 'How it works',
    stepsTitle: 'เริ่มใช้งานอย่างไร',
    stepsIntro: 'ช่วงเปิดรับลูกค้ากลุ่มแรก ทีม PNJ Tech จัดทำและเผยแพร่เว็บให้ แล้วเปิดหน้าจัดการให้ทีมของคุณแก้เองทีละราย',
    steps: [
      { title: 'ส่งข้อมูลบริษัท', desc: 'โลโก้ บริการ ผลงาน และข้อมูลติดต่อ ภาษาไทยหรืออังกฤษก็ได้' },
      { title: 'จัดวางบนแม่แบบ', desc: 'เราจัดหน้าเว็บสองภาษาพร้อม SEO และภาพแชร์ลิงก์ครบทุกหน้า' },
      { title: 'ตรวจและเผยแพร่', desc: 'ตรวจด้วยกันก่อน แล้วเผยแพร่บนโดเมนของคุณ' },
      { title: 'ดูแลเนื้อหาเอง', desc: 'แก้ผ่านหน้าจัดการ หรือให้ทีมเราดูแลต่อก็ได้' },
    ],
    stepLabel: 'ขั้นที่',

    caseKicker: 'ลูกค้ารายแรก',
    caseTitle: 'Fire First Safety & Truck',
    caseDesc: 'บริษัทจำหน่ายรถดับเพลิง อุปกรณ์ดับเพลิง และบริการฝึกอบรม เว็บไซต์ของบริษัทที่ PNJ Tech ทำให้เป็นต้นแบบของแพลตฟอร์มนี้ และเป็นเว็บแรกที่ย้ายขึ้นระบบ',
    caseStats: [
      { value: '5 × 2', label: 'หน้า ไทย และ อังกฤษ' },
      { value: '10', label: 'ภาพแชร์ลิงก์ แยกทุกหน้าทุกภาษา' },
      { value: '19', label: 'ส่วนของหน้าเว็บที่แก้ได้บนแพลตฟอร์ม' },
    ],
    caseLink: 'เปิดเว็บไซต์ Fire First',

    pricingKicker: 'Pricing',
    pricingTitle: 'แพ็กเกจ',
    pricingIntro: 'ราคาเปิดตัวสำหรับลูกค้ากลุ่มแรก ต่อเว็บไซต์ต่อเดือน',
    freeNote: 'ไม่ต้องใช้บัตรเครดิต',
    perMonth: '/ เดือน',
    choose: 'เลือกแพ็กเกจนี้',
    popular: 'แนะนำ',
    soon: 'เร็ว ๆ นี้',
    plans: [
      {
        id: 'site-free', name: 'Free', tagline: 'ทดลองใช้', price: '0',
        items: ['ที่อยู่เว็บ .web.app', 'โฮสติ้งบน Google Cloud', 'แก้เนื้อหาทีละส่วน ไม่ต้องเขียนโค้ด', '5 หน้า ภาษาเดียว', 'ป้าย Made with PNJ Tech',
          { t: 'จัดหน้าแบบลากและวาง', soon: true }, { t: 'แม่แบบหลายแบบให้เลือก', soon: true }],
      },
      {
        id: 'site-light', name: 'Light', tagline: 'เริ่มต้นออนไลน์', price: '390',
        items: ['ใช้โดเมนของคุณเอง', 'พื้นที่เก็บไฟล์ 2 GB', '15 หน้า ไทย-อังกฤษ', 'ฟอร์มขอใบเสนอราคา + แจ้งเตือน', 'ผู้ร่วมแก้ไข 2 คน', 'ไม่มีป้าย'],
      },
      {
        id: 'site-core', name: 'Core', tagline: 'ดึงดูดลูกค้า', price: '690',
        items: ['ทุกอย่างใน Light', 'พื้นที่เก็บไฟล์ 20 GB', 'ไม่จำกัดจำนวนหน้า', 'รายการสินค้า ผลงาน และคำถามที่พบบ่อย', 'ผู้ร่วมแก้ไข 5 คน',
          { t: 'เครื่องมือการตลาดพื้นฐาน', soon: true }, { t: 'รับชำระเงินออนไลน์', soon: true }],
      },
      {
        id: 'site-business', name: 'Business', tagline: 'ขยายแบรนด์', price: '990', featured: true,
        items: ['ทุกอย่างใน Core', 'พื้นที่เก็บไฟล์ 50 GB', 'ผู้ร่วมแก้ไข 10 คน',
          { t: 'ผู้ช่วย AI แปลภาษาและเขียน SEO', soon: true }, { t: 'ร้านค้าออนไลน์พื้นฐาน', soon: true }, { t: 'ระบบนัดหมายและจองบริการ', soon: true }],
      },
      {
        id: 'site-elite', name: 'Business Elite', tagline: 'ขยายธุรกิจ', price: '2,990',
        items: ['ทุกอย่างใน Business', 'พื้นที่เก็บไฟล์ 200 GB', 'ผู้ร่วมแก้ไข 100 คน',
          { t: 'ดูแลหลายเว็บไซต์ในบัญชีเดียว', soon: true }, { t: 'ร้านค้าออนไลน์ขั้นสูง', soon: true }, { t: 'เครื่องมือการตลาดขั้นสูง', soon: true }, { t: 'API สำหรับนักพัฒนา', soon: true }],
      },
    ],
    setupTitle: 'บริการจัดทำเว็บให้',
    setupDesc: 'ทีม PNJ Tech ทำเว็บให้ครบเหมือนที่ทำให้ Fire First แล้วส่งมอบให้ทีมคุณดูแลต่อ',
    setupPrice: '15,000–35,000 บาท (ครั้งเดียว)',
    setupCta: 'ขอใบเสนอราคา',

    faqKicker: 'FAQ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq: [
      { q: 'ต้องมีโดเมนของตัวเองไหม', a: 'ไม่จำเป็น เริ่มด้วยที่อยู่ .web.app ได้ แล้วเชื่อมโดเมนของคุณเมื่อพร้อม' },
      { q: 'ย้ายเว็บเดิมมาได้ไหม', a: 'ได้ เราย้ายข้อความ รูป และ URL เดิมให้ เพื่อไม่ให้อันดับใน Google หายไป' },
      { q: 'ทีมของเราจะแก้เว็บเองได้เมื่อไร', a: 'หน้าจัดการเนื้อหากำลังเปิดให้ลูกค้ากลุ่มแรกทีละราย ระหว่างนี้แจ้งแก้ผ่านทีมงานได้' },
      { q: 'ข้อมูลบนเว็บเป็นของใคร', a: 'เป็นของบริษัทคุณ ขอส่งออกข้อความและรูปทั้งหมดได้ทุกเมื่อ' },
    ],

    form: {
      kicker: 'Done-for-you',
      title: 'ให้ทีมเราทำเว็บให้',
      intro: 'อยากให้ทีม PNJ Tech ย้ายเว็บเดิมหรือทำเว็บใหม่ให้ บอกชื่อบริษัท เว็บไซต์เดิม (ถ้ามี) และสิ่งที่ต้องการ เราจะติดต่อกลับ',
      message: 'บริษัทและสิ่งที่ต้องการ',
    },
    formPackages: { 'site-free': 'Free', 'site-light': 'Light', 'site-core': 'Core', 'site-business': 'Business', 'site-elite': 'Business Elite', 'site-setup': 'บริการจัดทำเว็บให้' },
  },
  en: {
    kicker: 'PNJ Created Website · by PNJ Tech',
    badge: 'Now onboarding early customers',
    title: 'Bilingual company websites your team can edit',
    lead: 'A website builder for Thai businesses. Pages load fast, every page is set up for Google, and quote requests go straight to your sales team.',
    ctaPrimary: 'Sign up',
    ctaSecondary: 'See our first customer',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
    mock: { th: 'Thai', en: 'English', field: 'Home page headline', saved: 'Draft saved', publish: 'Publish' },

    featuresKicker: 'Features',
    featuresTitle: 'Everything a company website needs',
    features: [
      { icon: 'edit', title: 'Edit it yourself', desc: 'Change text, images, prices and projects from the editor. No developer needed.' },
      { icon: 'lang', title: 'Thai and English built in', desc: 'Each language gets its own URL, and you fill in both side by side.' },
      { icon: 'search', title: 'SEO on every page', desc: 'Titles, descriptions, hreflang, sitemap and business data for Google are set up for you.' },
      { icon: 'share', title: 'Link preview cards', desc: 'Share images for Facebook and LINE, one for every page in every language.' },
      { icon: 'bolt', title: 'Fast and secure', desc: 'Pages are built as static files, with no plugins to update or get hacked.' },
      { icon: 'inbox', title: 'Quote request forms', desc: 'Customer messages land in your inbox and notify your sales team.' },
    ],

    stepsKicker: 'How it works',
    stepsTitle: 'Getting started',
    stepsIntro: 'During early access, the PNJ Tech team builds and publishes your site, then opens the editor to your team.',
    steps: [
      { title: 'Send your company details', desc: 'Logo, services, projects and contact details, in Thai or English.' },
      { title: 'We lay it out', desc: 'We build the bilingual pages with SEO and share images on every page.' },
      { title: 'Review and publish', desc: 'We check it with you, then publish it on your domain.' },
      { title: 'Keep it up to date', desc: 'Edit it in the editor, or let our team maintain it for you.' },
    ],
    stepLabel: 'Step',

    caseKicker: 'First customer',
    caseTitle: 'Fire First Safety & Truck',
    caseDesc: 'A supplier of fire trucks, fire equipment and training. The company website PNJ Tech built for them is the prototype for this platform, and the first site moving onto it.',
    caseStats: [
      { value: '5 × 2', label: 'pages in Thai and English' },
      { value: '10', label: 'share images, one per page and language' },
      { value: '19', label: 'editable page sections on the platform' },
    ],
    caseLink: 'Visit the Fire First website',

    pricingKicker: 'Pricing',
    pricingTitle: 'Plans',
    pricingIntro: 'Launch pricing for early customers, per website per month.',
    freeNote: 'No credit card required',
    perMonth: '/ month',
    choose: 'Choose this plan',
    popular: 'Recommended',
    soon: 'Soon',
    plans: [
      {
        id: 'site-free', name: 'Free', tagline: 'Try it out', price: '0',
        items: ['.web.app address', 'Hosting on Google Cloud', 'Edit section by section, no code', '5 pages, one language', 'Made with PNJ Tech badge',
          { t: 'Drag-and-drop page layout', soon: true }, { t: 'A choice of templates', soon: true }],
      },
      {
        id: 'site-light', name: 'Light', tagline: 'Get online', price: '390',
        items: ['Your own domain', '2 GB file storage', '15 pages in Thai and English', 'Quote form with notifications', '2 collaborators', 'No badge'],
      },
      {
        id: 'site-core', name: 'Core', tagline: 'Attract customers', price: '690',
        items: ['Everything in Light', '20 GB file storage', 'Unlimited pages', 'Product, project and FAQ lists', '5 collaborators',
          { t: 'Basic marketing tools', soon: true }, { t: 'Online payments', soon: true }],
      },
      {
        id: 'site-business', name: 'Business', tagline: 'Grow your brand', price: '990', featured: true,
        items: ['Everything in Core', '50 GB file storage', '10 collaborators',
          { t: 'AI help with translation and SEO', soon: true }, { t: 'Basic online store', soon: true }, { t: 'Bookings and appointments', soon: true }],
      },
      {
        id: 'site-elite', name: 'Business Elite', tagline: 'Scale your business', price: '2,990',
        items: ['Everything in Business', '200 GB file storage', '100 collaborators',
          { t: 'Several websites in one account', soon: true }, { t: 'Advanced online store', soon: true }, { t: 'Advanced marketing tools', soon: true }, { t: 'Developer API', soon: true }],
      },
    ],
    setupTitle: 'Done-for-you setup',
    setupDesc: 'The PNJ Tech team builds the whole site, as we did for Fire First, then hands it over to your team.',
    setupPrice: 'THB 15,000–35,000 (one-time)',
    setupCta: 'Request a quote',

    faqKicker: 'FAQ',
    faqTitle: 'Questions',
    faq: [
      { q: 'Do I need my own domain?', a: 'No. You can start on a .web.app address and connect your domain when you are ready.' },
      { q: 'Can you move my existing website?', a: 'Yes. We move your text, images and existing URLs so you keep your Google rankings.' },
      { q: 'When can my team edit the site themselves?', a: 'The editor is opening to early customers one at a time. Until then, our team makes edits for you.' },
      { q: 'Who owns the content?', a: 'Your company does. You can export all text and images at any time.' },
    ],

    form: {
      kicker: 'Done-for-you',
      title: 'Let our team build it',
      intro: 'Want the PNJ Tech team to move your current site or build a new one? Tell us your company name, current website (if any) and what you need, and we will get back to you.',
      message: 'Your company and what you need',
    },
    formPackages: { 'site-free': 'Free', 'site-light': 'Light', 'site-core': 'Core', 'site-business': 'Business', 'site-elite': 'Business Elite', 'site-setup': 'Done-for-you setup' },
  },
}
