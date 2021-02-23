<template lang="pug">
form(@submit.prevent.stop)
  button.action(@click="generate()") 
    i.iconify(data-icon="la:plus")
    .text Включиться
  button.action(@click="logIn()") 
    i.iconify(data-icon="la:key")
    .text Войти
</template>

<script setup>
import { generate, logIn } from "model@author";
</script>

<style lang="stylus" scoped>
form
  display: flex
  flex-flow: column

.action
  padding: 1em
  margin: 0.5em 0
  align-items: center
  font-size: 1rem
  display: flex
</style>