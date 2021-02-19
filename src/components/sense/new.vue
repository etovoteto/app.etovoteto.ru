<template lang="pug">
.parts
  button.part(
    v-for="(part, key) in parts",
    :key="key",
    @click="newSense.part = key",
    :class="{ active: newSense.part == key }"
  ) {{ part }}
  button.add(@click="addSense()")
    i.iconify(data-icon="la:plus")
</template>

<script setup>
import { newSense, parts, addSense } from "store@sense";
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