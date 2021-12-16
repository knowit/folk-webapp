import axios from 'axios'
import { getAccessToken, isAccessTokenValid } from '../auth/authHelpers'
import { renewAuth } from '../auth/authClient'

const BASE_URL = '/api/data'

const instance = axios.create({
  baseURL: BASE_URL,
})

/**
 * Returns data at specific data source.
 *
 * @param endpoint endpoint for data source
 * @param options
 * @returns the data at the endpoint
 */
export const getDataAt = async <T>(
  endpoint: string,
  options?: {
    forceAuth?: boolean
  }
) => {
  if (options?.forceAuth || !isAccessTokenValid()) {
    console.log('Renewing auth')
    await renewAuth()
  }

  const accessToken = getAccessToken()
  const res = await instance.get<T>(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return res.data
}
