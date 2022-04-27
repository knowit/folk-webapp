import { getAtApiV2 } from '../client'

// /privacyPolicy
export const getPrivacyPolicy = async () =>
  await getAtApiV2<{ urlname: string }>('/privacyPolicy')
