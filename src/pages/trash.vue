<template lang="pug">
.flex.flex-col.w-full.max-w-45ch.my-8 
  .text-5xl.text-center
    i.iconify(data-icon="la:trash")
  .text-2xl.font-bold.text-center.mb-4 Корзина
  .flex.flex-wrap
    link-trash(
      v-for="(tag, hash) in trash",
      :key="hash",
      :hash="hash",
      :tag="tag"
    ) 
</template>

<script setup>
import { useTrash } from "store@item";

const trash = useTrash();
</script>

<style lang="stylus" scoped></style>