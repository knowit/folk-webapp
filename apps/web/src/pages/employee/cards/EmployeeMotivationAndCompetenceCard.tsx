import { FC } from 'react'
import {
  useEmployeeCompetenceScoreCharts,
  useEmployeeMotivationAndCompetenceCharts,
} from '../../../api/data/employee/employeeQueries'
import ChartCard from '../../../components/charts/ChartCard'
import {
  MultipleChartData,
  SingularChartData,
  TProfileChartData,
} from '@folk/common/types/chartTypes'

interface Props {
  employeeEmail: string
}

const EmployeeCompetenceCard: FC<Props> = ({ employeeEmail }) => {
  const { data: motAndCompData, error: motAndCompError } =
    useEmployeeMotivationAndCompetenceCharts(employeeEmail)
  const { data: scoreData, error: scoreError } =
    useEmployeeCompetenceScoreCharts(employeeEmail)

  // Append t-profile chart, unless it exists, to the first chart group ("Hovedkategorier") in motAndCompData.
  const appendTProfileChartIfNotExists = (motAndCompData, scoreData): void => {
    const isTProfileChartData = (
      value: SingularChartData
    ): value is SingularChartData => value?.type === 'TProfileChart'

    if (motAndCompData && scoreData) {
      //if (!motAndCompError) {
      if (
        !(
          motAndCompData as MultipleChartData<SingularChartData[]>
        ).groups[0].charts.some((e) => isTProfileChartData(e))
      ) {
        if (!scoreError) {
          ;(
            motAndCompData as MultipleChartData<SingularChartData[]>
          ).groups[0].charts.push(scoreData as TProfileChartData)
        }
      }
    }
  }

  appendTProfileChartIfNotExists(motAndCompData, scoreData)

  return (
    <ChartCard
      fullSize={true}
      title="Kompetansekartlegging"
      data={motAndCompData}
      error={motAndCompError !== undefined ? motAndCompError : scoreError}
    />
  )
}

export default EmployeeCompetenceCard
