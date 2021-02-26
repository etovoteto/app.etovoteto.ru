<template lang="pug">
.card(v-if="linkFrom.tag")
  word-card(v-if="linkFrom.tag == 'word'", :record="linkFrom")
  def-card(v-if="linkFrom.tag == 'def'", :record="linkFrom")
</template>

<script setup>
import { linkFrom, unlink } from "model@link";
</script>

<style lang="stylus" scoped></style>