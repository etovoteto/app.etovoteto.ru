<template lang="pug">
.flex.flex-col.my-6
  .flex.justify-center
    .text-2xl.font-bold Слова
  .flex.overflow-x-scroll.max-w-screen.snap.items-start
    transition-group(name="list")
      word-card.min-w-xs.mx-4.snap-center(
        v-for="record in sorted.list",
        :key="record.hash",
        :record="record"
      ) 
      .text-2xl.p-8.bg-warm-gray-300(
        key="more",
        ref="more",
        v-if="sorted.more",
        @click="options.limit += options.page"
      ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { defineProps } from "vue";
import { useList } from "store@list";
const props = defineProps({
  pub: String,
  tag: String,
});

const { sorted, options, more } = useList("word", props.pub);
</script>

<style lang="stylus" scoped></style>