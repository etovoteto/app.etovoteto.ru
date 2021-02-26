<template lang="pug">
.counts
  .count
    i.iconify(data-icon="la:comment-dots")
    span {{ words }}
  .count 
    i.iconify(data-icon="la:comment")
    span {{ defs }}
  .count 
    i.iconify(data-icon="la:link")
    span {{ links / 2 }}
  .count 
    i.iconify(data-icon="la:user")
    span {{ authors }}
</template>

<script setup>
import { defineProps } from "vue";
import { useCount, countAuthors } from "store@list";
const props = defineProps({
  pub: String,
});

const words = useCount("word", true, props.pub);
const defs = useCount("def", true, props.pub);
const links = useCount("link", false, props.pub);
const authors = countAuthors(props.pub);
</script>

<style lang="stylus" scoped>
.counts
  padding: 1em 0
  display: flex
  font-size: 1.4em
  justify-content: center

.count
  padding: 0 1em
</style>