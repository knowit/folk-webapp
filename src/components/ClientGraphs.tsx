import React, { useEffect } from 'react'
import DDItem, { DDChart } from '../data/DDItem'
import { ChartSkeleton } from '../pages/EmployeeSite'
import { useFetchedData } from '../hooks/service'

type Payload = { [key: string]: any };

export default function ClientGraphs() {
  const [payload, pending] = useFetchedData<Payload>({ url: '/api/data/hoursBilledPerWeek'})

  useEffect(() => {
    if (!pending && payload) {
      console.log(payload)
    }
  }, [payload, pending])

  const lineData = { "setNames": ["Lines", "Lines2", "Lines3"], "sets": {
    "Lines": [
        {
          "id": "TestLine1",
          "color": "hsl(99, 70%, 50%)",
          "data": [
            {
              "x": "plane",
              "y": 249
            },
            {
              "x": "helicopter",
              "y": 300
            },
            {
              "x": "boat",
              "y": 140
            },
            {
              "x": "train",
              "y": 16
            },
            {
              "x": "subway",
              "y": 128
            },
          ]
        },
        {
          "id": "Line2",
          "color": "hsl(42, 30%, 90%)",
          "data": [
            {
              "x": "plane",
              "y": 124
            },
            {
              "x": "helicopter",
              "y": 32
            },
            {
              "x": "boat",
              "y": 551
            },
            {
              "x": "train",
              "y": 24
            },
            {
              "x": "subway",
              "y": 123
            },
          ]
        }]
    }
  }

  return (
    <div>
      <DDItem
        url={'/api/data/hoursBilledPerClient'}
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
        url={'/api/data/hoursBilledPerClient'}
        title="Linegraph test"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
        fullSize
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
              props: {
                data: lineData.sets.Lines,
                big: false
              },
            },
          ],
        }}
        preloadedPayload={lineData}
        usePreloaded
      />
    </div>
  )

}
