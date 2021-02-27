<template lang="pug">
.flex.flex-col
  transition-group(name="list")
    author-card(
      v-for="(author, i) in sorted.list",
      :key="author.pub || i",
      :pub="author?.pub",
      :list="author"
    )

    .text-2xl.p-8.bg-warm-gray-300(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useAuthors } from "model@authors";

const { sorted, options, more } = useAuthors();
</script>

<style lang="stylus" scoped></style>