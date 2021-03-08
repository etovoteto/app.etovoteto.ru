<template lang="pug">
.flex.flex-col.mb-12.mt-4.p-4.bg-warm-gray-50
  .flex.items-center
    span.text-2xl
      i.iconify(data-icon="la:external-link-square-alt-solid")
    button(@click="show.qr = !show.qr")
      i.iconify(data-icon="la:qrcode")
      .title QR
    button(v-if="shareSupported", @click="startShare()")
      i.iconify(data-icon="la:share")
      .title Share
    button(
      v-if="shareSupported",
      @click="copy(`${appUrl}#${$route.fullPath}`)"
    )
      i.iconify(data-icon="la:copy")
      .title Copy
  .flex
    transition(name="fade")
      util-qr(v-if="show.qr", :data="`${appUrl}#${$route.fullPath}`")
</template>

<script setup>
import { appUrl } from "store@locale";
import { reactive } from "vue";

const show = reactive({
  qr: false,
});

import { useShare } from "@vueuse/core";
const { share, isSupported: shareSupported } = useShare();

function startShare() {
  share({
    title: "Hello",
    text: "Hello my friend!",
    url: location.href,
  });
}

import { useClipboard } from "@vueuse/core";

const { text, copy, isSupported: clipboardSupported } = useClipboard();
</script>

<style  scoped>
button {
  @apply mx-2 py-3 px-3 bg-warm-gray-300 rounded-full;
}
</style>