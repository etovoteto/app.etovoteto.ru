<template lang="pug">
.flex.flex-col
  transition-group(name="list")
    author-card(
      v-for="(author, i) in sorted.list",
      :key="author.pub || i",
      :author="author"
    )

    .text-2xl.p-8.bg-warm-gray-300.shadow.animate-pulse.cursor-pointer(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useAuthors } from "model@authors";
import { defineProps, watchEffect } from "vue";
import { search } from "model@author";

const { sorted, options, more } = useAuthors();

watchEffect(() => {
  options.search = search.value;
});
</script>

<style lang="stylus" scoped></style>