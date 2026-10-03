<script setup>
import { t } from '../i18n'
</script>

<template>
  <!-- علامة المركز بأسلوب لافتة النيون الزرقاء في الاستقبال (DPTC) -->
  <span class="wordmark">
    <svg viewBox="0 0 64 40" aria-hidden="true"><path d="M2 22h12l5-12 8 24 6-18 4 6h25" /></svg>
    <span class="wm-txt">
      <b>DPTC</b>
      <small>{{ t.brand }} {{ t.brandSub }}</small>
    </span>
  </span>
</template>
