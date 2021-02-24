<template lang="pug">
p {{ title || pub }}
</template>

<script setup>
import { defineProps, ref } from "vue";
import { gun } from "store@db";

const props = defineProps({
  pub: String,
});

const title = ref("");

const roomDb = gun.get(`~${props.pub}`);
roomDb.get("title").on((d, k) => {
  title.value = d;
});
</script>

<style lang="stylus" scoped></style>