const config = {
  appPub:
    'ACHCKvZFFLdiFhtqSiKyxPNIjdRXtkS3WV9jKCP-XsQ.AGhaxvEDsiD8_MBbZrc_gR-sjNeLJ-cT0ISM2Smor6k',
  cert:
    'SEA{"m":{"c":"*","w":[{"*":"#word","+":"*"},{"*":"#sense","+":"*"},{"*":"author","+":"*"},{"*":"link","+":"*"},{"*":"room","+":"*"}],"wb":"banlist"},"s":"bH72gggJmnv5tmQHgiC1g4WE6FnqbyAnbLQkAjHX/zAcu0uO+ad5gr/dOfx51wdi6bh15lSLvbEZmd2OAwqnpw=="}',
  dbVersion: 29,
  peers: null, // ['http://127.0.0.1:4200/gun', 'https://gun-feeds.glitch.me/gun'],
}

checkDbVersion(localStorage.dbVersion, config.dbVersion)

import Gun from 'gun/gun'
import SEA from 'gun/sea.js'
import 'gun/lib/then'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import 'gun/lib/webrtc'
import 'gun/nts'

export const gun = Gun(config.peers)
export const gunRoom = Gun(config.peers)
window.gun = gun //for debugging
export const appPub = config.appPub
export const cert = config.cert
export const db = gun.get('~' + appPub)
export const soul = Gun.node.soul
export const isNode = Gun.node.is
export const getState = Gun.state.is //(node,'key') => timestamp
export const sea = SEA
export const genUuid = Gun.text.random

export async function getShortHash(text) {
  return await sea.work(text, appPub, null, { name: 'SHA-1', encode: 'hex' })
}

export function cutUuid(key) {
  if (!key) return
  return key.substring(key.lastIndexOf('/') + 1)
}

export function isLink(name, field) {
  return name != '_' && field instanceof Object && field.hasOwnProperty('#')
}

function checkDbVersion(local, current) {
  if (!local) {
    localStorage.dbVersion = current
    console.log('DB version is now ' + local)
  } else if (local < current) {
    console.error(
      `New DB version ${current} detected. Clearing local database.`,
    )
    localStorage.clear()
    indexedDB.deleteDatabase('radata')
    localStorage.dbVersion = current
  } else {
    console.info('DB version: ' + local)
  }
}

export function formatDate(date) {
  if (!date) return
  let theDate = new Date(Number(date))
  return {
    date: theDate.toLocaleDateString('en-CA'),
    time: theDate.toLocaleTimeString('en-CA'),
  }
}
