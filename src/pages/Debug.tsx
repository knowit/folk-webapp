import { Grid } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import React from 'react'
import { useExperienceDistributionBar } from '../api/data/competence/competenceQueries'
import {
  useEmployeeMotivationAndCompetenceBar,
  useEmployeeMotivationAndCompetenceRadar,
} from '../api/data/employee/employeeQueries'
import { GridItem } from '../components/gridItem/GridItem'
import { GridItemHeader } from '../components/gridItem/GridItemHeader'
import BarChart from '../components/charts/BarChart'

const Debug = () => {
  const { data, error } = useExperienceDistributionBar()

  if (error) return <div>{error}</div>
  if (!data) return <div>Loading...</div>

  return (
    <Grid container>
      <GridItem>
        <BarChart
          indexBy={data.regular.indexBy}
          keys={data.regular.keys}
          data={data.regular.data}
        />
      </GridItem>
      <GridItem>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </GridItem>
    </Grid>
  )
}

export default Debug
