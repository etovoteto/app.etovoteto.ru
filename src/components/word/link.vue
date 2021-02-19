<template lang="pug">
.row(v-if="record[hash]") {{ hash }}
  word-card(:record="record")
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getHashed } from "use@hashList";

const props = defineProps({
  linker: String,
  hash: String,
});

const { record } = getHashed("word", props.hash);
</script>

<style lang="stylus" scoped>
.row .word
  padding: 1em 0
  margin: 0
</style>