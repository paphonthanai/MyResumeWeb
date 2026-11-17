import './style.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import { routes } from './router'

// Where the window lands after a navigation. Without this the router keeps
// the previous page's scroll offset, so a new page opens part-way down.
// - Back/forward: return to where the visitor was on that page.
// - A link with #hash: scroll to that element once the (lazy) page renders.
// - Anything else: start at the top. 'instant' overrides the site-wide
//   `scroll-behavior: smooth`, so the new page does not visibly glide up.
function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return new Promise((resolve) => {
      let tries = 0
      const exists = () => {
        try { return !!document.querySelector(to.hash) } catch { return true }
      }
      const find = () => {
        if (exists() || tries++ > 20) {
          resolve({ el: to.hash, top: 88, behavior: to.path === from.path ? 'smooth' : 'instant' })
        } else {
          setTimeout(find, 50)
        }
      }
      find()
    })
  }
  if (to.path === from.path) return false
  return { top: 0, left: 0, behavior: 'instant' }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, initialState }) => {
    const pinia = createPinia()
    app.use(pinia)
    // Store state filled while prerendering (e.g. blog posts loaded in
    // onServerPrefetch) is written into the page and picked up on hydration.
    if (import.meta.env.SSR) initialState.pinia = pinia.state.value
    else pinia.state.value = initialState.pinia || {}
  },
)
