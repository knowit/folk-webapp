import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'
import App from './App'
import config from './config'
import UserInfoProvider from './context/UserInfoContext'

// MATOMO
const instance = createInstance({
  urlBase: 'https://objectnet-dataplattform.matomo.cloud/',
  siteId: 1,
  trackerUrl: 'https://objectnet-dataplattform.matomo.cloud/matomo.php',
  srcUrl: 'https://objectnet-dataplattform.matomo.cloud/matomo.js',
  disabled: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  heartBeat: {
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: true, // optional, default value: true
  configurations: {
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST',
  },
})

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: config.cognito.APP_CLIENT_ID,
      userPoolId: config.cognito.USER_POOL_ID,
      loginWith: {
        oauth: {
          domain: config.cognito.login.OAUTH_DOMAIN,
          scopes: config.cognito.login.OAUTH_SCOPES,
          redirectSignIn: config.cognito.login.OAUTH_REDIRECT_SIGNIN,
          redirectSignOut: config.cognito.login.OAUTH_REDIRECT_SIGNOUT,
          responseType: 'code',
        },
      },
    },
  },
})

const container = document.getElementById('root')
createRoot(container).render(
  <MatomoProvider value={instance}>
    <BrowserRouter>
      <Authenticator.Provider>
        <UserInfoProvider>
          <App />
        </UserInfoProvider>
      </Authenticator.Provider>
    </BrowserRouter>
  </MatomoProvider>
)
