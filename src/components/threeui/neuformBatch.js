// Port of ThreeUI src/shaders/neuform-isolated/NeuformBatchEffects.tsx
// (SHA-256 dc68c51b…), limited to the Constellation Field and Particle Drift
// effects. buildFocusedDocument and both patches are carried over line for
// line; the other effects in that file are not used here.
import constellationFieldSource from './sources/constellation-field.html?raw'
import particleDriftSource from './sources/particle-drift.html?raw'

export const NEUFORM_BATCH_DEFAULTS = {
  mode: 'dark',
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
}

const LIGHT_PAPER = '#eef1f6'

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}

function scaleCount(base, density, minimum = 1) {
  return Math.max(minimum, Math.round(base * density))
}

export function resolveMode(mode, fallback = 'dark') {
  if (mode === undefined || mode === null) return fallback
  if (mode === 'light' || mode === 1 || mode === '1') return 'light'
  return 'dark'
}

export function readAutomaticMode() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 'dark'
  const root = document.documentElement
  const declared = root.dataset.scheme ?? root.dataset.theme
  if (declared === 'light' || declared === 'dark') return declared
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveBackground(background, mode) {
  return typeof background === 'function' ? background(mode) : background
}

export const EFFECTS = {
  constellationField: {
    title: 'Constellation Field',
    source: constellationFieldSource,
    supportsMode: true,
    background: (mode) => (mode === 'light' ? LIGHT_PAPER : '#070914'),
    targets: [{ selector: '#constellationCanvas', role: 'background' }],
    patch(source, { size, length, density, strokeWidth, mode }) {
      let next = source
        .replace('const LINK = 160;', `const LINK = ${Math.round(160 * length)};`)
        .replace(
          'const MAX_NODES = window.innerWidth < 768 ? 40 : 85;',
          `const MAX_NODES = window.innerWidth < 768 ? ${scaleCount(40, density, 8)} : ${scaleCount(85, density, 12)};`,
        )
        .replace(
          'radius: Math.random() * 2.4 + 1.8',
          `radius: (Math.random() * 2.4 + 1.8) * ${size}`,
        )
        .replace('ctx.lineWidth = 1;', `ctx.lineWidth = ${Number(Math.max(0.25, strokeWidth).toFixed(2))};`)
        .replace('node.x += node.vx;', 'node.x += node.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);')
        .replace('node.y += node.vy;', 'node.y += node.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);')
      if (mode === 'light') {
        // Deeper bronze ink so gold nodes stay readable on paper.
        next = next
          .replace("ctx.strokeStyle = '#E6C879';", "ctx.strokeStyle = '#8B6914';")
          .replace("ctx.fillStyle = '#E6C879';", "ctx.fillStyle = '#8B6914';")
      }
      return next
    },
  },
  particleDrift: {
    title: 'Particle Drift',
    source: particleDriftSource,
    supportsMode: true,
    background: (mode) => (mode === 'light' ? LIGHT_PAPER : '#030509'),
    targets: [{ selector: '#particle-canvas', role: 'background' }],
    patch(source, { size, length, density, mode }) {
      const link = Math.round(120 * length)
      const proximityAlpha = mode === 'light' ? 0.22 : 0.15
      let next = source
        .replace('Array.from({ length: 90 })', `Array.from({ length: ${scaleCount(90, density, 12)} })`)
        .replace('Array.from({ length: 25 })', `Array.from({ length: ${scaleCount(25, density, 4)} })`)
        .replace('length: Math.random() * 100 + 50,', `length: (Math.random() * 100 + 50) * ${length},`)
        .replace('n.y += n.vy; // Slow drift', 'n.y += n.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1); // Slow drift')
        .replace('b.y -= b.speed;', 'b.y -= b.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);')
        .replace('if(d < 120) {', `if(d < ${link}) {`)
        .replace('0.15 * (1 - d/120)', `${proximityAlpha} * (1 - d/${link})`)
        .replace('ctx.lineWidth = 1.5;', `ctx.lineWidth = ${Number((1.5 * size).toFixed(2))};`)
      if (mode === 'light') {
        next = next
          .replaceAll('rgba(96, 165, 250,', 'rgba(37, 99, 235,')
          .replaceAll('rgba(156, 163, 175,', 'rgba(36, 48, 68,')
          .replace("ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(36, 48, 68, 0.4)';", "ctx.fillStyle = dist < 180 ? '#2563EB' : 'rgba(36, 48, 68, 0.55)';")
      }
      return next
    },
  },
}

export function buildFocusedDocument(definition, knobs) {
  const mode = knobs.mode
  const background = resolveBackground(definition.background, mode)
  const targetJson = JSON.stringify(definition.targets).replace(/</g, '\\u003c')
  const controlsJson = JSON.stringify({
    mode,
    speed: knobs.speed,
    size: knobs.size,
    gap: knobs.gap,
    length: knobs.length,
    density: knobs.density,
    strokeWidth: knobs.strokeWidth,
    opacity: knobs.opacity,
  }).replace(/</g, '\\u003c')
  const patchedSource = definition.patch
    ? definition.patch(definition.source, {
        variant: knobs.variant,
        size: knobs.size,
        gap: knobs.gap,
        length: knobs.length,
        density: knobs.density,
        strokeWidth: knobs.strokeWidth,
        mode,
      })
    : definition.source
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
${definition.focusCss ?? ''}
</style>`
  const controlScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</` + `script>`
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</` + `script>`
  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
    .replace(/<\/body>/i, `${focusScript}</body>`)
}
