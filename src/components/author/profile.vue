<template lang="pug">
.flex.flex-col.items-center
  author-avatar(:pub="pub", size="big")
  .text-3xl.font-bold.my-2 {{ author.name }}
  .text-xl.my-2 {{ author.real }}
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { gun } from "store@db";

const props = defineProps({
  pub: String,
});

const author = reactive({
  name: "",
});

const my = gun.get(`~${props.pub}`);

my.get("room").on((d) => {
  author.room = d;
});

my.get("profile")
  .map()
  .on((d, k) => (author[k] = d));
</script>

<style lang="stylus" scoped></style>