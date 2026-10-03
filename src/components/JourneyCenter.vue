<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { t } from '../i18n'
import { img } from '../site'

const shots = ['rehab-hall', 'gym', 'manual-therapy', 'treatment-room', 'reception', 'building']
const open = ref(null)
const onKey = (e) => { if (e.key === 'Escape') open.value = null }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section class="section journey" id="journey">
    <div class="container">
      <div class="head light" v-reveal>
        <p class="kicker">{{ t.journey.kicker }}</p>
        <h2>{{ t.journey.title }}</h2>
      </div>
      <ol class="steps">
        <li v-for="(s, i) in t.journey.steps" :key="s.t" v-reveal :style="{ transitionDelay: i * 0.08 + 's' }">
          <span class="n">0{{ i + 1 }}</span>
          <h3>{{ s.t }}</h3>
          <p>{{ s.d }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section center" id="center">
    <div class="container">
      <div class="center-head" v-reveal>
        <div>
          <p class="kicker">{{ t.center.kicker }}</p>
          <h2>{{ t.center.title }}</h2>
        </div>
        <p class="sub">{{ t.center.p }}</p>
      </div>
      <div class="bento">
        <button v-for="(s, i) in shots" :key="s" type="button" class="tile" :class="'b' + i" @click="open = s" v-reveal>
          <img :src="img(s + '.jpg')" alt="" loading="lazy" />
          <span>{{ t.center.labels[s] }}</span>
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="open" class="lightbox" role="dialog" aria-modal="true" @click.self="open = null">
        <button type="button" class="lb-x" :aria-label="t.close" @click="open = null">✕</button>
        <img :src="img(open + '.jpg')" alt="" />
      </div>
    </Transition>
  </section>
</template>
