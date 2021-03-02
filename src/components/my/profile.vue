<template lang="pug">
.flex.flex-wrap
  .flex
    aside
      author-avatar(:pub="account.is?.pub", size="big")
      .flex
        router-link.my-2.p-2.rounded-3xl.bg-warm-gray-100.flex.items-center.text-2xl(
          :to="'/author/' + account.is?.pub"
        ) 
          .mr-1
            i.iconify(data-icon="la:newspaper")
          .text-lg Моя страница
      my-credentials
    .p-6
      edit-title.text-2xl.font-bold(
        :title="account.profile.name",
        :editable="true",
        @update="updateProfile('name', $event)"
      )
      edit-title(
        :title="account.profile.real",
        :editable="true",
        @update="updateProfile('real', $event)"
      )
      edit-subtitle(
        :subtitle="account.profile.bio",
        :editable="true",
        @update="updateProfile('bio', $event)"
      ) 
</template>

<script setup>
import { useTitle } from "@vueuse/core";
import { account, downloadPair, updateProfile } from "store@account";

const title = useTitle(account.profile?.name);
</script>

<style lang="stylus" scoped></style>