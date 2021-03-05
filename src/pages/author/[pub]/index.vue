<template lang="pug">
.flex.flex-col 
  .flex {{ profile.bio }}
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