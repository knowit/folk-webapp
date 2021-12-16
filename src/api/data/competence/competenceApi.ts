import { getDataAt } from '../dataClient'
import { CompetenceResponse } from './competenceApiTypes'

export const getCompetenceAmount = async () =>
  await getDataAt<CompetenceResponse>('/competenceAmount')
