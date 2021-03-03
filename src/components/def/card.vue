<template lang="pug">
.flex.flex-col.p-6.my-4.bg-warm-gray-50(v-if="record.data")
  .flex.items-center
    .part {{ parts[record.data.part].name }}.
    author-avatar(
      v-for="(is, author) in record.authors",
      :key="author",
      :pub="author",
      size="nano"
    )
    .spacer
    link-button(:record="record")
  router-link.text-lg.font-normal(:to="'/def/' + safeHash(record.hash)") {{ capitalFirst(record.data.def) }}
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