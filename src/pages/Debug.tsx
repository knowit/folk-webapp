import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useCompetenceAmountCharts,
  useCompetenceAreasCharts,
  useFagEventsCharts,
  useFagtimerCharts,
} from '../api/data/competence/competenceQueries'
import ChartCard from '../components/charts/ChartCard'
import { GridItem } from '../components/gridItem/GridItem'

const Debug = () => {
  const { data: competenceArea } = useCompetenceAreasCharts()
  const { data: competenceAmountBar } = useCompetenceAmountCharts()
  const { data: fagEvents } = useFagtimerCharts()
  const { data: testing } = useFagEventsCharts()

  if (!competenceAmountBar || !competenceArea || !fagEvents || !testing)
    return <div>Loading...</div>

  return (
    <Grid container>
      <ChartCard title="Testing" data={testing} />
      <ChartCard title="Kometansemengde" data={competenceAmountBar} />
      <ChartCard title="fagEvents" data={fagEvents} />
      <GridItem>
        <pre>{JSON.stringify(testing, null, 2)}</pre>
      </GridItem>
    </Grid>
  )
}

export default Debug
