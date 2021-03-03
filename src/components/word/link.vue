<template lang="pug">
.row.pt-2.flex.items-center(v-if="record.data")
  router-link.text-xl.font-bold(
    :to="`/word/${safeHash(record.hash)}`",
    v-if="record",
    v-html="renderWord(record.data.word, record.data.stress)"
  )
  author-avatar(:pub="linker", size="nano") 
  .spacer
  author-avatar(
    v-for="(is, author) in record.authors",
    :key="author",
    :pub="author",
    size="nano"
  )
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashedPersonal } from "store@item";
import { renderWord } from "model@word";
import { safeHash } from "store@db";
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