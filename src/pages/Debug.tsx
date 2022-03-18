import { Grid } from '@material-ui/core'
import React from 'react'
import { useFagEventsLine } from '../api/data/competence/competenceQueries'
import LineChart from '../components/charts/LineChart'
import { GridItem } from '../components/gridItem/GridItem'

const Debug = () => {
  const { data, error } = useFagEventsLine()

  if (error) return <div>{error}</div>
  if (!data) return <div>Loading...</div>

  return (
    <Grid container>
      <GridItem>
        <LineChart data={data} />
      </GridItem>
      <GridItem>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </GridItem>
    </Grid>
  )
}

export default Debug
