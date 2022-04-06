import { getAtApi, getAtApiV2 } from '../../client'
import { ChartData } from '../chartResponses'
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

// API V2
export const getExperienceDistributionCharts = () =>
  getAtApiV2<ChartData>('/competence/experienceDistribution')

export const getCompetenceAmountBar = () =>
  getAtApiV2<ChartData>('/competence/competenceAmount/bar')

export const getCompetenceAreasCharts = () =>
  getAtApiV2<ChartData>('/competence/competenceAreas')

export const getAgeDistributionBar = () =>
  getAtApiV2<ChartData>('/competence/ageDistribution/bar')

export const getFagtimerLine = () =>
  getAtApiV2<ChartData>('/competence/fagtimer/line')

export const getFagEventsLine = () =>
  getAtApiV2<ChartData>('/competence/fagEvents/line')

export const getEducationPie = () =>
  getAtApiV2<ChartData>('/competence/education/pie')

export const getCompetenceMappingBar = () =>
  getAtApiV2<ChartData>('/competence/competenceMapping/bar')

export const getCompetenceMappingSunburst = () =>
  getAtApiV2<ChartData>('/competence/competenceMapping/sunburst')
