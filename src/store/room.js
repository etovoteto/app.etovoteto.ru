import { roomGun } from 'store@gun-db'
import { user } from 'store@user'
import { reactive } from 'vue'
import { appModel } from 'store@model'

const appPair = {
  pub:
    'ACHCKvZFFLdiFhtqSiKyxPNIjdRXtkS3WV9jKCP-XsQ.AGhaxvEDsiD8_MBbZrc_gR-sjNeLJ-cT0ISM2Smor6k',
  priv: 'JwDHPqohvEowZtJji5wBuLt4bMJBW_-ouhGVQeSrVDA',
  epub:
    'FlAuUWCmnZ8WK903lhLKf2VFpHQFFINviU9XxdTpi2Y.uscKgZ8Oo_vpAwvxyf8Jp6pfYen2WbOlESDZI55v-A4',
  epriv: 'zP3uDliPugDAAdi3KmzxtXuP0Y0m5NJK2vaXlY_DzK0',
}

export const currentRoom = reactive({
  pub: appPair.pub,
  certs: {
    full:
      'SEA{"m":{"c":"*","w":[{"*":"#word","+":"*"},{"*":"#sense","+":"*"},{"*":"author","+":"*"},{"*":"link","+":"*"},{"*":"room","+":"*"}],"wb":"banlist"},"s":"bH72gggJmnv5tmQHgiC1g4WE6FnqbyAnbLQkAjHX/zAcu0uO+ad5gr/dOfx51wdi6bh15lSLvbEZmd2OAwqnpw=="}',
  },
})

issueCerts()

export async function issueCerts() {
  for (let tag of appModel) {
    currentRoom.certs[tag] = await issueAppCert(undefined, tag)
  }
}

export async function issueAppCert(
  users = '*',
  tag = '#word',
  personal = true,
) {
  let path = { '*': tag }
  if (personal) {
    path['+'] = '*'
  }
  let cert = await SEA.certify(users, path, appPair, null, {
    blacklist: 'banlist',
  })
  return cert
}

import { asyncComputed } from '@vueuse/core'

export const cert = asyncComputed(async () => {
  return await issueAppCert()
})
