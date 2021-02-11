<template lang="pug">
main
  header 
    h1 Словарь
    .spacer
    .user USER
  article
    .card
      h1 {{ newWord }}
</template>

<script setup >
import { ref } from "vue";
import { generateWords } from "../use/randomWords";

const newWord = ref(generateWords());
</script>

<style lang="stylus" scoped>
header
  display: flex
  align-items: center

article
  display: flex
  justify-content: center
</style>