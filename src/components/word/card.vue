<template lang="pug">
.card
  h1 {{ word }}
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  word: String,
});
</script>

<style lang="stylus" scoped></style>