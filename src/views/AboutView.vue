<script setup>
import UserLayout from '../layout/UserLayout.vue'
import IconActivity from '@/components/icons/iconActivity.vue'
import IconPersernal from '@/components/icons/iconPersernal.vue'

const EducationEn = [
  {
    major: "Computer Information System",
    year: "Aug 2014 - Jun 2015",
    name: "Rajamangala university of technology Lanna Lampang",
    descrip: "I studied for a bachelor's degree at Rajamangala university of technology lanna Lampang Department of Computer Information Systems Because I have knowledge in writing C#, C++ from the high school I study at.And being a student leader to help my friends understand programming better.At the same time, it made me understand and be more interested. While studying,I like to go to the university's IT room. Always go to see the work and study the code of the university's IT staff. I attended university for one year. After that, I took the police entrance exam to satisfy my needs at home and did not continue my studies because the salary was not enough to continue studying and after  i has a job at home stopped supporting me"
  },
  {
    major: "Computer Information System",
    year: "Aug 2014 - Jun 2015",
    name: "Rajamangala university of technology Lanna Lampang",
  }
]
</script>

<template>
  <UserLayout>
    <div class="w-full grid grid-cols-4 gap-2 p-4 text-xl font-semi-bold">
      <div class="col-span-3 border-r-2">
        <div>
          <h1 class="name text-3xl font-black">Profile</h1>
          <br/>
          <p class="name text-xl font-semibold">I am a technology enthusiast and have an ambition to understand
            as much technology as possible. To get the most benefit and achieve
            the highest goals. Currently, I have a desire to meet people and live
            in an environment that is conducive to my personal development towards
            that goal. And I hope I get that change. Thank You.</p>
        </div>
        <div class="divider"></div>
        <div>
          <!-- #หัวข้อมหาวิทยาลัย# -->
          <h1 class="name text-2xl font-black">Education</h1>
          <br/>
          <div class="flex flex-1 justify-between mr-4 name font-bold">
            <p>{{ EducationEn[0].major }}</p>
            <p>{{ EducationEn[0].year }}</p>
          </div>
          <p class="name text-xl font-semibold">
            <a href="https://lpc.rmutl.ac.th/" 
            target="_blank" rel="noopener noreferrer"
            class="block underline font-bold mr-2 my-2"
            >
            {{ EducationEn[0].name }}
          </a>
            {{ EducationEn[0].descrip }}
          </p>

          <br/>
          <!-- #หัวข้อโรงเรียนมัธยมปลาย# -->
          <div class="flex flex-1 justify-between mr-4 name font-bold">
            <p>High School</p>
            <p>May 2011 - Jun 2014</p>
          </div>
          <p class="name text-xl font-semibold">
            <a href="https://sites.google.com/saroyseree.ac.th/saroyseree/home" 
            target="_blank" rel="noopener noreferrer"
            class="block underline font-bold mr-2 my-2"
            >
              Saroi Seri Wittaya School. 
            </a>
            I attended high school at Saroi Seri Wittaya School.
            Previously, I could fix computers when the 
            teacher saw me. She taught me how to 
            storyboard in C#. How to draw flowcharts 
            and break down objects When I was in sixth 
            grade, I found myself fascinated with the 
            way people thought about communicating with 
            computers. So I like programming. since then
          </p>
        </div>
        <div class="divider"></div>
        <!-- #หัวข้อ การทำงาน# -->
        <h1 class="name text-2xl font-bold">Employment</h1>
          <div class="flex flex-1 justify-between mr-4 name font-bold">
            <p>
              <a href="http://www.bpp.go.th/" 
              target="_blank" rel="noopener noreferrer"
              class="block underline font-bold mr-2 my-2"
              >
                Border Patrol Police 
              </a>
            </p>
            <p>Feb 2015 - Present</p>
          </div>
          <p class="name text-xl">
            <a href="http://www.bpp.go.th/bpp24/home/indexbpp24.html" 
            target="_blank" rel="noopener noreferrer"
            class="block underline font-bold mr-2 my-2"
            >
              Border Patrol Police Division 24
            </a>
            <ul>
              <li class="list-disc ml-4">
                Code web design 101 for an agency website
                with
                 <span class="font-bold">  
                  html, css, javascript, php
                </span>
                on<span class="font-bold ml-2">Dreamweaver</span>
                and use
                <span class="font-bold">
                  filezilla
                </span>
                to transfer files between the client 
                machine and the server's database of 
                <span class="font-bold">
                  phpmyadmin.
                </span>
                <span class="underline">
                  Website above. My friend and I made it ourselves.
                </span>
              </li>
              <li class="list-disc ml-4">
                Design signs for various activities using 
                <span class="font-bold">
                  <a href="https://www.adobe.com/th_en/products/photoshop/landpa.html?gclid=Cj0KCQiA5fetBhC9ARIsAP1UMgFooniJhpTfamlHSsScoTFh4P_Ff-fez1t3_0iGv71KCLgdIf_B1XQaAnphEALw_wcB&sdid=GVTYXXRQ&mv=search&mv2=paidsearch&ef_id=Cj0KCQiA5fetBhC9ARIsAP1UMgFooniJhpTfamlHSsScoTFh4P_Ff-fez1t3_0iGv71KCLgdIf_B1XQaAnphEALw_wcB:G:s&s_kwcid=AL!3085!3!530838177814!e!!g!!photoshop!184174244!12788386724&gad_source=1" 
                  target="_blank" rel="noopener noreferrer"
                  >
                    Photoshop
                  </a>
                </span> and 
                <span class="font-bold">
                  <a href="https://www.adobe.com/th_en/products/illustrator/campaign/pricing.html?gclid=Cj0KCQiA5fetBhC9ARIsAP1UMgF7IW5uVvONTPcNpQ9AR4ycHZDoVjm0R_Ddlkquh1jGtUoHJ4-FzjgaAuSdEALw_wcB&sdid=QQ42P3HM&mv=search&mv2=paidsearch&ef_id=Cj0KCQiA5fetBhC9ARIsAP1UMgF7IW5uVvONTPcNpQ9AR4ycHZDoVjm0R_Ddlkquh1jGtUoHJ4-FzjgaAuSdEALw_wcB:G:s&s_kwcid=AL!3085!3!416136595082!e!!g!!illustrator!183951644!12769590284&gad_source=1" 
                  target="_blank" rel="noopener noreferrer"
                  >
                    Illustrator.
                  </a>
                </span>
              </li>
              <li class="list-disc ml-4">
                Connect to lan system, Setup wi-fi signal, 
                Setup wi-fi signal booster
              </li>
              <li class="list-disc ml-4">
                Fix problems with the computer, Repair Notebook, 
                PC, mobile phone, printer, coffee maker
              </li>
            </ul>
          </p>
      </div>
        
      <div >
        <div class="flex flex-1 justify-start ">
          <h1 class="text-md md:text-2xl font-bold sm:min-sm:text-lg">
            Persernal details
          </h1>
          <IconPersernal class="w-10 ml-2 hidden xl:block "/>
        </div>
        <br />
        <p class="text-sm mb-2">Date of birth</p>
        <p class="text-sm">May 6, 1995</p>
        <div class="divider"></div>
        <div>
          <div class="flex flex-1">
            <h1 class="text-md md:text-2xl font-bold sm:min-sm:text-lg">
              Activity
            </h1>
            <IconActivity class="w-10 ml-2 hidden lg:block"></IconActivity>
          </div>
          <p class="text-sm my-2 overflow-x-auto">
            You can view my activities/showcase my work at.
          </p>
          <ul class="flex flex-1 flex-col">
            <li class="btn my-2">
              <a href="https://e-commerce-project-test-01.web.app/?fbclid=IwAR1rfiPs1J3WcUOb3laLAkuSHOj2N4wUc5nBgXel6_1tt0D0cdaGlo6lEGM"
              target="_blank" rel="noopener noreferrer"
              >
              WEB E-commerce 
              </a>
            </li>
            <li class="btn my-2">
              <a href="https://codepen.io/BaRon-Qube"
              target="_blank" rel="noopener noreferrer"
              >
              CodePen
              </a>
            </li>
            <li class="btn my-2">
              <a href="https://cssbattle.dev/player/lwWE4eMhEfcH9iY0J5mcVAJo6y63"
              target="_blank" rel="noopener noreferrer"
              >
              CSS Battle
              </a>
            </li>
            <li class="btn my-2">
              <a href="https://www.borntodev.com/devlab/certificate_online/de3efdad8f71fc986e7613eb4e7eb564"
              target="_blank" rel="noopener noreferrer"
              >
              Devlab
              </a>
            </li>
            <li class="btn my-2">
              <a href="https://github.com/paphonthanai"
              target="_blank" rel="noopener noreferrer"
              >
              Github
              </a>
            </li>
          </ul>
          <div class="divider"></div>
          <div class="flex flex-1 flex-col">
            <h1 class="text-md md:text-2xl font-bold sm:min-sm:text-lg">
              Language
            </h1>
            <div class="collapse bg-base-200 mt-2">
              <input type="checkbox" /> 
                <div class="collapse-title text-md font-bold">
                  English
                  <div class="mt-2">
                    <input type="range" min="0" max="100" value="70" class="range range-warning" />
                  </div>
                  <p class="text-sm">Click to see Detail</p>
                </div>
                <div class="collapse-content w-full mx-0"> 
                  <ul class="flex flex-col">
                    <li class="flex">
                      <div class="collapse">
                        <input class="flex w-full" type="checkbox" /> 
                        <div class="collapse-title flex w-full p-0 text-sm justify-between">
                          <p class="text-md pl-2 font-black">Listen</p>
                          <p class="text-md pl-2 font-black">30%</p>
                        </div>
                        <div class="collapse-content"> 
                          <p class="text-sm">I don't understand or translate if you speak too quickly.</p>
                        </div>
                      </div>
                    </li>
                    <li class="flex">
                      <div class="collapse">
                        <input class="flex w-full" type="checkbox" /> 
                        <div class="collapse-title flex w-full p-0 text-sm justify-between">
                          <p class="text-md pl-2 font-black">Speak</p>
                          <p class="text-md pl-2 font-black">97%</p>
                        </div>
                        <div class="collapse-content"> 
                          <p class="text-sm">I can talk to you so you can understand.</p>
                        </div>
                      </div>
                    </li>
                    <li class="flex">
                      <div class="collapse">
                        <input class="flex w-full" type="checkbox" /> 
                        <div class="collapse-title flex w-full p-0 text-sm justify-between">
                          <p class="text-md pl-2 font-black">Read</p>
                          <p class="text-md pl-2 font-black">80%</p>
                        </div>
                        <div class="collapse-content"> 
                          <p class="text-sm">I can read a continuous passage or sentence and understand it.</p>
                        </div>
                      </div>
                    </li>
                    <li class="flex">
                      <div class="collapse">
                        <input class="flex w-full" type="checkbox" /> 
                        <div class="collapse-title flex w-full p-0 text-sm justify-between">
                          <p class="text-md pl-2 font-black">Write</p>
                          <p class="text-md pl-2 font-black">60%</p>
                        </div>
                        <div class="collapse-content"> 
                          <p class="text-sm">I can write long sentences, but I often misspell words.</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
            <div class="collapse bg-base-200 mt-2">
              <input type="checkbox" /> 
                <div class="collapse-title text-md font-bold">
                  Thai
                  <div class="mt-2">
                    <input type="range" min="0" max="100" value="100" class="range range-warning" />
                  </div>
                </div>
                <div class="collapse-content w-full mx-0"> 
                  <ul class="flex flex-col text-sm">
                    <li class="flex justify-between">
                      <p class="text-md pl-2 font-black">ฟัง</p>
                      <p class="text-md pl-2 font-black">100%</p>
                    </li>
                    <li class="flex justify-between my-1">
                      <p class="text-md pl-2 font-black">พูด</p>
                      <p class="text-md pl-2 font-black">100%</p>
                    </li>
                    <li class="flex justify-between">
                      <p class="text-md pl-2 font-black">อ่าน</p>
                      <p class="text-md pl-2 font-black">100%</p>
                    </li>
                    <li class="flex justify-between my-1">
                      <p class="text-md pl-2 font-black">เขียน</p>
                      <p class="text-md pl-2 font-black">100%</p>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>
  </UserLayout>

</template>

<style scoped>

.name{
    font-family: 'Outfit', sans-serif;
}
.name-th {
    font-family: 'Noto Sans Thai', sans-serif;
}


</style>
