<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import image from '@/components/image/image.vue'
import iconEmail from '../components/icons/iconEmail.vue'
import iconTelephone from '../components/icons/iconTelephone.vue'
import Documentation from '../components/icons/IconDocumentation.vue'
import IconHome from '../components/icons/iconHome.vue'
import { ref, provide } from 'vue'

const route = useRoute()
// Initial language follows the route (e.g. "/en" prerenders in English for
// crawlers); the toggle button below still flips it client-side after that.
const lang = ref(route.meta.lang === 'en' ? 'en' : 'th')
provide('lang', lang)




</script>

<template>
    <div class="container mx-auto w-full">
        <div class="navbar bg-base-100 shadow-sm">
            <div class="navbar-start lg:justify-center">
                <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <img src="../components/image/NewLogo_4.png" alt="PNJ Tech" width="60"
                    style="position: relative;
                    top: -0px;"/>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow z-[10]">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/#portfolio">Portfolio</RouterLink></li>
                    <li><RouterLink to="/#project">Project</RouterLink></li>
                    <li><RouterLink to="/about">About</RouterLink></li>
                    <li><RouterLink to="/#contact">Contact</RouterLink></li>
                </ul>
                </div>
                <a class="btn btn-ghost text-white logo-text hidden lg:block">
                <img 
                    src="../components/image/NewLogo_4.png" 
                    alt="PNJ Logo" 
                    width="60" 
                    style="position: relative; top: 5px;
                    left: 0px;"
                />
                <!-- PNJ Tech -->
                </a>
            </div>
            <div class="navbar-center hidden lg:flex tracking-wide space-x-6">
                <ul class="menu menu-horizontal px-1">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/#portfolio">Portfolio</RouterLink></li>
                    <li><RouterLink to="/#project">Project</RouterLink></li>
                    <li><RouterLink to="/about">About</RouterLink></li>
                    <li><RouterLink to="/#contact">Contact</RouterLink></li>
                </ul>
            </div>
            <div class="navbar-end lg:justify-center">
                <div class="flex justify-end ">
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
                <img src="../components/image/NewLogo_4.png" alt="PNJ Tech" width="100"
                style="position: relative;
                left: -0px;
                top: -10px;
                " />
                <p style="position: relative;
                top: -0px;">
                PNJ Tech
                <br />
                Freelance software development
                </p>
            </aside>
            <nav>
                <h6 class="footer-title">Social</h6>
                <div class="grid grid-flow-col gap-4">
                <a href="https://github.com/paphonthanai" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current">
                    <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/%E0%B8%9B%E0%B8%9E%E0%B8%99%E0%B8%98%E0%B8%99%E0%B8%B1%E0%B8%A2-%E0%B9%83%E0%B8%88%E0%B8%A1%E0%B8%B2-aa57b2269/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current">
                    <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.787-1.75-1.75s.784-1.75 1.75-1.75 1.75.787 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.271h-3v-4.5c0-1.074-.021-2.458-1.5-2.458s-1.731 1.174-1.731 2.382v4.576h-3v-9h2.881v1.233h.042c.401-.761 1.379-1.561 2.839-1.561 3.033 0 3.591 1.996 3.591 4.59v4.738z"></path>
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