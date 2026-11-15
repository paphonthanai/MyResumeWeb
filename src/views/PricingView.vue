<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import HomeSections from '../components/HomeSections.vue'
import InquiryForm from '../components/InquiryForm.vue'
</script>

<template>
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="pricing">
        <HomeSections part="packages" bare />
        <InquiryForm />
      </PageFrame>
    </main>
  </UserLayout>
</template>
