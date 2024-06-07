import { defineConfig } from '../defineConfig'

export function createDevConfig() {
  return defineConfig({
    env: 'development',
    oauthDomain: 'dev-folk-user-pool.auth.eu-central-1.amazoncognito.com',
    redirectUrls: ['https://localhost:3000/', 'https://dev.folk.knowit.no/'],
    userPoolClientId: '71ra92knndj86vr394ohcds1uc',
    userPoolId: 'eu-central-1_j53koCuOX',
  })
}
