import React from 'react'
import DDItem, { DDChart } from '../data/DDItem'
import { ChartSkeleton } from '../pages/EmployeeSite'


export default function CustomerGraphs() {

  return (
    <div>
      <DDItem
        url={'/api/data/hoursBilledPerCustomer'}
        title="Timer brukt per kunde"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        fullSize
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Bar',
              props: {
                dataKey: 'kunde',
                yLabels: ['timer'],
                margin: { top: 40, right: 20, bottom: 65, left: 40 },
              },
            },
          ],
        }}
      />
      <DDItem
        url={'/api/data/hoursBilledPerWeek'}
        title="Timer brukt per uke"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        fullSize
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
              props: {
                big: true,
              }
            },
          ],
        }}
      />
    </div>
  )

}
