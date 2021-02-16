<template lang="pug">
.cert
  p {{ mainRoom }}
  p {{ cert }}
</template>

<script setup>
import { mainRoom, cert } from "store@room";
import { user } from "store@user";
</script>

<style lang="stylus" scoped></style>