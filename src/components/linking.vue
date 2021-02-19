<template lang="pug">
.card(v-if="linking")
  word-card(v-if="linking.type == 'word'", :record="linking")
    button.link(@click="unlink()")
      i.iconify(data-icon="la:unlink")
  sense-card(v-if="linking.type == 'sense'", :record="linking")
    button.link(@click="unlink()")
      i.iconify(data-icon="la:unlink")
</template>

<script setup>
import { linking, unlink } from "store@link";
</script>

<style lang="stylus" scoped></style>