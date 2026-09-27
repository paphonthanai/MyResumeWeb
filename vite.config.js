import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    // Only prerender the known static routes. Blog posts are stored in
    // Firestore and can be added at any time without a rebuild, and admin
    // pages need a live auth check — both are client-rendered instead
    // (see firebase.json's /blog and /admin rewrites to index.html).
    includedRoutes: () => ['/', '/en', '/about'],
  }
})
