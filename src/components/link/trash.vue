<template lang="pug">
.flex.items-center {{ title }}
  span.p-2.text-xl(@click="trashHash(hash, tag)")
    i.iconify(data-icon="la:times")
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useTitle, trashHash } from "store@item";

const props = defineProps({
  hash: String,
  tag: String,
});

const title = useTitle(props.hash, props.tag);
</script>

<style lang="stylus" scoped></style>