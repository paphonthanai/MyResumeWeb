<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SkRoot from '../components/SkRoot.vue'
import SkOnboardRail from '../components/SkOnboardRail.vue'
import { useT } from '../i18n'
import { prefs } from '../theme'
import { loadSession } from '../session'

// Sign-up / sign-in (design: Onboarding step 0). Email + password and Google
// through Firebase Auth; LINE needs a LINE Login channel first (soon).
const route = useRoute()
const router = useRouter()

const mode = ref(route.query.mode === 'login' ? 'login' : 'signup')
const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const notice = ref('')

// Plan picked on the sales page (/website-builder) — saved on the website
// at the end of onboarding. Billing doesn't exist yet; this is a request.
// Keep the language the visitor was reading the sales page in.
if (route.query.lang === 'en' || route.query.lang === 'th') prefs.lang = route.query.lang

const PLANS = ['site-free', 'site-light', 'site-core', 'site-business', 'site-elite']
if (typeof window !== 'undefined' && PLANS.includes(route.query.plan)) {
  try { sessionStorage.setItem('pnj-app:plan', route.query.plan) } catch { /* ignore */ }
}

const t = useT({
  th: {
    signupTitle: 'สร้างบัญชี PNJ Tech',
    signupSub: 'เริ่มฟรี อัปเกรดเมื่อพร้อมใช้โดเมนของตัวเอง',
    loginTitle: 'เข้าสู่ระบบ',
    loginSub: 'จัดการเว็บไซต์ของบริษัทคุณ',
    google: 'ดำเนินการต่อด้วย Google',
    line: 'ดำเนินการต่อด้วย LINE',
    or: 'หรือใช้อีเมล',
    email: 'อีเมลที่ทำงาน',
    password: 'รหัสผ่าน',
    passwordHint: 'อย่างน้อย 8 ตัวอักษร',
    submitSignup: 'สร้างบัญชี',
    submitLogin: 'เข้าสู่ระบบ',
    toLogin: 'มีบัญชีแล้ว?',
    toLoginLink: 'เข้าสู่ระบบ',
    toSignup: 'ยังไม่มีบัญชี?',
    toSignupLink: 'สร้างบัญชี',
    forgot: 'ลืมรหัสผ่าน',
    resetSent: 'ส่งลิงก์ตั้งรหัสผ่านใหม่ไปที่อีเมลแล้ว',
    pdpa: 'การสมัครถือว่ายอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว (PDPA)',
    back: '← กลับไปหน้า Website Builder',
    soon: 'เร็ว ๆ นี้',
    errors: {
      'auth/email-already-in-use': 'อีเมลนี้มีบัญชีแล้ว ลองเข้าสู่ระบบแทน',
      'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
      'auth/weak-password': 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร',
      'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      'auth/user-not-found': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      'auth/wrong-password': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      'auth/too-many-requests': 'ลองหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่',
      'auth/popup-closed-by-user': 'ปิดหน้าต่าง Google ก่อนเข้าสู่ระบบเสร็จ',
      'auth/operation-not-allowed': 'ยังไม่ได้เปิดใช้วิธีเข้าสู่ระบบนี้ กรุณาติดต่อทีม PNJ Tech',
      'auth/network-request-failed': 'เชื่อมต่ออินเทอร์เน็ตไม่ได้ กรุณาลองใหม่',
      missing: 'กรอกอีเมลและรหัสผ่าน',
      default: 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่',
    },
  },
  en: {
    signupTitle: 'Create your PNJ Tech account',
    signupSub: 'Start free. Upgrade when you are ready for your own domain.',
    loginTitle: 'Sign in',
    loginSub: 'Manage your company website',
    google: 'Continue with Google',
    line: 'Continue with LINE',
    or: 'or use email',
    email: 'Work email',
    password: 'Password',
    passwordHint: 'At least 8 characters',
    submitSignup: 'Create account',
    submitLogin: 'Sign in',
    toLogin: 'Already have an account?',
    toLoginLink: 'Sign in',
    toSignup: 'New here?',
    toSignupLink: 'Create an account',
    forgot: 'Forgot password',
    resetSent: 'We sent a password reset link to your email.',
    pdpa: 'By signing up you accept the terms of use and privacy policy (PDPA).',
    back: '← Back to Website Builder',
    soon: 'Soon',
    errors: {
      'auth/email-already-in-use': 'This email already has an account. Try signing in.',
      'auth/invalid-email': 'That email address is not valid.',
      'auth/weak-password': 'Use at least 8 characters for your password.',
      'auth/invalid-credential': 'Wrong email or password.',
      'auth/user-not-found': 'Wrong email or password.',
      'auth/wrong-password': 'Wrong email or password.',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
      'auth/popup-closed-by-user': 'The Google window was closed before sign-in finished.',
      'auth/operation-not-allowed': 'This sign-in method is not enabled yet. Please contact PNJ Tech.',
      'auth/network-request-failed': 'No internet connection. Please try again.',
      missing: 'Enter your email and password.',
      default: 'Could not sign in. Please try again.',
    },
  },
})

const isSignup = computed(() => mode.value === 'signup')

function fail(err) {
  console.error(err)
  error.value = t.value.errors[err?.code] || t.value.errors.default
}

async function afterAuth() {
  const { tenant } = await loadSession({ force: true })
  if (tenant?.onboarding === 'done') router.replace(typeof route.query.next === 'string' && route.query.next.startsWith('/app') ? route.query.next : '/app')
  else router.replace('/app/onboarding')
}

async function submitEmail() {
  error.value = ''
  notice.value = ''
  if (!email.value.trim() || !password.value) return (error.value = t.value.errors.missing)
  if (isSignup.value && password.value.length < 8) return (error.value = t.value.errors['auth/weak-password'])
  busy.value = true
  try {
    const [{ auth }, a] = await Promise.all([import('@/firebase'), import('firebase/auth')])
    if (isSignup.value) await a.createUserWithEmailAndPassword(auth, email.value.trim(), password.value)
    else await a.signInWithEmailAndPassword(auth, email.value.trim(), password.value)
    await afterAuth()
  } catch (err) {
    fail(err)
  } finally {
    busy.value = false
  }
}

async function google() {
  error.value = ''
  busy.value = true
  try {
    const [{ auth }, a] = await Promise.all([import('@/firebase'), import('firebase/auth')])
    await a.signInWithPopup(auth, new a.GoogleAuthProvider())
    await afterAuth()
  } catch (err) {
    fail(err)
  } finally {
    busy.value = false
  }
}

async function resetPassword() {
  error.value = ''
  notice.value = ''
  if (!email.value.trim()) return (error.value = t.value.errors['auth/invalid-email'])
  try {
    const [{ auth }, a] = await Promise.all([import('@/firebase'), import('firebase/auth')])
    await a.sendPasswordResetEmail(auth, email.value.trim())
    notice.value = t.value.resetSent
  } catch (err) {
    fail(err)
  }
}
</script>

<template>
  <SkRoot>
    <div class="sk-onb">
      <SkOnboardRail :current="0" />
      <main class="sk-onb-main">
        <div class="sk-onb-body">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px">
            <RouterLink to="/website-builder" class="sk-muted" style="font-size: 13px; text-decoration: none">{{ t.back }}</RouterLink>
            <div class="sk-seg" role="group" aria-label="Language">
              <button type="button" :class="{ on: prefs.lang === 'th' }" @click="prefs.lang = 'th'">ไทย</button>
              <button type="button" :class="{ on: prefs.lang === 'en' }" @click="prefs.lang = 'en'">EN</button>
            </div>
          </div>

          <form class="login" novalidate @submit.prevent="submitEmail">
            <h1 class="sk-h2">{{ isSignup ? t.signupTitle : t.loginTitle }}</h1>
            <p class="sk-muted" style="margin: 0">{{ isSignup ? t.signupSub : t.loginSub }}</p>

            <button type="button" class="sk-btn sk-btn-lg" :disabled="busy" @click="google">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
              {{ t.google }}
            </button>
            <button type="button" class="sk-btn sk-btn-lg" disabled>
              {{ t.line }} <span class="sk-soon">{{ t.soon }}</span>
            </button>

            <div class="or"><span></span>{{ t.or }}<span></span></div>

            <label class="sk-field">{{ t.email }}
              <input id="login-email" v-model="email" class="sk-input" type="email" autocomplete="email" inputmode="email" required />
            </label>
            <label class="sk-field">
              <span style="display: flex; justify-content: space-between">{{ t.password }}
                <button v-if="!isSignup" type="button" class="sk-link" style="font-size: 13px" @click="resetPassword">{{ t.forgot }}</button>
              </span>
              <input id="login-password" v-model="password" class="sk-input" type="password" :autocomplete="isSignup ? 'new-password' : 'current-password'" required />
              <span v-if="isSignup" class="sk-hint">{{ t.passwordHint }}</span>
            </label>

            <p v-if="error" class="sk-alert sk-alert-bad" role="alert" style="margin: 0">{{ error }}</p>
            <p v-if="notice" class="sk-alert sk-alert-ok" role="status" style="margin: 0">{{ notice }}</p>

            <button type="submit" class="sk-btn sk-btn-primary sk-btn-lg" :disabled="busy">{{ isSignup ? t.submitSignup : t.submitLogin }}</button>

            <p style="margin: 0; font-size: 14px">
              {{ isSignup ? t.toLogin : t.toSignup }}
              <button type="button" class="sk-link" @click="mode = isSignup ? 'login' : 'signup'; error = ''">{{ isSignup ? t.toLoginLink : t.toSignupLink }}</button>
            </p>
            <p v-if="isSignup" class="sk-hint" style="margin: 0">{{ t.pdpa }}</p>
          </form>
        </div>
      </main>
    </div>
  </SkRoot>
</template>

<style scoped>
.login { max-width: 440px; width: 100%; margin: 24px auto 0; display: flex; flex-direction: column; gap: 16px; }
.or { display: flex; align-items: center; gap: 12px; color: var(--sk-muted); font-size: 13px; }
.or span { flex: 1; height: 1px; background: var(--sk-line); }
</style>
