<template lang="pug">
router-link.flex.items-center.font-normal.pr-2.rounded-full.bg-warm-gray-200(
  :to="`/author/${pub}`"
)
  author-avatar(:pub="pub", size="small")
  .flex.flex-wrap
    .font-bold.mr-2(v-if="profile.name") {{ profile.name }}
    .font-normal.mr-2(v-if="profile.full") {{ profile.full }}
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";

const props = defineProps({
  pub: String,
});

const profile = reactive({
  name: "",
  full: "",
});

gun
  .get(`~${props.pub}`)
  .get("profile")
  .get("name")
  .once((d) => (profile.name = d))
  .back()
  .get("full")
  .once((d) => (profile.full = d));
</script>

<style lang="stylus" scoped></style>