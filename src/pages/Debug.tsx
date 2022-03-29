import { Grid } from '@material-ui/core'
import React from 'react'
import { useCompetenceAreasRadar } from '../api/data/competence/competenceQueries'
import RadarChart from '../components/charts/RadarChart'
import { GridItem } from '../components/gridItem/GridItem'

const Debug = () => {
  const { data, error } = useCompetenceAreasRadar()

  if (error) return <div>{error}</div>
  if (!data) return <div>Loading...</div>

  const mainCat = data['MainCategories']

  return (
    <Grid container>
      <GridItem>
        <RadarChart
          indexBy={mainCat.indexBy}
          keys={mainCat.keys}
          data={mainCat.data}
        />
      </GridItem>
      <GridItem>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </GridItem>
    </Grid>
  )
}

export default Debug
