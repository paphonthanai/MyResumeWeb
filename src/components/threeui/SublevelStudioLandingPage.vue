<script setup>
import LandingPageFrame from './LandingPageFrame.vue'

// Vue port of ThreeUI's SublevelStudioLandingPage (src/shaders/landing-pages/LandingPages.tsx).
// The page itself is public/landing-pages/sublevel-studio.html, kept byte-exact
// (SHA-256 91db5c1bb779687990b01f226a02d7fe7cf7954a40ba8053c4d6b7abf82232e3).
defineProps({
  className: { type: String, default: '' },
  srcDoc: { type: String, default: undefined },
  applyScene: { type: Function, default: undefined },
})
</script>

<template>
  <LandingPageFrame
    :class-name="className"
    :src-doc="srcDoc"
    :apply-scene="applyScene"
    title="sublevel.studio — We build the stuff people remember"
    source-url="/landing-pages/sublevel-studio.html"
  />
</template>
