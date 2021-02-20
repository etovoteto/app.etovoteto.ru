<template lang="pug">
.card(v-if="linking")
  word-card(v-if="linking.tag == 'word'", :record="linking")
  def-card(v-if="linking.tag == 'def'", :record="linking")
</template>

<script setup>
import { linking, unlink } from "store@link";
</script>

<style lang="stylus" scoped></style>