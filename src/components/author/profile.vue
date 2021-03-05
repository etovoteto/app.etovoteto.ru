<template lang="pug">
.flex.flex-col.items-center.py-6
  author-avatar(:pub="pub", size="big")
  .text-3xl.font-bold.my-2 {{ profile.name }}
  .text-xl.my-2(v-if="profile.real") {{ profile.real }}
  .text-base.my-2(v-if="profile.bio") {{ profile.bio }}
  .text-3xl.cursor-pointer(v-if="test", @click="testAuthor(test)")
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