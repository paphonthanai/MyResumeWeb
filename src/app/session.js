import { ref } from 'vue'
import { getCurrentUser } from '@/composables/useAuth'
import { BRAND_COLORS, STARTER_PAGES, createDraftPage, createTenant, getTenant, getUserDoc, updateTenant } from './data'

/** The signed-in builder user and their website (tenant), shared by all app views. */
export const sessionUser = ref(null)
export const tenant = ref(null)

let loadedFor = null

/** Load (once per signed-in user) the user's tenant. Returns { user, tenant }. */
export async function loadSession({ force = false } = {}) {
  const user = await getCurrentUser()
  sessionUser.value = user
  if (!user) {
    tenant.value = null
    loadedFor = null
    return { user: null, tenant: null }
  }
  if (force || loadedFor !== user.uid) {
    const profile = await getUserDoc(user.uid)
    tenant.value = profile?.tenantId ? await getTenant(profile.tenantId) : null
    loadedFor = user.uid
  }
  return { user, tenant: tenant.value }
}

export function clearSession() {
  sessionUser.value = null
  tenant.value = null
  loadedFor = null
}

/**
 * Onboarding steps 1-4 are skipped: a signed-in user without a finished
 * website gets one created right away (starter draft pages included) and
 * lands on the dashboard. Safe to repeat: pages are written with setDoc.
 */
async function ensureWebsite(user, t) {
  if (t?.onboarding === 'done') return
  let requestedPlan = null
  try { requestedPlan = sessionStorage.getItem('pnj-app:plan') || null } catch { /* storage blocked */ }
  const defaults = { template: 'poster', color: BRAND_COLORS[0], langs: ['th', 'en'], onboarding: 'done' }
  if (!t) await createTenant(user, { requestedPlan, ...defaults })
  else await updateTenant(t.id, defaults)
  const { tenant: fresh } = await loadSession({ force: true })
  await Promise.all(STARTER_PAGES.map((page, i) => createDraftPage(fresh.id, page, i)))
}

// Router guards for /app/*. Server-side (vite-ssg) there is no user, but
// these routes are never prerendered — firebase.json serves them as an SPA.

/** Signed in and finished onboarding → dashboard and other builder pages. */
export async function requireBuilder(to) {
  const { user, tenant: t } = await loadSession()
  // Visitors who open /app without signing in see the landing page first.
  if (!user && to.path === '/app') return { path: '/app/home' }
  if (!user) return { name: 'app-login', query: { mode: 'login', next: to.fullPath } }
  await ensureWebsite(user, t)
  return true
}

/** /app/onboarding no longer shows its steps: it sets the website up and opens the dashboard. */
export async function requireOnboarding() {
  const { user, tenant: t } = await loadSession()
  if (!user) return { name: 'app-login', query: { mode: 'signup' } }
  await ensureWebsite(user, t)
  return { name: 'app-dashboard' }
}

/** The login page sends already signed-in users onward. */
export async function redirectIfSignedIn() {
  const { user } = await loadSession()
  return user ? { name: 'app-dashboard' } : true
}
