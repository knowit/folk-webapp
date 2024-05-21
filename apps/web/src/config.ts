const config = {
  cognito: {
    APP_CLIENT_ID: '71ra92knndj86vr394ohcds1uc',
    USER_POOL_ID: 'eu-central-1_j53koCuOX',
    login: {
      OAUTH_DOMAIN: 'dev-folk-user-pool.auth.eu-central-1.amazoncognito.com',
      OAUTH_SCOPES: ['email', 'openid', 'profile'],
      OAUTH_REDIRECT_SIGNIN: ['https://localhost:3000/'],
      OAUTH_REDIRECT_SIGNOUT: ['https://localhost:3000/'],
    },
  },
}

export default config
