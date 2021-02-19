import { gun, hashObj, roomGun } from 'store@gun-db'

import { ref, reactive } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { user } from 'store@user'

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

  let ev = null
  let timestamps = {}

  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .on(function (d, k) {
      timestamps = d['_']['>']

      this.map().on(function (data, key) {
        let hash = key.slice(0, 44)
        let author = key.slice(-87)
        let record = JSON.parse(data)
        if (typeof record != 'object') {
          record = { data: record }
        }
        obj[hash] = obj[hash] || record
        obj[hash].tag = tag
        obj[hash].hash = hash

        obj[hash].timestamp = timestamps?.[key]
        obj[hash].authors = obj[hash].authors || {}
        obj[hash].authors[author] = true
      })
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

export function getHashed(tag, hash, room = currentRoom.pub) {
  const record = reactive({})
  roomGun
    .get(`~${room}`)
    .get(`#${tag}`)
    .map()
    .on(function (data, key) {
      if (key.includes(hash)) {
        record.data = JSON.parse(data)
        record.authors = record.authors || {}
        record.authors[key.slice(-87)] = true
      }
    })
  return { record }
}
