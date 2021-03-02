<template lang="pug">
def-page(:hash="unsafeHash(hash)")
</template>

<script setup>
import { defineProps } from "vue";
import { unsafeHash } from "store@db";

const props = defineProps({
  hash: String,
});
</script>

<style lang="stylus" scoped></style>