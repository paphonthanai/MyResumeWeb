<script setup>
import { computed, inject, ref, watch } from 'vue'
import { vReveal } from '../utils/reveal'
import { selectedPackage } from '../utils/inquiryState'

const lang = inject('lang')

const content = {
  th: {
    kicker: 'Contact',
    title: 'ปรึกษาโปรเจกต์',
    intro: 'เล่าโจทย์คร่าว ๆ มาได้เลย จะติดต่อกลับเพื่อคุยรายละเอียดและประเมินใบเสนอราคา',
    name: 'ชื่อ',
    contact: 'อีเมลหรือเบอร์โทร',
    pkg: 'แพ็กเกจที่สนใจ',
    pkgNone: 'ยังไม่แน่ใจ',
    pkgs: { starter: 'เริ่มต้น', pro: 'ประยุกต์', enterprise: 'องค์กร' },
    message: 'รายละเอียดโปรเจกต์',
    send: 'ส่งข้อความ',
    sending: 'กำลังส่ง...',
    required: 'กรอกชื่อ ช่องทางติดต่อ และรายละเอียดให้ครบ',
    wait: 'ส่งบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่',
    failed: 'ส่งไม่สำเร็จ กรุณาลองใหม่ หรืออีเมลถึงผมโดยตรง',
    okTitle: 'ได้รับข้อความแล้ว',
    okBody: 'ขอบคุณครับ จะติดต่อกลับโดยเร็วที่สุด',
  },
  en: {
    kicker: 'Contact',
    title: 'Discuss your project',
    intro: 'Tell me roughly what you need — I will get back to you to talk details and prepare a quotation.',
    name: 'Name',
    contact: 'Email or phone',
    pkg: 'Package of interest',
    pkgNone: 'Not sure yet',
    pkgs: { starter: 'Starter', pro: 'Professional', enterprise: 'Enterprise' },
    message: 'Project details',
    send: 'Send message',
    sending: 'Sending...',
    required: 'Please fill in your name, a way to reach you, and the details.',
    wait: 'You are sending too often. Please wait a moment.',
    failed: 'Could not send. Please try again, or email me directly.',
    okTitle: 'Message received',
    okBody: 'Thank you — I will get back to you as soon as possible.',
  },
}
const t = computed(() => content[lang.value])

const name = ref('')
const contact = ref('')
const pkg = ref('')
const message = ref('')
const website = ref('') // honeypot: real visitors never see/fill this
const status = ref('idle') // idle | sending | done
const error = ref('')

watch(selectedPackage, (id) => {
  if (id) pkg.value = id
})

const COOLDOWN_MS = 30000

async function submit() {
  error.value = ''
  if (website.value) return // bot
  if (!name.value.trim() || !contact.value.trim() || !message.value.trim()) {
    error.value = t.value.required
    return
  }

  try {
    const last = Number(localStorage.getItem('inquiry:last') || 0)
    if (Date.now() - last < COOLDOWN_MS) {
      error.value = t.value.wait
      return
    }
  } catch { /* storage blocked: skip the cooldown */ }

  status.value = 'sending'
  try {
    // Loaded on demand so Firebase stays out of the home page bundle.
    const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
      import('../firebase'),
      import('firebase/firestore'),
    ])
    await addDoc(collection(db, 'inquiries'), {
      name: name.value.trim(),
      contact: contact.value.trim(),
      package: pkg.value,
      message: message.value.trim(),
      lang: lang.value,
      createdAt: serverTimestamp(),
    })
    try { localStorage.setItem('inquiry:last', String(Date.now())) } catch { /* ignore */ }
    status.value = 'done'
  } catch (err) {
    console.error('Inquiry failed', err)
    error.value = t.value.failed
    status.value = 'idle'
  }
}
</script>

<template>
  <section id="inquiry" class="border-b border-base-300 bg-base-100 px-6 py-20 md:px-10">
    <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div v-reveal>
        <p class="text-xs uppercase tracking-[0.25em] text-primary/90">{{ t.kicker }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-base-content">{{ t.title }}</h2>
        <div class="mt-3 h-px w-16 bg-primary/60"></div>
        <p class="mt-5 text-base-content/60">{{ t.intro }}</p>
      </div>

      <div v-reveal class="rounded-lg border border-base-300 bg-base-200/40 p-7">
        <div v-if="status === 'done'" class="py-10 text-center" role="status">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="mt-4 font-display text-xl font-semibold text-base-content">{{ t.okTitle }}</p>
          <p class="mt-1 text-sm text-base-content/60">{{ t.okBody }}</p>
        </div>

        <form v-else @submit.prevent="submit" class="space-y-4" novalidate>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">{{ t.name }}</span>
              <input v-model="name" type="text" maxlength="100" autocomplete="name" class="input input-bordered w-full bg-base-100" />
            </label>
            <label class="block">
              <span class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">{{ t.contact }}</span>
              <input v-model="contact" type="text" maxlength="150" autocomplete="email" class="input input-bordered w-full bg-base-100" />
            </label>
          </div>

          <label class="block">
            <span class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">{{ t.pkg }}</span>
            <select v-model="pkg" class="select select-bordered w-full bg-base-100">
              <option value="">{{ t.pkgNone }}</option>
              <option v-for="(label, id) in t.pkgs" :key="id" :value="id">{{ label }}</option>
            </select>
          </label>

          <label class="block">
            <span class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">{{ t.message }}</span>
            <textarea v-model="message" rows="5" maxlength="2000" class="textarea textarea-bordered w-full bg-base-100"></textarea>
          </label>

          <!-- honeypot -->
          <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Website <input v-model="website" type="text" tabindex="-1" autocomplete="off" /></label>
          </div>

          <p v-if="error" class="text-sm text-error" role="alert">{{ error }}</p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="btn btn-shimmer rounded-full border-primary px-8 text-primary-content disabled:opacity-60"
          >
            {{ status === 'sending' ? t.sending : t.send }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
