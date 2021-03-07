<template lang="pug">
.pt-4(:class="{ trash: isTrash }")
  .flex.items-center(v-if="record.data") 
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
  router-link.text-lg.font-normal(
    :to="`/def/${safeHash(record.hash)}`",
    v-if="record.data"
  ) {{ capitalFirst(record.data.def) }}
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashedPersonal, useIsTrashed } from "store@item";
import { parts } from "store@locale";
import { capitalFirst } from "model@word";
import { safeHash } from "store@db";
import { linkHashes } from "model@link";
import { account } from "store@account";

const props = defineProps({
  linkers: Object,
  hash: String,
  from: String,
});

const isTrash = useIsTrashed(props.hash);

const { record } = getHashedPersonal("def", props.hash);
</script>

<style lang="stylus" scoped>
.trash
  @apply: opacity-10 text-red-500

  &:hover
    @apply: opacity-20
</style>