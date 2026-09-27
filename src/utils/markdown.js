import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ breaks: true })

// Blog pages are client-rendered only (see router/vite.config.js), so this
// always runs in a real browser — the window check is just a defensive
// guard in case it's ever imported somewhere that runs during SSR.
export function renderMarkdown(markdown) {
  if (typeof window === 'undefined') return ''
  const html = marked.parse(markdown || '')
  return DOMPurify.sanitize(html)
}
