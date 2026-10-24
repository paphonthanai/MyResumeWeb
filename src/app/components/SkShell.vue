<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SkRoot from './SkRoot.vue'
import { chrome, useT } from '../i18n'
import { prefs } from '../theme'
import { clearSession, sessionUser, tenant } from '../session'

// Builder chrome (design: Sidebar.dc.html + AppBar.dc.html) around each
// signed-in screen. Screens that aren't built yet are listed with a
// "soon" badge and open a placeholder page.
defineProps({ title: { type: String, required: true } })

const route = useRoute()
const router = useRouter()
const t = useT(chrome)
const open = ref(false)
watch(() => route.fullPath, () => (open.value = false))

const NAV = [
  { id: 'dashboard', to: '/app', ready: true },
  { id: 'pages', to: '/app/pages' },
  { id: 'collections', to: '/app/collections' },
  { id: 'media', to: '/app/media' },
  { id: 'seo', to: '/app/seo' },
  { id: 'leads', to: '/app/leads' },
  { id: 'publish', to: '/app/publish' },
  { id: 'settings', to: '/app/settings' },
]

const PLAN_NAMES = { free: 'Free', 'site-light': 'Light', 'site-core': 'Core', 'site-business': 'Business', 'site-elite': 'Business Elite' }

const site = computed(() => {
  const tn = tenant.value || {}
  const name = (prefs.lang === 'en' && tn.name?.en) || tn.name?.th || ''
  return { name, domain: tn.domain || '', color: tn.color || '#ec3013', initials: (tn.name?.en || tn.name?.th || 'PN').slice(0, 2).toUpperCase() }
})
const plan = computed(() => PLAN_NAMES[tenant.value?.plan] || 'Free')
const requested = computed(() => {
  const r = tenant.value?.requestedPlan
  return r && r !== 'site-free' ? PLAN_NAMES[r] : ''
})
const userName = computed(() => sessionUser.value?.displayName || sessionUser.value?.email || '')
const initials = computed(() => (userName.value || '?').slice(0, 2).toUpperCase())

async function signOut() {
  const [{ auth }, { signOut: out }] = await Promise.all([import('@/firebase'), import('firebase/auth')])
  await out(auth)
  clearSession()
  router.replace('/app/login?mode=login')
}
</script>

<template>
  <SkRoot>
    <div class="sk-shell" :class="{ 'is-open': open }">
      <aside class="sk-side" :aria-label="t.group">
        <RouterLink to="/app" class="sk-wordmark" style="padding: 4px 8px"><i></i><b>PNJ Tech</b></RouterLink>

        <div class="sk-side-site">
          <span class="sk-side-tile" :style="{ background: site.color }">{{ site.initials }}</span>
          <div style="min-width: 0; flex: 1">
            <div class="sk-side-name">{{ site.name }}</div>
            <div class="sk-side-domain">{{ site.domain || t.noDomain }}</div>
          </div>
        </div>

        <nav class="sk-side-nav">
          <div class="sk-side-group">{{ t.group }}</div>
          <RouterLink
            v-for="n in NAV"
            :key="n.id"
            :to="n.to"
            class="sk-side-link"
            :class="{ 'is-active': route.path === n.to, 'is-soon': !n.ready }"
            :aria-current="route.path === n.to ? 'page' : undefined"
            :title="n.ready ? undefined : t.soon"
          >
            <span>{{ t.nav[n.id] }}</span>
          </RouterLink>
        </nav>

        <div class="sk-side-bottom">
          <div class="sk-side-plan">
            <div style="display: flex; justify-content: space-between">
              <span style="color: #f2f2f3; font-weight: 500">{{ t.plan }} {{ plan }}</span>
              <RouterLink :to="prefs.lang === 'en' ? '/en/website-builder#pricing' : '/website-builder#pricing'" style="color: #8b8e94">{{ t.upgrade }}</RouterLink>
            </div>
            <div v-if="requested" style="color: #8b8e94">{{ prefs.lang === 'en' ? `Requested: ${requested}` : `ขอใช้แพ็กเกจ ${requested}` }}</div>
          </div>
          <div class="sk-side-user">
            <span class="sk-side-avatar">{{ initials }}</span>
            <div style="line-height: 1.3; min-width: 0; flex: 1">
              <div class="sk-side-name">{{ userName }}</div>
              <button type="button" class="sk-link" style="color: #8b8e94; font-weight: 400; font-size: 11px" @click="signOut">{{ t.owner }} · {{ t.signOut }}</button>
            </div>
          </div>
        </div>
      </aside>

      <div class="sk-main">
        <header class="sk-bar">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0">
            <button type="button" class="sk-btn sk-btn-sm sk-burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">☰</button>
            <span class="sk-muted sk-hide-sm" style="font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px">{{ site.name }}</span>
            <span class="sk-hide-sm" style="font-size: 13px; color: var(--sk-line2)">/</span>
            <h1>{{ title }}</h1>
          </div>
          <div class="sk-bar-right">
            <div class="sk-seg" role="group" aria-label="Language">
              <button type="button" :class="{ on: prefs.lang === 'th' }" @click="prefs.lang = 'th'">ไทย</button>
              <button type="button" :class="{ on: prefs.lang === 'en' }" @click="prefs.lang = 'en'">EN</button>
            </div>
            <button type="button" class="sk-btn sk-btn-sm sk-hide-sm" @click="prefs.dark = !prefs.dark">
              <span style="width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid currentColor; background: linear-gradient(90deg, currentColor 50%, transparent 50%)"></span>
              {{ prefs.dark ? t.light : t.dark }}
            </button>
            <button type="button" class="sk-btn sk-btn-sm sk-btn-primary sk-hide-sm" disabled :title="t.soon">{{ t.publish }}</button>
          </div>
        </header>
        <div v-if="open" class="scrim" @click="open = false"></div>
        <slot />
      </div>
    </div>
  </SkRoot>
</template>

<style scoped>
.scrim { position: fixed; inset: 0; background: rgba(0, 0, 0, .35); z-index: 20; }
</style>
