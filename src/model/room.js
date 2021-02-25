import { roomDb, sea, gun } from 'store@db'
import { user } from 'store@user'
import { reactive, computed, ref, watchEffect } from 'vue'
import { model } from 'store@locale'
import { addHashedPersonal } from 'store@list'
import { generateWords } from '../use/randomWords'
import { capitalFirst } from './word'
import { issueCert } from '../use/certs'
import { useTitle } from '@vueuse/core'

export const roomKey = ref({})
const appTitle = 'ЭТОВОТЭТО'
export const appPub =
  'vCHZH0AqZ_QfHXDngLzS69p-Xu7Mn3GJf1ZP4jzaKtE.lC8d78SghL84Eg1KO1u-zzjW_SgHw3cLQOQraerLAHQ'

export const state = reactive({
  title: appTitle,
  room: appPub,
  host: false,
  isRoot: computed(() => {
    return appPub == state.room
  }),
})

export const newRoom = reactive({
  title: '',
})

roomDb.on('auth', async () => {
  console.info('You logged in as the host of this room')
})

const pageTitle = useTitle()
watchEffect(() => {
  pageTitle.value = state.title
})

export async function enterRoom(pub) {
  state.title = await gun
    .get('~' + pub)
    .get('title')
    .then()
  joinRoom(pub)
  authRoom(pub)
}

export async function joinRoom(room = state.room) {
  state.room = room
  gun.user().get('room').put(room)
  gun.user().get('rooms').get(room).put(Date.now())
}

async function authRoom(pub) {
  let enc = await gun.user().get('hosts').get(pub).then()
  if (!enc) return
  try {
    let pair = await sea.decrypt(enc, gun.user()._.sea)
    roomDb.user().auth(pair)
  } catch (e) {
    console.error(e)
  }
}

export function leaveRoom(pub) {
  gun.user().get('room').put(appPub)
  state.room = appPub
  state.title = appTitle
  roomDb.user().leave()
  console.info('You leaved the room')
}

export async function createRoom() {
  let pair = await sea.pair()
  addHashedPersonal('room', { pub: pair.pub })
  let enc = await sea.encrypt(pair, gun.user()._.sea)
  gun.user().get('hosts').get(pair.pub).put(enc)
  initRoom(pair)
  return pair.pub
}

export function initRoom(pair) {
  roomDb.user().auth(pair, async () => {
    roomDb.user().get('host').put(user.is.pub)
    roomDb.user().get('title').put(capitalFirst(newRoom.title))

    for (let tag in model) {
      let crt = await issueCert(tag, pair)
      roomDb.user().get('cert').get(tag).put(crt)
    }
    enterRoom(pair.pub)
  })
}

export function useRoomCerts(pub = state.room) {
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
