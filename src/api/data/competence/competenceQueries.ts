import useSWR from 'swr'
import {
  getAgeDistributionCharts,
  getCompetenceAmountCharts,
  getCompetenceAreasCharts,
  getCompetenceFilter,
  getCompetenceMappingCharts,
  getEducationCharts,
  getExperienceDistributionCharts,
  getFagEventsCharts,
  getFagtimerCharts,
} from './competenceApi'

export const useCompetenceFilter = () =>
  useSWR('/competenceFilter', getCompetenceFilter, {
    revalidateOnFocus: false,
  })

export const useExperienceDistributionCharts = () =>
  useSWR('/experienceDistributionCharts', getExperienceDistributionCharts, {
    revalidateOnFocus: false,
  })

export const useCompetenceAmountCharts = () =>
  useSWR('/competenceAmountCharts', getCompetenceAmountCharts, {
    revalidateOnFocus: false,
  })

export const useCompetenceAreasCharts = () =>
  useSWR('/competenceAreasCharts', getCompetenceAreasCharts, {
    revalidateOnFocus: false,
  })

export const useAgeDistributionCharts = () =>
  useSWR('/ageDistributionCharts', getAgeDistributionCharts, {
    revalidateOnFocus: false,
  })

export const useFagtimerCharts = () =>
  useSWR('/fagtimerCharts', getFagtimerCharts, {
    revalidateOnFocus: false,
  })

export const useFagEventsCharts = () =>
  useSWR('/fagEventsCharts', getFagEventsCharts, {
    revalidateOnFocus: false,
  })

export const useEducationCharts = () =>
  useSWR('/educationCharts', getEducationCharts, {
    revalidateOnFocus: false,
  })

export const useCompetenceMappingCharts = () =>
  useSWR('/competenceMappingCharts', getCompetenceMappingCharts, {
    revalidateOnFocus: false,
  })
