import { sea } from 'store@db'
import { user, authUser, logIn } from 'store@user'
import { addHashedPersonal } from 'store@list'
import { gun } from '../store/db'
import { currentRoom, joinRoom } from './room'
import { reactive, ref } from 'vue'
import { useSorter } from '../use/sorter'
import { useIntersectionObserver } from '@vueuse/core'
import { links } from '../store/locale'

export { logIn }

export async function generate() {
  let pair = await sea.pair()
  authUser(pair, async () => {
    // SAVING THE PAIR FOR TESTING PURPOSES. TO BE DELETED
    let enc = await sea.encrypt(pair, 'test')
    gun.user().get('test').put(enc)
    // END OF TEST
    joinRoom(pair.pub)
  })
}
// TEST AUTHORS
export async function testAuthor(enc) {
  let dec = await sea.decrypt(enc, 'test')
  authUser(dec)
}

export function useAuthors(room = currentRoom.pub) {
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
