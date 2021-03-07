<template lang="pug">
.flex.flex-col.items-center.bg-warm-gray-400.w-full
  .flex.items-center.max-w-45ch.text-2xl
    .p-2(
      @click="currentRoom.trashing = !currentRoom.trashing",
      :class="{ 'text-red-800': currentRoom.trashing }"
    )
      i.iconify(data-icon="la:trash")
    router-link.p-2(to="/trash")
      i.iconify(data-icon="la:trash-alt")
    .p-2(@click="show.certs = !show.certs")
      i.iconify(data-icon="la:file-contract")
    .p-2(v-if="!currentRoom.hosting", @click="enterRoom(pub)")
      i.iconify(data-icon="la:home")
  app-certs(v-if="show.certs", :pub="currentRoom.pub")
</template>

<script setup>
import { setCerts, currentRoom, enterRoom } from "store@room";
import { useRoomCerts } from "model@room";
import { account } from "store@account";
import { defineProps, reactive } from "vue";
import { useTrash, trashHash } from "store@item";
const props = defineProps({
  pub: String,
});

const show = reactive({
  certs: false,
});

const certs = useRoomCerts(props.pub);
const trash = useTrash();
</script>

<style lang="stylus" scoped></style>