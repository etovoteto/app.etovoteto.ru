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
import { testAuthor } from "../../model/author";

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
  padding: 1em

.enter
  font-size: 1.2rem
  padding: 2px
  cursor: pointer
</style>