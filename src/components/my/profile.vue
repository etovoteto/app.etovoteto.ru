<template lang="pug">
.profile
  .row
    author-avatar(:pub="author.is?.pub", size="big")
    edit-title.name(
      :title="author.profile.name",
      :editable="true",
      @update="updateProfile('name', $event)"
    )
  my-credentials
  .info
</template>

<script setup>
import { author, downloadPair, updateProfile } from "model@author";
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