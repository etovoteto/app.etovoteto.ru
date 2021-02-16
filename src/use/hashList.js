import { gun } from 'store@gun-db'

import { ref, reactive, watchEffect } from 'vue'
import { mainRoom } from 'store@room'
import { throttledWatch } from '@vueuse/core'

export function useHashList(tag = 'word', room = mainRoom.pub) {
  const obj = reactive({})

  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .map()
    .on((data, key) => {
      let hash = key.slice(0, 44)
      let author = key.slice(-87)
      let record = JSON.parse(data)
      obj[hash] = obj[hash] || record
      obj[hash].authors = obj[hash].authors || {}
      obj[hash].authors[author] = true
    })

  const list = ref([])

  throttledWatch(obj, () => {
    list.value = Object.values(obj).sort((a, b) =>
      a.timestamp > b.timestamp ? -1 : 1,
    )
  })
  return {
    obj,
    list,
  }
}
