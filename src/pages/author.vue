<template lang="pug">
section
  transition-group(name="list")
    author-card(
      v-for="author in sorted.list",
      :key="author?.pub",
      :pub="author?.pub"
    )
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

const { sorted, options, more } = useAuthors();
</script>

<style lang="stylus" scoped>
section
  width: 100%
  display: flex
  flex-flow: row wrap
  max-width: 55ch

.me
  padding: 1em
  display: flex
  flex-flow: row wrap
</style>