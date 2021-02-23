<template lang="pug">
section
  transition-group(name="list")
    author-card(
      v-for="author in sorted.list",
      :key="author?.pub",
      :pub="author?.pub"
    )
      .count
        i.iconify(data-icon="la:comment-dots")
        span {{ countWords(author.pub) }}
      .count 
        i.iconify(data-icon="la:comment")
        span {{ countDefs(author.pub) }}
    .more(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { user } from "store@user";
import { useList } from "store@list";
import { useAuthors } from "model@author";
import { useTagAuthors } from "../../model/author";

const { sorted, options, more } = useAuthors();
const words = useTagAuthors("word");

function countWords(pub) {
  if (!words[pub]) return 0;
  return Object.keys(words[pub]).length;
}

const defs = useTagAuthors("def");

function countDefs(pub) {
  if (!defs[pub]) return 0;
  return Object.keys(defs[pub]).length;
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