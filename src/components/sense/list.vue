<template lang="pug">
.list 
  transition-group(name="list")
    sense-card(
      v-for="(sense, key) in sorted.list",
      :key="sense.hash",
      :record="sense"
    ) 
    .more(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useHashList } from "use@hashList";

const { sorted, options, more } = useHashList("sense");
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: flex-start
  padding: 1em

  .more
    font-size: 2em
    padding: 3em
    background-color: var(--top-bar)
</style>