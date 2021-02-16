<template lang="pug">
.list 
  .card(v-for="(sense, key) in list", :key="sense.timestamp") 
    user-avatar(
      v-for="(is, author) in sense.authors",
      :key="author",
      :pub="author",
      size="small"
    )
    h2(:title="sense.timestamp") {{ sense.text }}
</template>

<script setup>
import { useHashList } from "use@hashList";

const { list } = useHashList("sense");
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em

.card
  padding: 0.5em 1rem
  display: flex
  align-items: center
</style>