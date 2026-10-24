import type { SiteSnapshot } from './snapshot.ts'

export interface FirestoreDoc {
  path: string
  data: Record<string, unknown>
}

/**
 * แตก snapshot เป็น document ตามโครงสร้างใน Firestore
 *
 *   tenants/{tid}                                   ชื่อบริษัท
 *   tenants/{tid}/settings/site | theme
 *   tenants/{tid}/pages/{pageId}
 *   tenants/{tid}/collections/{colId}               นิยาม field
 *   tenants/{tid}/collections/{colId}/items/{id}
 *   tenants/{tid}/media/{mediaId}
 *   tenants/{tid}/forms/{formId}
 */
export function toFirestoreDocs(s: SiteSnapshot): FirestoreDoc[] {
  const t = `tenants/${s.tenant.id}`
  const docs: FirestoreDoc[] = [
    { path: t, data: { name: s.tenant.name, schemaVersion: s.schemaVersion } },
    { path: `${t}/settings/site`, data: s.settings },
    { path: `${t}/settings/theme`, data: s.theme },
  ]
  s.pages.forEach((p, order) => docs.push({ path: `${t}/pages/${p.id}`, data: { ...p, order } }))
  for (const { def, items } of s.collections) {
    docs.push({ path: `${t}/collections/${def.id}`, data: def })
    for (const it of items) docs.push({ path: `${t}/collections/${def.id}/items/${it.id}`, data: it })
  }
  for (const m of s.media) docs.push({ path: `${t}/media/${m.id}`, data: m })
  for (const f of s.forms) docs.push({ path: `${t}/forms/${f.id}`, data: f })
  return docs
}

/**
 * Firestore ไม่รับ array ซ้อน array และค่า undefined — คืน path ที่ผิดกฎ (ว่าง = เขียนได้)
 */
export function firestoreViolations(v: unknown, path = '', inArray = false): string[] {
  if (v === undefined) return [`${path}: undefined`]
  if (Array.isArray(v)) {
    if (inArray) return [`${path}: array ซ้อน array`]
    return v.flatMap((x, i) => firestoreViolations(x, `${path}[${i}]`, true))
  }
  if (v && typeof v === 'object') {
    return Object.entries(v).flatMap(([k, x]) => firestoreViolations(x, path ? `${path}.${k}` : k, false))
  }
  return []
}
