<template lang="pug">
article
  .form
    textarea(:cols="24", :rows="4", v-model="record.text")
    .generate(@click="generate()")
      i.iconify(data-icon="teenyicons:refresh-alt-solid")
  .parts
    button.part(
      v-for="(part, key) in parts",
      :key="key",
      @click="record.part = key",
      :class="{ active: record.part == key }"
    ) {{ part }}
    button.add(@click="addSense()")
      i.iconify(data-icon="la:plus")
  senses-list
</template>

<script setup>
import { record, parts, addSense, generate } from "store@sense";
</script>

<style lang="stylus" scoped>
article
  padding: 2em
  display: flex
  flex-flow: column
  align-items: stretch

.form
  position: relative
  display: flex

textarea
  font-size: 1.2rem
  text-align: left

.generate
  position: absolute
  top: 1.4rem
  right: 1.5rem
  font-size: 1.2rem

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