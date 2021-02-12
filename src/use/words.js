import { db, formatDate } from 'store@gun-db'
import { ref, reactive, watchEffect } from 'vue'

export const words = reactive({})

db.map().on((data, key) => {
  let record = JSON.parse(data)
  if (!record.word) return
  words[key] = record
})

db.once((d) => {
  let timestamps = d?.['_']?.['>']
  if (!timestamps) return
  for (let key in words) {
    let word = words[key]
    let timestamp = timestamps[key]
    word.timestamp = timestamp
    word.date = formatDate(timestamp).date
    word.time = formatDate(timestamp).time
  }
})

export const wordList = ref([])

watchEffect(() => {
  wordList.value = Object.values(words).sort((a, b) =>
    a.timestamp > b.timestamp ? -1 : 1,
  )
})
