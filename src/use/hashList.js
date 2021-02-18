import { gun, hashObj } from 'store@gun-db'

import { ref, reactive } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { user } from 'store@user'
import { onBeforeUnmount } from 'vue'
import { getLinks } from '../store/link'

export function useHashList(tag = 'word', room = currentRoom.pub) {
  const options = reactive({
    orderBy: 'timestamp',
    search: '',
    limit: 12,
    page: 12,
    total: 0,
    main: tag,
  })

  const obj = reactive({})
  const { sorted } = useSorter(obj, options)
  let ev = null
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
      if (typeof record != 'object') {
        record = { data: record }
      }
      obj[hash] = obj[hash] || record
      obj[hash].type = tag
      obj[hash].hash = hash

      obj[hash].timestamp = timestamps[key]
      obj[hash].authors = obj[hash].authors || {}
      obj[hash].authors[author] = true
    })

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

export function getHashed(tag, hash, room = currentRoom.pub) {
  const record = ref({})
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get({ '.': { '*': hash } })
    .map()
    .on((d, k) => {
      record.value = JSON.parse(d)
      record.value.authors = record.value.authors || {}
      record.value.authors[k.slice(-87)] = true
    })
  return record
}
