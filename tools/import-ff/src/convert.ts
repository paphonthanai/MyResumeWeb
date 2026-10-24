import type {
  Block,
  BlockOf,
  BlockType,
  CollectionDef,
  CollectionItem,
  Form,
  Localized,
  Media,
  Page,
  SiteSnapshot,
} from '@pnjtech/schema'
import type { LegacyContent, LegacySite } from './legacy.ts'

/** ข้อมูลไฟล์จริงใน web/public (ใช้หาขนาดรูปที่ไม่มีใน IMAGES) */
export type FileInfo = Record<string, { bytes: number; w?: number; h?: number }>

type L = { th: string; en: string }
const T = (th: string, en: string): L => ({ th, en })
const pad = (i: number) => String(i + 1).padStart(2, '0')
const page = (id: string) => ({ kind: 'page' as const, page: id })

// ข้อความที่เขียนไว้ใน .vue / useSeo.js โดยตรง (ไม่ได้อยู่ใน ff-content.js) — ย้ายเข้า schema ด้วย
// เพื่อให้ renderer ไม่ต้องมีข้อความของ Fire First ฝังอยู่
const HARDCODED = {
  videoTitle: T(
    'แนะนำบริษัท ไฟร์ เฟิร์ส เซฟตี้ แอนด์ ทรัค — สถานีดับเพลิงและกู้ภัยครบวงจร',
    'Fire First Safety & Truck — complete fire & rescue station solutions',
  ),
  videoLabel: T('วิดีโอแนะนำบริษัท Fire First 30 วินาที', 'Fire First 30-second company video'),
  worksFilter: T('กรองตามหมวดหมู่', 'Filter by category'),
  mapTitle: T('แผนที่ ไทรน้อย นนทบุรี', 'Map — Sai Noi, Nonthaburi'),
  mapQuery: 'Sai Noi, Nonthaburi 11150',
  sending: T('กำลังส่ง…', 'Sending…'),
  sendError: T('ส่งไม่สำเร็จ กรุณาโทร {phone} หรืออีเมล {email}', "Couldn't send — please call {phone} or email {email}"),
  keywords:
    'รถดับเพลิง, อุปกรณ์ดับเพลิง, เครื่องดับเพลิง, ถังดับเพลิง, รถกู้ภัย, ฝึกอบรมดับเพลิง, ซ้อมแผนอพยพหนีไฟ, ตรวจถังดับเพลิง, เครื่องสูบน้ำดับเพลิง, ชุดผจญเพลิง, นนทบุรี, fire truck Thailand, fire extinguisher',
}

const COLLECTION_DEFS: CollectionDef[] = [
  {
    id: 'values',
    name: T('คุณค่าหลัก', 'Core values'),
    fields: [
      { key: 'title', type: 'localized', label: T('คำหลัก', 'Word'), required: true },
      { key: 'subtitle', type: 'localized', label: T('คำรอง', 'Subtitle'), required: false },
      { key: 'description', type: 'localized', label: T('คำอธิบาย', 'Description'), required: false },
    ],
  },
  {
    id: 'services',
    name: T('สินค้าและบริการ', 'Products & services'),
    fields: [
      { key: 'title', type: 'localized', label: T('ชื่อ', 'Title'), required: true },
      { key: 'description', type: 'localized', label: T('คำอธิบาย', 'Description'), required: false },
    ],
  },
  {
    id: 'fleet',
    name: T('ยานพาหนะเฉพาะทาง', 'Specialist vehicles'),
    fields: [
      { key: 'title', type: 'localized', label: T('ชื่อ', 'Title'), required: true },
      { key: 'description', type: 'localized', label: T('คำอธิบาย', 'Description'), required: false },
    ],
  },
  {
    id: 'works',
    name: T('ผลงาน', 'Projects'),
    fields: [
      { key: 'image', type: 'media', label: T('รูป', 'Image'), required: true },
      { key: 'title', type: 'localized', label: T('ชื่อผลงาน', 'Title'), required: true },
      { key: 'category', type: 'localized', label: T('หมวด', 'Category'), required: true },
    ],
  },
  {
    id: 'reviews',
    name: T('รีวิวจากลูกค้า', 'Reviews'),
    fields: [
      { key: 'quote', type: 'localized', label: T('ข้อความ', 'Quote'), required: true },
      { key: 'author', type: 'localized', label: T('ผู้รีวิว', 'Author'), required: true },
    ],
  },
  {
    id: 'pricing',
    name: T('แพ็กเกจและราคา', 'Packages & pricing'),
    fields: [
      { key: 'title', type: 'localized', label: T('ชื่อแพ็กเกจ', 'Name'), required: true },
      { key: 'price', type: 'localized', label: T('ราคา', 'Price'), required: true },
      { key: 'unit', type: 'localized', label: T('หน่วย', 'Unit'), required: false },
      { key: 'features', type: 'localizedList', label: T('จุดเด่น', 'Features'), required: false },
      { key: 'highlight', type: 'boolean', label: T('แนะนำ', 'Highlight'), required: false },
    ],
  },
  {
    id: 'faq',
    name: T('คำถามที่พบบ่อย', 'FAQ'),
    fields: [
      { key: 'question', type: 'localized', label: T('คำถาม', 'Question'), required: true },
      { key: 'answer', type: 'localized', label: T('คำตอบ', 'Answer'), required: true },
    ],
  },
]

const toItems = <T>(list: T[], map: (x: T) => Record<string, unknown>): CollectionItem[] =>
  list.map((x, i) => ({ id: pad(i), order: i, published: true, data: map(x) }))

const stem = (file: string) => file.replace(/\.[a-z0-9]+$/i, '')

/** แปลงเนื้อหาเว็บ Fire First เดิมเป็น SiteSnapshot ของแพลตฟอร์ม */
export function fromLegacy(D: LegacyContent, site: LegacySite, files: FileInfo): SiteSnapshot {
  const media = buildMedia(D, site, files)
  const h = D.h

  const collections = [
    toItems(D.values, (v) => ({ title: v.k, subtitle: v.s, description: v.d })),
    toItems(D.services, (s) => ({ title: s.t, description: s.d })),
    toItems(D.fleet, (f) => ({ title: f.t, description: f.d })),
    toItems(D.works, (w) => ({ image: { media: stem(w.img), position: 'top' }, title: w.t, category: w.c })),
    toItems(D.reviews, (r) => ({ quote: r.q, author: r.w })),
    toItems(D.pricing, (p) => ({ title: p.t, price: p.p, unit: p.u, features: p.f, highlight: p.hl === true })),
    toItems(D.faq, (q) => ({ question: q.q, answer: q.a })),
  ].map((items, i) => ({ def: COLLECTION_DEFS[i], items }))

  const pages: Page[] = [
    {
      id: 'home',
      path: { th: '/', en: '/en' },
      seo: { title: D.seo.home.t, description: D.seo.home.d, noindex: false },
      jsonLd: ['VideoObject'],
      status: 'published',
      blocks: [
        {
          id: 'hero',
          type: 'hero',
          kicker: D.hero.kicker,
          words: { collection: 'values', field: 'title' },
          lead: D.hero.lead,
          cta: { label: h.services, link: page('products') },
          image: { media: 'firefighters' },
        },
        {
          id: 'video',
          type: 'video',
          video: { media: 'pitch' },
          poster: { media: 'pitch-poster' },
          title: HARDCODED.videoTitle,
          label: HARDCODED.videoLabel,
          durationIso: 'PT30S',
          uploadDate: '2026-10-21',
        },
        { id: 'intro', type: 'intro', heading: D.hero.h1, body: D.about.p, cta: { label: h.about, link: page('about') } },
        {
          id: 'services',
          type: 'serviceList',
          number: '01',
          heading: h.services,
          source: { collection: 'services' },
          link: page('products'),
        },
        {
          id: 'strip',
          type: 'photoStrip',
          images: [{ media: 'unimog' }, { media: 'nozzle' }, { media: 'tactical' }],
        },
        {
          id: 'works',
          type: 'worksMosaic',
          number: '02',
          heading: h.works,
          source: { collection: 'works', limit: 5 },
          more: { label: D.more, link: page('works') },
        },
        {
          id: 'reviews',
          type: 'reviews',
          number: '03',
          heading: h.reviews,
          source: { collection: 'reviews' },
          note: D.reviewNote,
        },
      ],
    },
    {
      id: 'about',
      path: { th: '/about', en: '/en/about' },
      seo: { title: D.seo.about.t, description: D.seo.about.d, noindex: false },
      jsonLd: ['BreadcrumbList'],
      status: 'published',
      blocks: [
        { id: 'title', type: 'titleBand', kicker: h.about, heading: D.about.h },
        { id: 'photo', type: 'photo', image: { media: 'hq' }, caption: h.hq },
        {
          id: 'profile',
          type: 'profile',
          body: D.about.p,
          person: { name: D.about.md, role: D.about.mdr },
          facts: D.about.facts.map((f) => ({ label: f.k, value: f.v })),
        },
        { id: 'values', type: 'valuesRow', source: { collection: 'values' } },
      ],
    },
    {
      id: 'products',
      path: { th: '/products', en: '/en/products' },
      seo: { title: D.seo.products.t, description: D.seo.products.d, noindex: false },
      jsonLd: ['BreadcrumbList'],
      status: 'published',
      blocks: [
        { id: 'heading', type: 'pageHeading', heading: h.services },
        { id: 'services', type: 'serviceGrid', source: { collection: 'services' } },
        { id: 'fleet', type: 'cardGrid', heading: h.fleet, source: { collection: 'fleet' } },
        {
          id: 'pricing',
          type: 'pricingList',
          heading: h.pricing,
          source: { collection: 'pricing' },
          cta: { label: D.cta, link: page('contact') },
        },
      ],
    },
    {
      id: 'works',
      path: { th: '/works', en: '/en/works' },
      seo: { title: D.seo.works.t, description: D.seo.works.d, noindex: false },
      jsonLd: ['BreadcrumbList'],
      status: 'published',
      blocks: [
        {
          id: 'works',
          type: 'worksGrid',
          heading: h.works,
          source: { collection: 'works' },
          categoryField: 'category',
          allLabel: h.all,
          filterLabel: HARDCODED.worksFilter,
        },
      ],
    },
    {
      id: 'contact',
      path: { th: '/contact', en: '/en/contact' },
      seo: { title: D.seo.contact.t, description: D.seo.contact.d, noindex: false },
      jsonLd: ['BreadcrumbList', 'FAQPage'],
      status: 'published',
      blocks: [
        {
          id: 'contact',
          type: 'contactBand',
          heading: h.contact,
          form: 'contact',
          labels: { address: D.contact.l.addr, email: D.contact.l.mail },
        },
        { id: 'map', type: 'map', query: HARDCODED.mapQuery, zoom: 13, title: HARDCODED.mapTitle },
        { id: 'faq', type: 'faq', heading: h.faq, source: { collection: 'faq' } },
      ],
    },
  ]

  const l = D.contact.l
  const forms: Form[] = [
    {
      id: 'contact',
      fields: [
        { key: 'name', type: 'text', label: l.name, required: true, maxLength: 120, autocomplete: 'name' },
        { key: 'org', type: 'text', label: l.org, required: false, maxLength: 160, autocomplete: 'organization' },
        {
          key: 'phone',
          type: 'tel',
          label: l.tel,
          required: true,
          pattern: '[0-9+()\\- ]{6,20}',
          autocomplete: 'tel',
        },
        { key: 'message', type: 'textarea', label: l.msg, required: false, maxLength: 3000 },
      ],
      submitLabel: l.send,
      sendingLabel: HARDCODED.sending,
      successMessage: l.sent,
      errorMessage: HARDCODED.sendError,
      notify: { emails: [D.contact.mail] },
    },
  ]

  return {
    schemaVersion: 1,
    tenant: { id: 'fire-first', name: D.brand.en },
    settings: {
      langs: ['th', 'en'],
      url: site.SITE_URL,
      brand: {
        name: D.brand,
        legal: D.legal,
        slogan: D.slogan,
        wordmark: ['FIRE', 'FIRST'],
        tagline: 'Safety & Truck Co., Ltd.',
        logo: 'logo',
        favicon: 'favicon',
        touchIcon: 'apple-touch-icon',
      },
      contact: {
        phone: D.contact.tel,
        phoneE164: site.PHONE_TEL.replace(/^tel:/, ''),
        email: D.contact.mail,
        address: D.contact.addr,
        postal: {
          street: '48/68 ม.2 ต.ไทรน้อย',
          locality: 'อ.ไทรน้อย',
          region: 'นนทบุรี',
          postalCode: '11150',
          country: 'TH',
        },
      },
      nav: D.nav.map((n) => ({ page: n.id, label: n.l })),
      header: { cta: { label: D.cta, link: page('contact') }, call: D.call, badge: '24/7' },
      footer: { closing: h.close, closingSub: h.closeSub },
      seo: { siteName: 'Fire First Safety & Truck', keywords: HARDCODED.keywords, ogVersion: '2' },
      organization: {
        type: 'LocalBusiness',
        legalName: D.legal,
        taxId: '0125567038118',
        image: 'company',
        founder: { name: 'พิทยา ดำงามกิจ', jobTitle: 'กรรมการผู้จัดการ' },
        offers: [
          { type: 'Product', name: 'รถดับเพลิงและรถกู้ภัย' },
          { type: 'Product', name: 'เครื่องดับเพลิงและอุปกรณ์ดับเพลิง' },
          { type: 'Service', name: 'ฝึกอบรมดับเพลิงและซ้อมแผน' },
          { type: 'Service', name: 'ตรวจสอบและบำรุงรักษาถังดับเพลิง' },
        ],
      },
    },
    theme: {
      template: 'poster',
      colors: { bg: '#f3f2f2', surface: '#eae9e9', text: '#201e1d', accent: '#ec3013', accent2: '#e15b47' },
      fonts: { heading: 'Archivo', body: 'Archivo', headingWeight: 800 },
      radius: 0,
    },
    pages,
    collections,
    media,
    forms,
  }
}

// รูปใน IMAGES (site.js) + ไฟล์อื่นที่โค้ดอ้างถึงตรงๆ (วิดีโอ โลโก้ favicon รูปบริษัทใน JSON-LD)
function buildMedia(D: LegacyContent, site: LegacySite, files: FileInfo): Media[] {
  const out: Media[] = []
  const add = (id: string, file: string, extra: Partial<Media> = {}) => {
    const info = files[file]
    if (!info) throw new Error(`ไม่พบไฟล์ ${file} ใน web/public`)
    const ext = file.split('.').pop()!
    const kind = ext === 'mp4' ? 'video' : 'image'
    const webp = `${stem(file)}.webp`
    out.push({
      id,
      kind,
      file,
      mime: { jpg: 'image/jpeg', png: 'image/png', mp4: 'video/mp4' }[ext] ?? `image/${ext}`,
      // Firestore ไม่รับ undefined — วิดีโออ่านขนาดจาก header ไม่ได้ จึงไม่มี w/h
      ...(info.w && info.h ? { w: info.w, h: info.h } : {}),
      bytes: info.bytes,
      variants: files[webp] ? [{ file: webp, mime: 'image/webp' }] : [],
      ...extra,
    })
  }

  for (const [name, img] of Object.entries(site.IMAGES)) {
    add(name, `${name}.jpg`, { w: img.w, h: img.h, ...(img.alt ? { alt: img.alt } : {}) })
  }
  // รูปผลงานทุกชิ้นต้องอยู่ในคลังสื่อ แม้จะไม่มีใน IMAGES
  for (const w of D.works) if (!out.some((m) => m.id === stem(w.img))) add(stem(w.img), w.img)
  add('company', 'company.jpg')
  add('pitch', 'pitch.mp4')
  add('pitch-poster', 'pitch-poster.jpg')
  add('logo', 'logo-512.png')
  add('favicon', 'favicon.png')
  add('apple-touch-icon', 'apple-touch-icon.png')
  return out
}

// ---------- แปลงกลับ: ใช้พิสูจน์ว่าแปลงครบ และใช้เป็นตัวเชื่อมให้หน้า .vue เดิมอ่านข้อมูลจาก Firestore ได้ใน P1 ----------

/** สร้าง D (โครงเดียวกับ ff-content.js) กลับจาก snapshot */
export function toLegacy(s: SiteSnapshot): LegacyContent {
  const pg = (id: string) => {
    const p = s.pages.find((x) => x.id === id)
    if (!p) throw new Error(`ไม่มีหน้า ${id}`)
    return p
  }
  const block = <K extends BlockType>(pageId: string, type: K): BlockOf<K> => {
    const b = pg(pageId).blocks.find((x: Block) => x.type === type)
    if (!b) throw new Error(`หน้า ${pageId} ไม่มี block ${type}`)
    return b as BlockOf<K>
  }
  const items = (id: string): Record<string, any>[] => {
    const c = s.collections.find((x) => x.def.id === id)
    if (!c) throw new Error(`ไม่มี collection ${id}`)
    return [...c.items].sort((a, b) => a.order - b.order).map((it) => it.data)
  }
  const mediaFile = (id: string) => {
    const m = s.media.find((x) => x.id === id)
    if (!m) throw new Error(`ไม่มีไฟล์ ${id}`)
    return m.file
  }
  const L = (x: Localized | undefined) => x as L

  const hero = block('home', 'hero')
  const intro = block('home', 'intro')
  const reviews = block('home', 'reviews')
  const titleBand = block('about', 'titleBand')
  const profile = block('about', 'profile')
  const photo = block('about', 'photo')
  const worksGrid = block('works', 'worksGrid')
  const contactBand = block('contact', 'contactBand')
  const form = s.forms.find((f) => f.id === contactBand.form)!
  const field = (key: string) => L(form.fields.find((f) => f.key === key)!.label)
  const st = s.settings

  return {
    brand: L(st.brand.name),
    legal: L(st.brand.legal),
    slogan: L(st.brand.slogan),
    nav: st.nav.map((n) => ({ id: n.page, l: L(n.label) })),
    cta: L(st.header.cta.label),
    call: L(st.header.call),
    more: L(block('home', 'worksMosaic').more.label),
    hero: { kicker: L(hero.kicker), h1: L(intro.heading), lead: L(hero.lead) },
    values: items('values').map((d) => ({ k: d.title, s: d.subtitle, d: d.description })),
    services: items('services').map((d) => ({ t: d.title, d: d.description })),
    fleet: items('fleet').map((d) => ({ t: d.title, d: d.description })),
    works: items('works').map((d) => ({ img: mediaFile(d.image.media), t: d.title, c: d.category })),
    reviews: items('reviews').map((d) => ({ q: d.quote, w: d.author })),
    reviewNote: L(reviews.note),
    pricing: items('pricing').map((d) => ({
      t: d.title,
      p: d.price,
      u: d.unit,
      f: d.features,
      ...(d.highlight ? { hl: true } : {}),
    })),
    faq: items('faq').map((d) => ({ q: d.question, a: d.answer })),
    about: {
      h: L(titleBand.heading),
      p: L(profile.body),
      md: L(profile.person.name),
      mdr: L(profile.person.role),
      facts: profile.facts.map((f) => ({ k: L(f.label), v: L(f.value) })),
    },
    contact: {
      addr: L(st.contact.address),
      tel: st.contact.phone,
      mail: st.contact.email,
      l: {
        addr: L(contactBand.labels.address),
        tel: field('phone'),
        mail: L(contactBand.labels.email),
        name: field('name'),
        org: field('org'),
        msg: field('message'),
        send: L(form.submitLabel),
        sent: L(form.successMessage),
      },
    },
    seo: Object.fromEntries(
      s.pages.map((p) => [p.id, { t: L(p.seo.title), d: L(p.seo.description) }]),
    ) as LegacyContent['seo'],
    h: {
      services: L(block('products', 'pageHeading').heading),
      fleet: L(block('products', 'cardGrid').heading),
      works: L(worksGrid.heading),
      reviews: L(reviews.heading),
      pricing: L(block('products', 'pricingList').heading),
      faq: L(block('contact', 'faq').heading),
      contact: L(contactBand.heading),
      about: L(titleBand.kicker),
      hq: L(photo.caption),
      close: L(st.footer.closing),
      closeSub: L(st.footer.closingSub),
      all: L(worksGrid.allLabel),
    },
  }
}
