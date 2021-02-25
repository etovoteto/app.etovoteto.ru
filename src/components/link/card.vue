<template lang="pug">
.card(v-if="linking.tag")
  word-card(v-if="linking.tag == 'word'", :record="linking")
  def-card(v-if="linking.tag == 'def'", :record="linking")
</template>

<script setup>
import { linking, unlink } from "model@link";
</script>

<style lang="stylus" scoped></style>