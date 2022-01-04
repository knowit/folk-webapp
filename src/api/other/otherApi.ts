import { getAtApi } from '../client'

// /privacyPolicy
export const getPrivacyPolicy = async () =>
  await getAtApi<{ urlname: string }>('/privacyPolicy')
