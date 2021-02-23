<template lang="pug">
.profile
  author-avatar(:pub="pub", size="big")
  .name {{ author.name }}
  .room {{ author.currentRoom }}
  .enter(v-if="author.test", @click="testAuthor(author.test)")
    i.iconify(data-icon="la:sign-in-alt")
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { gun } from "store@db";
import { testAuthor } from "model@author";

const props = defineProps({
  pub: String,
});

const author = reactive({
  name: "",
});

const my = gun.get(`~${props.pub}`);

my.get("currentRoom").on((d) => {
  author.currentRoom = d;
});

my.get("profile")
  .get("name")
  .on((d) => (author.name = d));

// TESTING AUTHORS
my.get("test").once((d) => {
  author.test = d;
});
</script>

<style lang="stylus" scoped>
.profile
  display: flex
  flex-flow: column
  align-items: center
  padding: 1em

.enter
  font-size: 1.2rem
  padding: 2px
  cursor: pointer
</style>