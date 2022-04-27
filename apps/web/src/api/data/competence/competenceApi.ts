import { ChartData } from '@folk/common/types/chartTypes'
import { getAtApiV2 } from '../../client'
import { CompetenceFilterResponse } from './competenceApiTypes'

export const getCompetenceFilter = () =>
  getAtApiV2<CompetenceFilterResponse[]>('/competence/competenceFilter')

export const getExperienceDistributionCharts = () =>
  getAtApiV2<ChartData>('/competence/experienceDistribution')

export const getCompetenceAmountCharts = () =>
  getAtApiV2<ChartData>('/competence/competenceAmount')

export const getCompetenceAreasCharts = () =>
  getAtApiV2<ChartData>('/competence/competenceAreas')

export const getAgeDistributionCharts = () =>
  getAtApiV2<ChartData>('/competence/ageDistribution')

export const getFagtimerCharts = () =>
  getAtApiV2<ChartData>('/competence/fagtimer')

export const getFagEventsCharts = () =>
  getAtApiV2<ChartData>('/competence/fagEvents')

export const getEducationCharts = () =>
  getAtApiV2<ChartData>('/competence/education')

export const getCompetenceMappingCharts = () =>
  getAtApiV2<ChartData>('/competence/competenceMapping')
