import { debouncedWatch } from '@vueuse/core'
import { reactive, toRaw } from 'vue'

export function useSorter(list, options) {
  if (!window.Worker) {
    console.error('No worker support')
    return
  }

  const sorter = new Worker('/workers/sorter.js')

  const sorted = reactive({
    list: null,
    count: 0,
    more: false,
    total: 0,
  })

  debouncedWatch(
    [list, options],
    () => {
      if (list && Object.keys(list).length > 0) {
        sort(list)
      }
    },
    {
      immediate: true,
      debounce: 300,
    },
  )

  function sort(obj) {
    sorter.postMessage({
      list: toRaw(obj),
      options: toRaw(options),
    })
  }

  sorter.onmessage = (e) => {
    sorted.list = e.data.list
    sorted.count = e.data.count
    sorted.more = e.data.more
    sorted.total = e.data.total
  }

  return {
    sorted,
  }
}
