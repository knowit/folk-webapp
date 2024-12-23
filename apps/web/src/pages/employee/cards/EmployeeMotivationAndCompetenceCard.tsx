import { FC } from 'react'
import {
  useEmployeeCompetenceScoreCharts,
  useEmployeeMotivationAndCompetenceCharts,
} from '../../../api/data/employee/employeeQueries'
import ChartCard from '../../../components/charts/ChartCard'
import {
  MultipleChartData,
  SingularChartData,
} from '@folk/common/types/chartTypes'

interface Props {
  employeeEmail: string
}

const EmployeeCompetenceCard: FC<Props> = ({ employeeEmail }) => {
  const { data: motAndCompData, error: motAndCompError } =
    useEmployeeMotivationAndCompetenceCharts(employeeEmail)
  const { data: scoreData, error: scoreError } =
    useEmployeeCompetenceScoreCharts(employeeEmail)

  // Append t-profile chart to the first chart group ("Hovedkategorier")
  if (motAndCompData && scoreData) {
    ;(
      motAndCompData as MultipleChartData<SingularChartData[]>
    ).groups[0].charts.push(
      (scoreData as MultipleChartData<SingularChartData[]>).groups[0].charts[0]
    )
  }

  return (
    <ChartCard
      fullSize={true}
      title="Kompetansekartlegging"
      data={motAndCompData}
      error={motAndCompError || scoreError}
    />
  )
}

export default EmployeeCompetenceCard
