import { gun } from './../store/db'
import { reactive, ref, computed } from 'vue'
import { currentRoom } from '../store/room'

export const search = ref('')

export function favRoom(pub) {
  gun.user().get('room').get('fav').get(pub).put(true)
}

export function unFavRoom(pub) {
  gun.user().get('room').get('fav').get(pub).put(false)
}

export function useIsFav(pub) {
  let fav = ref(false)
  gun
    .user()
    .get('room')
    .get('fav')
    .get(pub)
    .on((d) => {
      fav.value = d
    })
  return { fav }
}

export function useRoom(pub) {
  const room = reactive({
    pub: pub,
    title: '',
    info: {},
    isFav: false,
    host: '',
  })
  gun
    .get(`~${pub}`)
    .get('title')
    .on((d) => (room.title = d))
    .back()
    .get('host')
    .once((d) => (room.host = d))
    .back()
    .get('info')
    .map()
    .on((d, k) => (room.info[k] = d))
  return room
}

export async function setInfo(
  tag = 'info',
  content = true,
  pub = currentRoom.pub,
) {
  let cert = await gun
    .get('~' + pub)
    .get('cert')
    .get('info')
    .then()
  gun
    .get('~' + pub)
    .get('info')
    .get(tag)
    .put(content, null, { opt: { cert } })
}

export async function setTitle(title = 'noname', pub = currentRoom.pub) {
  let cert = await gun
    .get('~' + pub)
    .get('cert')
    .get('title')
    .then()
  gun
    .get('~' + pub)
    .get('title')
    .put(title, null, { opt: { cert } })
}

export function useRoomCerts(pub = currentRoom.pub) {
  const roomCerts = reactive({})
  gun
    .get('~' + pub)
    .get('cert')
    .map()
    .on((d, k) => {
      roomCerts[k] = d
    })
  return roomCerts
}

export function useRoomCount(author, room = currentRoom.pub) {
  const counter = reactive({})
  gun
    .get(`~${room}`)
    .get('#room')
    .map()
    .on((d, k) => {
      if (!k.includes(author)) return
      counter[k] = d
    })
  const count = computed(() => {
    return Object.keys(counter).length
  })
  return count
}
