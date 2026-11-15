<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="skills">
        <HelloWorld bare />
      </PageFrame>
    </main>
  </UserLayout>
</template>
