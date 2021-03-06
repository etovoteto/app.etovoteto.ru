import { roomDb, sea, gun } from 'store@db'
import { account } from 'store@account'
import { reactive, computed, ref, watchEffect } from 'vue'
import { model } from 'store@locale'
import { addHashedPersonal } from 'store@item'
import { capitalFirst } from 'model@word'
import { useTitle } from '@vueuse/core'
import { search } from 'model@room'

export const roomKey = ref({})
const appTitle = 'ЭТОВОТЭТО'
export const appPub =
  'YZOBPSkw75Ute2tFhdjDQgzR-GsGhlfSlZxgEZKuquI.2F-j9ItJY44U8vcRAsj-5lxnECG5TDyuPD8gEiuInp8'

export const currentRoom = reactive({
  title: appTitle,
  pub: appPub,
  host: false,
  hosting: false,
  isRoot: computed(() => {
    return appPub == currentRoom.pub
  }),
})

roomDb.on('auth', async () => {
  currentRoom.hosting = true
})

const pageTitle = useTitle()
watchEffect(() => {
  pageTitle.value = currentRoom.title
})

export async function enterRoom(pub) {
  gun
    .get('~' + pub)
    .get('title')
    .on((d) => (currentRoom.title = d || 'noname'))
  joinRoom(pub)
  authRoom(pub)
}

export async function joinRoom(room = currentRoom.pub) {
  currentRoom.pub = room
  gun.user().get('room').get('current').put(room)
}

async function authRoom(pub) {
  let enc = await gun.user().get('room').get('host').get(pub).then()
  if (!enc) return
  try {
    let pair = await sea.decrypt(enc, gun.user()._.sea)
    console.log(pair)
    roomDb.user().auth(pair)
  } catch (e) {
    console.error(e)
  }
}

export function leaveRoom(pub) {
  gun.user().get('room').get('current').put(appPub)
  currentRoom.pub = appPub
  currentRoom.title = appTitle
  currentRoom.hosting = false
  roomDb.user().leave()
  console.info('You leaved the room')
}

export async function createRoom() {
  let pair = await sea.pair()
  addHashedPersonal('room', { pub: pair.pub })
  let enc = await sea.encrypt(pair, gun.user()._.sea)
  gun.user().get('room').get('host').get(pair.pub).put(enc)
  initRoom(pair)
  return pair.pub
}

export function initRoom(pair) {
  roomDb.user().auth(pair, async () => {
    roomDb.user().get('host').put(account.is.pub)
    roomDb.user().get('title').put(capitalFirst(search.value))
    await setCerts(pair)
    enterRoom(pair.pub)
  })
}

export async function setCerts(pair = roomDb.user()._.sea) {
  if (!pair) return
  let certDb = roomDb.user().get('cert')
  for (let tag in model) {
    let crt = await issueCert(tag, pair)
    certDb.get(tag).put(crt)
  }
  for (let tag of ['title', 'info', 'trash', 'ban']) {
    let crt = await issueCert(tag, pair, { pub: gun.user().is.pub })
    certDb.get(tag).put(crt)
  }
  return true
}

export async function issueCert(tag = 'word', pair, users = '*') {
  let hashed = model?.[tag]?.hashed || false
  let personal = model?.[tag]?.personal || false
  let path = { '*': `${hashed ? '#' : ''}${tag}` }
  if (personal) {
    path['+'] = '*'
  }
  try {
    let cert = await sea.certify(users, path, pair, null, {
      blacklist: 'ban',
    })
    return cert
  } catch (e) {
    console.log(e)
  }
}
