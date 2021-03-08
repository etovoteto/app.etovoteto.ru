<template lang="pug">
.flex.flex-col.bg-warm-gray-100.p-4 
  .flex.flex-col.max-w-35ch
    edit-subtitle(
      :text="account.profile.bio",
      :editable="true",
      @update="updateProfile('bio', $event)"
    ) Немного о себе
</template>

<script setup>
import { defineProps } from "vue";
import { useProfile } from "model@author";
import { account, updateProfile } from "store@account";
const props = defineProps({
  pub: String,
});

const profile = useProfile(props.pub);
</script>

<style lang="stylus" scoped></style>