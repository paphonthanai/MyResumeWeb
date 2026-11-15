<script setup>
import UserLayout from '../layout/UserLayout.vue'
import InquiryForm from '../components/InquiryForm.vue'
import IotHero from '../components/iot/IotHero.vue'
import IotWork from '../components/iot/IotWork.vue'

const heading = {
  th: { kicker: 'IoT', title: 'ปรึกษาโปรเจกต์ IoT และหุ่นยนต์', accent: 'IoT และหุ่นยนต์', intro: 'เล่าโจทย์มาได้เลย ตั้งแต่เซนเซอร์ตัวเดียวไปจนถึงแขนกลทั้งชุด จะติดต่อกลับเพื่อคุยรายละเอียด' },
  en: { kicker: 'IoT', title: 'Talk about an IoT or robotics project', accent: 'IoT or robotics', intro: 'Tell me what you need, from a single sensor to a full robot arm, and I will get back to you to talk details.' },
}
</script>

<template>
  <UserLayout bare>
    <IotHero />
    <main>
      <IotWork />
      <InquiryForm :heading="heading" />
    </main>
  </UserLayout>
</template>
