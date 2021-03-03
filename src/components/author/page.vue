<template lang="pug">
.page
  .absolute.top-4.left-4.text-3xl.cursor-pointer(
    v-if="test",
    @click="testAuthor(test)"
  )
    i.iconify(data-icon="la:sign-in-alt")
  author-profile(:pub="pub")
  author-rooms(:pub="pub")
  author-words(:pub="pub")
</template>

<script setup>
import { testAuthor } from "store@account";
import { defineProps, ref } from "vue";

const props = defineProps({
  pub: String,
});

const test = ref(null);
// TESTING AUTHORS
gun
  .get(`~${props.pub}`)
  .get("test")
  .once((d) => {
    test.value = d;
  });
</script>

<style lang="stylus" scoped></style>