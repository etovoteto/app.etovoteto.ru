import { onBeforeUnmount } from 'vue'
import { gun, hashObj, roomDb } from 'store@db'
import { ref, reactive, computed } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { links } from 'store@locale'

export function useCount(tag, hashed = true, room = currentRoom.pub, author) {
  const counter = reactive({})
  gun
    .get(`~${room}`)
    .get(`${hashed ? '#' : ''}${tag}`)
    .map()
    .once(async (d, k) => {
      let hash = k.slice(0, 44)
      let isTrashed = await gun
        .get('~' + room)
        .get('trash')
        .get(hash)
        .then()
      if (isTrashed) return
      if (author && k.slice(-87) != author) return
      counter[k] = true
    })
  const count = computed(() => {
    return Object.keys(counter).length
  })
  return count
}

export function countAuthors(room = currentRoom.pub) {
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

export function useList(
  tag = 'word',
  personal,
  room = currentRoom.pub,
  hashed = true,
  limit = 5,
  page = 5,
) {
  const options = reactive({
    orderBy: 'timestamp',
    search: '',
    limit: limit,
    page: page,
    total: 0,
    main: tag,
    hashed,
  })

  const obj = reactive({})

  let timestamps = {}

  const request = gun
    .get(`~${room}`)
    .get(`${hashed ? '#' : ''}${tag}`)
    .once(function (d, k) {
      timestamps = d?.['_']?.['>']
      this.map().once(async (data, key) => {
        let hash = key
        let record = {}
        let author = key.slice(-87)
        if (personal && personal != author) return
        if (hashed) {
          hash = key.slice(0, 44)
        }

        record.data = data

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

  const observer = useIntersectionObserver(more, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      options.limit += options.page
    }
  })

  onBeforeUnmount(() => {
    observer.stop()
    request.off()
  })
  return {
    obj,
    sorted,
    options,
    more,
    request,
  }
}
