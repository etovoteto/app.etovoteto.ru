<template lang="pug">
.sticky.top-0.z-100.transform.scale-105(v-if="linkFrom?.tag") 
  word-card.shadow-2xl(v-if="linkFrom.tag == 'word'", :record="linkFrom")
  def-card.shadow-2xl(v-if="linkFrom.tag == 'def'", :record="linkFrom")
</template>

<script setup>
import { linkFrom } from "model@link";
</script>

<style lang="stylus" scoped></style>