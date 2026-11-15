<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import WorkGallery from '../components/WorkGallery.vue'
</script>

<template>
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="gallery">
        <WorkGallery bare />
      </PageFrame>
    </main>
  </UserLayout>
</template>
