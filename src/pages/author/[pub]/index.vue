<template lang="pug">
.flex.flex-col.bg-warm-gray-100.p-6.shadow-md.text-lg
  edit-subtitle(
    :text="profile.bio",
    :editable="account.is?.pub == pub",
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