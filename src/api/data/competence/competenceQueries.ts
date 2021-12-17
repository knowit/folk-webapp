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
  useSWR('/competenceAreas', getFagEvents, {
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
