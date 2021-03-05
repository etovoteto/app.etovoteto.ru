<template lang="pug">
.flex.flex-col
  author-rooms(:pub="pub")
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});
</script>

<style lang="stylus" scoped></style>