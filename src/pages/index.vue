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
      .card(v-for="(word, key) in sorted.list", :key="word.timestamp") 
        .word(:title="word.timestamp")
          span(v-if="word", v-html="getWord(word.word, word.stress)")
        user-avatar(
          v-for="(is, author) in word.authors",
          :key="author",
          :pub="author",
          size="small"
        )
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
  getWord,
  generate,
  addWord,
  setStress,
  vowels,
  capitalFirst,
} from "store@word";
import { watchEffect } from "vue";
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