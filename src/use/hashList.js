import { gun, hashObj } from 'store@gun-db'

import { ref, reactive } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { user } from 'store@user'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'

export function useHashList(tag = 'word', room = currentRoom.pub) {
  const obj = ref({})
  let ev = null

  onMounted(() => {
    console.log('mounbted', tag, room, obj)
    let timestamps = {}
    gun
      .get(`~${room}`)
      .get(`#${tag}`)
      .on((d, k) => {
        timestamps = d['_']['>']
      })
      .map()
      .on((data, key, g, _ev) => {
        ev = _ev
        let hash = key.slice(0, 44)
        let author = key.slice(-87)
        let record = JSON.parse(data)
        obj.value[hash] = obj.value[hash] || record
        if (typeof record != 'object') return
        obj.value[hash].timestamp = timestamps[key]
        obj.value[hash].authors = obj.value[hash].authors || {}
        obj.value[hash].authors[author] = true
      })
  })

  onBeforeUnmount(() => {
    if (ev) ev.off()
  })

  const options = reactive({
    orderBy: 'timestamp',
    search: '',
    limit: 12,
    page: 12,
    total: 0,
    main: tag,
  })
  const { sorted } = useSorter(obj, options)

  const more = ref()

  useIntersectionObserver(more, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      options.limit += options.page
    }
  })
  return {
    obj,
    sorted,
    options,
    more,
  }
}

export async function addHashed(tag, obj, room = currentRoom.pub) {
  let certificate = await gun.get(`~${room}`).get('cert').get(tag).then()
  const { text, hash } = await hashObj(obj)
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get(`${hash}#${user.is.pub}`)
    .put(text, null, { opt: { cert: certificate } })
}

export function linkHashes(from, to, room = currentRoom.pub) {
  gun.get(`!${room}`).get('link').get(`${from}@${to}`)
}
