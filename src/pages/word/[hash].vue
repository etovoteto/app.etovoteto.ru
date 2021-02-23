<template lang="pug">
main {{ record }}
  word-card(:record="record")
</template>

<script setup>
import { defineProps } from "vue";
import { unsafeHash } from "../../store/db";
import { getHashedPersonal } from "../../store/list";

const props = defineProps({
  hash: String,
});
const { record } = getHashedPersonal("word", unsafeHash(props.hash));
</script>

<style lang="stylus" scoped></style>