<template lang="pug">
main
  h1 ЭТОВОТЭТО
  h2 Онлайн-словарь
  router-link.card(to="/word") Слова
  router-link.card(to="/sense") Смыслы
</template>

<script setup>
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  font-size: 2rem
  text-align: center
</style>