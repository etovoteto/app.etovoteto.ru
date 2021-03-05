<template lang="pug">
.flex.flex-col
  list-room(:pub="pub")
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});
</script>

<style lang="stylus" scoped></style>