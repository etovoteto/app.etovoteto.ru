<template lang="pug">
.flex.flex-col.p-6.my-4.bg-warm-gray-50(v-if="record.data")
  .flex.items-center
    router-link(:to="'/def/' + safeHash(record.hash)") {{ parts[record.data.part].name }}.
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
import { safeHash } from "store@db";
import { useLinks, linkFrom } from "model@link";
import { parts } from "store@locale";

const props = defineProps({
  record: Object,
});
const { links } = useLinks(props.record.hash);
</script>

<style lang="stylus" scoped></style>