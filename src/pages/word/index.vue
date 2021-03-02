<template lang="pug">
main
  word-form
  word-list
</template>

<script setup>
import { useTitle } from "@vueuse/core";
const title = useTitle("Слова | ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped></style>