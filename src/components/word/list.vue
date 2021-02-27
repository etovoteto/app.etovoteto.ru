<template lang="pug">
.list
  transition-group(name="list") 
    word-card(
      v-for="(word, key) in sorted.list",
      :key="word.timestamp",
      :record="word"
    )
    .text-2xl.p-8.bg-warm-gray-300(
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

<style lang="stylus" scoped></style>