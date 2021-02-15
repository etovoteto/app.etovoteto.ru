<template lang="pug">
.words
  .word(v-for="word in words", :key="word") {{ word }}
</template>

<script setup>
import { gun } from "store@gun-db";
import { ref } from "vue";
const words = ref({});

gun
  .get("#word")
  .map()
  .on((d, k) => {
    words.value[k] = d;
  });
</script>

<style lang="stylus" scoped></style>