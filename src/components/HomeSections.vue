<script setup>
import { computed, inject } from 'vue'
import { vReveal } from '../utils/reveal'
import SectionHeading from './SectionHeading.vue'
import { selectedPackage } from '../utils/inquiryState'

const props = defineProps({ part: { type: String, default: 'process' } }) // 'process' or 'packages'
const lang = inject('lang')

// Copy is derived from the real work shown in the Skills section and the
// "client brief → flowchart → spec → dev plan" process already described
// there. No prices are listed: packages describe scope, pricing is quoted.
const content = {
  th: {
    processKicker: 'Process',
    processTitle: 'ขั้นตอนการทำงาน',
    processAccent: 'การทำงาน',
    processIntro: 'ทำงานเป็นลำดับชัดเจน ลูกค้าเห็นภาพทุกขั้นก่อนลงมือพัฒนา',
    steps: [
      { title: 'คุยโจทย์', desc: 'ทำความเข้าใจปัญหา เป้าหมาย และกระบวนการทำงานจริงขององค์กร' },
      { title: 'วางแผนผังงาน', desc: 'สรุปเป็น flowchart และสเปกส่วนประกอบ ให้ผู้บริหารเข้าใจและอนุมัติได้' },
      { title: 'พัฒนา', desc: 'ลงมือพัฒนาตามแผน แบ่งเป็นช่วงเพื่อให้ตรวจงานได้ต่อเนื่อง' },
      { title: 'ทดสอบและส่งมอบ', desc: 'ทดสอบการใช้งานจริง ปรับแก้ แล้วส่งมอบระบบพร้อมใช้งาน' },
      { title: 'ดูแลต่อเนื่อง', desc: 'ดูแล แก้ไข และต่อยอดระบบให้เติบโตไปพร้อมธุรกิจ' },
    ],
    stepLabel: 'ขั้นที่',
    packagesKicker: 'Packages',
    packagesTitle: 'แพ็กเกจการทำงาน',
    packagesAccent: 'แพ็กเกจ',
    packagesIntro: 'ราคาขึ้นกับขอบเขตงานจริง บอกโจทย์มาแล้วจะประเมินและส่งใบเสนอราคาให้',
    packages: [
      { id: 'starter', name: 'เริ่มต้น', tag: 'Starter', for: 'ธุรกิจที่ต้องการหน้าเว็บหรือปรับปรุงเว็บเดิม', items: ['Landing page / เว็บบริษัท', 'แก้ไข ปรับปรุง เว็บที่มีอยู่', 'ฟอร์มติดต่อและ SEO พื้นฐาน'] },
      { id: 'pro', name: 'ประยุกต์', tag: 'Professional', featured: true, for: 'ระบบเว็บหรือแอปที่ใช้งานจริงในธุรกิจ', items: ['ระบบเว็บ / แอปมือถือตามโจทย์', 'ระบบล็อกอินและสิทธิ์ผู้ใช้', 'แดชบอร์ดและฐานข้อมูล', 'ฝึกสอนการใช้งานทีมงาน'] },
      { id: 'enterprise', name: 'องค์กร', tag: 'Enterprise', for: 'หน่วยงานหรือองค์กรที่ต้องการระบบเต็มรูปแบบ', items: ['ระบบหลายบทบาท หลายแพลตฟอร์ม', 'เชื่อมต่อ API และระบบภายนอก', 'ออกแบบความปลอดภัยและ CI/CD', 'ที่ปรึกษาและดูแลต่อเนื่อง'] },
    ],
    quote: 'ขอใบเสนอราคา',
    popular: 'ยอดนิยม',
  },
  en: {
    processKicker: 'Process',
    processTitle: 'How it works',
    processAccent: 'works',
    processIntro: 'A clear sequence, so you see the plan at every step before development starts.',
    steps: [
      { title: 'Understand the brief', desc: 'Learn the problem, the goal and how your organization actually works.' },
      { title: 'Plan the flow', desc: 'Summarize it as a flowchart and component spec your board can understand and approve.' },
      { title: 'Build', desc: 'Develop against the plan in stages so work can be reviewed continuously.' },
      { title: 'Test & deliver', desc: 'Test in real use, refine, then hand over a system that is ready to run.' },
      { title: 'Support', desc: 'Maintain, fix and extend the system as your business grows.' },
    ],
    stepLabel: 'Step',
    packagesKicker: 'Packages',
    packagesTitle: 'Ways to work together',
    packagesAccent: 'together',
    packagesIntro: 'Pricing depends on the real scope. Tell me what you need and I will estimate and send a quotation.',
    packages: [
      { id: 'starter', name: 'Starter', tag: 'Starter', for: 'Businesses that need a web presence or a refresh', items: ['Landing page / company site', 'Fixes and upgrades to an existing site', 'Contact form and basic SEO'] },
      { id: 'pro', name: 'Professional', tag: 'Professional', featured: true, for: 'Web or mobile systems used in real operations', items: ['Custom web system / mobile app', 'Sign-in and user permissions', 'Dashboards and database', 'Team onboarding'] },
      { id: 'enterprise', name: 'Enterprise', tag: 'Enterprise', for: 'Organizations that need a full system', items: ['Multi-role, multi-platform systems', 'API and third-party integration', 'Security design and CI/CD', 'Consulting and ongoing support'] },
    ],
    quote: 'Request a quote',
    popular: 'Popular',
  },
}

const t = computed(() => content[lang.value])


function choosePackage(id) {
  selectedPackage.value = id
}
</script>

<template>
  <!-- Process: numbered cards in a row, big outlined numerals -->
  <section v-if="props.part === 'process'" id="process" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :kicker="t.processKicker" :title="t.processTitle" :accent="t.processAccent" :intro="t.processIntro" />

      <ol class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="(step, i) in t.steps" :key="i" v-reveal="i" class="card-studio flex flex-col p-6 hover:-translate-y-1">
          <span class="step-num text-6xl font-black leading-none" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <p class="mt-6 text-[11px] uppercase tracking-widest text-base-content/40">{{ t.stepLabel }} {{ i + 1 }}</p>
          <h3 class="mt-1 text-lg font-semibold text-white">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-base-content/60">{{ step.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- Packages -->
  <section v-if="props.part === 'packages'" id="packages" class="bg-base-100 px-6 py-24 md:px-10">
    <div class="mx-auto max-w-6xl">
      <SectionHeading :kicker="t.packagesKicker" :title="t.packagesTitle" :accent="t.packagesAccent" :intro="t.packagesIntro" />

      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <article
          v-for="(p, i) in t.packages"
          :key="p.id"
          v-reveal="i"
          class="relative flex flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1"
          :class="p.featured ? 'featured-card' : 'card-studio'"
        >
          <span
            v-if="p.featured"
            class="absolute right-6 top-6 rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-black"
          >
            {{ t.popular }}
          </span>
          <p class="text-xs uppercase tracking-[0.2em] text-base-content/45">{{ p.tag }}</p>
          <h3 class="mt-2 text-3xl font-bold text-white">{{ p.name }}</h3>
          <p class="mt-2 text-sm text-base-content/60">{{ p.for }}</p>
          <ul class="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6 text-sm text-base-content/80">
            <li v-for="item in p.items" :key="item" class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mt-0.5 h-4 w-4 shrink-0 text-primary">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </li>
          </ul>
          <a
            href="#inquiry"
            @click="choosePackage(p.id)"
            class="mt-8"
            :class="p.featured ? 'btn-glow' : 'inline-flex justify-center rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-white/40'"
          >
            {{ t.quote }} →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-num {
  color: transparent;
  -webkit-text-stroke: 1px rgba(215, 226, 234, 0.35);
}
.featured-card {
  border: 1px solid transparent;
  background:
    linear-gradient(#151515, #151515) padding-box,
    linear-gradient(135deg, #d0b2ff, #b600a8 45%, #e8400d) border-box;
  box-shadow: 0 20px 60px -30px rgba(182, 0, 168, 0.7);
}
</style>
