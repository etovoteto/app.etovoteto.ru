<template lang="pug">
section.current CURRENT ROOM
.id(:style="{ background: pubGradient(currentRoom.pub, 90) }") {{ currentRoom.pub }}
</template>

<script setup>
import { currentRoom } from "../../model/room";
import { pubGradient } from "../../use/colors";
</script>

<style lang="stylus" scoped></style>