<template lang="pug">
.avatar(v-if="pub")
  img.avatar(
    v-if="pic",
    :src="pic",
    :class="{ [size]: true, current: current }"
  )
</template>

<script setup >
import { computed, defineProps, ref, watchEffect } from "vue";
import { useAvatar } from "use@avatar";
import { user } from "store@user";

const props = defineProps({
  pub: String,
  size: {
    type: String,
    default: "big",
  },
});

const pic = ref("");
const current = computed(() => props.pub == user.is.pub);

watchEffect(() => {
  if (props.pub) {
    pic.value = useAvatar(props.pub);
  }
});
</script>

<style lang="stylus" scoped>
.avatar
  border-radius: 8em

.current
  box-shadow: 0 0 0px 4px #ff8800

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