import { computed, ref, shallowRef, toRaw, watch } from 'vue'
import { moveItem as moveIn, refIssues, removeItem as removeFrom, renumber, replaceItem, validateSnapshot } from '@pnjtech/schema'

// "Sample mode" for the Collections screen: the Fire First SiteSnapshot is
// built at dev/build time (tools/import-ff/src/vite-plugin.ts) and served as
// /ff-sample/snapshot.json. Edits live in this browser only (state +
// localStorage) — nothing is written to Firestore.

const BASE_URL = '/ff-sample/'
const KEY = 'pnj-app:ff-sample:v1'

const clone = (v) => JSON.parse(JSON.stringify(toRaw(v)))

/** 'idle' | 'loading' | 'ready' | 'missing' (no sample available) */
export const status = ref('idle')
/** The untouched sample from the server, for reset and "edited" detection. */
const pristine = shallowRef(null)
/** The working copy that the screen edits. */
export const snapshot = ref(null)
export const issues = ref([])

export const edited = computed(() => !!snapshot.value && JSON.stringify(snapshot.value) !== JSON.stringify(pristine.value))

function readSaved(tenantId) {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    return saved?.schemaVersion === 1 && saved.tenant?.id === tenantId ? saved : null
  } catch {
    return null
  }
}

export async function loadSample() {
  if (status.value === 'ready' || status.value === 'loading') return
  status.value = 'loading'
  try {
    const res = await fetch(`${BASE_URL}snapshot.json`)
    // Without the sample, hosting's SPA fallback answers 200 with index.html.
    if (!res.ok || !(res.headers.get('content-type') || '').includes('json')) throw new Error('no sample')
    const base = await res.json()
    pristine.value = base
    snapshot.value = readSaved(base.tenant.id) ?? clone(base)
    status.value = 'ready'
    revalidate(0)
  } catch {
    status.value = 'missing'
  }
}

let saveTimer
let checkTimer
watch(snapshot, () => {
  if (!snapshot.value) return
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(snapshot.value)) } catch { /* storage full or blocked */ }
  }, 150)
  revalidate()
}, { deep: true })

/** validateSnapshot() runs over the whole site, so debounce it while typing. */
function revalidate(delay = 250) {
  clearTimeout(checkTimer)
  checkTimer = setTimeout(() => {
    if (!snapshot.value) return
    const data = clone(snapshot.value)
    let orphans = []
    try { orphans = refIssues(data) } catch { /* malformed data is already reported by validateSnapshot */ }
    issues.value = [...validateSnapshot(data), ...orphans]
  }, delay)
}

export function resetSample() {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
  snapshot.value = clone(pristine.value)
}

function collection(id) {
  return snapshot.value.collections.find((c) => c.def.id === id)
}

export function itemsOf(id) {
  return renumber(collection(id)?.items ?? [])
}

export function saveItem(cid, item, isNew) {
  const col = collection(cid)
  col.items = isNew ? renumber([...col.items, clone(item)]) : replaceItem(col.items, clone(item))
}

export function deleteItem(cid, id) {
  const col = collection(cid)
  col.items = removeFrom(col.items, id)
}

export function moveItem(cid, id, dir, visibleIds) {
  const col = collection(cid)
  col.items = moveIn(col.items, id, dir, visibleIds)
}

export function setPublished(cid, id, published) {
  const it = collection(cid).items.find((x) => x.id === id)
  if (it) it.published = published
}

/** The edited snapshot as a downloadable JSON file (input for `npm run site:verify-ff -- <file>`). */
export function downloadSnapshot() {
  const blob = new Blob([JSON.stringify(snapshot.value, null, 2) + '\n'], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${snapshot.value.tenant.id}.snapshot.json`
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

/** Web URL of a media-library entry (prefers the webp variant). */
export function mediaSrc(m) {
  if (!m) return ''
  const file = m.variants?.find((v) => v.mime === 'image/webp')?.file ?? m.file
  return `${BASE_URL}img/${file.split('/').map(encodeURIComponent).join('/')}`
}
