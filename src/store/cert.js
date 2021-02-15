let appPair = {
  pub:
    'ACHCKvZFFLdiFhtqSiKyxPNIjdRXtkS3WV9jKCP-XsQ.AGhaxvEDsiD8_MBbZrc_gR-sjNeLJ-cT0ISM2Smor6k',
  priv: 'JwDHPqohvEowZtJji5wBuLt4bMJBW_-ouhGVQeSrVDA',
  epub:
    'FlAuUWCmnZ8WK903lhLKf2VFpHQFFINviU9XxdTpi2Y.uscKgZ8Oo_vpAwvxyf8Jp6pfYen2WbOlESDZI55v-A4',
  epriv: 'zP3uDliPugDAAdi3KmzxtXuP0Y0m5NJK2vaXlY_DzK0',
}

issueAppCert()

export async function issueAppCert() {
  let cert = await SEA.certify(
    '*',
    [
      { '*': '#word', '+': '*' },
      { '*': '#sense', '+': '*' },
      { '*': 'author', '+': '*' },
      { '*': 'link', '+': '*' },
      { '*': 'room', '+': '*' },
    ],
    appPair,
    null,
    {
      blacklist: 'banlist',
    },
  )
  return cert
}

import { asyncComputed } from '@vueuse/core'

export const cert = asyncComputed(async () => {
  return await issueAppCert()
})
