"""Turn the Sublevel lobby into a tech workshop (used by build-pnj-home.py).

The room is rebuilt around the pieces you can play with, which stay exactly
where they were and work as before: the arcade cabinet, the basketball hoop,
the stack of CRT TVs, the LED ticker and the neon sign. Everything else
changes:

- the seated person and the dog are removed (their GLB models are dropped too)
- oak floor -> polished concrete with saw-cut joints
- plaster walls -> painted steel panels; timber -> black steel
- tatami under the TVs -> an anti-static bench mat
- shoji screens -> backlit frosted-glass partitions
- the wooden staircase -> a steel stair with diamond-plate treads and yellow nosings
- the shelf wall -> steel shelving with parts bins, filament spools and devices
- the tea room behind the sliding door -> a server room with blinking racks
- new: a workbench with an oscilloscope and soldering station, a small robot
  arm that moves, a CCTV camera that pans, and LED strips under the mezzanine
- daylight and warm lamps -> cool workshop light with cyan accents
"""
import re


def _block(s, name, new):
    """Replace a whole `const name = canvasTex(...)` block."""
    pattern = r'const ' + name + r' = canvasTex\(.*?\n\}(?:, \{[^\n]*\})?\);\n'
    out, n = re.subn(pattern, lambda m: new.strip('\n') + '\n', s, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f'workshop: texture {name} not found')
    return out


def _rep(s, old, new):
    if s.count(old) != 1:
        raise SystemExit(f'workshop: expected one {old[:70]!r}, found {s.count(old)}')
    return s.replace(old, new)


def _sub(s, pattern, new):
    out, n = re.subn(pattern, lambda m: new, s, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f'workshop: /{pattern[:60]}/ not found')
    return out


TEXTURES = {
    # polished concrete: mottled grey, fine aggregate, saw-cut joints
    'floorTex': r'''
const floorTex = canvasTex(2048, 2048, (g, w, h) => {
  g.fillStyle = '#8b8f93'; g.fillRect(0, 0, w, h);
  for (let n = 0; n < 60; n++) {
    const cx = rand() * w, cy = rand() * h, r = rr(120, 520);
    const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r);
    const dark = rand() < 0.55, a = (0.04 + rand() * 0.07).toFixed(3);
    gr.addColorStop(0, dark ? `rgba(60,64,68,${a})` : `rgba(190,194,198,${a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
  speckle(g, w, h, 60000, ['rgba(70,72,76,0.35)', 'rgba(200,202,206,0.3)', 'rgba(120,122,126,0.3)'], 1.3);
  g.fillStyle = 'rgba(40,42,46,0.55)';
  for (let k = 0; k <= 4; k++) { g.fillRect(k * w / 4 - 2, 0, 4, h); g.fillRect(0, k * h / 4 - 2, w, 4); }
}, { repeat: [4, 4] });
''',
    # anti-static bench mat: dark grey rubber, fine grid, grounding studs
    'tatamiTex': r'''
const tatamiTex = canvasTex(2048, 1024, (g, w, h) => {
  g.fillStyle = '#2b3237'; g.fillRect(0, 0, w, h);
  speckle(g, w, h, 30000, ['rgba(20,24,28,0.5)', 'rgba(70,80,88,0.35)'], 1.2);
  g.strokeStyle = 'rgba(90,104,112,0.35)'; g.lineWidth = 2;
  for (let x = 0; x <= w; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
  for (let y = 0; y <= h; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
  g.fillStyle = '#c9a227';
  for (let x = 96; x < w; x += 512) for (let y = 96; y < h; y += 512) { g.beginPath(); g.arc(x, y, 10, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = 'rgba(255,196,0,0.85)'; g.fillRect(0, 0, w, 14); g.fillRect(0, h - 14, w, 14);
});
''',
    # diamond-plate steel for the stair treads
    'stepTex': r'''
const stepTex = canvasTex(1024, 1024, (g, w, h) => {
  g.fillStyle = '#9aa1a8'; g.fillRect(0, 0, w, h);
  speckle(g, w, h, 20000, ['rgba(120,126,132,0.4)', 'rgba(200,206,212,0.35)'], 1.1);
  for (let y = 0; y < h; y += 48) for (let x = (y / 48) % 2 ? 24 : 0; x < w; x += 48) {
    g.save(); g.translate(x, y); g.rotate(((x + y) / 48) % 2 ? 0.7 : -0.7);
    g.fillStyle = 'rgba(70,74,80,0.55)'; g.fillRect(-14, -3, 28, 6);
    g.fillStyle = 'rgba(230,234,238,0.5)'; g.fillRect(-14, -3, 28, 2);
    g.restore();
  }
}, { repeat: [2, 2] });
''',
    # frosted glass, lit from behind, with faint vertical reeding
    'shojiTex': r'''
const shojiTex = canvasTex(512, 512, (g, w, h) => {
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#eef5fb'); gr.addColorStop(1, '#d6e2ec');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x += 8) { g.fillStyle = `rgba(150,170,190,${(0.06 + rand() * 0.06).toFixed(3)})`; g.fillRect(x, 0, 2, h); }
  g.fillStyle = 'rgba(120,140,160,0.18)'; g.fillRect(0, h * 0.48, w, 6);
});
''',
    # painted steel wall panels with seams and rivets
    'plasterTex': r'''
const plasterTex = canvasTex(512, 512, (g, w, h) => {
  g.fillStyle = '#5a626b'; g.fillRect(0, 0, w, h);
  speckle(g, w, h, 9000, ['rgba(40,46,52,0.25)', 'rgba(120,130,140,0.2)'], 1.4);
  g.fillStyle = 'rgba(20,24,28,0.75)';
  g.fillRect(0, 0, w, 3); g.fillRect(0, 0, 3, h); g.fillRect(w / 2 - 1, 0, 3, h);
  g.fillStyle = 'rgba(160,170,180,0.25)'; g.fillRect(4, 4, w - 8, 2);
  g.fillStyle = 'rgba(25,28,32,0.8)';
  for (const x of [14, w / 2 - 14, w / 2 + 14, w - 14]) for (let y = 24; y < h; y += 96) { g.beginPath(); g.arc(x, y, 3, 0, Math.PI * 2); g.fill(); }
}, { repeat: [4, 2] });
''',
    # cool glow inside each shelf cubby
    'glowTex': r'''
const glowTex = canvasTex(64, 128, (g, w, h) => {
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#a6ecff'); gr.addColorStop(0.1, '#2f6f86'); gr.addColorStop(0.42, '#0e2029'); gr.addColorStop(1, '#060b0f');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
});
''',
    # floor directory beside the door
    'signTex': r'''
const signTex = canvasTex(512, 768, (g, w, h) => {
  g.clearRect(0, 0, w, h); g.fillStyle = '#e6e6e6';
  g.font = '700 84px "Geist", Arial, sans-serif'; g.fillText('2', 80, 240);
  g.font = '600 18px "Geist", Arial, sans-serif';
  ['SERVER ROOM', 'R&D BENCH', 'PRINT FARM', '', 'NETWORK LAB', 'CCTV', 'STORAGE'].forEach((t, i) => g.fillText(t, 220, 184 + i * 24));
  g.font = '700 84px "Geist", Arial, sans-serif'; g.fillText('1', 80, 500);
  g.font = '600 18px "Geist", Arial, sans-serif';
  ['WORKSHOP', 'ARCADE', 'SCREENS', '', 'ROBOT ARM', 'SOLDERING', 'EXIT'].forEach((t, i) => g.fillText(t, 220, 444 + i * 24));
  g.strokeStyle = '#e6e6e6'; g.lineWidth = 5;
  g.beginPath(); g.moveTo(280, 380); g.lineTo(232, 332); g.moveTo(232, 332); g.lineTo(232, 364); g.moveTo(232, 332); g.lineTo(264, 332); g.stroke();
  g.beginPath(); g.moveTo(224, 636); g.lineTo(280, 636); g.moveTo(260, 616); g.lineTo(280, 636); g.lineTo(260, 656); g.stroke();
});
''',
    # pinned-up schematics on the shelves
    'posterTex': r'''
const posterTex = canvasTex(256, 384, (g, w, h) => {
  g.fillStyle = '#1d3b5c'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(220,235,255,0.85)'; g.lineWidth = 2;
  for (let i = 0; i < 14; i++) { const x = 30 + rand() * 190, y = 60 + rand() * 260; g.beginPath(); g.moveTo(x, y); g.lineTo(x + rr(-60, 60), y); g.lineTo(x + rr(-60, 60), y + rr(-40, 40)); g.stroke(); }
  for (let i = 0; i < 10; i++) g.strokeRect(30 + rand() * 170, 60 + rand() * 240, 26, 16);
  g.fillStyle = 'rgba(220,235,255,0.9)'; g.fillRect(28, 26, 140, 8); g.fillRect(28, 344, 80, 6);
});
''',
}

MATERIALS_OLD = '''const matWood = std({ map: woodTex, roughness: 0.75, color: 0x9a7d6a });
const matWoodDark = std({ map: woodDarkTex, roughness: 0.85 });'''
MATERIALS_NEW = '''const matWood = std({ color: 0x6d757e, roughness: 0.45, metalness: 0.6 });      // steel shelving
const matWoodDark = std({ color: 0x1b1e22, roughness: 0.7, metalness: 0.3 });'''

MATERIAL_SWAPS = [
    ("const matShoji = std({ map: shojiTex, roughness: 0.95, emissive: 0xfff0d8, emissiveIntensity: 0.95, emissiveMap: shojiTex });",
     "const matShoji = std({ map: shojiTex, color: 0x6f7d8a, roughness: 0.25, emissive: 0xa9d4ff, emissiveIntensity: 0.22, emissiveMap: shojiTex });"),
    ("const matPlaster = std({ map: plasterTex, color: 0xa89882, roughness: 0.98 });",
     "const matPlaster = std({ map: plasterTex, color: 0xb9c2cc, roughness: 0.62, metalness: 0.25 });"),
    ("const matTimber = std({ map: woodDarkTex, color: 0x8a6742, roughness: 0.72 });",
     "const matTimber = std({ color: 0x17191c, roughness: 0.45, metalness: 0.6 });"),
    ("const matDark = std({ color: 0x3a2a1c, roughness: 0.85 });",
     "const matDark = std({ color: 0x141619, roughness: 0.6 });"),
    ("const matWallR = std({ map: plasterTex, color: 0xd8cdb8, roughness: 0.98 });",
     "const matWallR = std({ map: plasterTex, color: 0xd2d9e0, roughness: 0.62, metalness: 0.25 });"),
    ("const matFloor = std({ map: floorTex, normalMap: floorNormal, roughnessMap: floorRough, roughness: 1, color: 0xffffff });",
     "const matFloor = std({ map: floorTex, normalMap: floorNormal, roughnessMap: floorRough, roughness: 1, color: 0xb4b9be });"),
    ("const matSlab = std({ color: 0x4a3826, roughness: 0.95 });",
     "const matSlab = std({ color: 0x4d5257, roughness: 0.85 });"),
    ("  const matTrack = std({ map: stepTex, color: 0xd8b98a, roughness: 0.7 });",
     "  const matTrack = std({ map: stepTex, color: 0x8a9096, roughness: 0.5, metalness: 0.5 });"),
    ("const matCeil = std({ map: woodDarkTex, color: 0x6b4f34, roughness: 0.9 });",
     "const matCeil = std({ color: 0x1d2024, roughness: 0.9 });"),
]

STAIR_OLD = '''  const matTread = std({ map: stepTex, color: 0xf2dfc2, roughness: 0.56 });
  const matStringer = std({ map: stepTex, color: 0xa07f56, roughness: 0.8 });
  const matRiserB = std({ map: stepTex, color: 0xb08a5c, roughness: 0.82 });
  const nosing = std({ color: 0x4b3520, roughness: 0.7 });'''
STAIR_NEW = '''  const matTread = std({ map: stepTex, color: 0xffffff, roughness: 0.4, metalness: 0.65 });
  const matStringer = std({ color: 0x2a2e33, roughness: 0.45, metalness: 0.6 });
  const matRiserB = std({ color: 0x1f2226, roughness: 0.6, metalness: 0.4 });
  const nosing = std({ color: 0xffc400, emissive: 0x3a2c00, roughness: 0.5 });   // safety yellow'''

SHELF_ITEMS_OLD = "const posterMat = std({ map: posterTex, roughness: 0.8 }), bagMat = std({ color: 0xe48ab8, roughness: 0.6 }), canMat = std({ color: 0xcfcfcf, roughness: 0.4, metalness: 0.5 }), darkMat = std({ color: 0x0b0b0b });"
SHELF_ITEMS_NEW = "const posterMat = std({ map: posterTex, roughness: 0.8 }), bagMat = std({ color: 0xff7a1a, roughness: 0.55 }), canMat = std({ color: 0x2aa7d8, roughness: 0.5 }), darkMat = std({ color: 0x0b0b0b });"
# bags become parts bins, cans become filament spools
SHELF_DRAW_OLD = "    else if (kind === 'bag') { rbox(0.26, 0.2, 0.14, 0.04, bagMat, cx, cy + 0.12, cz); cyl(0.005, 0.005, 0.12, matSteel, cx, cy + 0.26, cz, undefined, 8).rotation.z = Math.PI / 2; }\n    else if (kind === 'can') { cyl(0.07, 0.07, 0.28, canMat, cx, cy + 0.16, cz); }\n    else { rbox(0.34, 0.34, 0.24, 0.03, darkMat, cx, cy + 0.19, cz); }"
SHELF_DRAW_NEW = """    else if (kind === 'bag') { for (const dx of [-0.17, 0.17]) { rbox(0.3, 0.16, 0.42, 0.015, bagMat, cx + dx, cy + 0.09, cz); box(0.12, 0.05, 0.004, matWhite, cx + dx, cy + 0.12, cz + 0.212); } }
    else if (kind === 'can') { const sp = cyl(0.14, 0.14, 0.08, canMat, cx, cy + 0.15, cz); sp.rotation.x = Math.PI / 2; const hub = cyl(0.05, 0.05, 0.1, matDark, cx, cy + 0.15, cz); hub.rotation.x = Math.PI / 2; }
    else { rbox(0.34, 0.2, 0.24, 0.02, darkMat, cx, cy + 0.11, cz); for (let k = 0; k < 3; k++) box(0.014, 0.014, 0.004, basic({ color: k ? 0x34e07a : 0xff4d00 }), cx - 0.1 + k * 0.03, cy + 0.15, cz + 0.122); }"""

# the room beyond the sliding door: a server room instead of a tea room
DOOR_ROOM = r'''  // two server racks with blinking status lights: the lab's machine room
  const rackM = std({ color: 0x0d0f12, roughness: 0.5, metalness: 0.5 });
  const ledG = basic({ color: 0x34e07a }), ledO = basic({ color: 0xff7a1a }), ledB = basic({ color: 0x4fc3ff });
  window.__rackLeds = [];
  for (const rx of [-0.75, 0.55]) {
    box(0.62, 2.1, 0.8, rackM, rx, 1.05, -2.2, room);
    for (let u = 0; u < 12; u++) {
      box(0.56, 0.12, 0.02, std({ color: 0x1c2026, roughness: 0.4, metalness: 0.6 }), rx, 0.25 + u * 0.15, -1.79, room);
      for (let k = 0; k < 4; k++) { const led = box(0.014, 0.014, 0.01, [ledG, ledG, ledB, ledO][(u + k) % 4], rx - 0.2 + k * 0.03, 0.25 + u * 0.15, -1.775, room); led.castShadow = false; window.__rackLeds.push(led); }
    }
  }
  // cable tray across the ceiling and a cold aisle light
  box(rw * 2 - 0.2, 0.06, 0.3, matSteel, 0, 2.5, -1.5, room);
  const lampL = new THREE.PointLight(0x9fd8ff, 9, 6.5, 2); lampL.position.set(0.1, 2.2, -1.4); room.add(lampL);
  const glowL = new THREE.PointLight(0x4fc3ff, 5, 5, 2); glowL.position.set(0.2, 1.2, -1.0); room.add(glowL);
  // a status screen on the end wall
  const kake = canvasTex(512, 320, (c, w, h) => {
    c.fillStyle = '#04121a'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#4fc3ff'; c.font = '700 30px "Geist Mono", monospace'; c.fillText('PNJ // NODES', 24, 48);
    c.font = '600 20px "Geist Mono", monospace';
    ['web-01   OK', 'api-02   OK', 'cctv-nvr OK', 'iot-hub  OK', 'backup   SYNC'].forEach((t, i) => { c.fillStyle = i === 4 ? '#ff7a1a' : '#34e07a'; c.fillText(t, 24, 100 + i * 40); });
  });
  plane(0.9, 0.56, basic({ map: kake, toneMapped: false }), -0.2, 1.75, -DEPTH - 0.13, room).castShadow = false;
'''

# new workshop pieces, placed around the playable ones
PROPS = r'''
/* ---------- workshop: bench, robot arm, CCTV camera, LED strips ---------- */
const robotArm = { base: null, a1: null, a2: null };
const cctvCam = { head: null };
(function workshop() {
  const steel = std({ color: 0x2a2e33, roughness: 0.45, metalness: 0.6 });
  const top = std({ color: 0x3b4148, roughness: 0.55, metalness: 0.2 });
  // workbench in front of the right-hand glass bay
  const bx = 2.92, bz = -2.78;
  box(1.0, 0.05, 0.58, top, bx, 0.9, bz);
  for (const [dx, dz] of [[-0.46, -0.25], [0.46, -0.25], [-0.46, 0.25], [0.46, 0.25]]) box(0.04, 0.9, 0.04, steel, bx + dx, 0.45, bz + dz);
  box(0.96, 0.03, 0.5, steel, bx, 0.25, bz);
  // oscilloscope with a live trace
  const scopeTex = canvasTex(256, 160, (c, w, h) => { c.fillStyle = '#031208'; c.fillRect(0, 0, w, h); });
  window.__scope = scopeTex;
  rbox(0.34, 0.2, 0.26, 0.015, std({ color: 0xc9ccd0, roughness: 0.5 }), bx - 0.22, 1.025, bz - 0.08);
  plane(0.2, 0.13, basic({ map: scopeTex, toneMapped: false }), bx - 0.26, 1.03, bz + 0.052).castShadow = false;
  for (let k = 0; k < 3; k++) cyl(0.012, 0.012, 0.02, matDark, bx - 0.1, 0.98 + k * 0.04, bz + 0.055, undefined, 10).rotation.x = Math.PI / 2;
  // soldering station, iron in its stand, and a board on a helping hand
  rbox(0.16, 0.08, 0.14, 0.01, std({ color: 0x1b5fbf, roughness: 0.5 }), bx + 0.18, 0.965, bz - 0.05);
  box(0.06, 0.02, 0.004, basic({ color: 0xff4d00 }), bx + 0.18, 0.97, bz + 0.022);
  const iron = cyl(0.008, 0.012, 0.2, std({ color: 0x111111, roughness: 0.6 }), bx + 0.36, 1.0, bz - 0.04); iron.rotation.z = 0.9;
  box(0.12, 0.006, 0.08, std({ color: 0x1f7a3a, roughness: 0.6 }), bx + 0.2, 1.03, bz + 0.12);
  const pcbGlow = new THREE.PointLight(0x9fe0ff, 1.2, 1.6, 2); pcbGlow.position.set(bx, 1.4, bz + 0.3); scene.add(pcbGlow);

  // a small robot arm on a pedestal, where the dog used to lie
  const ax = 1.05, az = -1.3;
  const orange = std({ color: 0xff6a1a, roughness: 0.45 }), dark = std({ color: 0x1a1d21, roughness: 0.5, metalness: 0.4 });
  box(0.5, 0.42, 0.5, steel, ax, 0.21, az);
  const base = new THREE.Group(); base.position.set(ax, 0.42, az); scene.add(base);
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.08, 28), dark), base).position.y = 0.04;
  const a1 = new THREE.Group(); a1.position.y = 0.1; base.add(a1);
  add(new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), dark), a1);
  const l1 = add(new THREE.Mesh(roundedBoxGeo(0.09, 0.44, 0.09, 0.03), orange), a1); l1.position.y = 0.22;
  const a2 = new THREE.Group(); a2.position.y = 0.44; a1.add(a2);
  add(new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 14), dark), a2);
  const l2 = add(new THREE.Mesh(roundedBoxGeo(0.075, 0.34, 0.075, 0.025), orange), a2); l2.position.y = 0.17;
  const tip = add(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.08, 16), dark), a2); tip.position.y = 0.36;
  for (const sx of [-0.025, 0.025]) box(0.012, 0.06, 0.03, matSteel, sx, 0.42, 0, a2);
  robotArm.base = base; robotArm.a1 = a1; robotArm.a2 = a2;

  // CCTV bullet camera on a wall bracket, slowly panning the room
  const mount = new THREE.Group(); mount.position.set(0.55, 3.0, -3.22); scene.add(mount);
  box(0.06, 0.06, 0.16, matDark, 0, 0, 0.08, mount);
  const head = new THREE.Group(); head.position.set(0, -0.04, 0.18); mount.add(head);
  const housing = add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.26, 20), std({ color: 0xe8eaec, roughness: 0.4 })), head); housing.rotation.x = Math.PI / 2; housing.position.z = 0.1;
  const lens = add(new THREE.Mesh(new THREE.CircleGeometry(0.04, 20), std({ color: 0x050505, roughness: 0.1, metalness: 0.8 })), head); lens.position.z = 0.232;
  const rec = sphere(0.008, basic({ color: 0xff2a2a }), 0.035, 0.035, 0.2, head, 8, 6); rec.castShadow = false;
  cctvCam.head = head; cctvCam.rec = rec;

  // LED strips under the mezzanine
  const ledM = basic({ color: 0x7fe0ff, toneMapped: false });
  for (const z of [-1.62, -3.0, -4.4]) { const s = box(14.6, 0.025, 0.04, ledM, 6.2, 3.53, z); s.castShadow = false; }
  for (const x of [2.5, 6.0, 9.5]) { const l = new THREE.PointLight(0x8fdcff, 2.2, 5, 2); l.position.set(x, 3.3, -2.4); scene.add(l); }
})();
'''

LIGHT_SWAPS = [
    ("scene.add(new THREE.HemisphereLight(0xcfe0f2, 0x8a6a44, 0.85));", "scene.add(new THREE.HemisphereLight(0xd6e6f5, 0x3e444b, 0.8));"),
    ("const sun = new THREE.DirectionalLight(0xffeccd, 2.7);", "const sun = new THREE.DirectionalLight(0xeaf2ff, 2.3);"),
    ("const warm1 = new THREE.PointLight(0xffd7a8, 7, 16, 2);", "const warm1 = new THREE.PointLight(0xdfeaff, 6, 16, 2);"),
    ("const warm2 = new THREE.PointLight(0xffe0bc, 4, 12, 2);", "const warm2 = new THREE.PointLight(0x9fdcff, 4, 12, 2);"),
    ("const warm3 = new THREE.PointLight(0xffe6c8, 5, 12, 2);", "const warm3 = new THREE.PointLight(0xe4ecf6, 5, 12, 2);"),
    ("const key = spot(0xf3ecdc, 9, [2.6, 3.35, 0.9], [2.0, 0, -2.2], 0.95, 14, 2048);", "const key = spot(0xeef4fb, 9, [2.6, 3.35, 0.9], [2.0, 0, -2.2], 0.95, 14, 2048);"),
    ("const stairSpot = spot(0xffe8cc, 13, [1.4, 5.8, 1.6], [-2.4, 0.9, -1.6], 0.8, 18, 2048);", "const stairSpot = spot(0xe8f0fa, 12, [1.4, 5.8, 1.6], [-2.4, 0.9, -1.6], 0.8, 18, 2048);"),
    ("const stairLight = new THREE.PointLight(0xffe2c0, 2.4, 8, 2);", "const stairLight = new THREE.PointLight(0xd8e8ff, 2.4, 8, 2);"),
]

# per-frame motion for the new pieces, run inside render()
ANIMATE = r'''  if (robotArm.base) {
    robotArm.base.rotation.y = Math.sin(t * 0.45) * 0.9;
    robotArm.a1.rotation.z = -0.35 + Math.sin(t * 0.7) * 0.32;
    robotArm.a2.rotation.z = 0.9 + Math.sin(t * 0.7 + 1.2) * 0.45;
  }
  if (cctvCam.head) { cctvCam.head.rotation.y = Math.sin(t * 0.3) * 0.7; cctvCam.head.rotation.x = 0.35; cctvCam.rec.visible = Math.floor(t * 1.5) % 2 === 0; }
  if (frame % 3 === 0 && window.__scope) {
    const c = window.__scope.userData.ctx; c.fillStyle = '#031208'; c.fillRect(0, 0, 256, 160);
    c.strokeStyle = 'rgba(52,224,122,0.25)'; c.lineWidth = 1; for (let x = 0; x < 256; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 160); c.stroke(); }
    c.strokeStyle = '#34e07a'; c.lineWidth = 3; c.beginPath();
    for (let x = 0; x <= 256; x += 4) { const y = 80 + Math.sin(x * 0.06 + t * 4) * 38 * Math.sin(t * 0.8 + x * 0.004); x ? c.lineTo(x, y) : c.moveTo(x, y); }
    c.stroke(); window.__scope.needsUpdate = true;
  }
  if (frame % 10 === 0 && window.__rackLeds) for (const led of window.__rackLeds) led.visible = Math.random() > 0.18;
'''


def workshop(s):
    # 1. no person, no dog: drop the GLB models and the low-poly stand-ins
    s = _sub(s, r"const GLBS = \{ person: '[^']*', dog: '[^']*' \};", "const GLBS = { person: '', dog: '' };   // characters removed for the workshop")
    s = _sub(s, r"loadCharacter\(GLBS\.person, [^\n]*\nloadCharacter\(GLBS\.dog, [^\n]*\n",
             "scene.remove(personGroup); scene.remove(dogGroup);   // the workshop has no characters\n")

    # 2. surfaces
    for name, code in TEXTURES.items():
        s = _block(s, name, code)
    s = _rep(s, MATERIALS_OLD, MATERIALS_NEW)
    for old, new in MATERIAL_SWAPS:
        s = _rep(s, old, new)
    s = _rep(s, STAIR_OLD, STAIR_NEW)
    s = _rep(s, SHELF_ITEMS_OLD, SHELF_ITEMS_NEW)
    s = _rep(s, SHELF_DRAW_OLD, SHELF_DRAW_NEW)
    s = _rep(s, "const items = [[9, 7, 'poster'], [10, 6, 'poster'], [8, 5, 'bag'],", "const items = [[9, 7, 'poster'], [10, 6, 'can'], [8, 5, 'bag'],")

    # 3. the room behind the sliding door
    s = _sub(s, r"  // low table, two cushions and a floor lamp: somebody plays in here\n.*?plane\(0\.42, 1\.05, std\(\{ map: kake, roughness: 0\.95 \}\), -0\.72, 1\.5, -DEPTH - 0\.13, room\)\.castShadow = false;\n", DOOR_ROOM)

    # 4. new pieces, after the mezzanine and before the CRT builder
    s = _rep(s, "/* ================= retro CRT builder ================= */", PROPS + "\n/* ================= retro CRT builder ================= */")

    # 5. light
    for old, new in LIGHT_SWAPS:
        s = _rep(s, old, new)

    # 6. motion
    s = _rep(s, "  gameStep(dt); gameDraw(t);\n", ANIMATE + "  gameStep(dt); gameDraw(t);\n")
    return s
