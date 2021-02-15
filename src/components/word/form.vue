<template lang="pug">
.form
  input(v-model="newWord.word")
  span.generate(@click="generate()")
    i.iconify(data-icon="teenyicons:refresh-alt-solid")
</template>

<script setup>
import { newWord, addWord, generate, setStress, vowels } from "store@word";
</script>

<style lang="stylus" scoped>
.form
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
</style>