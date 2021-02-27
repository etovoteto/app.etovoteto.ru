<template lang="pug">
.flex.flex-wrap
  aside
    author-avatar(:pub="account.is?.pub", size="big")
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
import { account, downloadPair, updateProfile } from "model@author";
</script>

<style lang="stylus" scoped></style>