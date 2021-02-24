<template lang="pug">
form(@submit.prevent.stop)
  input(v-model="newWord.word", placeholder="Несуществующее слово")
  .new-word(v-if="newWord.word")
    .letter(
      @click="addWord(i)",
      v-for="(letter, i) in capitalFirst(newWord.word).slice('')",
      :class="{ vowel: vowels.includes(letter) }"
    ) {{ letter }}
</template>

<script setup>
import { addWord, capitalFirst, newWord, vowels, setStress } from "model@word";
</script>

<style lang="stylus" scoped>
form
  display: flex
  flex-flow: column

input
  font-size: 1.6rem
  text-align: center

.new-word
  display: flex
  flex-flow: row wrap
  font-size: 3em
  justify-content: center
  user-select: none
  align-items: center
  font-weight: bold

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

  .vowel
    cursor: pointer
    opacity: 0.9
    text-decoration: underline

    &:hover
      opacity: 1

      &::before
        content: '´'
        position: absolute
</style>