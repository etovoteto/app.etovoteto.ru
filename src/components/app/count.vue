<template lang="pug">
.p-4 {{ count }}
</template>

<script setup>
import { defineProps } from "vue";
import { useCount } from "store@list";

const props = defineProps({
  tag: String,
  hashed: {
    type: Boolean,
    default: true,
  },
});

const count = useCount(props.tag, props.hashed);
</script>

<style lang="stylus" scoped></style>