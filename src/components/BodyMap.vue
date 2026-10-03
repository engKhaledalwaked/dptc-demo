<script setup>
import { ref, computed, watch } from 'vue'
import { t, chosen } from '../i18n'
import { outline, front, back } from '../bodyPaths'

// لكل منطقة: العضلات التي تُظلَّل في كل منظر + موضع نقطة الألم (بإحداثيات المجسّم)
// المنظر الأمامي: يسار الصورة = يمين المريض، والخلفي عكسه — النقاط على نفس جهة الجسم في المنظرين
const parts = {
  neck: { home: 'back', front: { slugs: ['neck'], at: [364, 288] }, back: { slugs: ['neck'], at: [1084, 262] } },
  shoulder: { home: 'front', front: { slugs: ['deltoids'], at: [236, 345] }, back: { slugs: ['deltoids'], at: [1219, 352] } },
  elbow: { home: 'front', front: { slugs: ['forearm', 'hands'], at: [532, 505] }, back: { slugs: ['forearm', 'hands'], at: [912, 530] } },
  back: { home: 'back', back: { slugs: ['lower-back'], at: [1084, 580] } },
  hip: { home: 'back', back: { slugs: ['gluteal'], at: [1028, 690] } },
  knee: { home: 'front', front: { slugs: ['knees'], at: [296, 1004] } },
  ankle: { home: 'front', front: { slugs: ['ankles', 'feet'], at: [440, 1250] }, back: { slugs: ['ankles', 'feet'], at: [1006, 1292] } },
}
const ids = Object.keys(parts)
const figures = { front, back }
const boxes = { front: '30 110 670 1260', back: '746 110 670 1260' }

const sel = computed(() => (parts[chosen.value] ? chosen.value : 'back'))
const part = computed(() => t.value.areas.parts[sel.value])
const view = ref(parts[sel.value].home)
// إذا اختيرت منطقة لا تظهر في المنظر الحالي ننتقل لمنظرها
watch(sel, (id) => { if (!parts[id][view.value]) view.value = parts[id].home })

const owner = computed(() => {
  const m = {}
  for (const id of ids) parts[id][view.value]?.slugs.forEach((s) => { m[s] = id })
  return m
})
const regions = computed(() => figures[view.value].map((r) => ({ slug: r.slug, part: owner.value[r.slug], d: [...r.common, ...r.left, ...r.right] })))
const spots = computed(() => ids.filter((id) => parts[id][view.value]).map((id) => ({ id, at: parts[id][view.value].at })))

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
          <div class="views" role="group">
            <button v-for="v in ['front', 'back']" :key="v" type="button" :class="{ on: view === v }" :aria-pressed="view === v" @click="view = v">{{ t.areas.views[v] }}</button>
          </div>
          <Transition name="swap" mode="out-in">
            <svg :key="view" :viewBox="boxes[view]" role="img" :aria-label="t.areas.pick">
              <path class="silhouette" :d="outline[view]" />
              <g v-for="r in regions" :key="r.slug" class="region" :class="{ hit: r.part, on: r.part === sel }" @click="r.part && (chosen = r.part)">
                <path v-for="(d, i) in r.d" :key="i" :d="d" />
              </g>
              <g v-for="s in spots" :key="s.id" class="spot" :class="{ on: sel === s.id }" tabindex="0" role="button" :aria-label="t.areas.parts[s.id].t" @click="chosen = s.id" @keydown.enter="chosen = s.id">
                <circle :cx="s.at[0]" :cy="s.at[1]" r="44" class="halo" />
                <circle :cx="s.at[0]" :cy="s.at[1]" r="17" class="core" />
              </g>
            </svg>
          </Transition>
        </div>
        <div class="part-card">
          <div class="chips">
            <button v-for="id in ids" :key="id" type="button" :class="{ on: sel === id }" @click="chosen = id">{{ t.areas.parts[id].t }}</button>
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
