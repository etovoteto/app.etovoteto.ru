<template lang="pug">
main
  def-form
  def-list
</template>

<script setup>
import { useTitle } from "@vueuse/core";
const title = useTitle("Определения | ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped></style>