import { ref } from 'vue'
import { getCurrentUser } from '@/composables/useAuth'
import { getTenant, getUserDoc } from './data'

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

// Router guards for /app/*. Server-side (vite-ssg) there is no user, but
// these routes are never prerendered — firebase.json serves them as an SPA.

/** Signed in and finished onboarding → dashboard and other builder pages. */
export async function requireBuilder(to) {
  const { user, tenant: t } = await loadSession()
  if (!user) return { name: 'app-login', query: { mode: 'login', next: to.fullPath } }
  if (!t || t.onboarding !== 'done') return { name: 'app-onboarding' }
  return true
}

/** Signed in but not done with onboarding. */
export async function requireOnboarding() {
  const { user, tenant: t } = await loadSession()
  if (!user) return { name: 'app-login', query: { mode: 'signup' } }
  if (t?.onboarding === 'done') return { name: 'app-dashboard' }
  return true
}

/** The login page sends already signed-in users onward. */
export async function redirectIfSignedIn() {
  const { user } = await loadSession()
  return user ? { name: 'app-dashboard' } : true
}
