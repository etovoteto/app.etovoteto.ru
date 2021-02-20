<template lang="pug">
.form
  textarea(:cols="24", :rows="4", v-model="newDef.def")
  .generate(@click="generate()")
    i.iconify(data-icon="teenyicons:refresh-alt-solid")
</template>

<script setup>
import { generate, newDef } from "model@def";
</script>

<style lang="stylus" scoped>
.form
  position: relative
  display: flex

textarea
  font-size: 1.2rem
  text-align: left

.generate
  position: absolute
  top: 1.4rem
  right: 1.5rem
  font-size: 1.2rem
</style>