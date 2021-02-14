import { gun, appPath } from './gun-db'
import { reactive, watch } from 'vue'

export const user = reactive({
  is: null,
  profile: {
    title: '',
  },
})

export function authUser(alias, pass) {
  gun.user().auth(alias, pass, (ack) => {
    if (!ack.err) {
      logIn()
    } else {
      error(ack.err)
    }
  })
}

gun.on('auth', async () => {
  console.log('auth')
  logIn()
})

export function loadUser(pub) {
  gun
    .user(pub)
    .get(appPath)
    .get('profile')
    .map()
    .on((data, key) => {
      user.profile[key] = data
    })
  gun
    .user(pub)
    .get(appPath)
    .get('rate')
    .map()
    .on((data, key) => {
      user.rates[key] = data
    })
}

gun.user().recall({ sessionStorage: true }, (ack) => {
  if (!ack.err) {
  } else {
    console.error("Couldn't recall a user")
  }
})

export function logIn() {
  user.is = gun.user().is
  loadUser(user.is.pub)
  console.info('You successfully logged in as ' + user.is.pub + '.')
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
      let id = await getShortHash(ack.pub)
      let dbUser = db
        .get('user')
        .get(id)
        .put(generateUser(alias, ack.pub), () => {
          window.location.reload()
        })
    } else {
      error(ack.err)
    }
  })
}

export function logOut() {
  gun.user().leave()
  setTimeout(() => {
    if (!gun.user()._?.sea) {
      user.is = null
      notify('User logged out')
      window.location.reload()
    }
  }, 300)
}
