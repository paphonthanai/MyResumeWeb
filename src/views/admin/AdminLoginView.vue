<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'กรอกอีเมลและรหัสผ่าน'
    return
  }
  submitting.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push({ name: 'admin-dashboard' })
  } catch (err) {
    error.value = 'เข้าสู่ระบบไม่สำเร็จ ตรวจสอบอีเมล/รหัสผ่านอีกครั้ง'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-base-100 px-6">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-sm rounded-lg border border-base-300 bg-base-200/40 p-8"
    >
      <h1 class="font-display text-2xl font-semibold text-base-content">Admin Login</h1>
      <p class="mt-1 text-sm text-base-content/50">PNJ Tech blog admin</p>

      <div class="mt-6 space-y-4">
        <div>
          <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">Email</label>
          <input
            v-model="email"
            type="email"
            autocomplete="username"
            class="input input-bordered w-full bg-base-100"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">Password</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="input input-bordered w-full bg-base-100"
          />
        </div>
      </div>

      <p v-if="error" class="mt-4 text-sm text-error">{{ error }}</p>

      <button
        type="submit"
        :disabled="submitting"
        class="btn btn-block mt-6 rounded-full border-primary bg-primary text-primary-content hover:bg-transparent hover:text-primary disabled:opacity-50"
      >
        {{ submitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
      </button>
    </form>
  </div>
</template>
