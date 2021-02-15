<template lang="pug">
article
  user-avatar(:pub="user.is?.pub", size="large")
</template>

<script setup>
import { user } from "../store/user";
</script>

<style lang="stylus" scoped></style>