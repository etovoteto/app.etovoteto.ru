import { sea } from 'store@db'
import { user, authUser, logIn } from 'store@user'
import { gun } from 'store@db'
import { joinRoom } from 'model@room'
import { reactive, ref } from 'vue'
import { capitalFirst } from './word'
import { generateWords } from '../use/randomWords'
import { state } from 'model@room'
import { downloadText } from '../use/loader'

export { logIn }

export const authorPair = ref({})

export async function generate() {
  let pair = await sea.pair()
  participate(pair)
}

export async function participate(pair) {
  authUser(pair, async () => {
    // SAVING THE PAIR FOR TESTING PURPOSES. TO BE DELETED
    let enc = await sea.encrypt(pair, 'test')
    gun.user().get('test').put(enc)
    // END OF TEST
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

export function downloadPair() {
  let pair = gun.user()._.sea
  pair = JSON.stringify(pair)

  downloadText(pair, 'application/json', user.profile.name + '@etovoteto.json')
}

// TEST AUTHORS
export async function testAuthor(enc) {
  let dec = await sea.decrypt(enc, 'test')
  authUser(dec)
}
