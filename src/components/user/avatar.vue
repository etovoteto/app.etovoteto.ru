<template lang="pug">
.avatar(
  v-if="pub",
  :style="{ background: current ? pubGradient(pub) : 'transparent' }"
)
  img.avatar(
    v-if="pic",
    :src="pic",
    :title="pub",
    :class="{ [size]: true, current: current }"
  )
</template>

<script setup >
import { computed, defineProps, ref, watchEffect } from "vue";
import { useAvatar } from "use@avatar";
import { user } from "store@user";
import { pubGradient } from "use@colors";

const props = defineProps({
  pub: String,
  size: {
    type: String,
    default: "big",
  },
});

const pic = ref("");
const current = computed(() => props.pub == user.is?.pub);

watchEffect(() => {
  if (props.pub && props.pub.includes(".")) {
    pic.value = useAvatar(props.pub);
  }
});
</script>

<style lang="stylus" scoped>
.avatar
  border-radius: 8em
  width: min-content
  height: min-content
  padding: 4px
  display: flex

.small
  width: 1.5em
  height: 1.5em

.medium
  width: 4em
  height: 4em

.big
  width: 8em
  height: 8em

.large
  width: 10em
</style>