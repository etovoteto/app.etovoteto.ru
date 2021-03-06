<template lang="pug">
main
  word-form
  list-tag(tag="word", :search="newWord.word", v-slot="{ record }")
    word-card(:record="record", :key="record.hash")
  .flex.py-4.mt-16
</template>

<script setup>
import { useTitle } from "@vueuse/core";
import { newWord } from "model@word";

const title = useTitle("Слова | ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped></style>