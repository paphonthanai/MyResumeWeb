<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import UserLayout from '../layout/UserLayout.vue'
import WebsiteBuilder from '../components/WebsiteBuilder.vue'
import InquiryForm from '../components/InquiryForm.vue'
import { content } from '../content/websiteBuilder'

const siteUrl = 'https://myresume-ae906.web.app'
const route = useRoute()
// JSON-LD follows the URL's language (what gets prerendered for crawlers).
const c = content[route.meta.lang === 'en' ? 'en' : 'th']

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'PNJ Created Website',
        serviceType: 'Website builder',
        description: route.meta.description,
        url: siteUrl + route.path,
        areaServed: 'TH',
        provider: { '@type': 'Organization', name: 'PNJ Tech', url: siteUrl },
        offers: c.plans.map((p) => ({
          '@type': 'Offer',
          name: p.name,
          price: p.price.replace(/,/g, ''),
          priceCurrency: 'THB',
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    },
  ],
})
</script>

<template>
  <UserLayout>
    <main>
      <WebsiteBuilder />
      <InquiryForm
        :heading="{ th: content.th.form, en: content.en.form }"
        :packages="{ th: content.th.formPackages, en: content.en.formPackages }"
      />
    </main>
  </UserLayout>
</template>
