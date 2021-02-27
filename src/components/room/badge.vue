<template lang="pug">
router-link.p-4.m-2(
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

<style lang="stylus" scoped></style>