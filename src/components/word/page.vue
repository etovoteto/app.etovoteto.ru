<template lang="pug">
p {{ hash }}
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  hash: String,
});
</script>

<style lang="stylus" scoped></style>