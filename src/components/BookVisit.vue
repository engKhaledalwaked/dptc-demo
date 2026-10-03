<script setup>
import { reactive, ref, watch } from 'vue'
import { t, chosen, partIds } from '../i18n'
import { site, wa } from '../site'

const f = reactive({ name: '', phone: '', area: '', duration: -1, postop: false, gender: false, note: '' })
watch(chosen, (v) => { if (v) f.area = v })
const err = ref('')
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.book.required; return }
  err.value = ''
  const b = t.value.book, m = b.msg
  const lines = [
    m.hello,
    `${m.name}: ${f.name.trim()}`,
    `${m.phone}: ${f.phone.trim()}`,
    `${m.area}: ${f.area ? t.value.areas.parts[f.area].t : b.areaAny}`,
    f.duration >= 0 ? `${m.duration}: ${b.durations[f.duration]}` : null,
    f.postop ? `• ${m.postop}` : null,
    f.gender ? `• ${m.gender}` : null,
    f.note.trim() ? `${m.note}: ${f.note.trim()}` : null,
  ].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}
</script>

<template>
  <section class="section book" id="book">
    <div class="container book-in">
      <div class="book-copy" v-reveal>
        <p class="kicker">{{ t.book.kicker }}</p>
        <h2>{{ t.book.title }}</h2>
        <p class="sub">{{ t.book.sub }}</p>
        <a class="phone" :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
      </div>
      <form class="form" novalidate @submit.prevent="send" v-reveal>
        <div class="row">
          <label><span>{{ t.book.name }}</span><input v-model="f.name" autocomplete="name" /></label>
          <label><span>{{ t.book.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
        </div>
        <label><span>{{ t.book.area }}</span>
          <select v-model="f.area">
            <option value="">{{ t.book.areaAny }}</option>
            <option v-for="p in partIds" :key="p" :value="p">{{ t.areas.parts[p].t }}</option>
          </select>
        </label>
        <div class="lbl"><span>{{ t.book.duration }}</span>
          <div class="seg"><button v-for="(d, i) in t.book.durations" :key="d" type="button" :class="{ on: f.duration === i }" @click="f.duration = f.duration === i ? -1 : i">{{ d }}</button></div>
        </div>
        <div class="checks">
          <label class="chk"><input type="checkbox" v-model="f.postop" /><span>{{ t.book.postop }}</span></label>
          <label class="chk"><input type="checkbox" v-model="f.gender" /><span>{{ t.book.gender }}</span></label>
        </div>
        <label><span>{{ t.book.note }}</span><textarea v-model="f.note" rows="3"></textarea></label>
        <p v-if="err" class="err" role="alert">{{ err }}</p>
        <button class="btn btn-blue block" type="submit">{{ t.book.send }}</button>
      </form>
    </div>
  </section>

  <section class="section visit" id="visit">
    <div class="container visit-in">
      <div class="visit-card" v-reveal>
        <p class="kicker">{{ t.visit.kicker }}</p>
        <h2>{{ t.visit.title }}</h2>
        <p class="addr">{{ t.visit.addr }}</p>
        <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
        <div class="rate"><b>{{ site.rating }}</b><span>★★★★★</span><small>{{ site.reviews }} · {{ t.visit.rating }}</small></div>
        <div class="ctas">
          <a class="btn btn-blue" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
          <a class="btn btn-outline" :href="`tel:${site.phone.tel}`">{{ t.visit.call }}</a>
        </div>
      </div>
      <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
  </section>
</template>
