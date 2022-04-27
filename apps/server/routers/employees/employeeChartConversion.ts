import {
  MultipleChartData,
  BarChartData,
  RadarChartData,
} from '@folk/common/types/chartTypes'
import { aggregateEmployeeCompetenceAndMotivation } from './employeesAggregation'
import { EmployeeMotivationAndCompetence } from './employeesTypes'

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
