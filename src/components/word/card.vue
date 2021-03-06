<template lang="pug">
.my-4.p-6.bg-warm-gray-50.shadow-lg(v-if="record.data")
  .flex.items-center
    router-link.font-bold.text-2xl(
      :to="'/word/' + safeHash(record.hash)",
      :title="record.timestamp"
    )
      span(
        v-if="record",
        v-html="renderWord(record.data.word, record.data.stress)"
      )
    author-avatar(
      v-for="(is, author) in record.authors",
      :key="author",
      :pub="author",
      size="small"
    )
    .spacer
    link-button(:record="record")

  .links.max-h-xs.overflow-y-scroll.snap
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

const props = defineProps({
  record: Object,
});
const { links } = useLinks(props.record.hash);
</script>

<style lang="stylus" scoped></style>