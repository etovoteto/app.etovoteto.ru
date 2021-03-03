<template lang="pug">
input.p-6.text-center.text-lg(
  v-model="search",
  ref="input",
  placeholder="Имя автора"
)
</template>

<script setup>
import { onStartTyping } from "@vueuse/core";
import { search } from "model@author";
import { ref } from "vue";

const input = ref(null);

onStartTyping(() => {
  if (!input.value.active) input.value.focus();
});
</script>

<style lang="stylus" scoped></style>