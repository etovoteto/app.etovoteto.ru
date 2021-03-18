import { onBeforeUnmount } from 'vue'
import { gun } from 'store@db'
import { reactive, ref, watchEffect } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { currentRoom } from 'store@room'
import { withLinks, links } from 'store@locale'

export function useAuthors(room = currentRoom.pub) {
  const options = reactive({
    orderBy: 'sum',
    search: '',
    limit: 12,
    page: 12,
    total: 0,
    main: 'name',
  })

  const counter = reactive({})

  Object.keys(links).forEach((tag) => {
    gun
      .get(`~${room}`)
      .get(`#${tag}`)
      .map()
      .once((data, key) => {
        let author = key.slice(-87)
        let hash = key.slice(0, 44)

        counter[author] = counter[author] || {}
        counter[author][tag] = counter[author][tag] || {}
        counter[author][tag][hash] = true
      })
  })

  const request = gun
    .get(`~${room}`)
    .get(`link`)
    .map()
    .map()
    .once((data, key) => {
      let author = data
      let hash = key

      counter[author] = counter[author] || {}
      counter[author].link = counter[author].link || {}
      counter[author]['link'][hash] = true
    })

  const authors = reactive({})
  const { sorted } = useSorter(authors, options)

  watchEffect(() => {
    for (let author in counter) {
      authors[author] = authors[author] || { pub: author, sum: '0' }
      gun
        .get(`~${author}`)
        .get('presence')
        .on((d) => (authors[author].presence = d))
        .back()
        .get('profile')
        .get('name')
        .on((d) => (authors[author].name = d))
        .back()
        .get('full')
        .on((d) => (authors[author].full = d))
        .back()
        .get('city')
        .on((d) => (authors[author].city = d))
      let sum = 0
      Object.keys(links).forEach((tag) => {
        if (typeof counter[author][tag] == 'object') {
          authors[author][tag] = Object.keys(counter[author][tag]).length
          sum += authors[author][tag]
        } else {
          authors[author][tag] = 0
        }
      })
      authors[author].sum = sum
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
    authors,
    sorted,
    options,
    more,
    request,
  }
}
