<template lang="pug">
.flex.justify-center.text-2xl.bg-warm-gray-100.mt-6.shadow-md.p-4
  router-link.count(:to="`/author/${pub}/`")
    i.iconify(data-icon="la:info-circle")
  router-link.count(:to="`/author/${pub}/word`")
    i.iconify(data-icon="la:comment-dots")
    span {{ words }}
  router-link.count(:to="`/author/${pub}/def`") 
    i.iconify(data-icon="la:comment")
    span {{ defs }}

  router-link.count(:to="`/author/${pub}/room`") 
    i.iconify(data-icon="la:comments")
    span {{ rooms }}
</template>

<script setup>
import { defineProps } from "vue";
import { useCount } from "store@list";
import { useCountLinks } from "model@link";
import { useRoomCount } from "model@room";
const props = defineProps({
  pub: String,
});

const words = useCount("word", true, undefined, props.pub);
const defs = useCount("def", true, undefined, props.pub);
const links = useCountLinks(props.pub);
const rooms = useRoomCount(props.pub);
</script>

<style lang="stylus" scoped>
.count
  @apply: p-4

  &:hover
    @apply: bg-warm-gray-200

  &.router-link-exact-active
    @apply: bg-warm-gray-300
</style>