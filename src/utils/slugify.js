// Turns a post title into a URL-safe slug. Keeps Thai characters (they're
// valid in a URL path once percent-encoded by the browser) but strips
// punctuation and collapses whitespace/dashes.
export function slugify(text) {
  return (text || '')
    .trim()
    .toLowerCase()
    .replace(/['"“”‘’]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
