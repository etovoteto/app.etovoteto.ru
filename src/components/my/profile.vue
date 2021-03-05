<template lang="pug">
.flex.flex-col
  .flex.justify-center.gap-8.p-4.my-4
    .flex.flex-col.items-center
      author-avatar(:pub="account.is?.pub", size="big")
      router-link.my-2.p-2.rounded-3xl.bg-warm-gray-100.flex.items-center.text-2xl(
        :to="'/author/' + account.is?.pub"
      ) 
        .mr-1
          i.iconify(data-icon="la:newspaper")
        .text-lg Моя страница
    .flex.flex-col
      edit-title.text-2xl.font-bold.my-2(
        :title="account.profile.name",
        :editable="true",
        @update="updateProfile('name', $event)"
      ) Псевдоним
      edit-title.text-lg(
        label="",
        :title="account.profile.real",
        :editable="true",
        @update="updateProfile('real', $event)"
      ) Настоящее имя
      edit-subtitle(
        :text="account.profile.bio",
        :editable="true",
        @update="updateProfile('bio', $event)"
      ) Краткая биография

  my-credentials
  button.mt-3(@click="logOut()") 
    i.iconify(data-icon="la:sign-out-alt")
    .title Выйти
</template>

<script setup>
import { useTitle } from "@vueuse/core";
import { account, logOut, updateProfile } from "store@account";

const title = useTitle(account.profile?.name);
</script>

<style lang="stylus" scoped></style>