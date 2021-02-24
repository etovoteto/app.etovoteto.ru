<template lang="pug">
router-link.badge(
  :to="'/room/' + pub",
  :style="{ background: pubGradient(pub, 90) }"
) {{ title || pub }}
  slot
</template>

<script setup>
import { defineProps, ref } from "vue";
import { gun } from "store@db";
import { pubGradient } from "use@colors";

const props = defineProps({
  pub: String,
});

const title = ref("");

const roomDb = gun.get(`~${props.pub}`);
roomDb.get("title").on((d, k) => {
  title.value = d;
});
</script>

<style lang="stylus" scoped>
.badge
  padding: 0.5em
  margin: 2px
</style>