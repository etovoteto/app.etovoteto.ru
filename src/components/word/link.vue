<template lang="pug">
.row.pt-2.flex.items-center(v-if="record.data")
  .text-xl.font-bold
    span(
      v-if="record",
      v-html="renderWord(record.data.word, record.data.stress)"
    )
  author-avatar(:pub="linker", size="nano") 
  .spacer
  author-dots(:authors="record.authors")
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashedPersonal } from "store@item";
import { renderWord } from "model@word";

const props = defineProps({
  linker: String,
  hash: String,
});

const { record } = getHashedPersonal("word", props.hash);
</script>

<style lang="stylus" scoped>
.word
  font-size: 1.4em
  font-weight: bold
</style>