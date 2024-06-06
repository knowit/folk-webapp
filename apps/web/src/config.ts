const config = {
  cognito: {
    APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    login: {
      OAUTH_DOMAIN: process.env.REACT_APP_OAUTH_DOMAIN,
      OAUTH_SCOPES: ['email', 'openid', 'profile'],
      OAUTH_REDIRECT_SIGNIN:
        process.env.NODE_ENV === 'production'
          ? ['https://folk.knowit.no/']
          : ['https://localhost:3000/', 'https://dev.folk.knowit.no/'],
      OAUTH_REDIRECT_SIGNOUT:
        process.env.NODE_ENV === 'production'
          ? ['https://folk.knowit.no/']
          : ['https://localhost:3000/', 'https://dev.folk.knowit.no/'],
    },
  },
  matomo: {
    urlBase: 'https://objectnet-dataplattform.matomo.cloud',
  },
}

export default config
