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
  getCompetenceMappingBar,
  getCompetenceMappingSunburst,
  getEducation,
  getEducationPie,
  getExperienceDistribution,
  getExperienceDistributionCharts,
  getFagEvents,
  getFagEventsLine,
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

export const useFagEventsLine = () =>
  useSWR('/fagEventsLine', getFagEventsLine, {
    revalidateOnFocus: false,
  })

export const useEducationPie = () =>
  useSWR('/educationPie', getEducationPie, {
    revalidateOnFocus: false,
  })

export const useCompetenceMappingBar = () =>
  useSWR('/competenceMappingBar', getCompetenceMappingBar, {
    revalidateOnFocus: false,
  })

export const useCompetenceMappingSunburst = () =>
  useSWR('/competenceMappingSunburst', getCompetenceMappingSunburst, {
    revalidateOnFocus: false,
  })
