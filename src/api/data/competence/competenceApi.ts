import { getAt } from '../../client'
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
  getAt<CompetenceAmountResponse>('/data/competenceAmount')

export const getCompetenceAreas = () =>
  getAt<CompetenceAreasResponse>('/data/competenceAreas')

export const getExperienceDistribution = () =>
  getAt<ExperienceDistributionResponse>('/data/experienceDistribution')

export const getAgeDistribution = () =>
  getAt<AgeDistributionResponse>('/data/ageDistribution')

export const getFagtimer = () => getAt<FagtimerResponse>('/data/fagtimer')

export const getFagEvents = () => getAt<FagEventsResponse>('/data/fagEvents')

export const getEducation = () => getAt<EducationResponse>('/data/education')

export const getCompetenceMapping = () =>
  getAt<CompetenceMappingResponse>('/data/competenceMapping')

export const getCompetenceFilter = () =>
  getAt<CompetenceFilterResponse>('/data/competenceFilter')
