// GPU particle cloud for the Home "lab" section (idea adapted from the AXON
// design on motionsites.ai). Particles live in a float texture that a
// GPUComputationRenderer pass updates every frame: curl-noise drift, a pull
// onto a twisted-ring signed distance surface, a spring back to their start,
// and a push from the cursor's movement. Returns { setMouse, start, stop, dispose }.
import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'

const SIM = /* glsl */ `
uniform float uTime;
uniform float uHz;
uniform sampler2D tOrigin;
uniform vec2 uMouse;      // cursor in NDC
uniform vec2 uMouseVel;   // cursor movement this frame, NDC units
uniform float uAspect;
uniform mat4 uMvp;        // projection * view * model
uniform vec3 uRight;      // camera right / up in the cloud's local space
uniform vec3 uUp;

vec3 field(vec3 p) {
  return vec3(
    sin(p.y * 3.1 + cos(p.z * 2.3 + uTime * 0.3)),
    sin(p.z * 2.7 + cos(p.x * 1.9 - uTime * 0.2)),
    sin(p.x * 3.3 + cos(p.y * 2.1 + uTime * 0.25)));
}
vec3 curlNoise(vec3 p) {
  const float e = 0.05;
  vec3 dx = vec3(e, 0.0, 0.0), dy = vec3(0.0, e, 0.0), dz = vec3(0.0, 0.0, e);
  vec3 x0 = field(p - dx), x1 = field(p + dx);
  vec3 y0 = field(p - dy), y1 = field(p + dy);
  vec3 z0 = field(p - dz), z1 = field(p + dz);
  vec3 c = vec3((y1.z - y0.z) - (z1.y - z0.y), (z1.x - z0.x) - (x1.z - x0.z), (x1.y - x0.y) - (y1.x - y0.x));
  return normalize(c + 1e-5);
}

// A twisted ring with soft lobes and one large opening.
float shape(vec3 p) {
  if (length(p) > 0.8) return length(p) - 0.7;
  p.z = sqrt(p.z * p.z + 0.0215) - sqrt(0.012);
  float a = p.y * 2.2;
  p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
  float ang = atan(p.z, p.x);
  float R = 0.4 + 0.05 * sin(ang * 3.0);
  vec2 q = vec2(length(p.xz) - R, p.y);
  float tube = 0.12 + 0.045 * sin(ang * 2.0 + 1.3);
  return length(q) - tube;
}
vec3 shapeNormal(vec3 p) {
  const float h = 0.001;
  return normalize(vec3(
    shape(p + vec3(h, 0, 0)) - shape(p - vec3(h, 0, 0)),
    shape(p + vec3(0, h, 0)) - shape(p - vec3(0, h, 0)),
    shape(p + vec3(0, 0, h)) - shape(p - vec3(0, 0, h))));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 pos = texture2D(tPos, uv).xyz;
  vec3 origin = texture2D(tOrigin, uv).xyz;

  if (length(pos) > 0.7) pos /= 2.0;
  pos += curlNoise(pos * 0.1 + uTime * 0.05) * 0.0002 * uHz;
  vec3 g = shapeNormal(pos);
  float sdf = shape(pos);
  pos += cross(normalize(pos + 1e-5), g) * 0.0005 * uHz;
  pos += -g * sdf * 0.5;
  pos += (origin - pos) * 0.0002 * uHz;

  // Cursor push: particles near the cursor on screen move with it.
  vec4 clip = uMvp * vec4(pos, 1.0);
  vec2 ndc = clip.xy / clip.w;
  vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
  float fall = exp(-dot(d, d) / 0.012);
  pos += (uRight * uMouseVel.x + uUp * uMouseVel.y) * fall * 0.35;

  gl_FragColor = vec4(pos, 1.0);
}
`

const VERT = /* glsl */ `
uniform sampler2D tPos;
uniform float uTime;
uniform float uSize;
attribute vec2 ref;
attribute vec4 rnd;
varying vec4 vRnd;
varying float vScale;
void main() {
  vec3 pos = texture2D(tPos, ref).xyz;
  pos *= mix(1.0, 1.5, pow(rnd.y, 150.0));
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float dist = -mv.z;
  vScale = smoothstep(3.0, 15.0, dist) * mix(0.5, 1.0, rnd.z);
  vRnd = rnd;
  gl_PointSize = uSize * vScale * (1000.0 / dist);
  gl_Position = projectionMatrix * mv;
}
`

const FRAG = /* glsl */ `
uniform float uTime;
varying vec4 vRnd;
varying float vScale;
void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float r = dot(c, c);
  if (r > 1.0 || vScale < 0.1) discard;
  // soft sphere shading in place of a matcap
  float light = clamp(0.55 + 0.45 * dot(normalize(vec3(c.x, -c.y, sqrt(1.0 - r))), normalize(vec3(-0.4, 0.5, 0.8))), 0.0, 1.0);
  vec3 base = vec3(mix(0.0, 0.2, vRnd.x));
  base = mix(base, vec3(0.83, 0.42, 0.89), pow(vRnd.z, 100.0)); // studio magenta
  float sparkle = 0.5 + (0.4 + sin(uTime * 4.0 + vRnd.y * 20.0)) * pow(vRnd.z, 10.0) * 2.5;
  gl_FragColor = vec4(base * sparkle * (0.6 + light), 1.0);
}
`

export function createLab(canvas, { mobile = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(dpr)
  renderer.setClearColor(0x000000, 1)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000)
  const base = new THREE.Vector3(-1.17, 0, 6)
  camera.position.copy(base)
  camera.lookAt(0, 0, 0)

  const group = new THREE.Group()
  const deg = THREE.MathUtils.degToRad
  group.position.set(mobile ? 0 : 0.1, mobile ? 0.45 : 0.1, -1)
  group.rotation.set(deg(-28.4), deg(390), deg(4.92))
  group.scale.set(mobile ? 3.6 : 3.8, mobile ? 3.6 : 3.8, mobile ? 4.3 : 4.6)
  scene.add(group)

  const SIZE = mobile ? 96 : 256
  const gpu = new GPUComputationRenderer(SIZE, SIZE, renderer)
  if (mobile) gpu.setDataType(THREE.HalfFloatType)

  const start = gpu.createTexture()
  const originTex = gpu.createTexture()
  const sd = start.image.data
  for (let i = 0; i < sd.length; i += 4) {
    sd[i] = Math.random() * 2 - 1
    sd[i + 1] = Math.random() * 2 - 1
    sd[i + 2] = Math.random() * 2 - 1
    sd[i + 3] = 1
  }
  originTex.image.data.set(sd)

  const posVar = gpu.addVariable('tPos', SIM, start)
  gpu.setVariableDependencies(posVar, [posVar])
  const su = posVar.material.uniforms
  su.uTime = { value: 0 }
  su.uHz = { value: 1 }
  su.tOrigin = { value: originTex }
  su.uMouse = { value: new THREE.Vector2(9, 9) }
  su.uMouseVel = { value: new THREE.Vector2() }
  su.uAspect = { value: 1 }
  su.uMvp = { value: new THREE.Matrix4() }
  su.uRight = { value: new THREE.Vector3(1, 0, 0) }
  su.uUp = { value: new THREE.Vector3(0, 1, 0) }
  const err = gpu.init()
  if (err) throw new Error(err)

  const count = SIZE * SIZE
  const geo = new THREE.BufferGeometry()
  const ref = new Float32Array(count * 2)
  const rnd = new Float32Array(count * 4)
  for (let i = 0; i < count; i++) {
    ref[i * 2] = ((i % SIZE) + 0.5) / SIZE
    ref[i * 2 + 1] = (Math.floor(i / SIZE) + 0.5) / SIZE
    for (let k = 0; k < 4; k++) rnd[i * 4 + k] = Math.random()
  }
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  geo.setAttribute('ref', new THREE.BufferAttribute(ref, 2))
  geo.setAttribute('rnd', new THREE.BufferAttribute(rnd, 4))
  const mat = new THREE.ShaderMaterial({
    uniforms: { tPos: { value: null }, uTime: { value: 0 }, uSize: { value: 0.04 * dpr * 2 * (mobile ? 1.6 : 1) } },
    vertexShader: VERT,
    fragmentShader: FRAG,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: true,
    depthWrite: false,
  })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  group.add(points)

  // Input: cursor in NDC plus how far it moved since the last frame.
  const mouse = { x: 9, y: 9, px: 9, py: 9, gx: 0, gy: 0, fresh: false }
  function setMouse(clientX, clientY) {
    const r = canvas.getBoundingClientRect()
    const x = ((clientX - r.left) / r.width) * 2 - 1
    const y = -(((clientY - r.top) / r.height) * 2 - 1)
    if (!mouse.fresh) { mouse.px = x; mouse.py = y; mouse.fresh = true }
    mouse.x = x
    mouse.y = y
    mouse.gx = x
    mouse.gy = y
  }

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    su.uAspect.value = w / h
  }
  resize()
  window.addEventListener('resize', resize)

  const inv = new THREE.Matrix4()
  const right = new THREE.Vector3()
  const up = new THREE.Vector3()
  let raf = 0
  let last = 0
  let t = 0

  function tick(now) {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 1 / 60)
    last = now
    t += dt

    // gaze: the camera drifts a little toward the cursor
    camera.position.x += (base.x - mouse.gx * 1 - camera.position.x) * 0.05
    camera.position.y += (base.y + mouse.gy * 2 * 0.5 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
    group.updateMatrixWorld()

    // camera axes expressed in the cloud's local space
    inv.copy(group.matrixWorld).invert()
    right.setFromMatrixColumn(camera.matrixWorld, 0).transformDirection(inv)
    up.setFromMatrixColumn(camera.matrixWorld, 1).transformDirection(inv)

    su.uTime.value = t
    su.uHz.value = dt * 60
    su.uMouse.value.set(mouse.x, mouse.y)
    su.uMouseVel.value.set(mouse.x - mouse.px, mouse.y - mouse.py)
    mouse.px = mouse.x
    mouse.py = mouse.y
    su.uMvp.value.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).multiply(group.matrixWorld)
    su.uRight.value.copy(right)
    su.uUp.value.copy(up)

    gpu.compute()
    mat.uniforms.tPos.value = gpu.getCurrentRenderTarget(posVar).texture
    mat.uniforms.uTime.value = t
    renderer.render(scene, camera)
  }

  return {
    setMouse,
    start() { if (!raf) { last = 0; raf = requestAnimationFrame(tick) } },
    stop() { cancelAnimationFrame(raf); raf = 0 },
    dispose() {
      cancelAnimationFrame(raf)
      raf = 0
      window.removeEventListener('resize', resize)
      geo.dispose()
      mat.dispose()
      gpu.dispose?.()
      renderer.dispose()
    },
  }
}
