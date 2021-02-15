import { gun, appPub } from 'store@gun-db'
import { ref, reactive, watchEffect } from 'vue'
import { getState } from '../store/gun-db'

export function useWords(room = appPub) {
  const obj = reactive({})

  gun
    .get('~' + room)
    .get('#word')
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

  watchEffect(() => {
    list.value = Object.values(obj).sort((a, b) =>
      a.timestamp > b.timestamp ? -1 : 1,
    )
  })

  return {
    obj,
    list,
  }
}
