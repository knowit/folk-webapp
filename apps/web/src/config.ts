const config = {
  cognito: {
    APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    login: {
      OAUTH_DOMAIN: process.env.REACT_APP_OAUTH_DOMAIN,
      OAUTH_SCOPES: ['email', 'openid', 'profile'],
      OAUTH_REDIRECT_SIGNIN: [
        'https://localhost:3000/',
        'https://dev.folk.knowit.no/',
        'https://folk.knowit.no/',
      ],
      OAUTH_REDIRECT_SIGNOUT: [
        'https://localhost:3000/',
        'https://dev.folk.knowit.no/',
        'https://folk.knowit.no/',
      ],
    },
  },
  matomo: {
    urlBase: 'https://objectnet-dataplattform.matomo.cloud',
  },
}

export default config
