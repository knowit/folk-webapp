import { getDataAt } from '../dataClient'
import {
  AgeDistributionResponse,
  CompetenceAmountResponse,
  CompetenceAreasResponse,
  CompetenceMappingResponse,
  EducationResponse,
  ExperienceDistributionResponse,
  FagEventsResponse,
  FagtimerResponse,
} from './competenceApiTypes'

export const getCompetenceAmount = async () =>
  await getDataAt<CompetenceAmountResponse>('/competenceAmount')

export const getCompetenceAreas = async () =>
  await getDataAt<CompetenceAreasResponse>('/competenceAreas')

export const getExperienceDistribution = async () =>
  await getDataAt<ExperienceDistributionResponse>('/experienceDistribution')

export const getAgeDistribution = async () =>
  await getDataAt<AgeDistributionResponse>('/ageDistribution')

export const getFagtimer = async () =>
  await getDataAt<FagtimerResponse>('/fagtimer')

export const getFagEvents = async () =>
  await getDataAt<FagEventsResponse>('/fagEvents')

export const getEducation = async () =>
  await getDataAt<EducationResponse>('/education')

export const getCompetenceMapping = async () =>
  await getDataAt<CompetenceMappingResponse>('/competenceMapping')
