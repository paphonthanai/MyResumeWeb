<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
  // Site addition (not in ThreeUI): let the canvas fill a wide frame instead
  // of a centred square (the study centres the globe on its canvas either
  // way). A wide frame covers much of the page, so the page must still
  // scroll through it: the wheel, and on touch a vertical swipe, zoom the
  // globe as authored until the zoom reaches its limit in that direction,
  // then scroll the page. Dragging to turn and clicking to pin are unchanged.
  fillFrame: { type: Boolean, default: false },
})

// The source zooms with `zoomT = clamp(0.85, 2.6, zoomT * exp(-deltaY * 0.0016))`
// in its wheel handler, the only place zoomT changes. This script keeps the
// same value so it knows when a wheel step would no longer change the zoom.
const FILL_FRAME = `<style id="site-fill-frame">
    .plate { width: 100% !important; height: 100% !important; }
  </style>
  <script id="site-fill-frame-scroll">
  (function () {
    var MIN = 0.85, MAX = 2.6, RATE = 0.0016, SWIPE = 2.5;
    var zoom = 1, forwarding = false;
    function next(deltaY) { return Math.max(MIN, Math.min(MAX, zoom * Math.exp(-deltaY * RATE))); }
    function scrollPage(deltaY) { parent.postMessage({ type: 'site-scroll', deltaY: deltaY }, '*'); }

    // Mouse wheel: let the globe have it while the zoom can still move that
    // way; at the limit, keep it from the globe so the page scrolls instead.
    window.addEventListener('wheel', function (event) {
      if (forwarding) return;
      var z = next(event.deltaY);
      if (z === zoom) { event.stopPropagation(); return; }
      zoom = z;
    }, { capture: true });

    // Touch: a mostly vertical swipe zooms (finger up = zoom out, like
    // scrolling down), then scrolls the page once the zoom is at its limit.
    // A mostly horizontal drag, or a tap, goes to the globe as authored.
    var touch = null;
    window.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch') touch = { id: event.pointerId, x: event.clientX, y: event.clientY, mode: null };
    }, { capture: true });
    window.addEventListener('pointermove', function (event) {
      if (!touch || event.pointerId !== touch.id) return;
      var dx = event.clientX - touch.x, dy = event.clientY - touch.y;
      if (!touch.mode) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        touch.mode = Math.abs(dy) > Math.abs(dx) ? 'zoom' : 'drag';
      }
      if (touch.mode !== 'zoom') return;
      event.stopPropagation();
      touch.x = event.clientX; touch.y = event.clientY;
      var deltaY = -dy * SWIPE;
      var z = next(deltaY);
      if (z === zoom) { scrollPage(-dy); return; }
      zoom = z;
      var globe = document.getElementById('globe');
      if (globe) {
        forwarding = true;
        globe.dispatchEvent(new WheelEvent('wheel', { deltaY: deltaY, cancelable: true }));
        forwarding = false;
      }
    }, { capture: true });
    function end(event) {
      if (!touch || event.pointerId !== touch.id) return;
      var zoomed = touch.mode === 'zoom';
      touch = null;
      if (!zoomed) return;
      // A swipe is not a tap: clear the globe's drag without dropping a pin.
      event.stopPropagation();
      var globe = document.getElementById('globe');
      if (globe) globe.dispatchEvent(new PointerEvent('pointercancel', { pointerId: event.pointerId }));
    }
    window.addEventListener('pointerup', end, { capture: true });
    window.addEventListener('pointercancel', function (event) {
      if (touch && event.pointerId === touch.id) touch = null;
    }, { capture: true });
  })();
  </` + `script>`

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

// fill-frame: the frame asks the page to scroll once the globe's zoom is
// at its limit during a touch swipe (see FILL_FRAME).
const frameRef = ref(null)
function onFrameMessage(event) {
  if (!props.fillFrame || event.source !== frameRef.value?.contentWindow) return
  if (event.data?.type === 'site-scroll' && Number.isFinite(event.data.deltaY)) {
    window.scrollBy(0, event.data.deltaY)
  }
}
onMounted(() => window.addEventListener('message', onFrameMessage))
onBeforeUnmount(() => window.removeEventListener('message', onFrameMessage))

const safeMode = computed(() => (props.mode === 'light' ? 'light' : 'dark'))
const doc = computed(() => {
  let focused = focusedDocument(definition, safeMode.value)
  if (props.transparent) focused = focused.replace('</head>', `${TRANSPARENT_STYLES}\n</head>`)
  if (props.fillFrame) focused = focused.replace('</head>', `${FILL_FRAME}\n</head>`)
  return focused
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
      ref="frameRef"
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
