import axios from 'axios'
import { renewAuth } from '../auth/authClient'
import { getAccessToken, isAccessTokenValid } from '../auth/authHelpers'

const BASE_URL = '/api'

const instance = axios.create({
  baseURL: BASE_URL,
})

/**
 * Returns data at generic endpoint
 *
 * @param endpoint endpoint for source
 * @param options
 * @returns the data at the endpoint
 */
export const getAt = async <T>(
  endpoint: string,
  options?: {
    forceAuth?: boolean
    params?: any
  }
) => {
  // Attempt to renew if a user is present and has a valid token/it is to be forced.
  if (options?.forceAuth || !isAccessTokenValid()) {
    const renewed = await renewAuth()

    if (!renewed) {
      console.log('Request aborted due to not being able to renew token.')
      return null
    }
  }

  const accessToken = getAccessToken()
  const res = await instance.get<T>(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: { ...options?.params },
  })

  return res.data
}

// /privacyPolicy
export const getPrivacyPolicy = async () =>
  await getAt<{ urlname: string }>('/privacyPolicy')
