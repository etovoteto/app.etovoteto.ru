import { gun } from 'store@db'
import { reactive, ref, watchEffect, onBeforeUnmount } from 'vue'
import { useSorter } from 'use@sorter'
import { get, useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { withLinks, links } from 'store@locale'

export function useRooms(author, room = currentRoom.pub) {
  const options = reactive({
    orderBy: 'sum',
    search: '',
    limit: 3,
    page: 3,
    total: 0,
    main: 'title',
  })

  const counter = reactive({})
  const rooms = reactive({})
  const request = gun
    .get(`~${room}`)
    .get(`#room`)
    .map()
    .once(async (data, key) => {
      let host = key.slice(-87)
      let hash = key.slice(0, 44)
      let isTrashed = await gun
        .get('~' + room)
        .get('trash')
        .get(hash)
        .then()
      if (isTrashed) return
      if (author && author != host) return
      let { pub } = JSON.parse(data)
      rooms[pub] = rooms[pub] || { pub, hash, host, data: {} }
      gun
        .get(`~${pub}`)
        .get('title')
        .on((d) => (rooms[pub].data.title = d))
        .back()
        .get('info')
        .get('desc')
        .on((d) => (rooms[pub].data.desc = d))

      counter[pub] = counter[pub] || {}
      Object.keys({ ...links, room: true }).forEach((tag) => {
        counter[pub][tag] = counter[pub][tag] || {}
        gun
          .get(`~${pub}`)
          .get(`#${tag}`)
          .map()
          .once((d, k) => {
            let author = k.slice(-87)
            let hash = k.slice(0, 44)
            counter[pub][tag][hash] = author
            counter[pub].author = counter[pub].author || {}
            counter[pub].author[author] = true
          })
      })
      counter[pub].room = counter[pub].room || {}
      gun
        .get(`~${pub}`)
        .get('room')
        .map()
        .once((d, k) => {
          counter[pub].room[k] = d
        })
    })

  const { sorted } = useSorter(rooms, options)

  watchEffect(() => {
    for (let pub in counter) {
      let sum = 0
      Object.keys({ room: true, author: true, link: true, ...links }).forEach(
        (tag) => {
          if (typeof counter[pub][tag] == 'object') {
            rooms[pub][tag] = Object.keys(counter[pub][tag]).length
            sum += rooms[pub][tag]
          } else {
            rooms[pub][tag] = 0
          }
        },
      )
      rooms[pub].sum = sum
    }
  })

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
    rooms,
    sorted,
    options,
    more,
    request,
  }
}
