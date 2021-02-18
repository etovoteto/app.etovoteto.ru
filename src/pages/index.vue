<template lang="pug">
main
  form(@submit.prevent.stop)
    input(v-model="record.word")
    span.generate(@click="generate()")
      i.iconify(data-icon="teenyicons:refresh-alt-solid")

  .new-word(v-if="record.word")
    .letter(
      @click="setStress(i)",
      v-for="(letter, i) in capitalFirst(record.word).slice('')",
      :class="{ vowel: vowels.includes(letter), active: i == record.stress }"
    ) {{ letter }}
      .stress ´
    .buttons
      button(@click="addWord()") 
        i.iconify(data-icon="la:plus")

  .list
    transition-group(name="list") 
      word-card(
        v-for="(word, key) in sorted.list",
        :key="word.timestamp",
        :word="word"
      ) 
        button.link(
          v-if="!isLinking(word)",
          @click="link(word, () => { $router.push('/sense'); })"
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
import {
  record,
  generate,
  addWord,
  setStress,
  vowels,
  capitalFirst,
} from "store@word";
import { watchEffect } from "vue";

import { linking, link, isLinking } from "store@link";
import { useHashList } from "use@hashList";
const { sorted, options, more } = useHashList("word");

watchEffect(() => {
  options.search = record.word;
});
</script>

<style lang="stylus" scoped>
form
  position: relative

input
  font-size: 2rem
  text-align: center

.generate
  font-size: 1.6rem
  cursor: pointer
  position: absolute
  right: 2rem
  top: 2.15rem

.new-word
  display: flex
  font-size: 3em
  justify-content: center
  user-select: none
  align-items: center

  .letter
    margin: 2px
    padding: 4px
    opacity: 0.8
    cursor: default
    position: relative

  .stress
    position: absolute
    top: 0
    opacity: 0
    transition: all 300ms ease-in-out

  .active
    opacity: 1

    .stress
      opacity: 1

  .vowel
    cursor: pointer
    opacity: 0.9
    text-decoration: underline

    &:hover
      opacity: 1

.list
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em
</style>