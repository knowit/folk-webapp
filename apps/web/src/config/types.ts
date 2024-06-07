export type AppConfig = {
  env: 'development' | 'production'
  oauthDomain: string
  redirectUrls: string[]
  userPoolClientId: string
  userPoolId: string
}
