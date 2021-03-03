<template lang="pug">
main
  def-form
  list-tag(tag="def", :search="newDef.def", v-slot="{ record }")
    def-card(:record="record", :key="record.hash")
</template>

<script setup>
import { newDef } from "model@def";
import { useTitle } from "@vueuse/core";
const title = useTitle("Определения | ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped></style>