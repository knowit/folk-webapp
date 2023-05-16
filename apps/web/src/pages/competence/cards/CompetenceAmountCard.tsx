import React from 'react'
import { useCompetenceAmountCharts } from '../../../api/data/competence/competenceQueries'
import ChartCard from '../../../components/charts/ChartCard'

const CompetenceAmountCard = () => {
  const { data, error } = useCompetenceAmountCharts()
  return (
    <ChartCard
      title="Kompetansemengde"
      description="Andel ansatte som har svart 3 eller mer på kompetansekartleggingen"
      data={data}
      error={error}
    />
  )
}

export default CompetenceAmountCard
