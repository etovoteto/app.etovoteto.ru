<template lang="pug">
.card.my-4.p-6.bg-warm-gray-50.shadow-lg(
  v-if="record.data",
  :class="{ trash: isTrash }"
)
  .flex.items-center
    router-link.font-bold.text-2xl(
      :to="'/word/' + safeHash(record.hash)",
      :title="record.timestamp"
    )
      span(
        v-if="record",
        v-html="renderWord(record.data.word, record.data.stress)"
      ) 
    author-avatar.max-w-40(
      v-for="(is, author) in record.authors",
      :key="author",
      :pub="author",
      :size="25"
    )
    .spacer
    link-button(:record="record")

  .links.max-h-xs.overflow-y-scroll.snap(
    v-if="Object.keys(links).length > 0 && record != linkFrom"
  )
    transition-group(name="list")
      def-link.snap-start(
        v-for="(linkers, toHash) in links",
        :key="toHash",
        :linkers="linkers",
        :hash="toHash",
        :from="record.hash"
      )
</template>

<script setup>
import { defineProps } from "vue";
import { renderWord } from "model@word";
import { useLinks, linkFrom } from "model@link";
import { safeHash } from "store@db";
import { useIsTrashed } from "store@item";

const props = defineProps({
  record: Object,
});
const { links } = useLinks(props.record.hash);

const isTrash = useIsTrashed(props.record.hash);
</script>

<style lang="stylus" scoped>
.card:hover
  @apply: shadow-xl no-underline

.trash
  @apply: opacity-20 text-red-500

  &:hover
    @apply: opacity-40
</style>