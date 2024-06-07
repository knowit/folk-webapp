import { Amplify } from 'aws-amplify'
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
      userPoolClientId: '71ra92knndj86vr394ohcds1uc',
      userPoolId: 'eu-central-1_j53koCuOX',
      loginWith: {
        oauth: {
          domain: 'dev-folk-user-pool.auth.eu-central-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [
            'https://localhost:3000/',
            'https://dev.folk.knowit.no/',
            'https://folk.knowit.no/',
          ],
          redirectSignOut: [
            'https://localhost:3000/',
            'https://dev.folk.knowit.no/',
            'https://folk.knowit.no/',
          ],
          responseType: 'code',
        },
      },
    },
  },
})

console.log('Environment:', process.env.NODE_ENV)

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
