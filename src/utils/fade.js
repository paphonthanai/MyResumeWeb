// Scroll helpers for the scroll-driven sections.

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
