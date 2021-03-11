<template lang="pug">
.flex.flex-col.items-stretch
  my-form
  my-key
</template>

<script setup>
import { generate, participate } from "store@account";
import { reactive, ref } from "vue";

const author = reactive({
  name: "",
  full: "",
  city: "",
});
</script>

<style lang="stylus" scoped>
input
  @apply: p-4 my-2
</style>


