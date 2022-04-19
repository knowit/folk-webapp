import React from 'react'
import { useFagtimerCharts } from '../../api/data/competence/competenceQueries'
import ChartCard from '../../components/charts/ChartCard'

const FagtimerCard = () => {
  const { data, error } = useFagtimerCharts()
  return (
    <ChartCard
      title="Aktivitet faggrupper"
      description="Hver vertikal akse viser antall unike fag aktiviteter per uke, deulike linjene representerer de ulike årene"
      data={data}
      error={error}
    />
  )
}

export default FagtimerCard
