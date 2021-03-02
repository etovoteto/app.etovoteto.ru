<template lang="pug">
main.flex.flex-col 
  word-card(v-if="record.data", :record="record")
  def-form
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
  tag: "word",
};

const { record } = getHashedPersonal("word", props.hash);

const { links } = useLinks(props.hash);
</script>

<style lang="stylus" scoped></style>