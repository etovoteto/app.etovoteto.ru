import { gun, hashObj, roomGun } from 'store@db'

import { ref, reactive, computed } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'model@room'
import { user } from 'store@user'
import { linking, link } from 'model@link'

export function useCount(tag, hashed = true, room = currentRoom?.pub) {
  const counter = reactive({})
  gun
    .get(`~${room}`)
    .get(`${hashed ? '#' : ''}${tag}`)
    .map()
    .once((d, k) => {
      counter[k] = true
    })
  const count = computed(() => {
    return Object.keys(counter).length
  })
  return count
}

export function useList(tag = 'word', hashed = true, room = currentRoom.pub) {
  const options = reactive({
    orderBy: 'timestamp',
    search: '',
    limit: 5,
    page: 5,
    total: 0,
    main: tag,
  })

  const obj = reactive({})

  let ev = null
  let timestamps = {}

  gun
    .get(`~${room}`)
    .get(`${hashed ? '#' : ''}${tag}`)
    .on(function (d, k) {
      timestamps = d['_']['>']

      this.map().on(function (data, key) {
        let hash = key
        let record = data
        let author = key.slice(-87)
        if (hashed) {
          hash = key.slice(0, 44)
          record = JSON.parse(data)
        }
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

export async function addHashedPersonal(tag, obj, room = currentRoom.pub) {
  let certificate = await gun.get(`~${room}`).get('cert').get(tag).then()
  const { text, hash } = await hashObj(obj)
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get(`${hash}#${user.is.pub}`)
    .put(text, null, { opt: { cert: certificate } })
  link({ hash, tag, ...obj })
}

export function getHashedPersonal(tag, hash, room = currentRoom.pub) {
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
