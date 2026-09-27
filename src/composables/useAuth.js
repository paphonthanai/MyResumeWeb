import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const currentUser = ref(null)
const authReady = ref(false)

// Only subscribe in the browser — during vite-ssg's server build there is
// no persisted session to check, and Firebase Auth's persistence layer
// needs browser storage that doesn't exist in Node.
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    authReady.value = true
  })
}

// Resolves once Firebase has reported the current auth state at least
// once. Used by the router guard so it doesn't redirect to /admin/login
// while Firebase is still checking a persisted session.
export function getCurrentUser() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (authReady.value) return Promise.resolve(currentUser.value)
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}
