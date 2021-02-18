<template lang="pug">
.card(v-if="linking")
  word-card(v-if="linking.type == 'word'", :word="linking")
    button.link(@click="unlink()")
      i.iconify(data-icon="la:unlink")
  sense-card(v-if="linking.type == 'sense'", :sense="linking")
    button.link(@click="unlink()")
      i.iconify(data-icon="la:unlink")
</template>

<script setup>
import { linking, unlink } from "store@link";
</script>

<style lang="stylus" scoped></style>