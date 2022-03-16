import { getAtApi, getAtApiV2 } from '../../client'
import {
  BarChartData,
  LineChartData,
  MultipleChartResponse,
  PieChartData,
  RadarChartData,
  SunburstChartData,
} from '../chartResponses'
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
export const getExperienceDistributionBar = () =>
  getAtApiV2<MultipleChartResponse<'regular' | 'detailed', BarChartData>>(
    '/competence/experienceDistribution/bar'
  )

export const getExperienceDistributionPie = () =>
  getAtApiV2<MultipleChartResponse<'regular' | 'detailed', PieChartData>>(
    '/competence/experienceDistribution/pie'
  )

export const getCompetenceAmountBar = () =>
  getAtApiV2<MultipleChartResponse<string, BarChartData>>(
    '/competence/competenceAmount/bar'
  )

export const getCompetenceAreasBar = () =>
  getAtApiV2<MultipleChartResponse<string, BarChartData>>(
    '/competence/competenceAreas/bar'
  )

export const getCompetenceAreasRadar = () =>
  getAtApiV2<MultipleChartResponse<string, RadarChartData>>(
    '/competence/competenceAreas/radar'
  )

export const getAgeDistributionBar = () =>
  getAtApiV2<MultipleChartResponse<'grouped' | 'detailed', BarChartData>>(
    '/competence/ageDistribution/bar'
  )

export const getFagtimerLine = () =>
  getAtApiV2<LineChartData>('/competence/fagtimer/line')

export const getFagEventsLine = () =>
  getAtApiV2<LineChartData>('/competence/fagEvents/line')

export const getEducationPie = () =>
  getAtApiV2<PieChartData>('/competence/education/pie')

export const getCompetenceMappingBar = () =>
  getAtApiV2<MultipleChartResponse<'competence' | 'motivation', BarChartData>>(
    '/competence/competenceMapping/bar'
  )

export const getCompetenceMappingSunburst = () =>
  getAtApiV2<
    MultipleChartResponse<'competence' | 'motivation', SunburstChartData>
  >('/competence/competenceMapping/sunburst')
