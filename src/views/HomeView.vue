<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'
import HomeSections from '../components/HomeSections.vue'
import InquiryForm from '../components/InquiryForm.vue'
import UserLayout from '../layout/UserLayout.vue'
</script>

<template>
  <UserLayout>
    <main>
      <TheWelcome />
      <HomeSections part="top" />
      <HelloWorld />
      <HomeSections part="packages" />
      <InquiryForm />
    </main>
  </UserLayout>
</template>
