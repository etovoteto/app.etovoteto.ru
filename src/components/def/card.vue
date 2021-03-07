<template lang="pug">
.card.flex.flex-col.p-6.my-4.bg-warm-gray-50.shadow-lg(
  v-if="record.data",
  :class="{ trash: isTrash }"
)
  .flex.items-center
    .part {{ parts[record.data.part].name }}.
    author-avatar(
      v-for="(is, author) in record.authors",
      :key="author",
      :pub="author",
      size="small"
    )
    .spacer
    link-button(:record="record")
  router-link.text-lg.font-normal.border-b.border-solid.border-warm-gray-400.pb-4(
    :to="'/def/' + safeHash(record.hash)"
  ) {{ capitalFirst(record.data.def) }}
  transition-group(name="list")
    word-link.snap-start(
      v-for="(linkers, toHash) in links",
      :key="toHash",
      :linkers="linkers",
      :hash="toHash",
      :from="record.hash"
    ) 
</template>

<script setup>
import { defineProps } from "vue";
import { capitalFirst } from "model@word";
import { safeHash } from "store@db";
import { useLinks, linkFrom } from "model@link";
import { parts } from "store@locale";
import { useIsTrashed } from "store@item";

const props = defineProps({
  record: Object,
});
const { links } = useLinks(props.record.hash);

const isTrash = useIsTrashed(props.record.hash);
</script>

<style lang="stylus" scoped>
.card:hover
  @apply: shadow-2xl no-underline

.trash
  @apply: opacity-20 text-red-500

  &:hover
    @apply: opacity-40
</style>