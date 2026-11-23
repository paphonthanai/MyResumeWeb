import HomeView from '../views/HomeView.vue'

// Must match the admin email in firestore.rules. Website Builder customers
// also sign in with Firebase Auth now, so "signed in" alone is not admin.
const ADMIN_EMAIL = 'pj06052538@gmail.com'

async function requireAdmin() {
  const { getCurrentUser } = await import('../composables/useAuth')
  const user = await getCurrentUser()
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) return { name: 'admin-login' }
  return true
}

// Website Builder app (/app/*): client-rendered like /admin, never
// prerendered (see firebase.json rewrites). Guards live in src/app/session.js.
const appGuard = (name) => async (to) => (await import('../app/session'))[name](to)
const appMeta = { title: 'PNJ Created Website', noindex: true, lang: 'th' }
const comingSoon = (path, section) => ({
  path,
  name: `app-${section}`,
  component: () => import('../app/views/ComingSoonView.vue'),
  meta: { ...appMeta, section },
  beforeEnter: appGuard('requireBuilder'),
})

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'ปพนธนัย ใจมา (PNJ Tech) | Fullstack Developer Portfolio',
      description: 'พอร์ตโฟลิโอและเรซูเม่ของปพนธนัย ใจมา (PNJ Tech) นักพัฒนาซอฟต์แวร์ฟรีแลนซ์ ประสบการณ์กว่า 5 ปี พัฒนาเว็บและแอปด้วย Vue.js, Flutter, Firebase, PHP รวมผลงานจริงและทักษะด้าน Security/CTF',
      lang: 'th',
      // Marks this and '/en' as language alternates of the same page,
      // so App.vue can emit hreflang links between them.
      alternates: { th: '/', en: '/en' }
    }
  },
  {
    path: '/en',
    name: 'home-en',
    // Same component as Home — the homepage sections already render from
    // the shared th/en content dictionary via the language toggle's
    // provide/inject; this route just makes the English version its own
    // crawlable, prerendered URL instead of only a client-side toggle.
    component: HomeView,
    meta: {
      title: 'Paphonthanai Jaima (PNJ Tech) | Fullstack Developer Portfolio',
      description: 'Portfolio and resume of Paphonthanai Jaima (PNJ Tech), a freelance software developer with 5+ years of experience building web and mobile apps with Vue.js, Flutter, Firebase and PHP. Includes real projects and Security/CTF skills.',
      lang: 'en',
      alternates: { th: '/', en: '/en' }
    }
  },
  {
    path: '/website-builder',
    name: 'website-builder',
    // The PNJ Created Website app's home page is the same sales page;
    // canonical stays /website-builder so search engines see one page.
    alias: ['/app/home', '/app/index'],
    component: () => import('../views/WebsiteBuilderView.vue'),
    meta: {
      canonical: '/website-builder',
      title: 'PNJ Created Website | สร้างเว็บไซต์บริษัทสองภาษา แก้เองได้',
      description: 'แพลตฟอร์มสร้างเว็บไซต์บริษัทไทย-อังกฤษ โหลดเร็ว SEO ครบทุกหน้า ฟอร์มขอใบเสนอราคาส่งถึงทีมขาย เปิดรับลูกค้ากลุ่มแรก ลูกค้ารายแรกคือ Fire First Safety & Truck',
      lang: 'th',
      alternates: { th: '/website-builder', en: '/en/website-builder' }
    }
  },
  {
    path: '/en/website-builder',
    name: 'website-builder-en',
    component: () => import('../views/WebsiteBuilderView.vue'),
    meta: {
      title: 'PNJ Created Website | Bilingual company websites your team can edit',
      description: 'A website builder for Thai companies: Thai and English pages, fast loading, full SEO on every page, and quote requests delivered to your sales team. Now onboarding early customers, starting with Fire First Safety & Truck.',
      lang: 'en',
      alternates: { th: '/website-builder', en: '/en/website-builder' }
    }
  },
  {
    path: '/iot',
    name: 'iot',
    component: () => import('../views/IotView.vue'),
    meta: {
      title: 'IoT แขนกล และหุ่นยนต์ | PNJ Tech',
      description: 'งานวิจัยและพัฒนาระบบ IoT แขนกล และหุ่นยนต์ของ PNJ Tech ออกแบบ พิมพ์ชิ้นส่วน 3 มิติ เดินสาย และเขียนโปรแกรมควบคุมเองทุกขั้นตอน พร้อมต่อยอดเป็นระบบสำหรับธุรกิจ',
      lang: 'th'
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: {
      title: 'ผลงาน | PNJ Tech',
      description: 'ผลงานที่ส่งมอบจริงของ PNJ Tech แอป Android และ iOS ระบบกล้องวงจรปิดและเครือข่าย IoT แขนกล หุ่นยนต์ และเว็บไซต์พร้อมระบบจัดการ',
      lang: 'th'
    }
  },
  {
    path: '/lab',
    name: 'lab',
    component: () => import('../views/LabView.vue'),
    meta: {
      title: 'PNJ Lab | PNJ Tech',
      description: 'PNJ Lab บันทึกงานวิจัยและพัฒนาของ PNJ Tech ทั้ง IoT แขนกล ระบบเครือข่าย และซอฟต์แวร์ ที่เผยแพร่ระหว่างทาง',
      lang: 'th'
    }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: {
      title: 'แกลเลอรีผลงาน | PNJ Tech',
      description: 'ภาพจากงานที่ลงมือทำจริง หุ่นยนต์ ติดตั้งกล้องวงจรปิด ซ่อมและอัปเกรดฮาร์ดแวร์ พัฒนาซอฟต์แวร์ และการอบรม Cyber Security',
      lang: 'th'
    }
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('../views/SkillsView.vue'),
    meta: {
      title: 'Skills & Achievements | PNJ Tech',
      description: 'โปรเจกต์ที่ทำให้ลูกค้าจริง เทคโนโลยีที่ใช้ ประสบการณ์ รางวัล และรีวิวจากผู้ว่าจ้างของปพนธนัย ใจมา (PNJ Tech)',
      lang: 'th'
    }
  },
  {
    path: '/process',
    name: 'process',
    component: () => import('../views/ProcessView.vue'),
    meta: {
      title: 'ขั้นตอนการทำงาน | PNJ Tech',
      description: 'ขั้นตอนการทำงานของ PNJ Tech ตั้งแต่คุยโจทย์ วางแผนผังงาน พัฒนา ทดสอบและส่งมอบ ไปจนถึงดูแลต่อเนื่อง',
      lang: 'th'
    }
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('../views/PricingView.vue'),
    meta: {
      title: 'แพ็กเกจและราคา | PNJ Tech',
      description: 'แพ็กเกจการทำงานของ PNJ Tech ตั้งแต่เว็บไซต์เริ่มต้นจนถึงระบบองค์กร บอกโจทย์แล้วรับใบเสนอราคาตามขอบเขตงานจริง',
      lang: 'th'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'ติดต่อ | PNJ Tech',
      description: 'ติดต่อปพนธนัย ใจมา (PNJ Tech) ทาง Messenger อีเมล Facebook LinkedIn GitHub หรือ Fastwork หรือเล่าโจทย์ไว้ในฟอร์มเพื่อรับใบเสนอราคา',
      lang: 'th'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About | ปพนธนัย ใจมา (PNJ Tech)',
      description: 'ประวัติการศึกษา ประสบการณ์ทำงาน และข้อมูลส่วนตัวของปพนธนัย ใจมา (PNJ Tech) นักพัฒนาซอฟต์แวร์ฟรีแลนซ์',
      // AboutView's content is written entirely in English (not wired to the
      // Thai/English toggle), so the page's real language is "en".
      lang: 'en'
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog/BlogListView.vue'),
    meta: {
      title: 'Blog | ปพนธนัย ใจมา (PNJ Tech)',
      description: 'บทความและบันทึกเทคนิคจากปพนธนัย ใจมา (PNJ Tech) นักพัฒนาซอฟต์แวร์ฟรีแลนซ์',
      lang: 'th'
    }
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../views/blog/BlogPostView.vue'),
    meta: {
      // No static title/description — BlogPostView sets these itself via
      // useHead once the post has loaded, since they depend on the post.
      lang: 'th'
    }
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/AdminLoginView.vue'),
    meta: { title: 'Admin login | PNJ Tech', noindex: true, lang: 'en' }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('../views/admin/AdminDashboardView.vue'),
    meta: { title: 'Admin | PNJ Tech', noindex: true, lang: 'en' },
    beforeEnter: requireAdmin
  },
  {
    path: '/admin/posts/new',
    name: 'admin-post-new',
    component: () => import('../views/admin/AdminPostEditorView.vue'),
    meta: { title: 'New post | PNJ Tech', noindex: true, lang: 'en' },
    beforeEnter: requireAdmin
  },
  {
    path: '/admin/posts/:id/edit',
    name: 'admin-post-edit',
    component: () => import('../views/admin/AdminPostEditorView.vue'),
    meta: { title: 'Edit post | PNJ Tech', noindex: true, lang: 'en' },
    beforeEnter: requireAdmin
  },
  {
    path: '/app/login',
    name: 'app-login',
    component: () => import('../app/views/LoginView.vue'),
    meta: { ...appMeta, title: 'เข้าสู่ระบบ | PNJ Created Website' },
    beforeEnter: appGuard('redirectIfSignedIn')
  },
  {
    path: '/app/onboarding',
    name: 'app-onboarding',
    component: () => import('../app/views/OnboardingView.vue'),
    meta: { ...appMeta, title: 'เริ่มสร้างเว็บไซต์ | PNJ Created Website' },
    beforeEnter: appGuard('requireOnboarding')
  },
  {
    path: '/app',
    name: 'app-dashboard',
    component: () => import('../app/views/DashboardView.vue'),
    meta: { ...appMeta, title: 'ภาพรวม | PNJ Created Website' },
    beforeEnter: appGuard('requireBuilder')
  },
  comingSoon('/app/pages', 'pages'),
  {
    path: '/app/collections',
    name: 'app-collections',
    component: () => import('../app/views/CollectionsView.vue'),
    meta: { ...appMeta, title: 'ผลงาน (Collection) | PNJ Created Website' },
    beforeEnter: appGuard('requireBuilder')
  },
  comingSoon('/app/media', 'media'),
  comingSoon('/app/seo', 'seo'),
  comingSoon('/app/leads', 'leads'),
  comingSoon('/app/publish', 'publish'),
  comingSoon('/app/settings', 'settings')
]
