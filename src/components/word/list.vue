<template lang="pug">
.list
  transition-group(name="list") 
    word-card(
      v-for="(word, key) in sorted.list",
      :key="word.timestamp",
      :record="word"
    ) 
      button.link(
        v-if="!isLinking(word)",
        @click="link(word, () => { $router.push('/def'); })"
      )
        i.iconify(data-icon="la:link")
    .more(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { link, isLinking } from "store@link";
import { useHashList } from "use@hashList";
import { newWord } from "store@word";
import { watchEffect } from "vue";
const { sorted, options, more } = useHashList("word");
watchEffect(() => {
  options.search = newWord.word;
});
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em
</style>