import { sea } from 'store@db'
import { user, authUser, logIn } from 'store@user'
import { addHashedPersonal } from 'store@list'
import { gun } from '../store/db'
import { currentRoom, joinRoom } from './room'
import { reactive, ref } from 'vue'
import { useSorter } from '../use/sorter'
import { useIntersectionObserver } from '@vueuse/core'

export { logIn }

export async function generate() {
  let pair = await sea.pair()
  authUser(pair, async () => {
    // SAVING PAIR FOR TESTING PURPOSES. TO BE DELETED
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

  const obj = reactive({})
  let timestamps = {}

  gun
    .get(`~${room}`)
    .get('author')
    .map()
    .on(function (data, key) {
      let pub = key
      obj[key] = { ...data }
      obj[key].pub = key
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
