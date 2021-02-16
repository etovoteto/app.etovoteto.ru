<template lang="pug">
.form
  textarea(v-model="newSense.text")
</template>

<script setup>
import { newSense } from "store@sense";
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