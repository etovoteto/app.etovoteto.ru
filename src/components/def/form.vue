<template lang="pug">
.form
  textarea(
    placeholder="Несуществующее понятие минимум из двух слов",
    :rows="3",
    v-model="newDef.def",
    :class="{ valid: isValid }"
  )
  transition(name="fade")
    .parts(v-if="isValid")
      .part(
        v-for="(part, key) in parts",
        :key="key",
        @click="addDef(key)",
        :style="{ textDecorationStyle: part.underline }"
      ) {{ part.name }}.
</template>

<script setup>
import { newDef, isValid, addDef } from "model@def";
import { parts } from "store@locale";
</script>

<style lang="stylus" scoped>
.form
  position: relative
  display: flex
  flex-flow: column
  margin: 1em 0

textarea
  font-size: 1.2rem
  margin: 0
  text-align: left

.valid
  border: solid 1px green

.parts
  display: flex
  flex-flow: row wrap

  .part
    text-decoration: underline
    padding: 1em 0
    margin: 4px
    font-size: 1.5rem
    flex: 1 1 4em
    text-align: center
    transition: all 300ms ease-in-out
    cursor: pointer
    background-color: var(--background-alt)

    &:hover
      background-color: var(--top-bar)
</style>