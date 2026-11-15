<script setup>
import { ref } from 'vue'
import './threeui.css'

// Vue port of ThreeUI's LandingPageFrame (src/shaders/landing-pages/LandingPageFrame.tsx).
// Loads a complete, byte-exact landing page from /public into a sandboxed
// iframe. The packaged document is never rewritten.
//
// Not ported: the `customization` (typography/colour overrides) and
// background-only presentation props. Their helper (pageTypography) is not
// part of the registered bundle, and the configured usage passes neither.
const props = defineProps({
  sourceUrl: { type: String, required: true },
  // Set only for derived variants; renders this instead of fetching sourceUrl.
  srcDoc: { type: String, default: undefined },
  title: { type: String, required: true },
  className: { type: String, default: '' },
  // Runs against the live frame on every load (for pages with a scene API).
  applyScene: { type: Function, default: undefined },
})

const URL_FRAME_SANDBOX = 'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts'
const SRCDOC_FRAME_SANDBOX = 'allow-downloads allow-forms allow-modals allow-popups allow-scripts'

const ready = ref(false)

function onLoad(event) {
  props.applyScene?.(event.currentTarget)
  ready.value = true
}
</script>

<template>
  <div
    :class="['threeui-background', 'landing-page-frame', props.className]"
    :data-state="ready ? 'ready' : 'loading'"
    style="position: relative; overflow: hidden; background: #080808; pointer-events: auto"
  >
    <iframe
      :title="props.title"
      :src="props.srcDoc ? undefined : props.sourceUrl"
      :srcdoc="props.srcDoc"
      :sandbox="props.srcDoc ? SRCDOC_FRAME_SANDBOX : URL_FRAME_SANDBOX"
      loading="eager"
      style="position: absolute; inset: 0; display: block; width: 100%; height: 100%; border: 0; background: #080808; opacity: 1; pointer-events: auto"
      @load="onLoad"
    ></iframe>
  </div>
</template>
