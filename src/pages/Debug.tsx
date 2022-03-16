import { Grid } from '@material-ui/core'
import React from 'react'
import { useExperienceDistributionPie } from '../api/data/competence/competenceQueries'
import PieChart from '../components/charts/PieChart'
import { GridItem } from '../components/gridItem/GridItem'

const Debug = () => {
  const { data, error } = useExperienceDistributionPie()

  if (error) return <div>{error}</div>
  if (!data) return <div>Loading...</div>

  return (
    <Grid container>
      <GridItem>
        <PieChart
          id={data.regular.id}
          value={data.regular.value}
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
