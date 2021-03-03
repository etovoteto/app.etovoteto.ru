import { gun } from 'store@db'
import { reactive, ref, watchEffect } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { withLinks, links } from 'store@locale'

export function useRooms(room = currentRoom.pub) {
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
  gun
    .get(`~${room}`)
    .get(`#room`)
    .map()
    .once((data, key) => {
      let host = key.slice(-87)
      let { pub } = JSON.parse(data)
      rooms[pub] = rooms[pub] || { pub, host, data: {} }
      gun
        .get(`~${pub}`)
        .get('title')
        .once((d) => (rooms[pub].data.title = d))

      counter[pub] = counter[pub] || {}
      Object.keys(links).forEach((tag) => {
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
      counter[pub].link = counter[pub].link || {}
      gun
        .get(`~${pub}`)
        .get('link')
        .map()
        .map()
        .once((d, k) => {
          let author = d
          let hash = k
          counter[pub].link[hash] = author
          counter[pub].author = counter[pub].author || {}
          counter[pub].author[author] = true
        })
    })

  const { sorted } = useSorter(rooms, options)

  watchEffect(() => {
    for (let pub in counter) {
      let sum = 0
      Object.keys({ author: true, link: true, ...links }).forEach((tag) => {
        if (typeof counter[pub][tag] == 'object') {
          rooms[pub][tag] = Object.keys(counter[pub][tag]).length
          sum += rooms[pub][tag]
        } else {
          rooms[pub][tag] = 0
        }
      })
      rooms[pub].sum = sum
    }
  })

  const more = ref()

  useIntersectionObserver(more, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      options.limit += options.page
    }
  })
  return {
    rooms,
    sorted,
    options,
    more,
  }
}
