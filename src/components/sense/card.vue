<template lang="pug">
.card
  .content 
    .info {{ parts[record.part] }}.
    slot
    .spacer
    user-avatar(
      v-for="(is, author) in record.authors",
      :key="author",
      :pub="author",
      size="nano"
    )
  .text {{ capitalFirst(record.sense) }}
</template>

<script setup>
import { defineProps } from "vue";
import { capitalFirst } from "store@word";
import { parts } from "store@model";

const props = defineProps({
  record: Object,
});
</script>

<style lang="stylus" scoped>
.card
  padding: 0.5em 1rem
  display: flex
  flex-flow: column
  padding: 1em
  margin: 1em 0
  background-color: var(--background-alt)

  .content
    color: var(--text-light)
    display: flex
    align-items: center
    flex-flow: row

  .text
    font-size: 1.2em
</style>