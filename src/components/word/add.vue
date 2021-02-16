<template lang="pug">
.new-word(v-if="record.word")
  .letter(
    @click="setStress(i)",
    v-for="(letter, i) in record.word.slice('')",
    :class="{ vowel: vowels.includes(letter), active: i == record.stress }"
  ) {{ letter }}
    .stress ´ //stress sign
  .buttons
    button(@click="addWord()") 
      i.iconify(data-icon="la:plus")
</template>

<script setup>
import { record, addWord, setStress, vowels } from "store@word";
</script>

<style lang="stylus" scoped>
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
</style>