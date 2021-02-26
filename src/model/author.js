import { gun, sea } from 'store@db'
import { joinRoom } from 'model@room'
import { reactive, ref } from 'vue'
import { capitalFirst } from './word'
import { generateWords } from '../use/randomWords'
import { state } from 'model@room'
import { downloadText } from '../use/loader'

export const author = reactive({
  is: null,
  profile: {
    name: '',
  },
  ownRooms: {},
  room: '',
})

gun.user().recall({ sessionStorage: true }, () => {
  logIn()
})

gun.on('auth', async () => {
  logIn()
})

function logIn() {
  author.is = gun.user().is
  console.info('Logged in as ', author.is.pub)
  loadProfile(author.is.pub)
}

export async function generate() {
  let pair = await sea.pair()
  participate(pair)
}

export async function participate(pair) {
  gun.user().auth(pair, async () => {
    // --
    let enc = await sea.encrypt(pair, 'test')
    // SAVING THE PAIR FOR TESTING PURPOSES
    gun.user().get('test').put(enc)
    // --

    let name = await gun.user().get('profile').get('name').then()
    if (!name) {
      gun.user().get('profile').get('name').put(capitalFirst(generateWords()))
    }
    joinRoom()
  })
}

export function loadProfile(pub) {
  gun
    .user()
    .get('profile')
    .map()
    .on((data, key) => {
      author.profile[key] = data
    })
  gun
    .user()
    .get('ownRooms')
    .map()
    .once((d, k) => {
      author.ownRooms[k] = d
    })
}

export function updateProfile(field, data) {
  if (data) {
    gun.user().get('profile').get(field).put(data)
  }
}

export function downloadPair() {
  let pair = gun.user()._.sea
  pair = JSON.stringify(pair)

  downloadText(
    pair,
    'application/json',
    author.profile.name + '@etovoteto.json',
  )
}

// TEST AUTHORS
export async function testAuthor(enc) {
  let dec = await sea.decrypt(enc, 'test')
  participate(dec)
}

export function logOut() {
  let is = !!author.is?.pub
  gun.user().leave()
  setTimeout(() => {
    if (is && !gun.user()._?.sea) {
      author.is = null
      console.info('User logged out')
    }
  }, 300)
}
