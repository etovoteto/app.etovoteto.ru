import { gun } from './db'
import { reactive, watch } from 'vue'

export const user = reactive({
  is: null,
  profile: {
    name: '',
  },
  ownRooms: {},
  room: {
    pub: '',
    role: 'guest',
  },
})

export function authUser(pair, cb) {
  gun.user().auth(pair, (ack) => {
    if (!ack.err) {
      logIn(cb)
    } else {
      console.error(ack.err)
    }
  })
}

gun.on('auth', async () => {
  logIn()
})

export function loadUser(pub) {
  gun
    .user(pub)
    .get('profile')
    .map()
    .on((data, key) => {
      user.profile[key] = data
    })
  gun
    .user()
    .get('ownRooms')
    .map()
    .once((d, k) => {
      user.ownRooms[k] = d
    })
}

gun.user().recall({ sessionStorage: true }, (ack) => {
  if (!ack.err) {
  } else {
    console.error("Couldn't recall a user")
  }
})

export function logIn(cb) {
  user.is = gun.user().is
  loadUser(user.is.pub)
  console.info('Logged in as ', user.is.pub)
  if (cb) cb()
}

export function findUser(alias, cb) {
  gun.get('~@' + alias).once((val) => {
    cb(val)
  })
}

function generateUser(alias, pub) {
  return {
    alias: alias,
    title: alias,
    pub: pub,
    createdAt: Date.now(),
  }
}

export function createUser(alias, pass) {
  console.log('creating')
  findUser(alias, (val) => {
    console.log(val)
  })
  gun.user().create(alias, pass, async (ack) => {
    if (!ack.err) {
      console.log('creating')
    } else {
      error(ack.err)
    }
  })
}

export function logOut() {
  let is = !!user.is?.pub
  gun.user().leave()
  setTimeout(() => {
    if (is && !gun.user()._?.sea) {
      user.is = {}
      console.info('User logged out')
    }
  }, 300)
}
