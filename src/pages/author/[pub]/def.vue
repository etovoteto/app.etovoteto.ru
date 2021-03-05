<template lang="pug">
.flex.flex-col
  list-tag(tag="def", :author="pub", v-slot="{ record }")
    def-card(:record="record", :key="record.hash")
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});
</script>

<style lang="stylus" scoped></style>