<template lang="pug">
router-link.flex.items-center.font-normal.pr-2.rounded-full.bg-warm-gray-200(
  :to="`/author/${pub}`"
)
  author-avatar(:pub="pub", size="small")
  span {{ name }}
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  pub: String,
});

const name = ref("");

gun
  .get(`~${props.pub}`)
  .get("profile")
  .get("name")
  .once((d) => (name.value = d));
</script>

<style lang="stylus" scoped></style>