// Firebase initialization — used by the blog + admin features.
//
// This file is imported by code that runs during vite-ssg's server build
// (Node, no `window`), so anything that only works in a real browser
// (Analytics, Auth persistence) must be created lazily on the client only.
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCynTZxr42cuPr7D9TlcoFfz14L7Ls8LXI',
  authDomain: 'myresume-ae906.firebaseapp.com',
  databaseURL: 'https://myresume-ae906-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'myresume-ae906',
  storageBucket: 'myresume-ae906.appspot.com',
  messagingSenderId: '852344509671',
  appId: '1:852344509671:web:784dc91c3be7bce5773e42',
  measurementId: 'G-Z0JX0YKW13',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

// Local testing against the Firebase emulators (firebase.json "emulators"):
//   npx firebase emulators:start --only auth,firestore
//   VITE_USE_EMULATORS=true npm run dev
if (typeof window !== 'undefined' && import.meta.env.VITE_USE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}

// Analytics needs real browser APIs (IndexedDB, etc.) — only load it
// client-side, and only after the app has hydrated.
export async function initAnalytics() {
  if (typeof window === 'undefined') return null
  const { getAnalytics, isSupported } = await import('firebase/analytics')
  if (!(await isSupported())) return null
  return getAnalytics(app)
}

export default app
