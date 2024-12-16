import React, { FC } from 'react'
import { useEmployeeCompetenceScoreCharts } from '../../../api/data/employee/employeeQueries'
import ChartCard from '../../../components/charts/ChartCard'

interface Props {
  employeeEmail: string
}

const EmployeeCompetenceScoreCard: FC<Props> = ({ employeeEmail }) => {
  const { data, error } = useEmployeeCompetenceScoreCharts(employeeEmail)
  return (
    <ChartCard
      fullSize={true}
      title="Kompetanseprofil"
      data={data}
      error={error}
      maxValue={100}
    />
  )
}

export default EmployeeCompetenceScoreCard
