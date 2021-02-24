import { roomDb, sea, gun } from 'store@db'
import { user } from 'store@user'
import { reactive, ref, watchEffect } from 'vue'
import { model } from 'store@locale'
import { addHashedPersonal } from 'store@list'
import { generateWords } from '../use/randomWords'
import { capitalFirst } from './word'

export const appPub =
  'vCHZH0AqZ_QfHXDngLzS69p-Xu7Mn3GJf1ZP4jzaKtE.lC8d78SghL84Eg1KO1u-zzjW_SgHw3cLQOQraerLAHQ'

export const roomKey = ref({})
export const currentRoom = reactive({
  pub: appPub,
})

export function useRoomCerts(pub = currentRoom.pub) {
  const roomCerts = reactive({})
  roomDb
    .get('~' + pub)
    .get('cert')
    .map()
    .on((d, k) => {
      roomCerts[k] = d
    })
  return roomCerts
}

roomDb.on('auth', async () => {
  console.info('You entered a room')
})

export async function enterRoom(pub) {
  gun.user().get('currentRoom').put(pub)
  currentRoom.pub = pub
}

export async function leaveRoom(pub) {
  gun.user().get('currentRoom').put(appPub)
  currentRoom.pub = appPub
}

export async function createRoom() {
  let pair = await sea.pair()
  initRoom(pair)
  addHashedPersonal('room', { pub: pair.pub })
  let enc = await sea.encrypt(pair, gun.user()._.sea)
  gun.user().get('ownRooms').get(pair.pub).put(enc)
}

export function initRoom(pair) {
  roomDb.user().auth(pair, async () => {
    for (let tag in model) {
      let crt = await issueCert(tag, pair)
      roomDb.user().get('cert').get(tag).put(crt)
      roomDb.user().get('owner').put(user.is.pub)
      roomDb.user().get('title').put(capitalFirst(generateWords()))
    }
  })
}

export async function issueCert(tag = 'word', pair = appPair, users = '*') {
  let hashed = model[tag].hashed
  let personal = model[tag].personal
  let path = { '*': `${hashed ? '#' : ''}${tag}` }
  if (personal) {
    path['+'] = '*'
  }
  try {
    let cert = await SEA.certify(users, path, pair, null, {
      blacklist: 'banlist',
    })
    return cert
  } catch (e) {
    console.log(e)
  }
}

export async function joinRoom(room = currentRoom.pub) {
  gun.user().get('currentRoom').put(room)
  gun.user().get('rooms').get(room).put(Date.now())
}
