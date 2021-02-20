<template lang="pug">
.list 
  transition-group(name="list")
    def-card(v-for="(def, key) in sorted.list", :key="def.hash", :record="def") 
    .more(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { useHashList } from "store@hashList";
import { watchEffect } from "vue";
import { newDef } from "model@def";
const { sorted, options, more } = useHashList("def");

watchEffect(() => {
  options.search = newDef.def;
});
</script>

<style lang="stylus" scoped>
.list
  display: flex
  flex-flow: column

  .more
    font-size: 2em
    padding: 3em
    background-color: var(--top-bar)
</style>