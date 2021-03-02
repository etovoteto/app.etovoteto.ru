import { gun, hashObj, roomDb } from 'store@db'

import { ref, reactive, computed } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'

import { account } from 'store@account'
import { linkFrom, link } from 'model@link'
import { state } from 'store@room'
import { links } from './locale'

export function useCount(tag, hashed = true, room = state.room) {
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

export function countAuthors(room = state.room) {
  const counter = reactive({})
  Object.keys(links).forEach((tag) => {
    gun
      .get(`~${room}`)
      .get(`#${tag}`)
      .map()
      .once((d, k) => {
        counter[k.slice(-87)] = true
      })
  })
  const count = computed(() => {
    return Object.keys(counter).length
  })
  return count
}

export function useList(tag = 'word', hashed = true, room = state.room) {
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

      this.map().on((data, key) => {
        let hash = key
        let record = {}
        let author = key.slice(-87)
        if (hashed) {
          hash = key.slice(0, 44)
          record.data = JSON.parse(data)
        }
        if (typeof record != 'object') {
          record.data = data
        }
        obj[hash] = obj[hash] || record
        obj[hash].tag = tag
        obj[hash].hash = hash

        obj[hash].timestamp = timestamps?.[key]
        obj[hash].authors = obj[hash].authors || {}
        obj[hash].authors[author] = true
        if (tag == 'room') {
          gun
            .get('~' + record.pub)
            .get('title')
            .once((title) => (obj[hash].title = title))
        }
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
