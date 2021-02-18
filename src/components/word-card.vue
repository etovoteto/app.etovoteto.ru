<template lang="pug">
.card 
  .word(:title="word.timestamp")
    span(v-if="word", v-html="renderWord(word.word, word.stress)")
  user-avatar(
    v-for="(is, author) in word.authors",
    :key="author",
    :pub="author",
    size="nano"
  )
  slot
  .senses
    sense-row(
      v-for="(linker, hash) in word.links",
      :key="hash",
      :linker="linker",
      :hash="hash"
    )
</template>

<script setup>
import { defineProps } from "vue";
import { renderWord } from "../store/word";

const props = defineProps({
  word: Object,
});
</script>

<style lang="stylus" scoped>
.card
  padding: 2em
  margin: 1em
  display: flex
  flex-flow: row wrap
  align-items: center
  background-color: var(--background-alt)

.word
  font-size: 2em

.more
  font-size: 2em
  padding: 3em
  background-color: var(--top-bar)
</style>