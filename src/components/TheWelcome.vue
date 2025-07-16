
<template>
  <section class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 px-6 md:px-20 rounded-md shadow-md hover:shadow-sky-500/5">
    <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      
      <!-- Text Zone -->
      <div class="w-full md:w-1/2 text-white space-y-6">
        <h2 class="text-lg tracking-widest text-gray-400">TECHNICAL</h2>
        <h1 class="text-5xl md:text-6xl font-extrabold font-bowlby leading-tight">
          PORTFOLIO
        </h1>
        <div class="h-1 w-24 bg-gray-500 mt-2"></div>
        <p class="text-lg text-gray-300">
          Welcome to NPJ Tech — A clean portfolio built with Vue, Tailwind and real-world UX. No gimmicks.
        </p>
      </div>

      <!-- Image Zone -->
      <div class="w-full md:w-1/2 group">
  <img
    src="./image/Me_cartoon.png"
    alt="profile"
    class="w-[280px] md:w-[300px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] mx-auto group-hover:hidden"
  />
  <img
    src="./image/Me2.png" 
    alt="profile-hover"
    class="w-[280px] md:w-[300px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] mx-auto hidden group-hover:block"
  />
</div>
    </div>
  </section>

  
</template>

<style scoped>
h1 {
  font-family: 'Bowlby One SC', cursive;
}
</style>