<template lang="pug">
form(@submit.prevent.stop)
  input(v-model="newWord.word")
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
  font-size: 2rem
  text-align: center

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

  .vowel
    cursor: pointer
    font-weight: bold
    opacity: 0.9
    text-decoration: underline

    &:hover
      opacity: 1
</style>