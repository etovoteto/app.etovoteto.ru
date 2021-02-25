<template lang="pug">
router-link.card(:to="'/author/' + pub")
  author-avatar(:pub="pub", size="small")
  .name {{ author.name }}
  .spacer
  slot
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { gun } from "store@db";
import { testAuthor } from "model@author";

const props = defineProps({
  pub: String,
  author: Object,
});

const author = reactive({
  name: "",
});

const test = ref("");
const my = gun.get(`~${props.pub}`);

my.get("profile")
  .get("name")
  .on((d) => (author.name = d));

// TESTING AUTHORS
my.get("test").once((d) => {
  test.value = d;
});
</script>

<style lang="stylus" scoped>
.card
  display: flex
  padding: 1em 0
  margin: 1em 0
  font-size: 1.4em
  background-color: var(--background-alt)
  align-items: center

.enter
  padding: 2px
  cursor: pointer
</style>