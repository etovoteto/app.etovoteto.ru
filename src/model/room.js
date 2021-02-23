import { roomGun, sea, gun } from 'store@db'
import { user } from 'store@user'
import { reactive, ref, watchEffect } from 'vue'
import { model } from 'store@locale'
import { addHashedPersonal } from 'store@list'

export const appPub =
  'vCHZH0AqZ_QfHXDngLzS69p-Xu7Mn3GJf1ZP4jzaKtE.lC8d78SghL84Eg1KO1u-zzjW_SgHw3cLQOQraerLAHQ'

export const roomKey = ref({})
export const currentRoom = reactive({
  pub: appPub,
})

export const roomCerts = reactive({})

roomGun
  .get('~' + appPub)
  .get('cert')
  .map()
  .on((d, k) => {
    roomCerts[k] = d
  })

roomGun.on('auth', async () => {
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
  initCerts(pair)
  addHashedPersonal('room', { pub: pair.pub })
  let enc = await sea.encrypt(pair, gun.user()._.sea)
  gun.user().get('myRooms').get(pair.pub).put(enc)
}

export function initCerts(pair) {
  roomGun.user().auth(pair, async () => {
    for (let tag in model) {
      let crt = await issueCert(tag, pair)
      roomGun.get(`~${pair.pub}`).get('cert').get(tag).put(crt)
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

export async function joinRoom(pub = user.is.pub, room = currentRoom.pub) {
  let certificate = await gun.get(`~${room}`).get('cert').get('author').then()
  let timestamp = Date.now()
  gun
    .get(`~${room}`)
    .get('author')
    .get(pub)
    .put(
      { joined: timestamp, entered: timestamp, leaved: 0, presence: timestamp },
      null,
      { opt: { cert: certificate } },
    )
  gun.user().get('currentRoom').put(currentRoom.pub)
  gun.user().get('rooms').get(pub).put(timestamp)
}
