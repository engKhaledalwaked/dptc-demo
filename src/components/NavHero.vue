<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { t, lang, toggleLang } from '../i18n'
import { img, wa } from '../site'
import Wordmark from './Wordmark.vue'

const scrolled = ref(false)
const open = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
const links = ['areas', 'journey', 'center', 'visit']
</script>

<template>
  <header class="nav" :class="{ scrolled, open }">
    <div class="container nav-in">
      <a href="#top" class="brand" @click="open = false"><Wordmark /></a>
      <nav class="links"><a v-for="l in links" :key="l" :href="`#${l}`">{{ t.nav[l] }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a href="#book" class="btn btn-blue btn-sm hide-sm">{{ t.nav.book }}</a>
        <button type="button" class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open"><i></i><i></i></button>
      </div>
    </div>
    <div v-if="open" class="drawer">
      <a v-for="l in links" :key="l" :href="`#${l}`" @click="open = false">{{ t.nav[l] }}</a>
      <a :href="wa(t.book.msg.hello)" target="_blank" rel="noopener" class="btn btn-blue" @click="open = false">{{ t.sticky.book }}</a>
    </div>
  </header>

  <section class="hero" id="top">
    <div class="grid-bg" aria-hidden="true"></div>
    <div class="container hero-in">
      <div class="hero-copy">
        <p class="tag">{{ t.hero.kicker }}</p>
        <h1><span>{{ t.hero.title1 }}</span><span class="glow">{{ t.hero.title2 }}</span></h1>
        <p class="lead">{{ t.hero.lead }}</p>
        <div class="ctas">
          <a class="btn btn-blue" href="#book">{{ t.hero.cta1 }}</a>
          <a class="btn btn-outline" href="#areas">{{ t.hero.cta2 }}</a>
        </div>
        <dl class="stats">
          <div v-for="s in t.hero.stats" :key="s.l"><dt>{{ s.n }}</dt><dd>{{ s.l }}</dd></div>
        </dl>
      </div>
      <div class="hero-media">
        <div class="frame-a"><img :src="img('rehab-hall.jpg')" alt="" fetchpriority="high" /></div>
        <div class="frame-b"><img :src="img('manual-therapy.jpg')" alt="" /></div>
        <svg class="pulse-line" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50h170l18-34 26 58 22-48 14 24h350" /></svg>
      </div>
    </div>
  </section>
</template>
