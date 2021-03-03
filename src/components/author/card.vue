<template lang="pug">
router-link.flex.flex-wrap.justify-start.py-6.px-2.my-4.text-xl.items-center.bg-warm-gray-50.shadow-lg(
  :to="'/author/' + author.pub"
)
  .flex.items-center.justify-start.flex-grow
    author-avatar(:pub="author.pub", size="small")
    .name {{ author.name }}
  .flex.px-4.justify-start
    .p-2
      i.iconify(data-icon="la:comment-medical")
      span.ml-1 {{ author.sum }}
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { gun } from "store@db";
import { testAuthor } from "store@account";

const props = defineProps({
  author: Object,
});
</script>

<style lang="stylus" scoped></style>