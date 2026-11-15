<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import HomeSections from '../components/HomeSections.vue'
</script>

<template>
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="process">
        <HomeSections part="process" bare />
      </PageFrame>
    </main>
  </UserLayout>
</template>
