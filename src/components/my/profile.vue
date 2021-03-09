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
      ) Имя или псевдоним
      edit-title.text-lg(
        label="",
        :title="account.profile.full",
        :editable="true",
        @update="updateProfile('full', $event)"
      ) Полное имя
      edit-title.text-lg(
        label="",
        :title="account.profile.city",
        :editable="true",
        @update="updateProfile('city', $event)"
      ) Город/область
  edit-credentials
  .flex.justify-center.gap-8.p-4.my-4
    edit-subtitle(
      :text="account.profile.bio",
      :editable="true",
      @update="updateProfile('bio', $event)"
    ) Немного о себе
</template>

<script setup>
import { useTitle } from "@vueuse/core";
import { account, updateProfile } from "store@account";

const title = useTitle(account.profile?.name);
</script>

<style lang="stylus" scoped></style>