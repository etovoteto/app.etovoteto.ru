<template lang="pug">
section LIST
  .author(v-for="author in authors", :key="author")
    .avatar {{ author }}
</template>

<script setup>
import { reactive } from "vue";

const authors = reactive({});
</script>

<style lang="stylus" scoped></style>