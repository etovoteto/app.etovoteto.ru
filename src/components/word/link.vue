<template lang="pug">
.row
  p {{ record.data }}
    author-avatar(:pub="linker", size="nano") 
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