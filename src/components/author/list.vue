<template lang="pug">
section
  transition-group(name="list")
    author-card(
      v-for="(author, i) in sorted.list",
      :key="author.pub || i",
      :pub="author?.pub"
    )
      .count
        i.iconify(data-icon="la:comment-dots")
        span {{ count(author.word) }}
      .count 
        i.iconify(data-icon="la:comment")
        span {{ count(author.def) }}
      .count 
        i.iconify(data-icon="la:link")
        span {{ count(author.link) / 2 }}
    .more(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useAuthors } from "model@authors";

const { sorted, options, more } = useAuthors();

function count(list) {
  if (!list) return 0;
  return Object.keys(list).length;
}
</script>

<style lang="stylus" scoped>
section
  width: 100%
  display: flex
  flex-flow: column
  max-width: 55ch

.count
  padding: 0 1em
</style>