<template lang="pug">
author-avatar(
  v-for="(is, author) in authors",
  :key="author",
  :pub="author",
  size="nano"
)
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  authors: Object,
});
</script>

<style lang="stylus" scoped></style>