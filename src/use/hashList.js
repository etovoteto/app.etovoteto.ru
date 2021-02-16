import { gun, hashObj } from 'store@gun-db'

import { ref, reactive } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { Room } from 'store@room'
import { user } from 'store@user'

export function useHashList(tag = 'word', room = currentRoom.pub) {
  const obj = reactive({})
  let timestamps = {}
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .on((d, k) => {
      timestamps = d['_']['>']
    })
    .map((item, a, g) => {
      return JSON.parse(item)
    })
    .on((data, key, g) => {
      let hash = key.slice(0, 44)
      let author = key.slice(-87)
      let record = data
      obj[hash] = obj[hash] || record
      obj[hash].timestamp = timestamps[key]
      obj[hash].authors = obj[hash].authors || {}
      obj[hash].authors[author] = true
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

export async function addHashed(
  tag,
  obj,
  room = currentRoom.pub,
  certificate = currentRoom.certs.full,
) {
  const { text, hash } = await hashObj(obj)
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get(`${hash}#${user.is.pub}`)
    .put(text, null, { opt: { cert: certificate } })
}
