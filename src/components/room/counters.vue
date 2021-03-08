<template lang="pug">
.flex.justify-center.text-2xl.py-4
  .count
    i.iconify(data-icon="la:comment-dots")
    span {{ room.word }}
  .count 
    i.iconify(data-icon="la:comment")
    span {{ room.def }}
  .count 
    i.iconify(data-icon="la:user")
    span {{ room.author }}
  .count 
    i.iconify(data-icon="la:comments")
    span {{ room.room }}
</template>

<script setup>
import { defineProps } from "vue";
import { useCount, countAuthors } from "store@list";
const props = defineProps({
  room: Object,
});
</script>

<style lang="stylus" scoped>
.count
  padding: 0 0.5rem

  span
    padding: 0 0.25rem
</style>