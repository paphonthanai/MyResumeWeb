<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import SkRoot from '../components/SkRoot.vue'
import SkOnboardRail from '../components/SkOnboardRail.vue'
import SkPosterMini from '../components/SkPosterMini.vue'
import { useT } from '../i18n'
import { prefs } from '../theme'
import { sessionUser, tenant, loadSession } from '../session'
import { BRAND_COLORS, BUSINESS_TYPES, STARTER_PAGES, createDraftPage, createTenant, updateTenant } from '../data'

// Onboarding steps 1–4 (design: Onboarding.dc.html). Each "next" saves to
// Firestore, so a visitor can leave and continue later from the same step.
const router = useRouter()
const t0 = tenant.value

const step = ref(typeof t0?.onboarding === 'number' ? Math.min(4, Math.max(1, t0.onboarding)) : 1)
const form = reactive({
  businessType: t0?.businessType || '',
  nameTh: t0?.name?.th || '',
  nameEn: t0?.name?.en || '',
  address: t0?.address || '',
  phone: t0?.phone || '',
  line: t0?.line || '',
  domain: t0?.domain || '',
  bilingual: t0 ? (t0.langs || ['th', 'en']).includes('en') : true,
  color: t0?.color || BRAND_COLORS[0],
})
const busy = ref(false)
const error = ref('')
const progress = ref(STARTER_PAGES.map(() => 'queued')) // queued | working | done
const finished = ref(false)

const t = useT({
  th: {
    stepOf: (n) => `ขั้นที่ ${n} จาก 4`,
    s1: 'ธุรกิจของคุณเกี่ยวกับอะไร',
    s1sub: 'เราจะเลือกหน้าเริ่มต้น โครงสร้างเนื้อหา และ JSON-LD ที่เหมาะกับประเภทธุรกิจ',
    s1info: 'ระบบจะเตรียมให้:',
    s1pages: 'หน้าแรก · เกี่ยวกับเรา · สินค้าและบริการ · ผลงาน · ติดต่อ',
    s1extra: 'ฟอร์มขอใบเสนอราคา',
    s2: 'ข้อมูลบริษัท',
    s2sub: 'ใช้ทั้งบนเว็บไซต์ ใน Google (JSON-LD LocalBusiness) และในใบกำกับภาษี',
    nameTh: 'ชื่อบริษัท (ไทย)', nameEn: 'ชื่อบริษัท (English)', address: 'ที่อยู่', phone: 'เบอร์โทร',
    line: 'LINE Official Account', domain: 'โดเมนที่มีอยู่แล้ว (ถ้ามี)', langs: 'ภาษาของเว็บไซต์',
    bilingual: 'ไทย (หลัก) + English', thaiOnly: 'ไทยอย่างเดียว',
    s3: 'แม่แบบ โลโก้ และสี',
    selected: 'เลือกแล้ว', soon: 'เร็ว ๆ นี้',
    templates: [['Poster', 'ตัวใหญ่ มุมเหลี่ยม · เมนูแบบ index'], ['Ledger', 'เรียบ เป็นทางการ · สำนักงานบัญชี กฎหมาย'], ['Atlas', 'ภาพใหญ่เต็มจอ · โรงแรม ท่องเที่ยว']],
    posterNote: 'Poster คือแม่แบบเดียวกับเว็บไซต์ Fire First ลูกค้ารายแรกของเรา ตัวอักษรใหญ่อ่านง่ายบนมือถือ',
    logo: 'โลโก้', logoNote: 'อัปโหลดโลโก้ได้เมื่อคลังสื่อเปิดใช้', color: 'สีหลักของแบรนด์',
    s4: 'กำลังเตรียมร่างเว็บไซต์', s4done: 'ร่างเว็บไซต์พร้อมแล้ว',
    s4sub: 'สร้างหน้าเริ่มต้นจากแม่แบบ Poster และข้อมูลบริษัท ทุกอย่างยังไม่เผยแพร่',
    s4ai: 'การให้ AI เขียนเนื้อหาและแปลเป็นอังกฤษให้อัตโนมัติ',
    queued: 'รอคิว', working: 'กำลังสร้าง…', done: '✓ สร้างฉบับร่างแล้ว',
    back: '← ย้อนกลับ', next: 'ถัดไป', prepare: 'เตรียมร่างเว็บไซต์', open: 'ไปหน้าภาพรวม →',
    needType: 'เลือกประเภทธุรกิจก่อน', needName: 'กรอกชื่อบริษัทภาษาไทย', saveFailed: 'บันทึกไม่สำเร็จ กรุณาลองใหม่',
  },
  en: {
    stepOf: (n) => `Step ${n} of 4`,
    s1: 'What does your business do?',
    s1sub: 'We pick starter pages, content structure and JSON-LD to suit your business type.',
    s1info: 'We will set up:',
    s1pages: 'Home · About · Products & services · Projects · Contact',
    s1extra: 'Quote request form',
    s2: 'Company details',
    s2sub: 'Used on your website, in Google (JSON-LD LocalBusiness) and on tax invoices.',
    nameTh: 'Company name (Thai)', nameEn: 'Company name (English)', address: 'Address', phone: 'Phone',
    line: 'LINE Official Account', domain: 'Existing domain (if any)', langs: 'Website languages',
    bilingual: 'Thai (main) + English', thaiOnly: 'Thai only',
    s3: 'Template, logo and colour',
    selected: 'Selected', soon: 'Soon',
    templates: [['Poster', 'Big type, square corners · index menu'], ['Ledger', 'Clean and formal · accounting, legal'], ['Atlas', 'Full-screen images · hotels, travel']],
    posterNote: 'Poster is the template behind the Fire First website, our first customer. Big type that reads well on phones.',
    logo: 'Logo', logoNote: 'Upload your logo once the media library opens', color: 'Brand colour',
    s4: 'Preparing your draft website', s4done: 'Your draft website is ready',
    s4sub: 'Starter pages from the Poster template and your company details. Nothing is published yet.',
    s4ai: 'AI writing your content and translating it to English',
    queued: 'Queued', working: 'Creating…', done: '✓ Draft created',
    back: '← Back', next: 'Next', prepare: 'Prepare my draft', open: 'Go to overview →',
    needType: 'Choose a business type first', needName: 'Enter the company name in Thai', saveFailed: 'Could not save. Please try again.',
  },
})

const lang = computed(() => prefs.lang)
const typeLabel = computed(() => {
  const bt = BUSINESS_TYPES.find((b) => b.id === form.businessType)
  return bt ? bt[lang.value] : ''
})
const railSubs = computed(() => ['', typeLabel.value, form.nameTh, `Poster · ${form.color}`, ''])
const doneCount = computed(() => progress.value.filter((p) => p === 'done').length)
const pct = computed(() => Math.round((doneCount.value / STARTER_PAGES.length) * 100))

function requestedPlan() {
  try { return sessionStorage.getItem('pnj-app:plan') || null } catch { return null }
}

async function save(patch) {
  if (!tenant.value) {
    await createTenant(sessionUser.value, { requestedPlan: requestedPlan(), ...patch })
  } else {
    await updateTenant(tenant.value.id, patch)
  }
  await loadSession({ force: true })
}

async function next() {
  error.value = ''
  try {
    busy.value = true
    if (step.value === 1) {
      if (!form.businessType) return (error.value = t.value.needType)
      await save({ businessType: form.businessType, onboarding: 2 })
      step.value = 2
    } else if (step.value === 2) {
      if (!form.nameTh.trim()) return (error.value = t.value.needName)
      await save({
        name: { th: form.nameTh.trim(), en: form.nameEn.trim() },
        address: form.address.trim(),
        phone: form.phone.trim(),
        line: form.line.trim(),
        domain: form.domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
        langs: form.bilingual ? ['th', 'en'] : ['th'],
        onboarding: 3,
      })
      step.value = 3
    } else if (step.value === 3) {
      await save({ template: 'poster', color: form.color, onboarding: 4 })
      step.value = 4
      await prepare()
    } else if (finished.value) {
      router.replace('/app')
    }
  } catch (err) {
    console.error(err)
    error.value = t.value.saveFailed
  } finally {
    busy.value = false
  }
}

// Create the starter pages one by one; each card reflects its real write.
async function prepare() {
  const tid = tenant.value.id
  for (let i = 0; i < STARTER_PAGES.length; i++) {
    progress.value[i] = 'working'
    await Promise.all([createDraftPage(tid, STARTER_PAGES[i], i), new Promise((r) => setTimeout(r, 350))])
    progress.value[i] = 'done'
  }
  await save({ onboarding: 'done' })
  finished.value = true
}

function back() {
  if (step.value > 1 && step.value < 4) step.value--
}

// Came back after leaving during step 4: finish creating the pages
// (setDoc is idempotent, so pages that already exist are just rewritten).
onMounted(() => {
  if (step.value === 4 && tenant.value) {
    busy.value = true
    prepare()
      .catch((err) => { console.error(err); error.value = t.value.saveFailed })
      .finally(() => { busy.value = false })
  }
})
</script>

<template>
  <SkRoot>
    <div class="sk-onb">
      <SkOnboardRail :current="step" :email="sessionUser?.email || ''" :subs="railSubs" />
      <main class="sk-onb-main">
        <div class="sk-onb-body">
          <!-- 1 Business type -->
          <template v-if="step === 1">
            <div>
              <div class="sk-kicker">{{ t.stepOf(1) }}</div>
              <h1 class="sk-h2" style="margin-top: 6px">{{ t.s1 }}</h1>
              <p class="sk-muted" style="margin: 6px 0 0">{{ t.s1sub }}</p>
            </div>
            <div class="types" role="radiogroup" :aria-label="t.s1">
              <button
                v-for="b in BUSINESS_TYPES"
                :key="b.id"
                type="button"
                role="radio"
                :aria-checked="form.businessType === b.id"
                class="type"
                :class="{ on: form.businessType === b.id }"
                @click="form.businessType = b.id"
              >
                <span class="type-top"><b>{{ b[lang] }}</b><i></i></span>
                <span class="sk-muted" style="font-size: 13px">{{ lang === 'th' ? b.exTh : b.exEn }}</span>
              </button>
            </div>
            <div class="sk-card info">
              <b>{{ t.s1info }}</b><span>{{ t.s1pages }}</span><span class="sk-muted">{{ t.s1extra }}</span>
            </div>
          </template>

          <!-- 2 Company info -->
          <template v-else-if="step === 2">
            <div>
              <div class="sk-kicker">{{ t.stepOf(2) }}</div>
              <h1 class="sk-h2" style="margin-top: 6px">{{ t.s2 }}</h1>
              <p class="sk-muted" style="margin: 6px 0 0">{{ t.s2sub }}</p>
            </div>
            <div class="grid2">
              <label class="sk-field">{{ t.nameTh }} *<input id="onb-name-th" v-model="form.nameTh" class="sk-input" maxlength="160" autocomplete="organization" /></label>
              <label class="sk-field">{{ t.nameEn }}<input id="onb-name-en" v-model="form.nameEn" class="sk-input" maxlength="160" lang="en" /></label>
              <label class="sk-field span2">{{ t.address }}<textarea id="onb-address" v-model="form.address" class="sk-input" maxlength="300" rows="2"></textarea></label>
              <label class="sk-field">{{ t.phone }}<input id="onb-phone" v-model="form.phone" class="sk-input sk-num" type="tel" maxlength="20" autocomplete="tel" /></label>
              <label class="sk-field">{{ t.line }}<input id="onb-line" v-model="form.line" class="sk-input sk-num" maxlength="40" placeholder="@" /></label>
              <label class="sk-field">{{ t.domain }}<input id="onb-domain" v-model="form.domain" class="sk-input sk-mono" maxlength="100" placeholder="example.co.th" /></label>
              <div class="sk-field">{{ t.langs }}
                <div class="seg2" role="radiogroup" :aria-label="t.langs">
                  <button type="button" role="radio" :aria-checked="form.bilingual" :class="{ on: form.bilingual }" @click="form.bilingual = true">{{ t.bilingual }}</button>
                  <button type="button" role="radio" :aria-checked="!form.bilingual" :class="{ on: !form.bilingual }" @click="form.bilingual = false">{{ t.thaiOnly }}</button>
                </div>
              </div>
            </div>
          </template>

          <!-- 3 Template, logo, colour -->
          <template v-else-if="step === 3">
            <div>
              <div class="sk-kicker">{{ t.stepOf(3) }}</div>
              <h1 class="sk-h2" style="margin-top: 6px">{{ t.s3 }}</h1>
            </div>
            <div class="tpl-layout">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div class="tpls">
                  <div v-for="(tp, i) in t.templates" :key="tp[0]" class="sk-card tpl" :class="{ on: i === 0 }">
                    <div class="tpl-prev">
                      <SkPosterMini v-if="i === 0" :color="form.color" :name="form.nameEn || form.nameTh" />
                      <span v-else class="sk-mono sk-muted" style="font-size: 11px">TEMPLATE PREVIEW</span>
                    </div>
                    <div class="tpl-meta">
                      <div><b>{{ tp[0] }}</b><div class="sk-muted" style="font-size: 12px">{{ tp[1] }}</div></div>
                      <span v-if="i === 0" class="chosen">{{ t.selected }}</span>
                      <span v-else class="sk-soon">{{ t.soon }}</span>
                    </div>
                  </div>
                </div>
                <p class="sk-muted" style="margin: 0; font-size: 13px">{{ t.posterNote }}</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 20px">
                <div class="sk-field">{{ t.logo }}
                  <div class="logo-box">
                    <span class="logo-tile" :style="{ background: form.color }">{{ (form.nameEn || form.nameTh || 'PN').slice(0, 2).toUpperCase() }}</span>
                    <span class="sk-hint">{{ t.logoNote }} <span class="sk-soon">{{ t.soon }}</span></span>
                  </div>
                </div>
                <div class="sk-field">{{ t.color }}
                  <div style="display: flex; gap: 10px" role="radiogroup" :aria-label="t.color">
                    <button
                      v-for="c in BRAND_COLORS"
                      :key="c"
                      type="button"
                      role="radio"
                      :aria-checked="form.color === c"
                      :aria-label="c"
                      class="swatch"
                      :style="{ background: c, boxShadow: form.color === c ? `0 0 0 2px var(--sk-bg), 0 0 0 4px ${c}` : 'none' }"
                      @click="form.color = c"
                    ></button>
                  </div>
                  <span class="sk-mono sk-hint">{{ form.color }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- 4 Preparing the draft -->
          <template v-else>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 16px">
              <div>
                <div class="sk-kicker">{{ t.stepOf(4) }}</div>
                <h1 class="sk-h2" style="margin-top: 6px">{{ finished ? t.s4done : t.s4 }}</h1>
                <p class="sk-muted" style="margin: 6px 0 0">{{ t.s4sub }}</p>
              </div>
              <span class="sk-num" style="font-size: 28px; font-weight: 600">{{ pct }}%</span>
            </div>
            <div class="bar"><div :style="{ width: pct + '%' }"></div></div>
            <div class="prep">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div v-for="(p, i) in STARTER_PAGES" :key="p.id" class="sk-card page" :style="{ opacity: progress[i] === 'queued' ? 0.55 : 1 }">
                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px">
                    <b style="font-size: 15px">{{ p.name[lang] }}</b>
                    <span style="font-size: 12px" :style="{ color: progress[i] === 'done' ? 'var(--sk-ok)' : progress[i] === 'working' ? 'var(--sk-accent-ink)' : 'var(--sk-muted)' }">{{ t[progress[i]] }}</span>
                  </div>
                  <div class="sk-mono sk-muted" style="font-size: 11px">{{ form.bilingual ? `${p.path.th}  ·  ${p.path.en}` : p.path.th }}</div>
                  <div class="mini-bar"><div :style="{ width: progress[i] === 'done' ? '100%' : progress[i] === 'working' ? '55%' : '0%', background: progress[i] === 'done' ? 'var(--sk-ok)' : 'var(--sk-accent)' }"></div></div>
                </div>
                <p class="sk-hint" style="margin: 4px 0 0">{{ t.s4ai }} <span class="sk-soon">{{ t.soon }}</span></p>
              </div>
              <div class="prep-prev">
                <SkPosterMini :color="form.color" :name="form.nameEn || form.nameTh" />
                <div class="reveal" :style="{ background: `linear-gradient(180deg, transparent 0%, transparent ${Math.max(0, pct - 10)}%, var(--sk-bg) ${Math.min(100, pct + 10)}%)` }"></div>
              </div>
            </div>
          </template>

          <p v-if="error" class="sk-alert sk-alert-bad" role="alert" style="margin: 0">{{ error }}</p>
        </div>

        <footer class="sk-onb-foot">
          <button type="button" class="sk-link" style="color: var(--sk-muted); font-weight: 400" :style="{ visibility: step > 1 && step < 4 ? 'visible' : 'hidden' }" @click="back">{{ t.back }}</button>
          <button type="button" class="sk-btn sk-btn-primary" style="height: 44px; padding: 0 24px" :disabled="busy || (step === 4 && !finished)" @click="next">
            {{ step === 3 ? t.prepare : step === 4 ? t.open : t.next }}
          </button>
        </footer>
      </main>
    </div>
  </SkRoot>
</template>

<style scoped>
.types { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.type { text-align: left; border-radius: 12px; padding: 18px; cursor: pointer; display: flex; flex-direction: column; gap: 6px; min-height: 104px; background: var(--sk-surface); border: 1px solid var(--sk-line); color: var(--sk-text); font: inherit; }
.type.on { background: var(--sk-accent-soft); border: 2px solid var(--sk-accent); padding: 17px; }
.type-top { display: flex; justify-content: space-between; gap: 8px; font-size: 16px; }
.type-top i { width: 18px; height: 18px; flex: none; border-radius: 50%; border: 1.5px solid var(--sk-line2); }
.type.on .type-top i { border: 5px solid var(--sk-accent); }
.info { padding: 18px 20px; display: flex; flex-wrap: wrap; gap: 8px 28px; font-size: 14px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 20px; max-width: 860px; }
.span2 { grid-column: 1 / -1; }
.seg2 { display: flex; gap: 8px; }
.seg2 button { flex: 1; height: 44px; border-radius: 8px; border: 1px solid var(--sk-line2); background: var(--sk-surface); color: var(--sk-muted); font: 500 14px Anuphan, sans-serif; cursor: pointer; }
.seg2 button.on { border: 2px solid var(--sk-accent); background: var(--sk-accent-soft); color: var(--sk-text); font-weight: 600; }
.tpl-layout { display: grid; grid-template-columns: 1fr 300px; gap: 28px; }
.tpls { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.tpl { overflow: hidden; }
.tpl.on { border: 2px solid var(--sk-accent); }
.tpl-prev { height: 200px; display: grid; place-items: center; background: repeating-linear-gradient(135deg, var(--sk-line) 0 1px, transparent 1px 10px); }
.tpl.on .tpl-prev { display: block; background: none; }
.tpl-meta { padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.chosen { font-size: 12px; background: var(--sk-accent); color: var(--sk-on-accent); padding: 2px 8px; border-radius: 10px; white-space: nowrap; }
.logo-box { display: flex; gap: 12px; align-items: center; border: 1px dashed var(--sk-line2); border-radius: 10px; padding: 12px; }
.logo-tile { width: 52px; height: 52px; flex: none; color: #fff; font: 800 18px Archivo, sans-serif; display: grid; place-items: center; }
.swatch { width: 40px; height: 40px; border-radius: 50%; border: 0; cursor: pointer; }
.bar { height: 6px; border-radius: 3px; background: var(--sk-line); }
.bar div { height: 100%; border-radius: 3px; background: var(--sk-accent); transition: width .4s; }
.prep { display: grid; grid-template-columns: 420px 1fr; gap: 28px; }
.page { padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; transition: opacity .3s; }
.mini-bar { height: 3px; border-radius: 2px; background: var(--sk-line); }
.mini-bar div { height: 100%; border-radius: 2px; transition: width .35s; }
.prep-prev { border-radius: 12px; overflow: hidden; border: 1px solid var(--sk-line2); position: relative; min-height: 320px; }
.reveal { position: absolute; inset: 0; transition: background .4s; }

@media (max-width: 1100px) {
  .types { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tpl-layout, .prep { grid-template-columns: 1fr; }
}
@media (max-width: 899px) {
  .grid2 { grid-template-columns: 1fr; }
  .tpls { grid-template-columns: 1fr; }
  .types { grid-template-columns: 1fr; }
  .type { min-height: 0; }
}
</style>
