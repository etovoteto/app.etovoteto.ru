import { gun } from 'store@db'
import { reactive, ref } from 'vue'
import { useSorter } from 'use@sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { links } from 'store@locale'
import { state } from 'model@room'

export function useAuthors(room = state.room) {
  const options = reactive({
    orderBy: 'joined',
    search: '',
    limit: 12,
    page: 12,
    total: 0,
    main: 'author',
  })

  const authors = reactive({})

  Object.keys(links).forEach((tag) => {
    gun
      .get(`~${room}`)
      .get(`#${tag}`)
      .map()
      .once((data, key) => {
        let author = key.slice(-87)

        let hash = key.slice(0, 44)
        let record = JSON.parse(data)

        authors[author] = authors[author] || { pub: author }
        authors[author][tag] = authors[author][tag] || {}
        authors[author][tag][hash] = record
      })
  })

  gun
    .get(`~${room}`)
    .get('link')
    .map()
    .map()
    .once((data, key) => {
      authors[data] = authors[data] || {}
      authors[data]['link'] = authors[data]['link'] || {}
      authors[data]['link'][key] = true
    })

  const { sorted } = useSorter(authors, options)

  const more = ref()

  useIntersectionObserver(more, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      options.limit += options.page
    }
  })
  return {
    authors,
    sorted,
    options,
    more,
  }
}
