<template lang="pug">
.qr(v-html="src")
</template>

<script setup>
import qrcode from "@qrcode/svg";
import { computed, defineProps } from "vue";

const props = defineProps({
  data: String,
});

const src = computed(() => {
  if (!props.data) return;
  return qrcode(props.data, {
    margin: 4,
  });
});
</script>

<style lang="stylus" scoped>
.qr
  flex: 1 1 100px
  min-width: 100px
</style>