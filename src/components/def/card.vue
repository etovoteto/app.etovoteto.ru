<template lang="pug">
.card
  .content 
    .info {{ parts[record.part].name }}.
    author-dots(:authors="record.authors")
    .spacer
    link-button(:record="record")
  .text {{ capitalFirst(record.def) }}
  .links(v-if="record != linkFrom")
    transition-group(name="list")
      word-link(
        v-for="(linker, hash) in links",
        :key="hash + linker",
        :linker="linker",
        :hash="hash"
      )
</template>

<script setup>
import { defineProps } from "vue";
import { capitalFirst } from "model@word";

import { useLinks, linkFrom } from "model@link";
import { parts } from "store@locale";

const props = defineProps({
  record: Object,
});
const { links } = useLinks(props.record.hash);
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
    width: 100%
    color: var(--text-light)
    display: flex
    align-items: center
    flex-flow: row

  .text
    font-size: 1.2em
</style>