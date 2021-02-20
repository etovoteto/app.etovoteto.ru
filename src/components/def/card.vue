<template lang="pug">
.card
  .content 
    .info {{ parts[record.part] }}.
    link-button(:record="record")
    .spacer
    author-dots(:authors="record.authors")
  .text {{ capitalFirst(record.def) }}
  .links(v-if="record != linking")
    word-link(
      v-for="(linker, hash) in links",
      :key="hash + linker",
      :linker="linker",
      :hash="hash"
    )
</template>

<script setup>
import { defineProps } from "vue";
import { capitalFirst } from "store@word";

import { useLinks, linking } from "store@link";
import { parts } from "store@model";

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