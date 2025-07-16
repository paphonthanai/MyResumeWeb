<script setup>
import { RouterLink, RouterView } from 'vue-router'
import image from '@/components/image/image.vue'
import iconEmail from '../components/icons/iconEmail.vue'
import iconTelephone from '../components/icons/iconTelephone.vue'
import Documentation from '../components/icons/IconDocumentation.vue'
import IconHome from '../components/icons/iconHome.vue'
import { ref, provide } from 'vue'

const lang = ref('th')
provide('lang', lang)


</script>

<template>
    <div class="container mx-auto w-full">
        <div class="navbar bg-base-100 shadow-sm">
            <div class="navbar-start">
                <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow z-[10]">
                    <li><a>Home</a></li>
                    <li><a>Portfolio</a></li>
                    <li><a>Project</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact</a></li>
                </ul>
                </div>
                <a class="btn btn-ghost text-white logo-text ">
                    <!-- <img src="../components/image/logo.png" width="100" alt=""> -->
                    PNJ Tech
                </a>
            </div>
            <div class="navbar-center hidden lg:flex tracking-wide space-x-6">
                <ul class="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li><a>Portfolio</a></li>
                    <li><a>Project</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
            <div class="navbar-end">
                <div class="flex justify-end mt-2">
                    <button @click="lang = lang === 'th' ? 'en' : 'th'"
                        class="text-sm text-white border border-gray-500 px-3 py-4 rounded hover:bg-white hover:text-black transition leng-btn">
                        {{ lang === 'th' ? 'Switch to English' : 'Switch to Thai' }}
                    </button>
                </div>
            </div>
        </div>
        <slot></slot>
        <div class="container w-full">
            <footer class="footer sm:footer-horizontal bg-base-100 text-neutral-content p-10">
            <aside>
                <img src="../components/image/logo.png" alt="" width="300">
                <p>
                PNJ Tech Ltd.
                <br />
                Providing reliable tech since 2000
                </p>
            </aside>
            <nav>
                <h6 class="footer-title">Social</h6>
                <div class="grid grid-flow-col gap-4">
                <a>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current">
                    <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                </a>
                <a>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current">
                    <path
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                </a>
                <a>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current">
                    <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                </a>
                </div>
            </nav>
            </footer>
        </div>
        
    </div>


</template>

<style scoped>

.menu ,button{
    font-family: 'Bowlby One SC', sans-serif;
    color: white;
}
.name-th {
    font-family: 'Noto Sans Thai', sans-serif;
}

.logo-text {
  font-family: 'Bowlby One SC', cursive;
  font-size: 3rem;
  -webkit-text-stroke: 1px #ccc;
  font-weight: 400;
}

.leng-btn {
    font-size: 1.5rem;
}
@media (max-width: 768px) {
  .logo-text {
    font-size: 2rem;
  }
  .leng-btn {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.5rem;
  }
  .leng-btn {
    font-size: 0.8rem;
  }
}

</style>