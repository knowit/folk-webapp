import useSWR from 'swr'
import {
  getAgeDistribution,
  getCompetenceAmount,
  getCompetenceAreas,
  getCompetenceFilter,
  getCompetenceMapping,
  getEducation,
  getExperienceDistribution,
  getFagEvents,
  getFagtimer,
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
