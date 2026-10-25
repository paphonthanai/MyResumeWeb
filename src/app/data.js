// Website Builder data in Firestore (project myresume-ae906):
//
//   users/{uid}                  { email, displayName, tenantId, createdAt, updatedAt }
//   tenants/{tid}                one customer website — see TENANT_FIELDS
//   tenants/{tid}/pages/{id}     draft pages created at the end of onboarding
//
// firestore.rules only lets a signed-in user read/write their own user doc
// and the tenant whose ownerUid is theirs. Firebase is loaded on demand so
// it stays out of the public site's bundle.

export const TENANT_FIELDS = [
  'ownerUid', 'plan', 'requestedPlan', 'businessType', 'name', 'address', 'phone', 'line',
  'domain', 'langs', 'template', 'color', 'onboarding', 'status', 'createdAt', 'updatedAt',
]

export const BUSINESS_TYPES = [
  { id: 'food', th: 'ร้านอาหารและคาเฟ่', en: 'Restaurants & cafés', exTh: 'เมนู ภาพอาหาร จองโต๊ะ', exEn: 'Menu, food photos, bookings' },
  { id: 'health', th: 'คลินิกและสุขภาพ', en: 'Clinics & health', exTh: 'บริการ แพทย์ นัดหมาย', exEn: 'Services, doctors, appointments' },
  { id: 'industry', th: 'โรงงานและอุตสาหกรรม', en: 'Factories & industry', exTh: 'สินค้า มาตรฐาน ISO', exEn: 'Products, ISO standards' },
  { id: 'safety', th: 'ความปลอดภัยและอัคคีภัย', en: 'Safety & fire protection', exTh: 'รถดับเพลิง อุปกรณ์ ฝึกอบรม', exEn: 'Fire trucks, equipment, training' },
  { id: 'construction', th: 'ก่อสร้างและวิศวกรรม', en: 'Construction & engineering', exTh: 'โครงการ ผลงาน ทีมวิศวกร', exEn: 'Projects, portfolio, engineers' },
  { id: 'professional', th: 'บริการวิชาชีพ', en: 'Professional services', exTh: 'บัญชี กฎหมาย ที่ปรึกษา', exEn: 'Accounting, legal, consulting' },
  { id: 'education', th: 'การศึกษาและฝึกอบรม', en: 'Education & training', exTh: 'หลักสูตร ตารางเรียน', exEn: 'Courses, schedules' },
  { id: 'travel', th: 'ท่องเที่ยวและที่พัก', en: 'Travel & stays', exTh: 'ห้องพัก แพ็กเกจ รีวิว', exEn: 'Rooms, packages, reviews' },
]

export const BRAND_COLORS = ['#ec3013', '#d9480f', '#b91c1c', '#1d4ed8', '#201e1d']

/** Pages the Poster template starts with (same set as the Fire First site). */
export const STARTER_PAGES = [
  { id: 'home', name: { th: 'หน้าแรก', en: 'Home' }, path: { th: '/', en: '/en' } },
  { id: 'about', name: { th: 'เกี่ยวกับเรา', en: 'About' }, path: { th: '/about', en: '/en/about' } },
  { id: 'services', name: { th: 'สินค้าและบริการ', en: 'Products & services' }, path: { th: '/services', en: '/en/services' } },
  { id: 'works', name: { th: 'ผลงาน', en: 'Projects' }, path: { th: '/works', en: '/en/works' } },
  { id: 'contact', name: { th: 'ติดต่อ + ฟอร์มใบเสนอราคา', en: 'Contact + quote form' }, path: { th: '/contact', en: '/en/contact' } },
]

async function fs() {
  const [{ db }, firestore] = await Promise.all([import('../firebase'), import('firebase/firestore')])
  return { db, ...firestore }
}

export async function getUserDoc(uid) {
  const { db, doc, getDoc } = await fs()
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function getTenant(tid) {
  const { db, doc, getDoc } = await fs()
  const snap = await getDoc(doc(db, 'tenants', tid))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/** Create the user's first website and link it from users/{uid}. */
export async function createTenant(user, fields) {
  const { db, doc, collection, writeBatch, serverTimestamp } = await fs()
  const ref = doc(collection(db, 'tenants'))
  const batch = writeBatch(db)
  batch.set(ref, {
    ownerUid: user.uid,
    plan: 'free',
    status: 'draft',
    template: 'poster',
    ...fields,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  batch.set(doc(db, 'users', user.uid), {
    email: user.email || '',
    displayName: user.displayName || '',
    tenantId: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  await batch.commit()
  return ref.id
}

export async function updateTenant(tid, patch) {
  const { db, doc, updateDoc, serverTimestamp } = await fs()
  await updateDoc(doc(db, 'tenants', tid), { ...patch, updatedAt: serverTimestamp() })
}

export async function createDraftPage(tid, page, order) {
  const { db, doc, setDoc, serverTimestamp } = await fs()
  await setDoc(doc(db, 'tenants', tid, 'pages', page.id), {
    name: page.name,
    path: page.path,
    order,
    status: 'draft',
    createdAt: serverTimestamp(),
  })
}

export async function listPages(tid) {
  const { db, collection, getDocs, orderBy, query } = await fs()
  const snap = await getDocs(query(collection(db, 'tenants', tid, 'pages'), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
