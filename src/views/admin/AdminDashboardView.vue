<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const router = useRouter()
const posts = ref([])
const loading = ref(true)
const confirmingDeleteId = ref(null)
const inquiries = ref([])

function formatDate(value) {
  if (!value) return '—'
  const date = value.toDate ? value.toDate() : new Date(value)
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
}

async function loadPosts() {
  loading.value = true
  const q = query(collection(db, 'posts'), orderBy('updatedAt', 'desc'))
  const snapshot = await getDocs(q)
  posts.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  loading.value = false
}

async function handleDelete(id) {
  await deleteDoc(doc(db, 'posts', id))
  confirmingDeleteId.value = null
  await loadPosts()
}

async function handleSignOut() {
  await signOut(auth)
  router.push({ name: 'admin-login' })
}

async function loadInquiries() {
  const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  inquiries.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

async function removeInquiry(id) {
  await deleteDoc(doc(db, 'inquiries', id))
  await loadInquiries()
}

onMounted(() => {
  loadPosts()
  loadInquiries().catch((e) => console.error('Failed to load inquiries', e))
})
</script>

<template>
  <div class="min-h-screen bg-base-100 px-6 py-10 md:px-12">
    <div class="mx-auto max-w-4xl">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl font-semibold text-base-content">Blog Admin</h1>
          <p class="text-sm text-base-content/50">จัดการบทความทั้งหมด</p>
        </div>
        <div class="flex gap-3">
          <RouterLink
            :to="{ name: 'admin-post-new' }"
            class="btn btn-sm rounded-full border-primary bg-primary text-primary-content hover:bg-transparent hover:text-primary"
          >
            + บทความใหม่
          </RouterLink>
          <button
            @click="handleSignOut"
            class="btn btn-sm rounded-full border-base-300 bg-transparent text-base-content/70 hover:border-primary hover:text-primary"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      <div v-if="loading" class="mt-10 text-sm text-base-content/50">กำลังโหลด...</div>

      <div v-else-if="posts.length === 0" class="mt-10 text-sm text-base-content/50">
        ยังไม่มีบทความ — กด "+ บทความใหม่" เพื่อเริ่มเขียน
      </div>

      <div v-else class="mt-8 divide-y divide-base-300 rounded-lg border border-base-300 bg-base-200/40">
        <div
          v-for="post in posts"
          :key="post.id"
          class="flex flex-wrap items-center justify-between gap-3 p-5"
        >
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span
                class="rounded-full px-2 py-0.5 text-[11px] uppercase tracking-widest"
                :class="post.published ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'"
              >
                {{ post.published ? 'Published' : 'Draft' }}
              </span>
              <span class="text-xs text-base-content/40">{{ formatDate(post.updatedAt) }}</span>
            </div>
            <p class="mt-1 truncate font-display text-lg font-semibold text-base-content">{{ post.title }}</p>
            <p class="truncate text-xs text-base-content/40">/blog/{{ post.slug || post.id }}</p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <template v-if="confirmingDeleteId === post.id">
              <span class="text-xs text-error">ลบแน่นอนไหม?</span>
              <button
                @click="handleDelete(post.id)"
                class="btn btn-xs rounded-full border-error bg-error text-white"
              >
                ยืนยัน
              </button>
              <button
                @click="confirmingDeleteId = null"
                class="btn btn-xs rounded-full border-base-300 bg-transparent text-base-content/60"
              >
                ยกเลิก
              </button>
            </template>
            <template v-else>
              <RouterLink
                v-if="post.published"
                :to="`/blog/${post.slug || post.id}`"
                target="_blank"
                class="btn btn-xs rounded-full border-base-300 bg-transparent text-base-content/70 hover:border-primary hover:text-primary"
              >
                ดู
              </RouterLink>
              <RouterLink
                :to="{ name: 'admin-post-edit', params: { id: post.id } }"
                class="btn btn-xs rounded-full border-primary/70 bg-transparent text-primary hover:bg-primary hover:text-primary-content"
              >
                แก้ไข
              </RouterLink>
              <button
                @click="confirmingDeleteId = post.id"
                class="btn btn-xs rounded-full border-error/70 bg-transparent text-error hover:bg-error hover:text-white"
              >
                ลบ
              </button>
            </template>
          </div>
        </div>
      </div>

      <div class="mt-14">
        <h2 class="font-display text-xl font-semibold text-base-content">ข้อความจากฟอร์มติดต่อ</h2>
        <p class="text-sm text-base-content/50">{{ inquiries.length }} รายการ</p>
        <div v-if="inquiries.length === 0" class="mt-4 text-sm text-base-content/50">ยังไม่มีข้อความ</div>
        <div v-else class="mt-4 divide-y divide-base-300 rounded-lg border border-base-300 bg-base-200/40">
          <div v-for="item in inquiries" :key="item.id" class="p-5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <p class="font-display text-lg font-semibold text-base-content">{{ item.name }}</p>
              <span class="text-xs text-base-content/40">{{ formatDate(item.createdAt) }}</span>
            </div>
            <p class="mt-1 text-sm text-primary">{{ item.contact }}</p>
            <p v-if="item.package" class="mt-1 text-xs uppercase tracking-widest text-base-content/50">แพ็กเกจ: {{ item.package }}</p>
            <p class="mt-2 whitespace-pre-line text-sm text-base-content/70">{{ item.message }}</p>
            <button @click="removeInquiry(item.id)" class="btn btn-xs mt-3 rounded-full border-error/70 bg-transparent text-error hover:bg-error hover:text-white">ลบ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
