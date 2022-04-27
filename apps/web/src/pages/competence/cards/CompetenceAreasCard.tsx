import React from 'react'
import { useCompetenceAreasCharts } from '../../../api/data/competence/competenceQueries'
import ChartCard from '../../../components/charts/ChartCard'

const CompetenceAreasCard = () => {
  const { data, error } = useCompetenceAreasCharts()
  return <ChartCard title="Kompetanseområder" data={data} error={error} />
}

export default CompetenceAreasCard
