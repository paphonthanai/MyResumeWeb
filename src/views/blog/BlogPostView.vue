<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import UserLayout from '../../layout/UserLayout.vue'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { renderMarkdown } from '../../utils/markdown'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const notFound = ref(false)

const siteUrl = 'https://myresume-ae906.web.app'

function formatDate(value) {
  if (!value) return ''
  const date = value.toDate ? value.toDate() : new Date(value)
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}

const contentHtml = computed(() => renderMarkdown(post.value?.content))

onMounted(async () => {
  try {
    const snap = await getDoc(doc(db, 'posts', route.params.slug))
    if (!snap.exists() || snap.data().published !== true) {
      notFound.value = true
    } else {
      post.value = { id: snap.id, ...snap.data() }
    }
  } catch (err) {
    console.error('Failed to load post', err)
    notFound.value = true
  } finally {
    loading.value = false
  }
})

useHead({
  title: computed(() => (post.value ? `${post.value.title} | Blog | PNJ Tech` : 'Blog | PNJ Tech')),
  meta: [
    { name: 'description', content: computed(() => post.value?.excerpt || '') },
    { property: 'og:title', content: computed(() => post.value?.title || '') },
    { property: 'og:description', content: computed(() => post.value?.excerpt || '') },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `${siteUrl}/blog/${route.params.slug}`) },
  ],
})
</script>

<template>
  <UserLayout>
    <div class="mx-auto max-w-3xl px-6 py-16 md:px-10">
      <div v-if="loading" class="text-sm text-base-content/50">กำลังโหลด...</div>

      <div v-else-if="notFound" class="py-20 text-center">
        <p class="font-display text-2xl font-semibold text-base-content">ไม่พบบทความนี้</p>
        <RouterLink to="/blog" class="mt-4 inline-block text-sm text-primary hover:underline">กลับไปหน้าบทความ</RouterLink>
      </div>

      <article v-else>
        <p class="text-xs uppercase tracking-widest text-primary/70">{{ formatDate(post.publishedAt) }}</p>
        <h1 class="mt-2 font-display text-3xl font-semibold leading-tight text-base-content md:text-4xl">
          {{ post.title }}
        </h1>
        <img
          v-if="post.coverImage"
          :src="post.coverImage"
          :alt="post.title"
          class="mt-8 w-full rounded-lg border border-base-300"
        />
        <div
          class="prose prose-invert prose-headings:font-display prose-a:text-primary mt-8 max-w-none"
          v-html="contentHtml"
        ></div>
      </article>
    </div>
  </UserLayout>
</template>
