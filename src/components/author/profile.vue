<template lang="pug">
.flex.flex-col.items-center.pt-6.w-full
  .flex.flex-col.items-center.shadow-lg.z-2.bg-warm-gray-100.p-6.w-full
    router-link.flex.flex-col.items-center(:to="`/author/${pub}/`")
      author-avatar(:pub="pub", size="big")
    edit-title.text-3xl.font-bold.my-2(
      :title="profile.name",
      :editable="account.is?.pub == pub",
      @update="updateProfile('name', $event)"
    ) Имя или псевдоним
    edit-title.text-lg(
      :title="profile.full",
      :editable="account.is?.pub == pub",
      @update="updateProfile('full', $event)"
    ) Полное имя
    edit-title.text-lg(
      :title="profile.city",
      :editable="account.is?.pub == pub",
      @update="updateProfile('city', $event)"
    ) Город/область
    edit-credentials(
      v-if="!account.is?.pub || account.is?.pub == pub",
      :pub="pub"
    )
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { useProfile } from "model@author";
import { hasPass, logWithPass, account, updateProfile } from "store@account";

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