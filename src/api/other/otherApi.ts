import { getAt } from '../client'

// /privacyPolicy
export const getPrivacyPolicy = async () =>
  await getAt<{ urlname: string }>('/privacyPolicy')
