import React from 'react'
import { useFagtimerCharts } from '../../../api/data/competence/competenceQueries'
import ChartCard from '../../../components/charts/ChartCard'

const FagtimerCard = () => {
  const { data, error } = useFagtimerCharts()
  return (
    <ChartCard
      title="Aktivitet faggrupper"
      description="Hver vertikal akse viser antall unike fag aktiviteter per uke, de ulike linjene representerer de ulike årene"
      data={data}
      legendWidth={100}
      error={error}
    />
  )
}

export default FagtimerCard
