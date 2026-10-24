import { reactive, watch } from 'vue'

// Builder UI tokens from the Sitekit design handoff (designs/sk-theme.js).
// Applied as CSS variables on the app's root element only, so they never
// leak into the PNJ Tech site's daisyUI theme.
const BASE = {
  light: { bg: '#f2f2f1', surface: '#ffffff', sunk: '#f7f7f6', line: '#e3e3e0', line2: '#cfcfcb', text: '#1b1c1e', muted: '#686b70', rail: '#1c1d20', canvas: '#e6e6e3', ok: 'oklch(0.52 0.12 150)', 'ok-soft': 'oklch(0.95 0.035 150)', warn: 'oklch(0.56 0.12 65)', 'warn-soft': 'oklch(0.96 0.04 85)', bad: 'oklch(0.53 0.17 28)', 'bad-soft': 'oklch(0.95 0.03 28)', 'on-accent': '#ffffff' },
  dark: { bg: '#131416', surface: '#1b1c1f', sunk: '#17181a', line: '#2b2d31', line2: '#3a3d42', text: '#e6e7e8', muted: '#9b9ea4', rail: '#0e0f11', canvas: '#0f1012', ok: 'oklch(0.74 0.13 150)', 'ok-soft': 'oklch(0.3 0.05 150)', warn: 'oklch(0.8 0.12 80)', 'warn-soft': 'oklch(0.32 0.05 80)', bad: 'oklch(0.72 0.15 28)', 'bad-soft': 'oklch(0.3 0.06 28)', 'on-accent': '#0e0f11' },
}
// Accent A "Cobalt" (the design's default).
const ACCENT = {
  light: ['oklch(0.52 0.15 262)', 'oklch(0.95 0.025 262)', 'oklch(0.45 0.14 262)'],
  dark: ['oklch(0.72 0.12 262)', 'oklch(0.31 0.06 262)', 'oklch(0.86 0.07 262)'],
}

const KEY = 'pnj-app:prefs'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { dark: saved.dark === true, lang: saved.lang === 'en' ? 'en' : 'th' }
  } catch {
    return { dark: false, lang: 'th' }
  }
}

/** Per-user UI preferences (dark mode, TH/EN), remembered in this browser. */
export const prefs = reactive(typeof window === 'undefined' ? { dark: false, lang: 'th' } : load())

if (typeof window !== 'undefined') {
  watch(prefs, () => {
    try { localStorage.setItem(KEY, JSON.stringify(prefs)) } catch { /* storage blocked */ }
  })
}

export function themeVars(dark) {
  const b = BASE[dark ? 'dark' : 'light']
  const a = ACCENT[dark ? 'dark' : 'light']
  const v = {}
  for (const k in b) v[`--sk-${k}`] = b[k]
  v['--sk-accent'] = a[0]
  v['--sk-accent-soft'] = a[1]
  v['--sk-accent-ink'] = a[2]
  return v
}
