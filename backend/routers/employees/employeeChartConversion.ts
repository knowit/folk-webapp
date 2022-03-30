import { MultipleChartData, BarChartData, RadarChartData } from '../chartTypes'
import { aggregateEmployeeCompetenceAndMotivation } from './employeesAggregation'
import { EmployeeMotivationAndCompetence } from './employeesTypes'

/**
 * Aggregation function that formats data from AWS to fit a Nivo Bar chart.
 *
 * @param data raw data from AWS
 * @returns data fitting a Nivo Bar component
 */
export const employeeMotivationAndCompetenceBar = (
  data: EmployeeMotivationAndCompetence[]
): MultipleChartData<[BarChartData]> => {
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
        },
      ],
    })),
  }
}

/**
 * Aggregation function that formats data from AWS to fit a Nivo Radar chart.
 *
 * @param data raw data from AWS
 * @returns data fitting a Nivo Radar component
 */
export const employeeMotivationAndCompetenceRadar = (
  data: EmployeeMotivationAndCompetence[]
): MultipleChartData<[RadarChartData]> => {
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
          type: 'RadarChart',
          indexBy,
          keys,
          data,
        },
      ],
    })),
  }
}
