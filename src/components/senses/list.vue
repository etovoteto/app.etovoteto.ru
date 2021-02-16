<template lang="pug">
.list 
  .card(v-for="(sense, key) in list", :key="sense") 
    .content
      .part {{ parts[sense.part] }}.
      .text {{ sense.text }}
    user-avatar(
      v-for="(is, author) in sense.authors",
      :key="author",
      :pub="author",
      size="small"
    )
</template>

<script setup>
import { useHashList } from "use@hashList";
import { parts } from "store@sense";
const { list } = useHashList("sense");
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: flex-start
  padding: 1em

.part
  color: var(--text-light)

.text
  font-size: 1.2em

.card
  padding: 0.5em 1rem
  display: flex
  align-items: center
  padding: 1em
  margin: 1em 0
  background-color: var(--background-alt)
</style>