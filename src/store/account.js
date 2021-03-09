import { generateWords } from 'use@randomWords'
import { capitalFirst } from 'model@word'
import { reactive, ref } from 'vue'
import { gun, sea } from 'store@db'
import { downloadText } from 'use@loader'
import { joinRoom } from 'store@room'
import { computed } from 'vue'
import { asyncComputed } from '@vueuse/core'
import { onMounted } from 'vue'
import { getState } from './db'

// let beatTimer

export const account = reactive({
  is: null,
  profile: {
    name: '',
  },
})

gun.user().recall({ sessionStorage: true }, () => {
  logIn()
})

gun.on('auth', () => {
  logIn()
})

function logIn() {
  account.is = gun.user().is
  // beatTimer = setInterval(() => {
  //   gun.user().get('presence').put(getState())
  // }, 2500)
  console.info('Logged in as ', account.is.pub)
  loadProfile(account.is.pub)
}

export function loadProfile(pub) {
  gun
    .user()
    .get('profile')
    .map()
    .on((data, key) => {
      account.profile[key] = data
    })
}

export function logOut() {
  let is = !!account.is?.pub
  gun.user().leave()
  // clearInterval(beatTimer)
  setTimeout(() => {
    if (is && !gun.user()._?.sea) {
      account.is = null
      account.profile = {}
      console.info('User logged out')
    }
  }, 300)
}

export function downloadPair() {
  let pair = gun.user()._.sea
  pair = JSON.stringify(pair)

  downloadText(
    pair,
    'application/json',
    account.profile.name + '@etovoteto.json',
  )
}

export async function generate() {
  let pair = await sea.pair()
  participate(pair)
}

export async function participate(pair) {
  gun.user().auth(pair, async () => {
    let name = await gun.user().get('profile').get('name').then()
    if (!name) {
      gun.user().get('profile').get('name').put(capitalFirst(generateWords()))
    }
    joinRoom()
  })
}

export function updateProfile(field, data) {
  if (data) {
    gun.user().get('profile').get(field).put(data)
  }
}

// TEST AUTHORS
export async function testAuthor(enc) {
  let dec = await sea.decrypt(enc, 'test')
  participate(dec)
}

export function usePassword() {
  const pass = reactive({
    text: '',
    pair: '',
  })
  onMounted(() => {
    gun
      .user()
      .get('pass')
      .map()
      .on((d, k) => {
        pass[k] = d
      })
  })

  pass.is = asyncComputed(async () => {
    if (pass.password) {
      return await sea.decrypt(pass.password, gun.user()._.sea)
    }
  })

  async function setPass(password) {
    let pair = gun.user()._.sea
    let encPair = await sea.encrypt(pair, password)
    let encPass = await sea.encrypt(password, pair)
    gun.user().get('pass').get('pair').put(encPair)
    gun.user().get('pass').get('password').put(encPass)
    pass.text = ''
  }

  return { pass, setPass }
}

export async function logWithPass(pub, password) {
  let encPair = await gun.get(`~${pub}`).get('pass').get('pair').then()
  let pair = await sea.decrypt(encPair, password)
  participate(pair)
}

export async function hasPass(pub) {
  let pass = await gun.get(`~${pub}`).get('pass').get('pair').then()
  return pass
}
