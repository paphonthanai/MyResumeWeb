<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { slugify } from '../../utils/slugify'
import { renderMarkdown } from '../../utils/markdown'

const route = useRoute()
const router = useRouter()

const isEditing = computed(() => route.name === 'admin-post-edit')
const postId = computed(() => route.params.id)

const title = ref('')
const slug = ref('')
const slugTouched = ref(false)
const excerpt = ref('')
const content = ref('')
const contentInput = ref(null)
const coverImage = ref('')
const published = ref(false)
const originalPublishedAt = ref(null)

const loading = ref(isEditing.value)
const saving = ref(false)
const error = ref('')
const notFound = ref(false)

function onTitleInput() {
  if (!slugTouched.value) slug.value = slugify(title.value)
}

onMounted(async () => {
  if (!isEditing.value) return
  const snap = await getDoc(doc(db, 'posts', postId.value))
  if (!snap.exists()) {
    notFound.value = true
    loading.value = false
    return
  }
  const data = snap.data()
  title.value = data.title || ''
  slug.value = data.slug || snap.id
  slugTouched.value = true
  excerpt.value = data.excerpt || ''
  content.value = data.content || ''
  coverImage.value = data.coverImage || ''
  published.value = !!data.published
  originalPublishedAt.value = data.publishedAt || null
  loading.value = false
})

const previewHtml = computed(() => renderMarkdown(content.value))

// Inline "insert image" form — deliberately not window.prompt(): native
// dialogs can't be driven by browser automation/tests and look jarringly
// out of place against the rest of the UI.
const showImageForm = ref(false)
const imageUrlInput = ref('')
const imageAltInput = ref('')
const savedSelection = ref({ start: 0, end: 0 })

function openImageForm() {
  const el = contentInput.value
  savedSelection.value = {
    start: el?.selectionStart ?? content.value.length,
    end: el?.selectionEnd ?? content.value.length,
  }
  imageUrlInput.value = ''
  imageAltInput.value = ''
  showImageForm.value = true
}

function cancelImageForm() {
  showImageForm.value = false
}

function confirmInsertImage() {
  const url = imageUrlInput.value.trim()
  if (!url) return

  const markdownImage = `![${imageAltInput.value.trim()}](${url})`
  const { start, end } = savedSelection.value
  const before = content.value.slice(0, start)
  const after = content.value.slice(end)
  // Keep the image on its own line, with a blank line on either side, so
  // it renders as a block rather than getting glued onto existing text.
  const needsLeadingBreak = before.length > 0 && !before.endsWith('\n\n')
  const insert = `${needsLeadingBreak ? '\n\n' : ''}${markdownImage}\n\n`

  content.value = before + insert + after
  showImageForm.value = false

  // Put the cursor right after the inserted image once Vue re-renders the
  // textarea with the new value.
  nextTick(() => {
    const el = contentInput.value
    if (!el) return
    const cursor = (before + insert).length
    el.focus()
    el.setSelectionRange(cursor, cursor)
  })
}

async function handleSave() {
  error.value = ''
  if (!title.value.trim() || !slug.value.trim() || !content.value.trim()) {
    error.value = 'กรอกหัวข้อ, slug และเนื้อหาให้ครบ'
    return
  }

  saving.value = true
  try {
    const docId = isEditing.value ? postId.value : slug.value

    // Creating a new post: make sure the slug isn't already taken by
    // another document, since the slug is used as the document id.
    if (!isEditing.value) {
      const existing = await getDoc(doc(db, 'posts', docId))
      if (existing.exists()) {
        error.value = 'มี slug นี้อยู่แล้ว กรุณาเปลี่ยน'
        saving.value = false
        return
      }
    }

    await setDoc(doc(db, 'posts', docId), {
      title: title.value.trim(),
      slug: slug.value.trim(),
      excerpt: excerpt.value.trim(),
      content: content.value,
      coverImage: coverImage.value.trim(),
      published: published.value,
      publishedAt: published.value ? (originalPublishedAt.value || serverTimestamp()) : null,
      updatedAt: serverTimestamp(),
    })

    router.push({ name: 'admin-dashboard' })
  } catch (err) {
    error.value = 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง'
  } finally {
    saving.value = false
  }
}

const showDeleteConfirm = ref(false)

async function handleDelete() {
  if (!isEditing.value) return
  await deleteDoc(doc(db, 'posts', postId.value))
  router.push({ name: 'admin-dashboard' })
}
</script>

<template>
  <div class="min-h-screen bg-base-100 px-6 py-10 md:px-12">
    <div class="mx-auto max-w-3xl">
      <RouterLink :to="{ name: 'admin-dashboard' }" class="text-sm text-base-content/50 hover:text-primary">
        ← กลับไปหน้าจัดการบทความ
      </RouterLink>

      <div v-if="loading" class="mt-10 text-sm text-base-content/50">กำลังโหลด...</div>

      <div v-else-if="notFound" class="mt-10 text-sm text-error">ไม่พบบทความนี้</div>

      <form v-else @submit.prevent="handleSave" class="mt-6 space-y-5">
        <h1 class="font-display text-2xl font-semibold text-base-content">
          {{ isEditing ? 'แก้ไขบทความ' : 'เขียนบทความใหม่' }}
        </h1>

        <div>
          <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">หัวข้อ</label>
          <input
            v-model="title"
            @input="onTitleInput"
            type="text"
            class="input input-bordered w-full bg-base-200/40"
          />
        </div>

        <div>
          <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">
            Slug (URL: /blog/{{ slug || '...' }})
          </label>
          <input
            v-model="slug"
            @input="slugTouched = true"
            :disabled="isEditing"
            type="text"
            class="input input-bordered w-full bg-base-200/40 disabled:opacity-50"
          />
        </div>

        <div>
          <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">คำโปรย (excerpt)</label>
          <textarea
            v-model="excerpt"
            rows="2"
            class="textarea textarea-bordered w-full bg-base-200/40"
          ></textarea>
        </div>

        <div>
          <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">รูปหน้าปก (URL, ไม่บังคับ)</label>
          <input
            v-model="coverImage"
            type="text"
            class="input input-bordered w-full bg-base-200/40"
          />
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div>
            <div class="mb-1 flex items-center justify-between">
              <label class="block text-xs uppercase tracking-widest text-base-content/50">เนื้อหา (Markdown)</label>
              <button
                type="button"
                @click="openImageForm"
                class="btn btn-xs rounded-full border-primary/70 bg-transparent text-primary hover:bg-primary hover:text-primary-content"
              >
                + แทรกรูปภาพ
              </button>
            </div>

            <div v-if="showImageForm" class="mb-2 space-y-2 rounded-lg border border-primary/40 bg-base-200/60 p-3">
              <input
                v-model="imageUrlInput"
                type="text"
                placeholder="URL รูปภาพ (จำเป็น)"
                class="input input-sm input-bordered w-full bg-base-100"
              />
              <input
                v-model="imageAltInput"
                type="text"
                placeholder="คำอธิบายรูปภาพ (alt text, ไม่บังคับ)"
                class="input input-sm input-bordered w-full bg-base-100"
              />
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="confirmInsertImage"
                  :disabled="!imageUrlInput.trim()"
                  class="btn btn-xs rounded-full border-primary bg-primary text-primary-content disabled:opacity-40"
                >
                  แทรก
                </button>
                <button
                  type="button"
                  @click="cancelImageForm"
                  class="btn btn-xs rounded-full border-base-300 bg-transparent text-base-content/60"
                >
                  ยกเลิก
                </button>
              </div>
            </div>

            <textarea
              ref="contentInput"
              v-model="content"
              rows="18"
              class="textarea textarea-bordered w-full bg-base-200/40 font-mono text-sm"
            ></textarea>
          </div>
          <div>
            <label class="mb-1 block text-xs uppercase tracking-widest text-base-content/50">ตัวอย่าง</label>
            <div
              class="prose prose-invert prose-sm prose-img:rounded-lg h-[27.5rem] max-w-none overflow-y-auto rounded-lg border border-base-300 bg-base-200/40 p-4"
              v-html="previewHtml"
            ></div>
          </div>
        </div>

        <label class="flex items-center gap-2 text-sm text-base-content/70">
          <input v-model="published" type="checkbox" class="checkbox checkbox-sm" />
          เผยแพร่ (Published)
        </label>

        <p v-if="error" class="text-sm text-error">{{ error }}</p>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            :disabled="saving"
            class="btn rounded-full border-primary bg-primary text-primary-content hover:bg-transparent hover:text-primary disabled:opacity-50"
          >
            {{ saving ? 'กำลังบันทึก...' : 'บันทึก' }}
          </button>

          <template v-if="isEditing">
            <button
              v-if="!showDeleteConfirm"
              type="button"
              @click="showDeleteConfirm = true"
              class="btn rounded-full border-error/70 bg-transparent text-error hover:bg-error hover:text-white"
            >
              ลบบทความ
            </button>
            <template v-else>
              <span class="text-sm text-error">ลบบทความนี้ใช่หรือไม่? กู้คืนไม่ได้</span>
              <button
                type="button"
                @click="handleDelete"
                class="btn btn-sm rounded-full border-error bg-error text-white"
              >
                ยืนยันลบ
              </button>
              <button
                type="button"
                @click="showDeleteConfirm = false"
                class="btn btn-sm rounded-full border-base-300 bg-transparent text-base-content/60"
              >
                ยกเลิก
              </button>
            </template>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>
