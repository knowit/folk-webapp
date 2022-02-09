import { getAtApi } from '../../client'
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
  getAtApi<CompetenceAmountResponse>('/data/competenceAmount')

export const getCompetenceAreas = () =>
  getAtApi<CompetenceAreasResponse>('/data/competenceAreas')

export const getExperienceDistribution = () =>
  getAtApi<ExperienceDistributionResponse>('/data/experienceDistribution')

export const getAgeDistribution = () =>
  getAtApi<AgeDistributionResponse>('/data/ageDistribution')

export const getFagtimer = () => getAtApi<FagtimerResponse>('/data/fagtimer')

export const getFagEvents = () => getAtApi<FagEventsResponse>('/data/fagEvents')

export const getEducation = () => getAtApi<EducationResponse>('/data/education')

export const getCompetenceMapping = () =>
  getAtApi<CompetenceMappingResponse>('/data/competenceMapping')

export const getCompetenceFilter = () =>
  getAtApi<CompetenceFilterResponse[]>('/data/competenceFilter')
