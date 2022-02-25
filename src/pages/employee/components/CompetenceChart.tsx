import * as React from 'react'
import { useEmployeeRadar } from '../../../api/data/employee/employeeQueries'
import Chart from '../../../data/components/chart/Chart'
import { ChartSkeleton } from '../../../components/skeletons/ChartSkeleton'

interface Props {
  employeeEmail?: string
}

export function CompetenceChart({ employeeEmail }: Props) {
  const { data, error } = useEmployeeRadar(employeeEmail)
  const isLoading = !data

  if (error) {
    //TODO: show error message
    console.error(error)
  }

  if (isLoading) {
    return <ChartSkeleton />
  }

  return (
    <Chart
      payload={data}
      title="Kompetansekartlegging"
      fullsize={true}
      props={{
        chartVariants: [
          {
            type: 'Bar',
            props: {
              dataKey: 'category',
              yLabels: ['motivation', 'competence'],
              maxValue: 5,
            },
          },
          {
            type: 'Radar',
            props: {
              groupKey: 'category',
              valueKey: ['motivation', 'competence'],
              maxValue: 5,
            },
          },
        ],
      }}
    />
  )
}
