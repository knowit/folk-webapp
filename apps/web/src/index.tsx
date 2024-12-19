import { Amplify } from 'aws-amplify'
import { appConfig } from './config'
import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'
import App from './App'
import UserInfoProvider from './context/UserInfoContext'

// MATOMO
const instance = createInstance({
  urlBase: 'https://objectnet-dataplattform.matomo.cloud',
  siteId: 1,
  trackerUrl: 'https://objectnet-dataplattform.matomo.cloud/matomo.php',
  srcUrl: 'https://objectnet-dataplattform.matomo.cloud/matomo.js',
  disabled: !import.meta.env.MODE || import.meta.env.MODE === 'development',
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
      userPoolClientId: appConfig.userPoolClientId,
      userPoolId: appConfig.userPoolId,
      loginWith: {
        oauth: {
          domain: appConfig.oauthDomain,
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: appConfig.redirectUrls,
          redirectSignOut: appConfig.redirectUrls,
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
