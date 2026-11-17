<script setup>
import { ref, computed, onMounted, onServerPrefetch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import UserLayout from '../../layout/UserLayout.vue'
import { useBlogStore } from '../../stores/blog'
import { renderMarkdown } from '../../utils/markdown'

const route = useRoute()
const blog = useBlogStore()
const slug = computed(() => route.params.slug)
const cached = () => blog.bySlug[slug.value]
const post = computed(() => cached() || null)
const loading = ref(cached() === undefined)
const notFound = computed(() => cached() === false)

const siteUrl = 'https://myresume-ae906.web.app'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}

const contentHtml = computed(() => renderMarkdown(post.value?.content))

async function load() {
  try {
    await blog.loadPost(slug.value)
  } catch (err) {
    console.error('Failed to load post', err)
    blog.bySlug[slug.value] = false
  } finally {
    loading.value = false
  }
}

// Prerendered with the post in place; the browser reuses it on hydration.
onServerPrefetch(load)
onMounted(() => { if (cached() === undefined) load() })

useHead({
  title: computed(() => (post.value ? `${post.value.title} | Blog | PNJ Tech` : 'Blog | PNJ Tech')),
  meta: [
    { name: 'description', content: computed(() => post.value?.excerpt || '') },
    { property: 'og:title', content: computed(() => post.value?.title || '') },
    { property: 'og:description', content: computed(() => post.value?.excerpt || '') },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: computed(() => `${siteUrl}/blog/${slug.value}`) },
    { name: 'robots', content: computed(() => (notFound.value ? 'noindex' : 'index, follow')) },
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
        <p class="text-2xl font-bold text-white">ไม่พบบทความนี้</p>
        <RouterLink to="/blog" class="btn-glow mt-6 text-sm">← กลับไปหน้าบทความ</RouterLink>
      </div>

      <article v-else>
        <RouterLink to="/blog" class="text-sm text-base-content/50 transition hover:text-white">← บทความทั้งหมด</RouterLink>
        <p class="mt-8"><span class="eyebrow">{{ formatDate(post.publishedAt) }}</span></p>
        <h1 class="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl" style="text-wrap: balance">
          {{ post.title }}
        </h1>
        <img
          v-if="post.coverImage"
          :src="post.coverImage"
          :alt="post.title"
          class="mt-10 w-full rounded-3xl border border-white/5"
        />
        <div
          class="prose prose-invert prose-headings:text-white prose-a:text-primary prose-img:rounded-2xl prose-img:border prose-img:border-white/5 mt-8 max-w-none"
          v-html="contentHtml"
        ></div>
      </article>
    </div>
  </UserLayout>
</template>
