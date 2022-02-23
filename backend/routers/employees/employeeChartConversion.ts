import { BarChartFormat, RadarChartFormat } from '../chartTypes'
import { aggregateEmployeeCompetenceAndMotivation } from './employeesAggregation'
import { CompetenceAreasResponse } from './employeesTypes'

/**
 * Aggregation function that formats data from AWS to fit a Nivo Bar chart.
 *
 * @param data raw data from AWS
 * @returns data fitting a Nivo Bar component
 */
export const employeeMotivationAndCompetenceBar = (
  data: CompetenceAreasResponse[]
) => {
  const aggregatedData = aggregateEmployeeCompetenceAndMotivation(data)

  const output: Record<string, BarChartFormat> = {}

  for (const [key, value] of Object.entries(aggregatedData)) {
    output[key] = {
      indexBy: 'category',
      keys: ['motivation', 'competence'],
      data: value as any[],
    }
  }

  return output
}

/**
 * Aggregation function that formats data from AWS to fit a Nivo Radar chart.
 *
 * @param data raw data from AWS
 * @returns data fitting a Nivo Radar component
 */
export const employeeMotivationAndCompetenceRadar = (
  data: CompetenceAreasResponse[]
) => {
  const aggregatedData = aggregateEmployeeCompetenceAndMotivation(data)

  const output: Record<string, RadarChartFormat> = {}

  for (const [key, value] of Object.entries(aggregatedData)) {
    output[key] = {
      indexBy: 'category',
      keys: ['motivation', 'competence'],
      data: value as any[],
    }
  }

  return output
}
