<script setup>
import { ref, computed, onMounted, onServerPrefetch } from 'vue'
import { RouterLink } from 'vue-router'
import UserLayout from '../../layout/UserLayout.vue'
import SectionHeading from '../../components/SectionHeading.vue'
import BlogScanner from '../../components/blog/BlogScanner.vue'
import { useBlogStore } from '../../stores/blog'

const blog = useBlogStore()
const posts = computed(() => blog.list || [])
const loading = ref(!blog.list)
const loadError = ref(false)

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function load() {
  try {
    await blog.loadList()
  } catch (err) {
    console.error('Failed to load posts', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

// Prerendered with the posts in place; the browser reuses them on hydration.
onServerPrefetch(load)
onMounted(() => { if (!blog.list) load() })
</script>

<template>
  <UserLayout>
    <BlogScanner />
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <SectionHeading kicker="Blog" title="บทความ" accent="บทความ" intro="เรื่องเล่าจากงานจริง เทคนิค และสิ่งที่ได้เรียนรู้ระหว่างทาง" />

      <div v-if="loading" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        <div v-for="n in 3" :key="n" class="aspect-[16/10] animate-pulse rounded-2xl bg-base-200"></div>
      </div>

      <div v-else-if="loadError" class="mt-12 text-sm text-error">
        ไม่สามารถโหลดบทความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง
      </div>

      <div v-else-if="posts.length === 0" class="card-studio mt-12 p-10 text-center text-sm text-base-content/50">
        ยังไม่มีบทความในขณะนี้
      </div>

      <!-- Cards: cover on top, title and date underneath -->
      <div v-else class="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="post in posts"
          :key="post.id"
          :to="`/blog/${post.slug || post.id}`"
          class="group block"
        >
          <div class="aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-base-200">
            <img
              v-if="post.coverImage"
              :src="post.coverImage"
              :alt="post.title"
              loading="lazy"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div v-else class="cover-fallback flex h-full w-full items-center justify-center" aria-hidden="true">
              <span class="studio-heading text-5xl font-black tracking-tighter transition duration-500 group-hover:scale-110">PNJ</span>
            </div>
          </div>
          <p class="mt-4 text-xs text-base-content/45">{{ formatDate(post.publishedAt) }}</p>
          <h2 class="mt-1 text-lg font-semibold leading-snug text-white transition group-hover:text-primary">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="mt-1.5 line-clamp-2 text-sm text-base-content/55">{{ post.excerpt }}</p>
        </RouterLink>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped>
.cover-fallback {
  background:
    radial-gradient(90% 80% at 20% 10%, rgba(208, 178, 255, 0.35), transparent 60%),
    radial-gradient(80% 90% at 90% 100%, rgba(232, 64, 13, 0.35), transparent 60%),
    #161616;
}
</style>
