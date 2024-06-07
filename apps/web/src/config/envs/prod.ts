import { defineConfig } from '../defineConfig'

export function createProdConfig() {
  return defineConfig({
    env: 'production',
    oauthDomain: 'https://auth.knowit.no/',
    redirectUrls: ['https://folk.knowit.no/'],
    userPoolClientId: '4447oe7lraspnfmetdd5bv431c',
    userPoolId: 'eu-central-1_774ftywyI',
  })
}
