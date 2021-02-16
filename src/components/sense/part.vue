<template lang="pug">
.parts
  .part(
    v-for="part in parts",
    :key="part",
    @click="newSense.part = part",
    :class="{ active: newSense.part == part }"
  ) {{ part }}
</template>

<script setup>
import { newSense, parts } from "store@sense";
</script>

<style lang="stylus" scoped>
.parts
  display: flex
  flex-flow: row wrap

.part
  flex: 1 1 4em
  text-align: center
  transition: all 300ms ease-in-out
  cursor: pointer

  &:hover
    background-color: var(--background-alt)

  &.active
    background-color: var(--top-bar)
</style>