import { sea } from 'store@db'
import { model } from 'store@locale'

export async function issueCert(tag = 'word', pair = appPair, users = '*') {
  let hashed = model[tag].hashed
  let personal = model[tag].personal
  let path = { '*': `${hashed ? '#' : ''}${tag}` }
  if (personal) {
    path['+'] = '*'
  }
  try {
    let cert = await sea.certify(users, path, pair, null, {
      blacklist: 'banlist',
    })
    return cert
  } catch (e) {
    console.log(e)
  }
}
