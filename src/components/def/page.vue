<template lang="pug">
main.flex.flex-col 
  def-card(v-if="record?.data", :record="record",
    v-motion,
    :initial="{ opacity: 0, y: 40 }",
    :enter="{ opacity: 1, y: 0, scale: 1 }",
    :visible="{ opacity: 1, y: 0, scale: 1 }",)
  word-form
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
  tag: "def",
};

const { record } = getHashedPersonal("def", props.hash);

const title = useTitle(capitalFirst(record?.data?.def));

const { links } = useLinks(props.hash);
</script>

<style lang="stylus" scoped></style>