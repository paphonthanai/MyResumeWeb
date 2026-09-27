<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import UserLayout from '../../layout/UserLayout.vue'
import { db } from '../../firebase'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

const posts = ref([])
const loading = ref(true)
const loadError = ref(false)

function formatDate(value) {
  if (!value) return ''
  const date = value.toDate ? value.toDate() : new Date(value)
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
    )
    const snapshot = await getDocs(q)
    posts.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (err) {
    console.error('Failed to load posts', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <UserLayout>
    <div class="mx-auto max-w-4xl px-6 py-16 md:px-10">
      <p class="text-xs uppercase tracking-[0.25em] text-primary/90">Blog</p>
      <h1 class="mt-2 font-display text-4xl font-semibold text-base-content">บทความ</h1>
      <div class="mt-3 h-px w-16 bg-primary/60"></div>

      <div v-if="loading" class="mt-12 text-sm text-base-content/50">กำลังโหลดบทความ...</div>

      <div v-else-if="loadError" class="mt-12 text-sm text-error">
        ไม่สามารถโหลดบทความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง
      </div>

      <div v-else-if="posts.length === 0" class="mt-12 text-sm text-base-content/50">
        ยังไม่มีบทความในขณะนี้
      </div>

      <div v-else class="mt-10 space-y-6">
        <RouterLink
          v-for="post in posts"
          :key="post.id"
          :to="`/blog/${post.slug || post.id}`"
          class="block rounded-lg border border-base-300 bg-base-200/40 p-6 transition hover:border-primary/40"
        >
          <p class="text-xs uppercase tracking-widest text-primary/70">{{ formatDate(post.publishedAt) }}</p>
          <h2 class="mt-2 font-display text-xl font-semibold text-base-content">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="mt-2 text-sm text-base-content/60">{{ post.excerpt }}</p>
        </RouterLink>
      </div>
    </div>
  </UserLayout>
</template>
