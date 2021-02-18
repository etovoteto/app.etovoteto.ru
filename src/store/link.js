import { reactive, watchEffect } from 'vue'
import { useHashList, addHashed } from 'use@hashList'

export const record = reactive({
  from: null,
  to: null,
})
