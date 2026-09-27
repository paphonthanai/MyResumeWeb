// Turns a post title into a URL-safe slug. Keeps Thai (and other non-Latin)
// characters — they're valid in a URL path once percent-encoded by the
// browser — but strips punctuation and collapses whitespace/dashes.
//
// \p{M} (combining marks) has to stay alongside \p{L}/\p{N}: Thai vowels
// and tone marks are Unicode "Mark", not "Letter", so a class of only
// \p{L}\p{N} treats them as punctuation and splits each syllable onto its
// own dash (e.g. "ยินดี" -> "ย-นด-" instead of "ยินดี").
export function slugify(text) {
  return (text || '')
    .trim()
    .toLowerCase()
    .replace(/['"“”‘’]/g, '')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
