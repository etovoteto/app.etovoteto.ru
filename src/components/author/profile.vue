<template lang="pug">
.flex.flex-col.items-center.pt-6
  router-link.flex.flex-col.items-center(:to="`/author/${pub}/`")
    author-avatar(:pub="pub", size="big")
    .text-3xl.font-bold.my-2 {{ profile.name }}
  .text-xl.my-2.flex.items-center(v-if="profile.real") {{ profile.real }}
    span.text-3xl.cursor-pointer.pl-2(v-if="test", @click="testAuthor(test)")
      i.iconify(data-icon="la:sign-in-alt")
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { useProfile } from "model@author";
import { testAuthor } from "store@account";

const props = defineProps({
  pub: String,
});

const profile = useProfile(props.pub);

import { useTitle } from "@vueuse/core";
const title = useTitle(profile.name);

const test = ref(null);
// TESTING AUTHORS
gun
  .get(`~${props.pub}`)
  .get("test")
  .once((d) => {
    test.value = d;
  });
</script>

<style lang="stylus" scoped></style>