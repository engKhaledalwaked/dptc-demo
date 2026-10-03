<script setup>
import { t } from './i18n'
import { site, wa } from './site'
import NavHero from './components/NavHero.vue'
import BodyMap from './components/BodyMap.vue'
import JourneyCenter from './components/JourneyCenter.vue'
import BookVisit from './components/BookVisit.vue'
import Wordmark from './components/Wordmark.vue'
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>
  <NavHero />
  <main>
    <BodyMap />
    <JourneyCenter />
    <BookVisit />
  </main>
  <footer class="footer">
    <div class="container foot">
      <Wordmark />
      <a :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a :href="wa(t.book.msg.hello)" target="_blank" rel="noopener" class="main">{{ t.sticky.book }}</a>
  </div>
</template>
