import useSWR from 'swr'
import {
  getAgeDistribution,
  getAgeDistributionCharts,
  getCompetenceAmount,
  getCompetenceAmountCharts,
  getCompetenceAreas,
  getCompetenceAreasCharts,
  getCompetenceFilter,
  getCompetenceMapping,
  getCompetenceMappingCharts,
  getEducation,
  getEducationCharts,
  getExperienceDistribution,
  getExperienceDistributionCharts,
  getFagEvents,
  getFagEventsCharts,
  getFagtimer,
  getFagtimerCharts,
} from './competenceApi'

// ? Maybe one can revalidate on focus? look at network and traffic

export const useCompetenceAmount = () =>
  useSWR('/competenceAmount', getCompetenceAmount, {
    revalidateOnFocus: false,
  })

export const useCompetenceAreas = () =>
  useSWR('/competenceAreas', getCompetenceAreas, {
    revalidateOnFocus: false,
  })

export const useExperienceDistribution = () =>
  useSWR('/experienceDistribution', getExperienceDistribution, {
    revalidateOnFocus: false,
  })

export const useAgeDistribution = () =>
  useSWR('/ageDistribution', getAgeDistribution, {
    revalidateOnFocus: false,
  })

export const useFagtimer = () =>
  useSWR('/fagtimer', getFagtimer, {
    revalidateOnFocus: false,
  })

export const useFagEvents = () =>
  useSWR('/getFagEvents', getFagEvents, {
    revalidateOnFocus: false,
  })

export const useEducation = () =>
  useSWR('/education', getEducation, {
    revalidateOnFocus: false,
  })

export const useCompetenceMapping = () =>
  useSWR('/competenceMapping', getCompetenceMapping, {
    revalidateOnFocus: false,
  })

export const useCompetenceFilter = () =>
  useSWR('/competenceFilter', getCompetenceFilter, {
    revalidateOnFocus: false,
  })

// API v2
export const useExperienceDistributionCharts = () =>
  useSWR('/experienceDistribution', getExperienceDistributionCharts, {
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
