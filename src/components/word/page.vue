<template lang="pug">
main.flex.flex-col
  word-card(v-if="record.data", :record="record")
  .flex
    button(@click="show.qr = !show.qr")
  util-qr(:data="`${appUrl}#${$route.fullPath}`")
</template>

<script setup>
import { defineProps } from "vue";
import { getHashedPersonal } from "store@item";
import { renderWord } from "model@word";
import { useLinks } from "model@link";
import { appUrl } from "store@locale";
const props = defineProps({
  hash: String,
});

const { record } = getHashedPersonal("word", props.hash);

const { links } = useLinks(props.hash);
</script>

<style lang="stylus" scoped></style>