<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import HomeSections from '../components/HomeSections.vue'
import WorkGallery from '../components/WorkGallery.vue'
import InquiryForm from '../components/InquiryForm.vue'
import UserLayout from '../layout/UserLayout.vue'
import StudioHero from '../components/studio/StudioHero.vue'
import StudioMarquee from '../components/studio/StudioMarquee.vue'
import StudioAbout from '../components/studio/StudioAbout.vue'
import StudioServices from '../components/studio/StudioServices.vue'
import StudioProjects from '../components/studio/StudioProjects.vue'
</script>

<template>
  <UserLayout theme="studio" bare>
    <main style="overflow-x: clip">
      <StudioHero />
      <StudioMarquee />
      <StudioAbout />
      <StudioServices />
      <StudioProjects />
      <WorkGallery />
      <HomeSections part="process" />
      <HelloWorld />
      <HomeSections part="packages" />
      <InquiryForm />
    </main>
  </UserLayout>
</template>
