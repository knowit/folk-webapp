import * as React from 'react'
import { useEmployeeRadar } from '../../../api/data/employee/employeeQueries'
import { ChartSkeleton } from '../../../components/skeletons/ChartSkeleton'
import Chart from '../../../data/components/chart/Chart'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { FallbackMessage } from './FallbackMessage'

interface Props {
  employeeEmail?: string
}

export function CompetenceChart({ employeeEmail }: Props) {
  const { data, error } = useEmployeeRadar(employeeEmail)

  if (error) {
    return (
      <GridItem fullSize>
        <GridItemHeader title="Kompetansekartlegging" />
        <GridItemContent>
          <FallbackMessage message="Noe gikk galt ved henting av data." />
        </GridItemContent>
      </GridItem>
    )
  }

  if (!data) {
    return <ChartSkeleton />
  }

  return (
    <Chart
      payload={data}
      title="Kompetansekartlegging"
      fullsize
      props={{
        chartVariants: [
          {
            type: 'BarChart',
            props: {
              dataKey: 'category',
              yLabels: ['motivation', 'competence'],
              maxValue: 5,
            },
          },
          {
            type: 'RadarChart',
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
