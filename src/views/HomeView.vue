<script setup>
import InquiryForm from '../components/InquiryForm.vue'
import UserLayout from '../layout/UserLayout.vue'
import StudioHero from '../components/studio/StudioHero.vue'
import StudioMarquee from '../components/studio/StudioMarquee.vue'
import StudioAbout from '../components/studio/StudioAbout.vue'
import StudioServices from '../components/studio/StudioServices.vue'
import HomeIndex from '../components/home/HomeIndex.vue'
</script>

<template>
  <!-- The homepage introduces PNJ Tech and points to the other pages;
       projects, lab, gallery, skills, process and pricing each have their own. -->
  <UserLayout theme="studio" bare>
    <main style="overflow-x: clip">
      <StudioHero />
      <StudioMarquee />
      <StudioAbout />
      <StudioServices />
      <HomeIndex />
      <InquiryForm />
    </main>
  </UserLayout>
</template>
