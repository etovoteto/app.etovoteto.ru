<template lang="pug">
.flex.flex-wrap
  transition-group(name="list") 
    router-link.p-1.opacity-50(
      :to="`/${tag}/${safeHash(record.hash)}`",
      v-for="(record, key) in sorted.list",
      :key="record.hash",
      :record="record"
    ) 
      .card.text-base.font-normal(
        v-if="record.tag == 'word'",
        v-html="renderWord(record.data.word, record.data.stress).toLowerCase()"
      )
    .text-2xl.p-8.bg-warm-gray-300.shadow.animate-pulse.cursor-pointer(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useList } from "store@list";
import { watchEffect } from "vue";
import { defineProps } from "vue";
import { safeHash } from "store@db";
import { renderWord } from "model@word";
const props = defineProps({
  tag: String,
  search: String,
  author: String,
});

const { sorted, options, more } = useList(
  props.tag,
  props.author,
  undefined,
  true,
  200,
  100
);
watchEffect(() => {
  options.search = props.search;
});
</script>

<style lang="stylus" scoped>
a:hover
  @apply: opacity-100
</style>