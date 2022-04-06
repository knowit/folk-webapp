import { getEventSet, range } from '../../repository/util'
import {
  BarChartData,
  LineChartData,
  MultipleChartData,
  PieChartData,
  RadarChartData,
  SunburstChartData,
} from '../chartTypes'
import {
  ageDistributionFormatting,
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
export const experienceDistribution = (
  data: YearsWorkingDistributionCount[]
): MultipleChartData<[BarChartData, PieChartData]> => {
  const indexBy = 'years'
  const keys = ['count']
  const id = 'years'
  const value = 'count'
  const aggregatedData = experienceMapping(data)

  return {
    type: 'MultipleChart',
    groups: Object.entries(aggregatedData).map(([name, { data }]) => {
      return {
        name,
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys,
            data,
          },
          {
            type: 'PieChart',
            id,
            value,
            data,
          },
        ],
      }
    }),
  }
}

export const competenceAmount = (
  data: CompetenceAmount[]
): MultipleChartData<[BarChartData]> => {
  const indexBy = 'category'
  const keys = [
    'competenceAmount',
    'motivationAmount',
    'competencePropotion',
    'motivationPropotion',
  ]

  const aggregatedData = competenceAmountMapping(data)

  return {
    type: 'MultipleChart',
    groups: Object.entries(aggregatedData).map(([name, { data }]) => {
      return {
        name,
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys,
            data,
          },
        ],
      }
    }),
  }
}

export const competenceAreas = (
  data: CategoryAverage[]
): MultipleChartData<[BarChartData, RadarChartData]> => {
  const indexBy = 'category'
  const keys = ['motivation', 'competence']

  const aggregatedData = competenceAreasAggregated(data)

  return {
    type: 'MultipleChart',
    groups: Object.entries(aggregatedData).map(([name, { data }]) => {
      return {
        name,
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys,
            data,
          },
          {
            type: 'RadarChart',
            indexBy,
            keys,
            data,
          },
        ],
      }
    }),
  }
}

export const ageDistribution = (
  data: [AgeDistribution[], AgeGroupDistribution[]]
): MultipleChartData<[BarChartData]> => {
  const indexBy = 'age'
  const keys = ['count']

  const detailed = ageDistributionFormatting(data[0])
  const grouped = ageGroupDistribution(data[1])

  return {
    type: 'MultipleChart',
    groups: [
      {
        name: 'Aldersgrupper',
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys,
            data: grouped,
          },
        ],
      },
      {
        name: 'Detaljert oversikt',
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys,
            data: detailed,
          },
        ],
      },
    ],
  }
}

export const fagtimer = (fagtimer: FagtimeStats[]): LineChartData => {
  const data = range(2018, new Date().getFullYear()).map((year) => ({
    id: year.toString(),
    data: range(1, 53).map((i) => {
      const currentYear = fagtimer.filter((dataItem) => dataItem.year === year)
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

  return { type: 'LineChart', data }
}

export const fagEventsLine = (data: FagEventData[]): LineChartData[] => {
  const aggregatedData = getEventSet(data)
  return aggregatedData
}

export const educationPie = (data: DegreeDistribution[]): PieChartData => {
  const id = 'degree'
  const value = 'count'

  return { type: 'PieChart', id, value, data }
}

export const competenceMappingBar = (
  data: CategoryAverage[]
): MultipleChartData<[BarChartData]> => {
  const indexBy = 'category'

  const aggregatedData = competenceMapping(data)

  return {
    type: 'MultipleChart',
    groups: [
      {
        name: 'Competence',
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys: ['competence'],
            data: aggregatedData.MotivationAndCompetence.data,
          },
        ],
      },
      {
        name: 'Motivation',
        charts: [
          {
            type: 'BarChart',
            indexBy,
            keys: ['motivation'],
            data: aggregatedData.MotivationAndCompetence.data,
          },
        ],
      },
    ],
  }
}

export const competenceMappingSunburst = (
  data: CategoryAverage[]
): Record<string, SunburstChartData> => {
  const id = 'category'

  const aggregatedData = competenceMapping(data)

  const competenceData: SunburstChartData = {
    type: 'SunburstChart',
    id,
    value: 'competence',
    data: [],
  }

  const motivationData: SunburstChartData = {
    type: 'SunburstChart',
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
