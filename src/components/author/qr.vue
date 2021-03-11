<template lang="pug">
.flex.flex-col.items-center.justify-center
  author-badge(:pub="pub", size="small")
  util-qr.w-full(:data="pair")
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  pair: String,
});

const pub = computed(() => {
  return JSON.parse(props.pair).pub;
});
</script>

<style lang="stylus" scoped></style>