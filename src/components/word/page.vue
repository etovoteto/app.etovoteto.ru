<template lang="pug">
main.flex.flex-col 
  word-card(v-if="record.data", :record="record")
  def-form
  util-share
</template>

<script setup>
import { defineProps, watchEffect } from "vue";
import { getHashedPersonal } from "store@item";
import { capitalFirst } from "model@word";
import { useLinks, linkFrom } from "model@link";
import { useTitle } from "@vueuse/core";

const props = defineProps({
  hash: String,
});

linkFrom.value = {
  hash: props.hash,
  tag: "word",
};

const { record } = getHashedPersonal("word", props.hash);
const title = useTitle(capitalFirst(record?.data?.word));

const { links } = useLinks(props.hash);
</script>

<style lang="stylus" scoped></style>