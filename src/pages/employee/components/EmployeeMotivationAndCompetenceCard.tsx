import React, { FC } from 'react'
import { useEmployeeMotivationAndCompetenceCharts } from '../../../api/data/employee/employeeQueries'
import ChartCard from '../../../components/charts/ChartCard'

interface Props {
  employeeEmail: string
}

const EmployeeCompetenceCard: FC<Props> = ({ employeeEmail }) => {
  const { data, error } =
    useEmployeeMotivationAndCompetenceCharts(employeeEmail)
  return (
    <ChartCard
      fullSize={true}
      title="Kompetansekartlegging"
      data={data}
      error={error}
    />
  )
}

export default EmployeeCompetenceCard
