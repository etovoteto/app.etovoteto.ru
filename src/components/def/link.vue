<template lang="pug">
.pt-4(v-if="linker && record.data")
  .flex.items-center 
    .part.undeline(
      :style="{ textDecorationStyle: parts[record.data.part].underline }"
    ) {{ parts[record.data.part].name }}.
    author-avatar(
      v-for="(is, author) in record.authors",
      :key="author",
      :pub="author",
      size="nano"
    )
    .spacer
    author-avatar(:pub="linker", size="nano")
  router-link.text-lg.font-normal(:to="`/def/${safeHash(record.hash)}`") {{ capitalFirst(record.data.def) }}
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashedPersonal } from "store@item";
import { parts } from "store@locale";
import { capitalFirst } from "model@word";
import { safeHash } from "store@db";
const props = defineProps({
  linker: String,
  hash: String,
});

const { record } = getHashedPersonal("def", props.hash);
</script>

<style lang="stylus" scoped></style>