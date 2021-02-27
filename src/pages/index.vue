<template lang="pug">
main
  h2.text-2xl.p-6 Онлайн-словарь придуманных слов

  router-link(to="/word")
    span
      i.iconify(data-icon="la:comment-dots")
    .title Слова
    .spacer
    app-count(tag="word")

  router-link(to="/def")
    span
      i.iconify(data-icon="la:comment")
    .title Определения
    .spacer
    app-count(tag="def")

  router-link(to="/author") 
    span
      i.iconify(data-icon="la:users")
    .title Авторы
    .spacer
    app-count(tag="author", :hashed="false")

  router-link(to="/room") 
    span
      i.iconify(data-icon="la:comments")
    .title Комнаты
    .spacer
    app-count(tag="room")
</template>

<script setup>
</script>

<style lang="stylus" scoped>
a
  padding: 0.5rem
  margin: 0.5rem 0
  font-size: 1.6rem
  text-align: center
  display: flex
  align-items: center
  background-color: var(--background-alt)

  span
    padding: 0.5rem

  &:hover
    background-color: var(--top-bar)
</style>