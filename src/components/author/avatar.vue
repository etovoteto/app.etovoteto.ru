<template lang="pug">
router-link.avatar.m-1.p-2.rounded-full(
  :to="`/author/${pub}`",
  v-if="pub",
  :title="pub",
  :style="{ background: current ? pubGradient(pub) : 'transparent' }"
)
  img.avatar.rounded-full(
    v-if="pic",
    :src="pic",
    :title="pub",
    :style="{ width: size }",
    :class="{ current: current }"
  )
</template>

<script setup >
import { computed, defineProps, ref, watchEffect } from "vue";
import { gunAvatar } from "gun-avatar";
import { account } from "store@account";
import { pubGradient } from "use@colors";

const props = defineProps({
  pub: String,
  size: {
    type: Number,
    default: 400,
  },
});

const pic = ref("");
const current = computed(() => props.pub == account.is?.pub || props.size < 10);

watchEffect(() => {
  if (props.pub && props.pub.includes(".") && props.size >= 10) {
    pic.value = gunAvatar(props.pub, props.size);
  }
});
</script>

<style lang="stylus" scoped>
.avatar
  min-width: 0.5rem
  min-height: 0.5rem
</style>