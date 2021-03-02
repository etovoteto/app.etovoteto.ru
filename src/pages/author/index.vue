<template lang="pug">
main
  author-search
  author-list
</template>

<script setup>
import { useTitle } from "@vueuse/core";
const title = useTitle("Авторы | ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped></style>