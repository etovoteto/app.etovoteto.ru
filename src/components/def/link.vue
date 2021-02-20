<template lang="pug">
.row(v-if="record.data")
  .content
    .info {{ parts[record.data.part] }}.
    author-avatar(:pub="linker", size="nano")
    .spacer
    author-dots(:authors="record.authors")
  .text {{ capitalFirst(record.data.def) }}
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashed } from "store@hashList";
import { parts } from "model@model";
import { capitalFirst } from "model@word";

const props = defineProps({
  linker: String,
  hash: String,
});

const { record } = getHashed("def", props.hash);
</script>

<style lang="stylus" scoped>
.row
  padding: 1em 0
  margin: 0

  .content
    width: 100%
    color: var(--text-light)
    display: flex
    align-items: center
    flex-flow: row

  .text
    font-size: 1.2em
</style>