<template lang="pug">
main
  h1 ЭТОВОТЭТО
  h2 Онлайн-словарь придуманных слов
  router-link.card(to="/word")
    i.iconify(data-icon="la:comment-dots")
    .title Слова
  router-link.card(to="/def") 
    i.iconify(data-icon="la:comment")
    .title Определения
  router-link.card(to="/room") 
    i.iconify(data-icon="la:comments")
    .title Комнаты
</template>

<script setup>
</script>

<style lang="stylus" scoped>
main
  justify-content: center
  display: flex
  flex-flow: column

.card
  margin: 1em 0
  font-size: 2rem
  text-align: center
  display: flex
  align-items: center
  background-color: var(--card-bg)

  svg
    padding: 1em

  &:hover
    background-color: var(--card-bg)
</style>