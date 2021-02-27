<template lang="pug">
.profile
  aside
    author-avatar(:pub="account.is?.pub", size="big")
    my-credentials
  .info
    edit-title.name(
      :title="account.profile.name",
      :editable="true",
      @update="updateProfile('name', $event)"
    )
    edit-title.real(
      :title="account.profile.real",
      :editable="true",
      @update="updateProfile('real', $event)"
    )
    edit-subtitle.real(
      :subtitle="account.profile.bio",
      :editable="true",
      @update="updateProfile('bio', $event)"
    ) 
</template>

<script setup>
import { account, downloadPair, updateProfile } from "model@author";
</script>

<style lang="stylus" scoped>
.profile
  display: flex
  flex-flow: row wrap

.row, .name
  display: flex
  flex-flow: column
  align-items: center

.name
  font-size: 1.6em

.rooms
  display: flex
  flex-flow: column
</style>