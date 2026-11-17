<script setup>
import { computed } from 'vue'
import secondStudiesSource from './sources/text-on-a-path-ii.html?raw'
import './threeui.css'

// Vue port of ThreeUI's TextPathStudies (src/shaders/text-path-studies/
// TextPathStudies.tsx, SHA-256 049af9bb…), limited to the "globe-study"
// variant. focusStyles and focusedDocument are carried over for the
// "figures" layout that variant uses.
const props = defineProps({
  mode: { type: String, default: 'dark' },
  scale: { type: Number, default: 1 },
  opacity: { type: Number, default: 1 },
  hue: { type: Number, default: 0 },
  saturation: { type: Number, default: 1 },
  brightness: { type: Number, default: 1 },
  className: { type: String, default: undefined },
  // Site addition (not in ThreeUI): drop the study's own ground so the page
  // background shows through. The globe canvas itself clears to transparent.
  transparent: { type: Boolean, default: false },
})

const TRANSPARENT_STYLES = `<style id="site-transparent-ground">
    html, body, .frame { background: transparent !important; }
    .plate { background: none !important; }
  </style>`

const STUDIES = {
  globe: { source: secondStudiesSource, index: 1, title: 'Globe', layout: 'figures' },
}
const definition = STUDIES.globe

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}

function focusStyles(definition, mode) {
  const selected = definition.index
  const surface = mode === 'light' ? '#f3f5f8' : '#08090a'
  const themeStyles = mode === 'light'
    ? `
      :root {
        color-scheme: light;
        --bg: #f3f5f8;
        --line: rgba(20, 24, 32, .055);
        --line-strong: rgba(20, 24, 32, .10);
        --fig: rgba(20, 24, 32, .42);
        --title: #171922;
        --copy: rgba(20, 24, 32, .62);
      }
    `
    : ':root { color-scheme: dark; }'
  const layoutStyles = `
      .grid {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
      .fig { display: none !important; }
      .fig:nth-child(${selected}) {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
      }
      .fig::before, .fig::after, .fignum, .fig h3, .fig p { display: none !important; }
      .art {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .plate {
        width: min(100cqw, 100cqh) !important;
        height: min(100cqw, 100cqh) !important;
      }
    `

  return `<style id="threeui-study-focus">
    ${themeStyles}
    html, body, .frame {
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    body { margin: 0 !important; background: ${surface} !important; }
    .frame { padding: 0 !important; background: ${surface} !important; }
    header { display: none !important; }
    ${layoutStyles}
  </style>`
}

const AUTHORED_FIGURE_INK = "var INK  = '226,228,233';"

function replaceRequired(source, authored, focused) {
  if (!source.includes(authored)) {
    throw new Error(`Text path source adapter could not find: ${authored}`)
  }
  return source.replace(authored, focused)
}

function focusedDocument(definition, mode) {
  const source = mode === 'light'
    ? replaceRequired(definition.source, AUTHORED_FIGURE_INK, "var INK  = '38,40,48';")
    : definition.source

  return source
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${definition.title} — ThreeUI</title>`)
    .replace('</head>', `${focusStyles(definition, mode)}\n</head>`)
}

const safeMode = computed(() => (props.mode === 'light' ? 'light' : 'dark'))
const doc = computed(() => {
  const focused = focusedDocument(definition, safeMode.value)
  return props.transparent ? focused.replace('</head>', `${TRANSPARENT_STYLES}\n</head>`) : focused
})
const boundedScale = computed(() => clamp(props.scale, 0.65, 1.5))
const boundedOpacity = computed(() => clamp(props.opacity, 0.1, 1))
const filter = computed(() => {
  const h = clamp(props.hue, -180, 180)
  const s = clamp(props.saturation, 0, 2)
  const b = clamp(props.brightness, 0.4, 1.8)
  return h === 0 && s === 1 && b === 1 ? undefined : `hue-rotate(${h}deg) saturate(${s}) brightness(${b})`
})
</script>

<template>
  <div
    :class="['text-path-study', `text-path-study--${safeMode}`, props.className]"
    :data-mode="safeMode"
    :style="{ opacity: boundedOpacity, filter, background: props.transparent ? 'transparent' : undefined }"
  >
    <iframe
      class="text-path-study-frame"
      :data-mode="safeMode"
      :title="`${definition.title} interactive canvas study`"
      sandbox="allow-scripts"
      :srcdoc="doc"
      :style="{
        transform: boundedScale === 1 ? undefined : `scale(${boundedScale})`,
        // An iframe whose color-scheme differs from its element's gets an opaque canvas.
        colorScheme: props.transparent ? safeMode : undefined,
      }"
    ></iframe>
  </div>
</template>
