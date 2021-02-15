<template lang="pug">
section HEY
  p {{ user.is.alias }}
  p {{ cert }}
  graph-scan
</template>

<script setup>
import { cert } from "store@cert";
import { user } from "../store/user";
</script>

<style lang="stylus" scoped></style>