<script setup>
import { computed, onMounted, ref } from 'vue'
import SkShell from '../components/SkShell.vue'
import SkPosterMini from '../components/SkPosterMini.vue'
import { chrome, formatDate, useT } from '../i18n'
import { prefs } from '../theme'
import { tenant } from '../session'
import { listPages } from '../data'

// Overview (design: Dashboard.dc.html). Shows the customer's real state:
// a new site is a draft with no visits or leads yet, so those cards show
// what will appear instead of sample numbers.
const nav = useT(chrome)
const pages = ref([])
const loadError = ref(false)

onMounted(async () => {
  try {
    pages.value = await listPages(tenant.value.id)
  } catch (err) {
    console.error(err)
    loadError.value = true
  }
})

const t = useT({
  th: {
    draft: 'ยังไม่ได้เผยแพร่',
    created: (d) => `สร้างเมื่อ ${d}`,
    urls: (p, l, n) => `${p} หน้า × ${l} ภาษา = `,
    urlUnit: 'URL',
    drafts: (n) => `ร่างเว็บไซต์ ${n} หน้า รอเผยแพร่`,
    draftsNote: 'แก้เนื้อหาและเผยแพร่ได้เมื่อตัวแก้ไขเปิดใช้',
    editHome: 'แก้ไขหน้าแรก', addWork: '+ เพิ่มผลงาน', upload: 'อัปโหลดรูป',
    visits: 'ยอดเข้าชม 7 วัน', visitsEmpty: 'จะเริ่มนับหลังเผยแพร่เว็บไซต์ แยกผู้ชมภาษาไทยและอังกฤษ และหน้าที่มีคนเข้ามากที่สุด',
    leads: 'ฟอร์มใหม่', leadsEmpty: 'คำขอใบเสนอราคาจากเว็บไซต์ของคุณจะแสดงที่นี่ และส่งแจ้งเตือนเข้า LINE กลุ่มฝ่ายขายได้', seeAll: 'ดูทั้งหมด →',
    checks: 'ความพร้อมของเว็บไซต์',
    c: {
      nameTh: 'ชื่อบริษัทภาษาไทย', nameEn: 'ชื่อบริษัทภาษาอังกฤษ', nameEnMissing: 'ยังไม่มีชื่อบริษัทภาษาอังกฤษ',
      phone: 'เบอร์โทรสำหรับปุ่มโทรและ Google', phoneMissing: 'ยังไม่มีเบอร์โทร',
      address: 'ที่อยู่สำหรับ JSON-LD LocalBusiness', addressMissing: 'ยังไม่มีที่อยู่',
      pages: (n) => `หน้าเริ่มต้นครบ ${n} หน้า`, seo: 'hreflang, sitemap และภาพแชร์ลิงก์ สร้างให้อัตโนมัติเมื่อเผยแพร่',
    },
    domain: 'โดเมนและ SSL', noDomain: 'ยังไม่ได้ระบุโดเมน เริ่มด้วยที่อยู่ .web.app ได้เมื่อเผยแพร่ครั้งแรก',
    dns: 'DNS', dnsWait: 'รอเชื่อมต่อเมื่อเผยแพร่', ssl: 'SSL (HTTPS)', sslWait: 'ออกให้อัตโนมัติหลังเชื่อม DNS',
    loadError: 'โหลดรายการหน้าไม่สำเร็จ',
  },
  en: {
    draft: 'Not published yet',
    created: (d) => `Created ${d}`,
    urls: (p, l) => `${p} pages × ${l} languages = `,
    urlUnit: 'URLs',
    drafts: (n) => `${n} draft pages waiting to be published`,
    draftsNote: 'Edit and publish once the editor opens',
    editHome: 'Edit home page', addWork: '+ Add project', upload: 'Upload images',
    visits: 'Visits, last 7 days', visitsEmpty: 'Counting starts once your site is published: Thai vs English visitors and your most visited pages.',
    leads: 'New leads', leadsEmpty: 'Quote requests from your website will show up here, with optional alerts to your sales team’s LINE group.', seeAll: 'See all →',
    checks: 'Site readiness',
    c: {
      nameTh: 'Company name in Thai', nameEn: 'Company name in English', nameEnMissing: 'No English company name yet',
      phone: 'Phone number for the call button and Google', phoneMissing: 'No phone number yet',
      address: 'Address for JSON-LD LocalBusiness', addressMissing: 'No address yet',
      pages: (n) => `All ${n} starter pages created`, seo: 'hreflang, sitemap and share images are generated when you publish',
    },
    domain: 'Domain & SSL', noDomain: 'No domain yet. You can start on a .web.app address when you first publish.',
    dns: 'DNS', dnsWait: 'Connects when you publish', ssl: 'SSL (HTTPS)', sslWait: 'Issued automatically once DNS is connected',
    loadError: 'Could not load your pages',
  },
})

const tn = computed(() => tenant.value || {})
const langs = computed(() => tn.value.langs || ['th'])
const siteName = computed(() => (prefs.lang === 'en' && tn.value.name?.en) || tn.value.name?.th || '')
const urlCount = computed(() => pages.value.length * langs.value.length)

const checks = computed(() => {
  const c = t.value.c
  const list = [
    { ok: !!tn.value.name?.th, text: c.nameTh },
    ...(langs.value.includes('en') ? [{ ok: !!tn.value.name?.en, text: tn.value.name?.en ? c.nameEn : c.nameEnMissing }] : []),
    { ok: !!tn.value.phone, text: tn.value.phone ? c.phone : c.phoneMissing },
    { ok: !!tn.value.address, text: tn.value.address ? c.address : c.addressMissing },
    { ok: pages.value.length >= 5, text: c.pages(pages.value.length) },
    { ok: true, text: c.seo },
  ]
  return list
})
const score = computed(() => Math.round((checks.value.filter((x) => x.ok).length / checks.value.length) * 100))
</script>

<template>
  <SkShell :title="nav.nav.dashboard">
    <main class="sk-page dash">
      <section class="sk-card status">
        <div class="status-main">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
            <span class="sk-pill sk-pill-warn"><i></i>{{ t.draft }}</span>
            <span class="sk-muted" style="font-size: 13px">{{ t.created(formatDate(tn.createdAt)) }}</span>
          </div>
          <div class="sk-mono domain">{{ tn.domain || siteName }}</div>
          <div class="sk-muted" style="font-size: 14px">
            {{ t.urls(pages.length, langs.length) }}<b class="sk-num" style="color: var(--sk-text)">{{ urlCount }} {{ t.urlUnit }}</b>
          </div>
          <div v-if="pages.length" class="draft-strip">
            <span style="color: var(--sk-warn); font-weight: 600">{{ t.drafts(pages.length) }}</span>
            <span>{{ pages.map((p) => p.name?.[prefs.lang] || p.name?.th).join(' · ') }}</span>
            <span class="sk-muted" style="margin-left: auto">{{ t.draftsNote }}</span>
          </div>
          <p v-if="loadError" class="sk-alert sk-alert-bad" style="margin: 0">{{ t.loadError }}</p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap">
            <RouterLink to="/app/pages" class="sk-btn sk-btn-primary">{{ t.editHome }} <span class="sk-soon" style="border-color: transparent; color: inherit; opacity: .8">{{ nav.soon }}</span></RouterLink>
            <RouterLink to="/app/collections" class="sk-btn">{{ t.addWork }}</RouterLink>
            <RouterLink to="/app/media" class="sk-btn">{{ t.upload }}</RouterLink>
          </div>
        </div>
        <div class="status-thumb"><SkPosterMini :color="tn.color" :name="tn.name?.en || tn.name?.th" /></div>
      </section>

      <section class="sk-card box">
        <h2>{{ t.visits }}</h2>
        <div class="empty">
          <div class="ghost-bars" aria-hidden="true"><span v-for="h in [40, 28, 22, 55, 62, 58, 50]" :key="h" :style="{ height: h + '%' }"></span></div>
          <p class="sk-muted" style="margin: 0">{{ t.visitsEmpty }}</p>
        </div>
      </section>

      <section class="sk-card box">
        <div class="box-head"><h2>{{ t.leads }}</h2><RouterLink to="/app/leads" class="sk-link" style="font-size: 13px; font-weight: 400">{{ t.seeAll }}</RouterLink></div>
        <p class="sk-muted empty-text">{{ t.leadsEmpty }}</p>
      </section>

      <section class="sk-card box">
        <div class="box-head">
          <h2>{{ t.checks }}</h2>
          <span><b class="sk-num" style="font-size: 22px">{{ score }}</b><span class="sk-muted" style="font-size: 13px"> / 100</span></span>
        </div>
        <ul class="checks">
          <li v-for="(c, i) in checks" :key="i">
            <span class="dot" :class="c.ok ? 'ok' : 'warn'">{{ c.ok ? '✓' : '!' }}</span>
            <span>{{ c.text }}</span>
          </li>
        </ul>
      </section>

      <section class="sk-card box">
        <div class="box-head"><h2>{{ t.domain }}</h2></div>
        <template v-if="tn.domain">
          <div class="sk-mono" style="font-size: 14px; font-weight: 500">{{ tn.domain }}</div>
          <div class="rows">
            <div><span>{{ t.dns }}</span><span class="sk-muted">{{ t.dnsWait }}</span></div>
            <div><span>{{ t.ssl }}</span><span class="sk-muted">{{ t.sslWait }}</span></div>
          </div>
        </template>
        <p v-else class="sk-muted empty-text">{{ t.noDomain }}</p>
      </section>
    </main>
  </SkShell>
</template>

<style scoped>
.dash { display: grid; grid-template-columns: 1.6fr 1fr; gap: 20px; align-content: start; }
.status { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 360px; overflow: hidden; }
.status-main { padding: 24px 26px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.status-thumb { border-left: 1px solid var(--sk-line); height: 252px; overflow: hidden; background: var(--sk-canvas); }
.domain { font-size: 26px; font-weight: 500; letter-spacing: -0.02em; overflow-wrap: anywhere; }
.draft-strip { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; padding: 12px 14px; border-radius: 9px; background: var(--sk-warn-soft); font-size: 14px; }
.box { padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.box h2 { font-size: 16px; font-weight: 600; }
.box-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.empty { display: flex; flex-direction: column; gap: 14px; }
.ghost-bars { display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; align-items: end; height: 110px; }
.ghost-bars span { border-radius: 4px; background: repeating-linear-gradient(135deg, var(--sk-line) 0 1px, transparent 1px 7px); border: 1px dashed var(--sk-line2); }
.empty-text { margin: 0; padding-top: 10px; border-top: 1px solid var(--sk-line); }
.checks { list-style: none; margin: 0; padding: 0; }
.checks li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid var(--sk-line); font-size: 14px; }
.dot { width: 20px; height: 20px; border-radius: 50%; flex: none; display: grid; place-items: center; font: 700 11px Archivo, sans-serif; }
.dot.ok { background: var(--sk-ok-soft); color: var(--sk-ok); }
.dot.warn { background: var(--sk-warn-soft); color: var(--sk-warn); }
.rows > div { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-top: 1px solid var(--sk-line); font-size: 14px; }
@media (max-width: 1100px) {
  .dash { grid-template-columns: 1fr; }
  .status { grid-template-columns: 1fr; }
  .status-thumb { border-left: 0; border-top: 1px solid var(--sk-line); }
}
</style>
