import { computed } from 'vue'
import { prefs } from './theme'

/** Pick the current UI language from a { th, en } dictionary. */
export function useT(dict) {
  return computed(() => dict[prefs.lang])
}

const TH_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

/** "23 ต.ค. 2569" in Thai (Buddhist Era), "23 Oct 2026" in English. */
export function formatDate(date, lang = prefs.lang) {
  if (!date) return ''
  const d = date instanceof Date ? date : date.toDate?.() ?? new Date(date)
  if (lang === 'en') return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${d.getDate()} ${TH_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`
}

/** Shared builder chrome strings (sidebar, app bar). */
export const chrome = {
  th: {
    group: 'เว็บไซต์',
    nav: {
      dashboard: 'ภาพรวม', pages: 'หน้าเว็บ', collections: 'ผลงาน (Collection)', media: 'คลังสื่อ',
      seo: 'SEO และการแชร์', leads: 'ฟอร์มและลูกค้า', publish: 'เผยแพร่และประวัติ', settings: 'ตั้งค่า',
    },
    noDomain: 'ยังไม่ได้เชื่อมโดเมน',
    plan: 'แพ็กเกจ',
    upgrade: 'ดูแพ็กเกจ',
    owner: 'เจ้าของ',
    signOut: 'ออกจากระบบ',
    dark: 'มืด',
    light: 'สว่าง',
    viewSite: 'ดูเว็บไซต์',
    publish: 'เผยแพร่',
    soon: 'เร็ว ๆ นี้',
  },
  en: {
    group: 'WEBSITE',
    nav: {
      dashboard: 'Overview', pages: 'Pages', collections: 'Works (Collection)', media: 'Media',
      seo: 'SEO & sharing', leads: 'Leads', publish: 'Publish & history', settings: 'Settings',
    },
    noDomain: 'No domain connected',
    plan: 'Plan',
    upgrade: 'See plans',
    owner: 'Owner',
    signOut: 'Sign out',
    dark: 'Dark',
    light: 'Light',
    viewSite: 'View site',
    publish: 'Publish',
    soon: 'Soon',
  },
}
