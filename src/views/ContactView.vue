<script setup>
import UserLayout from '../layout/UserLayout.vue'
import PageFrame from '../components/page/PageFrame.vue'
import ContactChannels from '../components/contact/ContactChannels.vue'
import InquiryForm from '../components/InquiryForm.vue'
</script>

<template>
  <UserLayout>
    <main style="overflow-x: clip">
      <PageFrame page="contact">
        <ContactChannels />
        <InquiryForm />
      </PageFrame>
    </main>
  </UserLayout>
</template>
