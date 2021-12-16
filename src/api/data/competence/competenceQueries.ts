import useSWR from 'swr'
import { getCompetenceAmount } from './competenceApi'

export const useCompetenceAmount = () => {
  const { data, error } = useSWR('/competenceAmount', getCompetenceAmount)

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}
