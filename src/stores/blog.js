import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore'

// Published blog posts. Loaded while prerendering (onServerPrefetch) so the
// HTML that search engines get already holds the posts, then reused on
// hydration instead of fetching again. Timestamps are stored as epoch ms so
// the state survives being serialised into the page.
const toMs = (v) => (v?.toMillis ? v.toMillis() : v ? new Date(v).getTime() : null)
const plain = (snap) => {
  const d = snap.data()
  return { ...d, id: snap.id, publishedAt: toMs(d.publishedAt), updatedAt: toMs(d.updatedAt), createdAt: toMs(d.createdAt) }
}

export const useBlogStore = defineStore('blog', () => {
  const list = ref(null) // null = not loaded yet
  const bySlug = ref({}) // slug -> post, or false when missing/unpublished

  async function loadList() {
    if (list.value) return list.value
    const q = query(collection(db, 'posts'), where('published', '==', true), orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    list.value = snapshot.docs.map(plain)
    return list.value
  }

  async function loadPost(slug) {
    if (slug in bySlug.value) return bySlug.value[slug]
    const snap = await getDoc(doc(db, 'posts', slug))
    bySlug.value[slug] = snap.exists() && snap.data().published === true ? plain(snap) : false
    return bySlug.value[slug]
  }

  return { list, bySlug, loadList, loadPost }
})
