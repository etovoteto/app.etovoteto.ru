<template lang="pug">
.page
  .enter(v-if="test", @click="testAuthor(test)")
    i.iconify(data-icon="la:sign-in-alt")
  author-profile(:pub="pub")
</template>

<script setup>
import { testAuthor } from "model@author";
import { defineProps, ref } from "vue";

const props = defineProps({
  pub: String,
});

const test = ref(null);
// TESTING AUTHORS
gun
  .get(`~${props.pub}`)
  .get("test")
  .once((d) => {
    test.value = d;
  });
</script>

<style lang="stylus" scoped>
.enter
  font-size: 2rem
  padding: 2px
  cursor: pointer
  position: fixed
  top: 1em
  left: 1em
</style>