<script setup>
import { computed, inject, ref } from 'vue'
import { content, EMAIL, MESSENGER_URL } from '../../content/home'
import { selectedPackage } from '../../utils/inquiryState'

const lang = inject('lang')
const t = computed(() => content[lang.value])

// Interest chips are stored by index so the selection survives a TH/EN switch.
const picked = ref([0])
const name = ref('')
const contact = ref('')
const message = ref('')
const website = ref('') // honeypot: real visitors never see/fill this
const status = ref('idle') // idle | sending | done
const error = ref('')

function toggle(i) {
  picked.value = picked.value.includes(i) ? picked.value.filter((x) => x !== i) : [...picked.value, i]
}

const COOLDOWN_MS = 30000

async function submit() {
  error.value = ''
  if (website.value) return // bot
  if (!name.value.trim() || !contact.value.trim() || !message.value.trim()) {
    error.value = t.value.contact.required
    return
  }
  try {
    const last = Number(localStorage.getItem('inquiry:last') || 0)
    if (Date.now() - last < COOLDOWN_MS) {
      error.value = t.value.contact.wait
      return
    }
  } catch { /* storage blocked: skip the cooldown */ }

  status.value = 'sending'
  try {
    // Same pipeline as the other forms (firestore.rules: inquiries). Loaded on
    // demand so Firebase stays out of the home page bundle.
    const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
      import('../../firebase'),
      import('firebase/firestore'),
    ])
    const interests = picked.value.map((i) => t.value.contact.interests[i]).join(', ')
    const body = interests ? `[${t.value.contact.interestPrefix}: ${interests}]\n${message.value.trim()}` : message.value.trim()
    await addDoc(collection(db, 'inquiries'), {
      name: name.value.trim(),
      contact: contact.value.trim(),
      package: selectedPackage.value,
      message: body.slice(0, 2000),
      lang: lang.value,
      createdAt: serverTimestamp(),
    })
    try { localStorage.setItem('inquiry:last', String(Date.now())) } catch { /* ignore */ }
    status.value = 'done'
  } catch (err) {
    console.error('Inquiry failed', err)
    error.value = t.value.contact.failed
    status.value = 'idle'
  }
}
</script>

<template>
  <section id="contact" class="border-t border-pnj-line">
    <div class="mx-auto grid max-w-[1240px] gap-14 px-6 py-16 md:py-[100px] lg:grid-cols-2">
      <div>
        <p class="font-mono text-[13px] uppercase tracking-[0.14em] text-pnj-gold">{{ t.contact.eyebrow }}</p>
        <h2 class="mt-4 text-[clamp(32px,4vw,46px)] font-bold leading-[1.2] text-pnj-text" style="text-wrap: balance">{{ t.contact.title }}</h2>
        <p class="mt-4 max-w-[480px] text-[17px] leading-[1.7] text-pnj-muted">{{ t.contact.lead }}</p>
        <div class="mt-8 flex flex-col gap-3 text-base">
          <a :href="`mailto:${EMAIL}`" class="text-pnj-gold hover:text-pnj-goldhi">{{ EMAIL }}</a>
          <a :href="MESSENGER_URL" target="_blank" rel="noopener noreferrer" class="text-pnj-gold hover:text-pnj-goldhi">{{ t.contact.messenger }}</a>
        </div>
      </div>

      <div class="rounded-[14px] border border-pnj-line bg-pnj-surface p-7">
        <div v-if="status === 'done'" class="py-10 text-center" role="status">
          <span class="text-3xl text-pnj-ok">✓</span>
          <h3 class="mt-3 text-xl font-semibold text-pnj-text">{{ t.contact.okTitle }}</h3>
          <p class="mt-1 text-[15px] text-pnj-muted">{{ t.contact.okBody }}</p>
        </div>

        <form v-else class="space-y-5" novalidate @submit.prevent="submit">
          <fieldset>
            <legend class="mb-3 text-sm text-pnj-muted">{{ t.contact.interestLabel }}</legend>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(label, i) in t.contact.interests"
                :key="label"
                type="button"
                :aria-pressed="picked.includes(i)"
                class="rounded-full border px-3.5 py-2 text-sm transition-colors"
                :class="picked.includes(i) ? 'border-pnj-gold bg-[#2A2416] text-pnj-gold' : 'border-pnj-line2 text-pnj-text2 hover:border-pnj-gold'"
                @click="toggle(i)"
              >{{ label }}</button>
            </div>
          </fieldset>

          <div class="grid gap-4 sm:grid-cols-2">
            <input v-model="name" type="text" maxlength="100" autocomplete="name" :placeholder="t.contact.name" :aria-label="t.contact.name" class="rounded-lg border border-pnj-line bg-pnj-bg px-4 py-3 text-base text-pnj-text placeholder:text-pnj-faint focus:border-pnj-gold focus:outline-none" />
            <input v-model="contact" type="text" maxlength="150" autocomplete="email" :placeholder="t.contact.reach" :aria-label="t.contact.reach" class="rounded-lg border border-pnj-line bg-pnj-bg px-4 py-3 text-base text-pnj-text placeholder:text-pnj-faint focus:border-pnj-gold focus:outline-none" />
          </div>
          <textarea v-model="message" rows="4" maxlength="1900" :placeholder="t.contact.message" :aria-label="t.contact.message" class="w-full rounded-lg border border-pnj-line bg-pnj-bg px-4 py-3 text-base text-pnj-text placeholder:text-pnj-faint focus:border-pnj-gold focus:outline-none"></textarea>

          <!-- honeypot -->
          <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Website <input v-model="website" type="text" tabindex="-1" autocomplete="off" /></label>
          </div>

          <p v-if="error" class="text-sm text-[#E08A6A]" role="alert">{{ error }}</p>

          <button type="submit" :disabled="status === 'sending'" class="w-full rounded-lg bg-pnj-gold px-4 py-3.5 text-sm font-semibold text-pnj-ongold transition-colors hover:bg-pnj-goldhi disabled:opacity-60">
            {{ status === 'sending' ? t.contact.sending : t.contact.send }}
          </button>
          <p class="text-xs text-pnj-faint">{{ t.contact.pdpa }}</p>
        </form>
      </div>
    </div>
  </section>
</template>
