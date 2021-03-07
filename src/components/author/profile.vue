<template lang="pug">
.flex.flex-col.items-center.pt-6
  router-link.flex.flex-col.items-center(:to="`/author/${pub}/`")
    author-avatar(:pub="pub", size="big")
    .text-3xl.font-bold.my-2 {{ profile.name }}

  .text-xl.my-2.flex.items-center(v-if="profile.real") {{ profile.real }}
    span.text-3xl.cursor-pointer.pl-2(
      v-if="!account.is?.pub && hasPass(pub)",
      @click="pass.show = !pass.show"
    )
      i.iconify(data-icon="la:lock")
  input.text-lg.p-4.my-4(
    v-if="pass.show && !account.is?.pub",
    v-model="pass.text",
    placeholder="Ваш пароль",
    type="password",
    @keyup.enter="logWithPass(pub, $event.target.value)"
  )
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { useProfile } from "model@author";
import { hasPass, logWithPass, account } from "store@account";

const props = defineProps({
  pub: String,
});

const pass = reactive({
  text: "",
  show: false,
});

const profile = useProfile(props.pub);

import { useTitle } from "@vueuse/core";
const title = useTitle(profile.name);
</script>

<style lang="stylus" scoped></style>