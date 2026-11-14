<script setup>
import { computed, inject } from 'vue'

// Opens a Messenger chat with the owner, like the old hero CTA.
const MESSENGER_URL = 'https://m.me/Paphonthanai.name'
const lang = inject('lang')
const label = computed(() => (lang.value === 'th' ? 'ติดต่อผม' : 'Contact Me'))
</script>

<template>
  <a
    :href="MESSENGER_URL"
    target="_blank"
    rel="noopener noreferrer"
    class="contact-btn inline-block whitespace-nowrap rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.04] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
  >
    {{ label }}
  </a>
</template>

<style scoped>
.contact-btn {
  background: linear-gradient(123deg, #18011f 7%, #b600a8 37%, #7621b0 72%, #be4c00 100%);
  box-shadow: 0 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721b1;
  outline: 2px solid #fff;
  outline-offset: -3px;
}
</style>
