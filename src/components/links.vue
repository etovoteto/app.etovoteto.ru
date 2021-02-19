<template lang="pug">
p LINKS
  slot(
    v-for="(linker, hash) in links",
    :key="hash",
    :linker="linker",
    :hash="hash"
  ) 
</template>

<script setup>
import { defineProps } from "vue";
import { useLinks } from "store@link";
import { getHashed } from "../use/hashList";

const props = defineProps({
  type: String,
  hash: String,
});

const { links } = useLinks(props.hash);
</script>

<style lang="stylus" scoped></style>