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
// renderer it uses. Only the default "constellation-field" variant is wired up.
const props = defineProps({
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
})

const definition = EFFECTS.constellationField
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
const source = computed(() =>
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
