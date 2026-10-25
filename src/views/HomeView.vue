<script setup>
import UserLayout from '../layout/UserLayout.vue'
import HomeBanner from '../components/home/HomeBanner.vue'
import HomeHero from '../components/home/HomeHero.vue'
import HomeSolutions from '../components/home/HomeSolutions.vue'
import HomeProduct from '../components/home/HomeProduct.vue'
import HomeWork from '../components/home/HomeWork.vue'
import HomePricing from '../components/home/HomePricing.vue'
import HomeContact from '../components/home/HomeContact.vue'
</script>

<template>
  <UserLayout>
    <template #banner><HomeBanner /></template>
    <main>
      <HomeHero />
      <HomeSolutions />
      <HomeProduct />
      <HomeWork />
      <HomePricing />
      <HomeContact />
    </main>
  </UserLayout>
</template>
