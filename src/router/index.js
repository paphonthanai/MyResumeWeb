import HomeView from '../views/HomeView.vue'

async function requireAdmin() {
  const { getCurrentUser } = await import('../composables/useAuth')
  const user = await getCurrentUser()
  if (!user) return { name: 'admin-login' }
  return true
}

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
      hreflangGroup: 'home'
    }
  },
  {
    path: '/en',
    name: 'home-en',
    // Same component as Home — HelloWorld/TheWelcome already render from
    // the shared th/en content dictionary via the language toggle's
    // provide/inject; this route just makes the English version its own
    // crawlable, prerendered URL instead of only a client-side toggle.
    component: HomeView,
    meta: {
      title: 'Paphonthanai Jaima (PNJ Tech) | Fullstack Developer Portfolio',
      description: 'Portfolio and resume of Paphonthanai Jaima (PNJ Tech), a freelance software developer with 5+ years of experience building web and mobile apps with Vue.js, Flutter, Firebase and PHP. Includes real projects and Security/CTF skills.',
      lang: 'en',
      hreflangGroup: 'home'
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
  }
]
