<template lang="pug">
.card 
  .word(:title="record.timestamp")
    span(v-if="record", v-html="renderWord(record.word, record.stress)")
  user-avatar(
    v-for="(is, author) in record.authors",
    :key="author",
    :pub="author",
    size="nano"
  )
  slot
</template>

<script setup>
import { defineProps } from "vue";
import { renderWord } from "store@word";

const props = defineProps({
  record: Object,
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