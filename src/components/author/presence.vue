<template lang="pug">
span.text-sm.font-normal.p-1(v-if="presence")
  span.text-green-600(v-if="difference < 5000") онлайн
  span(v-else) {{ difference }}
</template>

<script setup>
import { computed, defineProps } from "vue";
import { getState } from "store@db";

const props = defineProps({
  presence: Number,
});

let timer;

const difference = computed(() => {
  clearTimeout(timer);
  let dif = getState() - props.presence;
  timer = setTimeout(() => {
    dif = getState() - props.presence;
  }, 10000);
  return dif;
});

const date = computed(() => {
  let d = new Date(props.presence);
  return d.toISOString();
});
</script>

<style lang="stylus" scoped></style>