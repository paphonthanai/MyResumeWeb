import './style.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  {
    routes,
    // Anchor links ("/#products") land below the sticky header.
    scrollBehavior(to, from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, top: 72, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ app }) => {
    app.use(createPinia())
  },
)
