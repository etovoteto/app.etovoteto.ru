<template lang="pug">
.flex.bg-warm-gray-300
  .font-bold.p-2.rounded-full.text-green-800(
    v-for="(cert, tag) in certs",
    :key="cert",
    :title="cert"
  )
    i.iconify(data-icon="la:unlock-alt")

  .p-2(
    v-if="currentRoom.pub == pub && currentRoom.hosting",
    @click="setCerts()"
  )
    i.iconify(data-icon="la:file-contract")
</template>

<script setup>
import { setCerts, currentRoom, enterRoom } from "store@room";
import { useRoomCerts } from "model@room";
import { account } from "store@account";
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});

const certs = useRoomCerts(props.pub);
</script>

<style lang="stylus" scoped></style>