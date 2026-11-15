<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import StudioLab from '../components/studio/StudioLab.vue'
</script>

<template>
  <!-- The lab is a full-screen piece of its own, so it opens without a page hero -->
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="lab" :hero="false">
        <h1 class="sr-only">PNJ Lab</h1>
        <StudioLab />
      </PageFrame>
    </main>
  </UserLayout>
</template>
