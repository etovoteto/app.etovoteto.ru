<template lang="pug">
main.flex.flex-col 
  def-card(v-if="record?.data", :record="record")
  word-form
  util-share
</template>

<script setup>
import { defineProps } from "vue";
import { getHashedPersonal } from "store@item";
import { renderWord } from "model@word";
import { useLinks, linkFrom } from "model@link";

const props = defineProps({
  hash: String,
});

linkFrom.value = {
  hash: props.hash,
  tag: "def",
};

const { record } = getHashedPersonal("def", props.hash);

const { links } = useLinks(props.hash);
</script>

<style lang="stylus" scoped></style>