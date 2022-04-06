import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useCompetenceAmountBar,
  useCompetenceAreasCharts,
  useFagtimerLine,
} from '../api/data/competence/competenceQueries'
import { useEmployeeMotivationAndCompetence } from '../api/data/employee/employeeQueries'
import ChartCard from '../components/charts/ChartCard'
import { GridItem } from '../components/gridItem/GridItem'

const Debug = () => {
  const { data: competenceArea } = useCompetenceAreasCharts()
  const { data: competenceAmountBar } = useCompetenceAmountBar()
  const { data: fagEvents } = useFagtimerLine()
  const { data: testing } = useEmployeeMotivationAndCompetence(
    'fredrik.arnesen@knowit.no'
  )

  if (!competenceAmountBar || !competenceArea || !fagEvents || !testing)
    return <div>Loading...</div>

  return (
    <Grid container>
      <ChartCard title="Erfaring" data={testing} />
      <ChartCard title="Kometansemengde" data={competenceAmountBar} />
      <ChartCard title="fagEvents" data={fagEvents} />
      <GridItem>
        <pre>{JSON.stringify(testing, null, 2)}</pre>
      </GridItem>
    </Grid>
  )
}

export default Debug
