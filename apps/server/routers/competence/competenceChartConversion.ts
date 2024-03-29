import {
  BarChartData,
  LineChartData,
  MultipleChartData,
  PieChartData,
  RadarChartData,
  SunburstChartData,
} from '../chartTypes'
import { getEventSet, range } from '../../repository/util'
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
import { NumberOfEmployees } from '../employees/employeesTypes'

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
  const keys = ['competenceProportion', 'motivationProportion']

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
            maxValue: 'auto',
          },
        ],
      }
    }),
  }
}

export const competenceAreas = (
  data: CategoryAverage[]
): MultipleChartData<[RadarChartData, BarChartData]> => {
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
            type: 'RadarChart',
            indexBy,
            keys,
            data,
          },
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

export const fagEventsLine = (data: FagEventData[]): LineChartData => {
  const aggregatedData = getEventSet(data)
  return { type: 'LineChart', data: aggregatedData }
}

export const educationPie = (
  degreeDistribution: DegreeDistribution[],
  numberOfEmployees: NumberOfEmployees[]
): PieChartData => {
  const id = 'degree'
  const value = 'count'

  const numberOfEmployeesCount = numberOfEmployees?.[0]?.antallAnsatte
  const numberOfEmployeesWithEducation = degreeDistribution.reduce(
    (accu, currentValue) => accu + currentValue.count,
    0
  )

  const notRegisteredEducationCount = numberOfEmployeesCount
    ? numberOfEmployeesCount - numberOfEmployeesWithEducation
    : 0

  const data = [
    ...degreeDistribution,
    {
      degree: 'Ikke registrert',
      count: notRegisteredEducationCount,
    },
  ]
  return { type: 'PieChart', id, value, data }
}

export const competenceMappingConversion = (
  data: CategoryAverage[]
): MultipleChartData<[SunburstChartData, BarChartData]> => {
  const indexBy = 'category'

  const aggregatedBarData = competenceMapping(data)
  const aggregatedSunburstData = competenceMappingSunburst(data)

  return {
    type: 'MultipleChart',
    groups: [
      {
        name: 'Kompetanse',
        charts: [
          aggregatedSunburstData['competence'],
          {
            type: 'BarChart',
            indexBy,
            keys: ['competence'],
            data: aggregatedBarData.MotivationAndCompetence.data,
          },
        ],
      },
      {
        name: 'Motivasjon',
        charts: [
          aggregatedSunburstData['motivation'],
          {
            type: 'BarChart',
            indexBy,
            keys: ['motivation'],
            data: aggregatedBarData.MotivationAndCompetence.data,
          },
        ],
      },
    ],
  }
}

const competenceMappingSunburst = (
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
