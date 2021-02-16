<template lang="pug">
p {{ id }}
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  id: String,
});
</script>

<style lang="stylus" scoped></style>