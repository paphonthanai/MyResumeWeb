<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import StudioProjects from '../components/studio/StudioProjects.vue'
</script>

<template>
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="projects">
        <StudioProjects />
      </PageFrame>
    </main>
  </UserLayout>
</template>
