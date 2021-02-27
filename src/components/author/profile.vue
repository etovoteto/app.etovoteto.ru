<template lang="pug">
.profile
  author-avatar(:pub="pub", size="big")
  h1.name {{ author.name }}
  h2.real {{ author.real }}
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

<style lang="stylus" scoped>
.profile
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em

  h1, h2
    margin: 0.5em
</style>