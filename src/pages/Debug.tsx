import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useCompetenceAmountBar,
  useCompetenceAreasCharts,
  useFagtimerLine,
} from '../api/data/competence/competenceQueries'
import ChartCard from '../components/charts/ChartCard'

const Debug = () => {
  const { data: competenceArea } = useCompetenceAreasCharts()
  const { data: competenceAmountBar } = useCompetenceAmountBar()
  const { data: fagEvents } = useFagtimerLine()

  if (!competenceAmountBar || !competenceArea || !fagEvents)
    return <div>Loading...</div>

  return (
    <Grid container>
      <ChartCard title="Kompetanse" data={competenceArea} />
      <ChartCard title="Kometansemengde" data={competenceAmountBar} />
      <ChartCard title="fagEvents" data={fagEvents} />
      {/* <GridItem>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </GridItem> */}
    </Grid>
  )
}

export default Debug
