<template lang="pug">
.row.pt-2.flex.items-center(:class="{ trash: isTrash }")
  router-link.text-base.font-bold(
    :to="`/word/${safeHash(record.hash)}`",
    v-if="record.data",
    v-html="renderWord(record.data.word, record.data.stress)"
  )
  author-avatar(
    v-for="(is, author) in record?.authors",
    :key="author",
    :pub="author",
    :size="8"
  )
  .spacer
  author-avatar(
    v-for="(is, author) in linkers",
    :key="author",
    :pub="author",
    :size="8"
  )
  .text-lg.pl-1.cursor-pointer(
    v-if="linkers[account.is?.pub] && from",
    @click="linkHashes(from, hash, true)"
  )
    i.iconify(data-icon="la:unlink")
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashedPersonal, useIsTrashed } from "store@item";
import { renderWord } from "model@word";
import { safeHash } from "store@db";
import { account } from "store@account";
import { linkHashes } from "model@link";

import {} from "store@item";
const props = defineProps({
  linkers: Object,
  hash: String,
  from: String,
});

const isTrash = useIsTrashed(props.hash);

const { record } = getHashedPersonal("word", props.hash);
</script>

<style lang="stylus" scoped>
.trash
  @apply: opacity-10 text-red-500

  &:hover
    @apply: opacity-20
</style>