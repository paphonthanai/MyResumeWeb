// v-reveal: fade/slide an element in as it scrolls into view.
//
// Content is fully visible in the prerendered HTML (no JS, crawlers, or
// reduced-motion users never see it hidden). Only after hydration do we hide
// elements that are *below* the fold, then reveal them on intersection.
// Optional stagger: v-reveal="index" delays by index * 90ms.
let observer = null

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('reveal-in')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  return observer
}

export const vReveal = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const io = getObserver()
    if (!io) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) return // already on screen: leave as is

    if (typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value * 90}ms`
    }
    el.classList.add('reveal-init')
    io.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
