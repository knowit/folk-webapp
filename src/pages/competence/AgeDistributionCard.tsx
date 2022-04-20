import React from 'react'
import { useAgeDistributionCharts } from '../../api/data/competence/competenceQueries'
import ChartCard from '../../components/charts/ChartCard'

const AgeDistributionCard = () => {
  const { data, error } = useAgeDistributionCharts()
  return <ChartCard title="Alder" data={data} error={error} />
}

export default AgeDistributionCard
