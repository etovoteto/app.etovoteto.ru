<template lang="pug">
.flex.flex-col.bg-warm-gray-100.p-4 
  .flex.flex-col.max-w-35ch
    .text-base.items-center.px-1.text-sm.border-b.border-warm-gray-800.border-solid.mb-4 Краткая биография
    .text-lg {{ profile.bio }}
</template>

<script setup>
import { defineProps } from "vue";
import { useProfile } from "model@author";
const props = defineProps({
  pub: String,
});

const profile = useProfile(props.pub);
</script>

<style lang="stylus" scoped></style>