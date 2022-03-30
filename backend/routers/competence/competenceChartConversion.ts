import { getEventSet, range } from '../../repository/util'
import {
  BarChartData,
  LineChartData,
  PieChartData,
  RadarChartData,
  SunburstChartData,
} from '../chartTypes'
import {
  ageDistribution,
  ageGroupDistribution,
  competenceAmountMapping,
  competenceAreasAggregated,
  competenceMapping,
  experienceMapping,
} from './competenceAggregation'
import {
  AgeDistribution,
  AgeGroupDistribution,
  CategoryAverage,
  CompetenceAmount,
  DegreeDistribution,
  FagEventData,
  FagtimeStats,
  YearsWorkingDistributionCount,
} from './competenceTypes'

// /experienceDistribution
export const experienceDistributionBar = (
  data: YearsWorkingDistributionCount[]
): Record<string, BarChartData> => {
  const indexBy = 'years'
  const keys = ['count']

  const aggregatedData = experienceMapping(data)

  const result: Record<string, BarChartData> = {}

  Object.keys(aggregatedData).forEach((key) => {
    result[key] = {
      indexBy,
      keys,
      data: aggregatedData[key].data,
    }
  })

  return result
}

export const experienceDistributionPie = (
  data: YearsWorkingDistributionCount[]
): Record<string, PieChartData> => {
  const id = 'years'
  const value = 'count'

  const aggregatedData = experienceMapping(data)

  const result: Record<string, PieChartData> = {}

  Object.keys(aggregatedData).forEach((key) => {
    result[key] = { id, value, data: aggregatedData[key].data }
  })

  return result
}

export const competenceAmountBar = (
  data: CompetenceAmount[]
): Record<string, BarChartData> => {
  const indexBy = 'category'
  const keys = [
    'competenceAmount',
    'motivationAmount',
    'competencePropotion',
    'motivationPropotion',
  ]

  const aggregatedData = competenceAmountMapping(data)
  const result: Record<string, BarChartData> = {}

  Object.keys(aggregatedData).forEach((key) => {
    result[key] = {
      indexBy,
      keys,
      data: aggregatedData[key].data,
    }
  })

  return result
}

export const competenceAreasBar = (
  data: CategoryAverage[]
): Record<string, BarChartData> => {
  const indexBy = 'category'
  const keys = ['motivation', 'competence']

  const aggregatedData = competenceAreasAggregated(data)
  const result: Record<string, BarChartData> = {}

  Object.keys(aggregatedData).forEach((key) => {
    result[key] = {
      indexBy,
      keys,
      data: aggregatedData[key].data,
    }
  })

  return result
}

export const competenceAreasRadar = (
  data: CategoryAverage[]
): Record<string, RadarChartData> => {
  const indexBy = 'category'
  const keys = ['motivation', 'competence']

  const aggregatedData = competenceAreasAggregated(data)
  const result: Record<string, RadarChartData> = {}

  Object.keys(aggregatedData).forEach((key) => {
    result[key] = {
      indexBy,
      keys,
      data: aggregatedData[key].data,
    }
  })

  return result
}

export const ageDistributionBar = (
  data: [AgeDistribution[], AgeGroupDistribution[]]
): Record<string, BarChartData> => {
  const indexBy = 'age'
  const keys = ['count']

  const detailed = ageDistribution(data[0])
  const grouped = ageGroupDistribution(data[1])

  return {
    grouped: { indexBy, keys, data: grouped },
    detailed: { indexBy, keys, data: detailed },
  }
}

export const fagtimerLine = (data: FagtimeStats[]): LineChartData[] => {
  const toLineData = (data: FagtimeStats[]): LineChartData[] => {
    const setData = range(2018, new Date().getFullYear()).map((year) => ({
      id: year.toString(),
      data: range(1, 53).map((i) => {
        const currentYear = data.filter((dataItem) => dataItem.year === year)
        const currentWeekData = currentYear.find(
          (dataItem) => dataItem.week === i
        )
        return {
          x: i,
          y:
            currentWeekData && currentWeekData.used_hrs
              ? currentWeekData.used_hrs
              : 0,
        }
      }),
    }))
    return setData
  }

  return toLineData(data)
}

export const fagEventsLine = (data: FagEventData[]): LineChartData[] => {
  const aggregatedData = getEventSet(data)
  return aggregatedData
}

export const educationPie = (data: DegreeDistribution[]): PieChartData => {
  const id = 'degree'
  const value = 'count'

  return { id, value, data }
}

export const competenceMappingBar = (data: CategoryAverage[]) => {
  const indexBy = 'category'

  const aggregatedData = competenceMapping(data)

  return {
    Competence: {
      indexBy,
      keys: ['competence'],
      data: aggregatedData.MotivationAndCompetence.data,
    },
    Motivation: {
      indexBy,
      keys: ['motivation'],
      data: aggregatedData.MotivationAndCompetence.data,
    },
  }
}

export const competenceMappingSunburst = (
  data: CategoryAverage[]
): Record<string, SunburstChartData> => {
  const id = 'category'

  const aggregatedData = competenceMapping(data)

  const competenceData: SunburstChartData = {
    id,
    value: 'competence',
    data: [],
  }

  const motivationData: SunburstChartData = {
    id,
    value: 'motivation',
    data: [],
  }

  aggregatedData.MotivationAndCompetence.data.forEach((categoryData) => {
    const { subcategories, competence, motivation, category } = categoryData

    const motivationChildren = []
    const competenceChildren = []

    subcategories.forEach((subcategory) => {
      motivationChildren.push({
        category: subcategory.category,
        motivation: subcategory.motivation,
        size: subcategory.motivationSize,
      })

      competenceChildren.push({
        category: subcategory.category,
        competence: subcategory.competence,
        size: subcategory.competenceSize,
      })
    })

    motivationData.data.push({
      category,
      motivation,
      children: motivationChildren,
    })

    competenceData.data.push({
      category,
      competence,
      children: competenceChildren,
    })
  })

  return {
    competence: competenceData,
    motivation: motivationData,
  }
}
