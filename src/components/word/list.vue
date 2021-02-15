<template lang="pug">
.list 
  .card(v-for="(word, key) in list", :key="word.timestamp") 
    user-avatar(
      v-for="(is, author) in word.authors",
      :key="author",
      :pub="author",
      size="small"
    )
    h2(:title="word.timestamp")
      word-title(:word="word.word", :stress="word.stress")
</template>

<script setup>
import { useWords } from "use@words";

const { list } = useWords();
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em

.card
  padding: 0.5em 1rem
  display: flex
  align-items: center
</style>