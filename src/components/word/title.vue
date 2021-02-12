<template lang="pug">
span(v-if="word", v-html="stressed")
</template>

<script setup>
import { computed, defineProps, ref } from "vue";

const props = defineProps({
  word: String,
  stress: Number,
});

const stressed = computed(() => {
  let { word, stress } = props;
  let str = word.slice(0, stress + 1) + "&#x301;" + word.slice(stress + 1);
  return str;
});

const stresseded = ref(props.word + "&#x301;");
</script>

<style lang="stylus" scoped></style>