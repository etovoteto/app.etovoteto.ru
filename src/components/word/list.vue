<template lang="pug">
.list
  transition-group(name="list") 
    word-card(
      v-for="(word, key) in sorted.list",
      :key="word.timestamp",
      :record="word"
    )
    .more(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useList } from "store@list";
import { newWord } from "model@word";
import { watchEffect } from "vue";
const { sorted, options, more } = useList("word");
watchEffect(() => {
  options.search = newWord.word;
});
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: stretch
</style>