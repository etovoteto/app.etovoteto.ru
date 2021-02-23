<template lang="pug">
.row(v-if="record.data")
  .word
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
import { getHashedPersonal } from "store@list";
import { renderWord } from "model@word";

const props = defineProps({
  linker: String,
  hash: String,
});

const { record } = getHashedPersonal("word", props.hash);
</script>

<style lang="stylus" scoped>
.row
  padding: 1em 0
  margin: 0
  width: 100%
  color: var(--text-light)
  display: flex
  align-items: center
  flex-flow: row

.word
  font-size: 1.4em
  font-weight: bold
</style>