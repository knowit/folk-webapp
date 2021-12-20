import { getDataAt } from '../dataClient'
import {
  AgeDistributionResponse,
  CompetenceAmountResponse,
  CompetenceAreasResponse,
  CompetenceFilterResponse,
  CompetenceMappingResponse,
  EducationResponse,
  ExperienceDistributionResponse,
  FagEventsResponse,
  FagtimerResponse,
} from './competenceApiTypes'

export const getCompetenceAmount = () =>
  getDataAt<CompetenceAmountResponse>('/competenceAmount')

export const getCompetenceAreas = () =>
  getDataAt<CompetenceAreasResponse>('/competenceAreas')

export const getExperienceDistribution = () =>
  getDataAt<ExperienceDistributionResponse>('/experienceDistribution')

export const getAgeDistribution = () =>
  getDataAt<AgeDistributionResponse>('/ageDistribution')

export const getFagtimer = () => getDataAt<FagtimerResponse>('/fagtimer')

export const getFagEvents = () => getDataAt<FagEventsResponse>('/fagEvents')

export const getEducation = () => getDataAt<EducationResponse>('/education')

export const getCompetenceMapping = () =>
  getDataAt<CompetenceMappingResponse>('/competenceMapping')

export const getCompetenceFilter = () =>
  getDataAt<CompetenceFilterResponse>('/competenceFilter')
