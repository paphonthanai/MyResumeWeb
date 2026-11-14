// v-fade: the studio homepage's fade-in, with per-element offset and timing.
//   v-fade="{ delay: 0.15, x: -80, y: 0, duration: 0.9 }"
//
// Same contract as v-reveal: content stays visible in the prerendered HTML,
// and only elements still below the fold after hydration are hidden and then
// faded in as they scroll into view (once). Hero elements above the fold use
// the CSS-only .studio-enter class instead.
let observer = null

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('fade-in')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0, rootMargin: '50px 0px 50px 0px' },
  )
  return observer
}

export const vFade = {
  mounted(el, { value = {} }) {
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const io = getObserver()
    if (!io) return
    if (el.getBoundingClientRect().top < window.innerHeight) return // already on screen

    const { delay = 0, duration = 0.7, x = 0, y = 30 } = value
    el.style.setProperty('--fx', `${x}px`)
    el.style.setProperty('--fy', `${y}px`)
    el.style.setProperty('--fd', `${duration}s`)
    el.style.transitionDelay = `${delay}s`
    el.classList.add('fade-init')
    io.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

// Calls `fn` once per animation frame while the page scrolls or resizes, and
// once on start. Returns a stop function. Client-only: call from onMounted.
export function onScrollFrame(fn) {
  let queued = false
  const run = () => {
    queued = false
    fn()
  }
  const schedule = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(run)
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  schedule()
  return () => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  }
}

export const clamp01 = (v) => Math.min(1, Math.max(0, v))
