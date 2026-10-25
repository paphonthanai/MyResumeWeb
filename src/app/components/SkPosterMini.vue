<script setup>
// Small live preview of the Poster template (Fire First design) in the
// customer's brand colour — used in onboarding and on the dashboard.
// Uses the template's own colours, never the builder tokens.
defineProps({
  color: { type: String, default: '#ec3013' },
  name: { type: String, default: '' },
  words: { type: Array, default: () => ['เร็ว.', 'รอด.', 'ปลอดภัย.'] },
})
</script>

<template>
  <div class="pm" aria-hidden="true">
    <div class="pm-rail">
      <span class="pm-logo" :style="{ background: color }">{{ (name || 'FF').slice(0, 2).toUpperCase() }}</span>
      <span v-for="n in 5" :key="n" class="pm-nav"><b :style="n === 1 ? { color } : null">0{{ n }}</b><i></i></span>
      <span class="pm-cta"></span>
    </div>
    <div class="pm-body">
      <div class="pm-hero" :style="{ background: color }">
        <p class="pm-kicker">{{ name || 'Your company' }}</p>
        <p class="pm-words"><span v-for="w in words" :key="w">{{ w }}</span></p>
        <span class="pm-btn"></span>
      </div>
      <div class="pm-photo"></div>
      <div class="pm-row"><b :style="{ color }">01</b><i></i></div>
      <div class="pm-row"><b :style="{ color }">02</b><i></i></div>
      <div class="pm-row"><b :style="{ color }">03</b><i></i></div>
    </div>
  </div>
</template>

<style scoped>
.pm { display: grid; grid-template-columns: 22% 1fr; width: 100%; height: 100%; background: #f3f2f2; color: #201e1d; font-family: Archivo, Anuphan, sans-serif; overflow: hidden; }
.pm-rail { border-right: 2px solid #201e1d; padding: 8% 7%; display: flex; flex-direction: column; gap: 6%; }
.pm-logo { width: 34%; aspect-ratio: 1; color: #fff; font-weight: 800; font-size: 8px; display: grid; place-items: center; }
.pm-nav { display: flex; gap: 6%; align-items: center; border-top: 2px solid #201e1d; padding-top: 5%; font-size: 6px; }
.pm-nav i { flex: 1; height: 3px; background: #201e1d33; }
.pm-cta { margin-top: auto; height: 9%; background: #201e1d; }
.pm-body { display: grid; grid-template-columns: 1.15fr 1fr; grid-auto-rows: min-content; }
.pm-hero { grid-row: span 1; padding: 8% 8% 10%; color: #fff; display: flex; flex-direction: column; gap: 6px; min-height: 0; }
.pm-kicker { margin: 0; font-size: 6px; text-transform: uppercase; letter-spacing: .12em; opacity: .9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pm-words { margin: 0; display: flex; flex-direction: column; font-weight: 800; font-size: clamp(14px, 2.6vw, 30px); line-height: 1.02; letter-spacing: -0.02em; font-family: Archivo, Anuphan, sans-serif; }
.pm-btn { width: 40%; height: 9px; background: #201e1d; margin-top: 4px; }
.pm-photo { background: repeating-linear-gradient(135deg, #e4e2e1 0 1px, #eceaea 1px 8px); border-left: 2px solid #201e1d; }
.pm-row { grid-column: 1 / -1; display: flex; gap: 8px; align-items: center; border-top: 2px solid #201e1d; padding: 4% 6%; font-size: 9px; font-weight: 800; }
.pm-row i { flex: 1; height: 5px; background: #201e1d26; }
</style>
