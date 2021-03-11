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
    button.action(v-if="!account.is?.pub", @click="pass.show = !pass.show")
      i.iconify(data-icon="la:lock")
    input.text-lg.p-4.my-4(
      v-if="pass.show && !account.is?.pub",
      v-model="pass.text",
      placeholder="Ваш пароль",
      @keyup.enter="logWithPass(pub, $event.target.value)"
    )
    edit-credentials.mt-6(
      v-if="!account.is?.pub || account.is?.pub == pub",
      :pub="pub"
    )
    button.p-2.text-red-800(
      v-if="account.is?.pub && account.is?.pub == pub",
      @click="logOut()"
    )
      i.iconify(data-icon="la:sign-out-alt")
      .text Выйти
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { useProfile } from "model@author";
import {
  hasPass,
  logWithPass,
  account,
  logOut,
  updateProfile,
} from "store@account";

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