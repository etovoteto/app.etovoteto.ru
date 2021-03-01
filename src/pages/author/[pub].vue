<template lang="pug">
author-page(:pub="pub", :key="pub")
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});
</script>

<style lang="stylus" scoped>
.page
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em
</style>