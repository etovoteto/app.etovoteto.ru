<template lang="pug">
.list 
  .card(v-for="(word, key) in wordList", :key="word.timestamp") 
    h2(:title="word.timestamp")
      word-title(:word="word.word", :stress="word.stress")
</template>

<script setup>
import { wordList } from "use@words";
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em

.card
  padding: 0.5em 1rem
</style>