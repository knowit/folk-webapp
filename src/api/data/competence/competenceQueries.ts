import useSWR from 'swr'
import {
  getAgeDistribution,
  getCompetenceAmount,
  getCompetenceAreas,
  getCompetenceMapping,
  getEducation,
  getExperienceDistribution,
  getFagEvents,
  getFagtimer,
} from './competenceApi'

// ? Maybe one can revalidate on focus? look at network and traffic

export const useCompetenceAmount = () => {
  const { data, error } = useSWR('/competenceAmount', getCompetenceAmount, {
    revalidateOnFocus: false,
  })

  // Example of how to implement loading-state
  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

export const useCompetenceAreas = () =>
  useSWR('/competenceAreasCacheKey', getCompetenceAreas, {
    revalidateOnFocus: false,
  })

export const useExperienceDistribution = () =>
  useSWR('/experienceDistributionCacheKey', getExperienceDistribution, {
    revalidateOnFocus: false,
  })

export const useAgeDistribution = () =>
  useSWR('/ageDistributionCacheKey', getAgeDistribution, {
    revalidateOnFocus: false,
  })

export const useFagtimer = () =>
  useSWR('/fagtimerCacheKey', getFagtimer, {
    revalidateOnFocus: false,
  })

export const useFagEvents = () =>
  useSWR('/competenceAreasCacheKey', getFagEvents, {
    revalidateOnFocus: false,
  })

export const useEducation = () =>
  useSWR('/educationCacheKey', getEducation, {
    revalidateOnFocus: false,
  })

// Denne funker feks
export const useCompetenceMapping = () =>
  useSWR('/competenceMappingCacheKey', getCompetenceMapping, {
    revalidateOnFocus: false,
  })
