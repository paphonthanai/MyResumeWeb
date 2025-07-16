<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import TheWelcome from '../components/TheWelcome.vue'
import UserLayout from '../layout/UserLayout.vue'
</script>

<template>
  <UserLayout class="">
    <!-- <div class="container w-full pr-2" >
      <div class="diff aspect-[8/4]">

        <div class="diff-item-1 ">
          <div class="bg-primary text-primary-content text-9xl font-black grid place-content-center">
            NAME
          </div>
        </div>

        <div class="diff-item-2">
          <div class="bg-base-200 text-9xl font-black grid place-content-center">
            NAME
          </div>
        </div>

        <div class="diff-resizer"></div>
      </div>
    </div> -->
    
  <main >
    <div class="container w-full mx-auto px-8 py-4 md:w-full px-0">
      <TheWelcome />
    </div>
    <div class="container w-full mx-auto px-8 md:w-full px-0">
      <HelloWorld></HelloWorld>
    </div>
  </main>
  </UserLayout> 
</template>
