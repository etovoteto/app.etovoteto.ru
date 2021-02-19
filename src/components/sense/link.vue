<template lang="pug">
.row
  sense-card.sense(:sense="record")
    user-avatar(:pub="linker", size="nano") 
</template>

<script setup>
import { defineProps, ref } from "vue";
import { pubGradient } from "use@colors";
import { getHashed } from "use@hashList";
pubGradient;
const props = defineProps({
  linker: String,
  hash: String,
});

const record = getHashed("sense", props.hash);
</script>

<style lang="stylus" scoped>
.row .sense
  padding: 1em 0
  margin: 0
</style>