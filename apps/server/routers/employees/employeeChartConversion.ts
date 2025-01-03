import {
  MultipleChartData,
  BarChartData,
  RadarChartData,
  TProfileChartData,
} from '../chartTypes'

import { aggregateEmployeeCompetenceAndMotivation } from './employeesAggregation'
import {
  CompetenceScore,
  EmployeeCompetenceScore,
  EmployeeMotivationAndCompetence,
} from './employeesTypes'

/**
 * Aggregation function that formats data from AWS to fit a Nivo Bar and Pie chart.
 *
 * @param data raw data from AWS
 * @returns data fitting Nivo components
 */
export const employeeMotivationAndCompetence = (
  data: EmployeeMotivationAndCompetence[]
): MultipleChartData<[BarChartData, RadarChartData]> => {
  const indexBy = 'category'
  const keys = ['motivation', 'competence']
  const aggregatedData = aggregateEmployeeCompetenceAndMotivation(
    data
  ) as Record<string, any>

  return {
    type: 'MultipleChart',
    groups: Object.entries(aggregatedData).map(([name, data]) => ({
      name,
      charts: [
        {
          type: 'BarChart',
          indexBy,
          keys,
          data,
          maxValue: 5,
        },
        {
          type: 'RadarChart',
          indexBy,
          keys,
          data,
          maxValue: 5,
        },
      ],
    })),
  }
}

export const employeeCompetenceScore = (
  data: EmployeeCompetenceScore[]
): TProfileChartData => {
  const indexBy = 'category'
  const keys = ['score']

  const maxScore = Math.max(...data.map((s) => s.score))
  const dataSubset = data.map((e) => mapCompetenceScore(e))

  return {
    type: 'TProfileChart',
    indexBy,
    keys,
    data: dataSubset,
    maxValue: maxScore,
  }
}

function mapCompetenceScore(
  employeeCompetenceScore: EmployeeCompetenceScore
): CompetenceScore {
  return {
    category: employeeCompetenceScore.category,
    score: employeeCompetenceScore.score,
  }
}
