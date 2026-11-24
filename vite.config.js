import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ffSample } from './tools/import-ff/src/vite-plugin.ts'

// Published blog post URLs, from Firestore's REST API (the posts are
// publicly readable). A failed lookup only skips prerendering the posts.
async function publishedPostRoutes() {
  try {
    const res = await fetch('https://firestore.googleapis.com/v1/projects/myresume-ae906/databases/(default)/documents:runQuery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'posts' }],
          where: { fieldFilter: { field: { fieldPath: 'published' }, op: 'EQUAL', value: { booleanValue: true } } },
          select: { fields: [] },
        },
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const rows = await res.json()
    return rows.filter((r) => r.document).map((r) => `/blog/${r.document.name.split('/').pop()}`)
  } catch (err) {
    console.warn('[ssg] Could not list blog posts, skipping them:', err.message)
    return []
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Fire First sample data for the /app Collections screen (see the plugin).
    ffSample(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions: {
    // Emit /about/index.html (not /about.html) so Firebase Hosting's
    // default static serving resolves "/about" without extra config.
    dirStyle: 'nested',
    // Prerender the static routes, the blog list and every published post
    // (read from Firestore at build time), so search engines get each
    // page's real content and canonical URL. Admin and Website Builder app
    // pages need a live auth check and stay client-rendered (firebase.json
    // rewrites them to index.html). Posts published after a build still
    // work through the /blog/** rewrite until the next deploy.
    // /app/home and /app/index are prerendered so the PNJ Created Website
    // app's landing page loads directly.
    includedRoutes: async () => [
      '/', '/en', '/about', '/iot', '/projects', '/lab', '/gallery', '/skills', '/process', '/pricing', '/contact',
      '/projects/transportation-management',
      '/website-builder', '/en/website-builder', '/app/home', '/app/index',
      '/blog', ...(await publishedPostRoutes()),
    ],
  }
})
