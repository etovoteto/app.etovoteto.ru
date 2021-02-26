<template lang="pug">
.profile
  .row
    author-avatar(:pub="user.is?.pub", size="big")
    edit-title.name(
      :title="user.profile.name",
      :editable="true",
      @update="updateProfile('name', $event)"
    )
  my-credentials
  .info
</template>

<script setup>
import { user, logOut } from "store@user";
import { reactive, ref, watchEffect } from "vue";
import { gun } from "store@db";
import { downloadPair, updateProfile } from "model@author";
</script>

<style lang="stylus" scoped>
.profile
  display: flex
  flex-flow: column

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