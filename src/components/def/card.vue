<template lang="pug">
.flex.flex-col.p-6.my-4.bg-warm-gray-50
  .flex.items-center
    .info {{ parts[record.data.part].name }}.
    author-dots(:authors="record.authors")
    .spacer
    link-button(:record="record")
  .text-lg {{ capitalFirst(record.data.def) }}
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

<style lang="stylus" scoped></style>