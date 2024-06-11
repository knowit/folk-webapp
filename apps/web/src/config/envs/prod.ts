import { defineConfig } from '../defineConfig'

export function createProdConfig() {
  return defineConfig({
    env: 'production',
    oauthDomain: 'prod-folk-user-pool.auth.eu-central-1.amazoncognito.com',
    redirectUrls: ['https://folk.knowit.no/'],
    userPoolClientId: '4447oe7lraspnfmetdd5bv431c',
    userPoolId: 'eu-central-1_774ftywyI',
  })
}
