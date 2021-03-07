<template lang="pug">
.flex.flex-col.w-full.max-w-45ch
  router-link(to="/word")
    .title Слова
    .spacer
    span
      i.iconify(data-icon="la:comment-dots")
    app-count(tag="word")

  router-link(to="/def")
    .title Определения
    .spacer
    span
      i.iconify(data-icon="la:comment")
    app-count(tag="def")

  router-link(to="/author") 
    .title Авторы
    .spacer
    span
      i.iconify(data-icon="la:users")
    app-count(tag="author", :hashed="false")

  router-link(to="/room") 
    .title Комнаты
    .spacer
    span
      i.iconify(data-icon="la:comments")
    app-count(tag="room")
</template>

<script setup>
import { useTitle } from "@vueuse/core";
const title = useTitle("Онлайн-словарь ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped>
a
  @apply: p-4 m-4 text-2xl flex text-center items-center bg-warm-gray-100 shadow-lg

  &:hover
    @apply: shadow-xl bg-warm-gray-50
</style>