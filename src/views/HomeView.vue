<script setup>
import UserLayout from '../layout/UserLayout.vue'
import HomeContent from '../components/home/HomeContent.vue'

// The homepage uses the site's main theme (the same look as the blog page).
// HomeContent reads the language from UserLayout, so it lives in its slot.
</script>

<template>
  <UserLayout>
    <main>
      <HomeContent />
    </main>
  </UserLayout>
</template>
