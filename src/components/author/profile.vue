<template lang="pug">
.flex.flex-col.items-center
  author-avatar(:pub="pub", size="big")
  .text-3xl.font-bold.my-2 {{ profile.name }}
  .text-xl.my-2 {{ profile.real }}
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { useProfile } from "model@author";

const props = defineProps({
  pub: String,
});

const profile = useProfile(props.pub);

import { useTitle } from "@vueuse/core";
const title = useTitle(profile.name);
</script>

<style lang="stylus" scoped></style>