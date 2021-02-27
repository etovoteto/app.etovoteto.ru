<template lang="pug">
.list
  transition-group(name="list")
    def-card(v-for="(def, key) in sorted.list", :key="def.hash", :record="def") 
    .more.text-2xl.p-8.bg-warm-gray-300(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useList } from "store@list";
import { watchEffect } from "vue";
import { newDef } from "model@def";
const { sorted, options, more } = useList("def");
</script>

<style lang="stylus" scoped></style>