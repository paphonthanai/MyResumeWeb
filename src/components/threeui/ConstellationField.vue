<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  EFFECTS,
  NEUFORM_BATCH_DEFAULTS,
  buildFocusedDocument,
  clamp,
  readAutomaticMode,
  resolveBackground,
  resolveMode,
} from './neuformBatch'

// Vue port of ThreeUI's ConstellationField (src/shaders/constellation-field/
// ConstellationField.tsx, SHA-256 5bbf6f84…) and the NeuformBatchEffect
// renderer it uses. The "constellation-field" and "particle-drift" variants
// are wired up.
const VARIANTS = {
  'constellation-field': EFFECTS.constellationField,
  'particle-drift': EFFECTS.particleDrift,
}

const props = defineProps({
  variant: { type: String, default: 'constellation-field' },
  mode: { type: String, default: undefined },
  speed: { type: Number, default: NEUFORM_BATCH_DEFAULTS.speed },
  size: { type: Number, default: NEUFORM_BATCH_DEFAULTS.size },
  gap: { type: Number, default: NEUFORM_BATCH_DEFAULTS.gap },
  length: { type: Number, default: NEUFORM_BATCH_DEFAULTS.length },
  density: { type: Number, default: NEUFORM_BATCH_DEFAULTS.density },
  strokeWidth: { type: Number, default: NEUFORM_BATCH_DEFAULTS.strokeWidth },
  opacity: { type: Number, default: NEUFORM_BATCH_DEFAULTS.opacity },
  hue: { type: Number, default: NEUFORM_BATCH_DEFAULTS.hue },
  saturation: { type: Number, default: NEUFORM_BATCH_DEFAULTS.saturation },
  brightness: { type: Number, default: NEUFORM_BATCH_DEFAULTS.brightness },
  className: { type: String, default: undefined },
  // Site addition (not in ThreeUI): when the frame sits under page content it
  // never sees the mouse, so the page forwards its pointer and the frame
  // replays it as the mousemove / mouseleave events the source listens for.
  followPointer: { type: Boolean, default: false },
})

const POINTER_BRIDGE = `<script data-site-pointer-bridge>
window.addEventListener('message', function (event) {
  var data = event.data;
  if (!data || data.type !== 'site-pointer') return;
  if (data.leave) { document.dispatchEvent(new MouseEvent('mouseleave')); return; }
  // Bubbles so it reaches listeners on window (Particle Drift) as well as document (Constellation Field).
  document.dispatchEvent(new MouseEvent('mousemove', { clientX: data.x, clientY: data.y, bubbles: true }));
});
</` + `script>`

const definition = VARIANTS[props.variant] ?? EFFECTS.constellationField
const iframeRef = ref(null)

// useAutomaticMode
const requestedMode = computed(() => props.mode ?? definition.defaultMode ?? NEUFORM_BATCH_DEFAULTS.mode)
const automaticMode = ref('dark')
let stopAuto = null
onMounted(() => {
  if (requestedMode.value !== 'auto') return
  const root = document.documentElement
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const update = () => { automaticMode.value = readAutomaticMode() }
  const observer = new MutationObserver(update)
  observer.observe(root, { attributes: true, attributeFilter: ['data-scheme', 'data-theme'] })
  media.addEventListener('change', update)
  update()
  stopAuto = () => {
    observer.disconnect()
    media.removeEventListener('change', update)
  }
})
onBeforeUnmount(() => stopAuto?.())

const resolvedMode = computed(() =>
  requestedMode.value === 'auto' ? automaticMode.value : resolveMode(requestedMode.value, NEUFORM_BATCH_DEFAULTS.mode),
)
const background = computed(() => resolveBackground(definition.background, resolvedMode.value))
const safe = computed(() => ({
  speed: clamp(props.speed, 0, 3),
  size: clamp(props.size, 0.05, 200),
  gap: clamp(props.gap, 0, 64),
  length: clamp(props.length, 0.35, 2.5),
  density: clamp(props.density, 0.25, 2.5),
  strokeWidth: clamp(props.strokeWidth, 0.25, 8),
  opacity: clamp(props.opacity, 0.05, 1),
  hue: clamp(props.hue, -180, 180),
  saturation: clamp(props.saturation, 0, 2),
  brightness: clamp(props.brightness, 0.35, 1.65),
}))

// Rebuild when baked geometry/mode knobs change. Speed/opacity stay live via postMessage + time wrap.
const focusedSource = computed(() =>
  buildFocusedDocument(definition, {
    variant: 'cube',
    mode: resolvedMode.value,
    speed: NEUFORM_BATCH_DEFAULTS.speed,
    size: safe.value.size,
    gap: safe.value.gap,
    length: safe.value.length,
    density: safe.value.density,
    strokeWidth: safe.value.strokeWidth,
    opacity: NEUFORM_BATCH_DEFAULTS.opacity,
  }),
)
const source = computed(() =>
  props.followPointer ? focusedSource.value.replace(/<\/body>/i, `${POINTER_BRIDGE}</body>`) : focusedSource.value,
)

let pending = null
let frameRequest = 0
function sendPointer() {
  frameRequest = 0
  const frame = iframeRef.value
  if (!frame?.contentWindow || !pending) return
  const message = pending
  pending = null
  if (!message.leave) {
    const rect = frame.getBoundingClientRect()
    message.x -= rect.left
    message.y -= rect.top
  }
  frame.contentWindow.postMessage({ type: 'site-pointer', ...message }, '*')
}
function queuePointer(message) {
  pending = message
  if (!frameRequest) frameRequest = requestAnimationFrame(sendPointer)
}
// Touch is left out: a finger dragging to scroll would pull the stars along
// with it, and the source only reacts to a hovering mouse anyway.
const onPointerMove = (event) => {
  if (event.pointerType === 'touch') return
  queuePointer({ x: event.clientX, y: event.clientY })
}
const onPointerLeave = () => queuePointer({ leave: true })
onMounted(() => {
  if (!props.followPointer) return
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('blur', onPointerLeave)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  window.removeEventListener('blur', onPointerLeave)
  if (frameRequest) cancelAnimationFrame(frameRequest)
})

function postControls() {
  const frame = iframeRef.value?.contentWindow
  if (!frame) return
  const s = safe.value
  frame.postMessage(
    {
      type: 'threeui-controls',
      controls: {
        mode: resolvedMode.value,
        speed: s.speed,
        size: s.size,
        gap: s.gap,
        length: s.length,
        density: s.density,
        strokeWidth: s.strokeWidth,
        opacity: s.opacity,
      },
    },
    '*',
  )
}
onMounted(postControls)
watch([safe, resolvedMode, source], postControls)

const filter = computed(() => {
  const s = safe.value
  return s.hue === 0 && s.saturation === 1 && s.brightness === 1
    ? undefined
    : `hue-rotate(${s.hue}deg) saturate(${s.saturation}) brightness(${s.brightness})`
})
</script>

<template>
  <iframe
    ref="iframeRef"
    :class="props.className"
    :title="definition.title"
    :srcdoc="source"
    sandbox="allow-scripts"
    loading="eager"
    :style="{ display: 'block', width: '100%', height: '100%', border: 0, background, filter }"
  ></iframe>
</template>
