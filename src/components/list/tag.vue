<template lang="pug">
.flex.flex-col
  link-card.sticky
  transition-group(name="list") 
    slot(
    v-for="(record, key) in sorted.list",
    :key="record.hash",
    :record="record"
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
import { onBeforeUnmount, watchEffect } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  tag: String,
  search: String,
  author: String,
});

const { sorted, options, more, request } = useList(props.tag, props.author);
watchEffect(() => {
  options.search = props.search;
});
onBeforeUnmount(() => {
  request.off();
});
</script>

<style lang="stylus" scoped></style>