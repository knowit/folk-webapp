import useSWR from 'swr'
import { getPrivacyPolicy } from './otherApi'

export const usePrivacyPolicy = () =>
  useSWR('/privacyPolicy', getPrivacyPolicy, {
    revalidateOnFocus: false,
  })
