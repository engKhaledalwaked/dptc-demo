<script setup>
import { computed } from 'vue'
import { t, chosen } from '../i18n'

// نقاط الجسم (إحداثيات على مجسّم بسيط 200×420)
const spots = [
  { id: 'neck', x: 100, y: 78 },
  { id: 'shoulder', x: 64, y: 102 },
  { id: 'elbow', x: 40, y: 178 },
  { id: 'back', x: 100, y: 188 },
  { id: 'hip', x: 128, y: 222 },
  { id: 'knee', x: 80, y: 306 },
  { id: 'ankle', x: 120, y: 386 },
]
const sel = computed(() => chosen.value || 'back')
const part = computed(() => t.value.areas.parts[sel.value])
const go = () => { chosen.value = sel.value; document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }
</script>

<template>
  <section class="section areas" id="areas">
    <div class="container areas-in">
      <div class="head" v-reveal>
        <p class="kicker">{{ t.areas.kicker }}</p>
        <h2>{{ t.areas.title }}</h2>
        <p class="sub">{{ t.areas.sub }}</p>
      </div>
      <div class="map-wrap" v-reveal>
        <div class="body">
          <svg viewBox="0 0 200 420" role="img" :aria-label="t.areas.pick">
            <g class="figure">
              <circle cx="100" cy="40" r="26" />
              <path d="M70 76h60c16 0 26 10 28 26l10 86c1 8-10 10-12 2l-12-70-2 96 6 104c1 10 6 60 6 74 0 8-14 8-16 0l-12-104-4-50h-4l-4 50-12 104c-2 8-16 8-16 0 0-14 5-64 6-74l6-104-2-96-12 70c-2 8-13 6-12-2l10-86c2-16 12-26 28-26z" />
            </g>
            <g v-for="s in spots" :key="s.id" class="spot" :class="{ on: sel === s.id }" tabindex="0" role="button" :aria-label="t.areas.parts[s.id].t" @click="chosen = s.id" @keydown.enter="chosen = s.id">
              <circle :cx="s.x" :cy="s.y" r="15" class="halo" />
              <circle :cx="s.x" :cy="s.y" r="7" class="core" />
            </g>
          </svg>
        </div>
        <div class="part-card">
          <div class="chips">
            <button v-for="s in spots" :key="s.id" type="button" :class="{ on: sel === s.id }" @click="chosen = s.id">{{ t.areas.parts[s.id].t }}</button>
          </div>
          <Transition name="swap" mode="out-in">
            <div :key="sel" class="part-body">
              <h3>{{ part.t }}</h3>
              <p>{{ part.d }}</p>
            </div>
          </Transition>
          <button type="button" class="btn btn-blue" @click="go">{{ t.areas.book }}</button>
          <p class="also">{{ t.areas.also }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
