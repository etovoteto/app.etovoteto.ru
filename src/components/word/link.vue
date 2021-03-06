<template lang="pug">
.row.pt-2.flex.items-center(v-if="record.data")
  router-link.text-base.font-bold(
    :to="`/word/${safeHash(record.hash)}`",
    v-if="record",
    v-html="renderWord(record.data.word, record.data.stress)"
  )
  author-avatar(
    v-for="(is, author) in record.authors",
    :key="author",
    :pub="author",
    size="nano"
  )
  .spacer
  author-avatar(
    v-for="(is, author) in linkers",
    :key="author",
    :pub="author",
    size="nano"
  )
  .text-lg.pl-1.cursor-pointer(
    v-if="linkers[account.is?.pub]",
    @click="linkHashes(from, hash, true)"
  )
    i.iconify(data-icon="la:unlink")
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashedPersonal } from "store@item";
import { renderWord } from "model@word";
import { safeHash } from "store@db";
import { account } from "store@account";
import { linkHashes } from "model@link";
const props = defineProps({
  linkers: Object,
  hash: String,
  from: String,
});

const { record } = getHashedPersonal("word", props.hash);
</script>

<style lang="stylus" scoped></style>