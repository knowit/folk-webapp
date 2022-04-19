import React from 'react'
import { useExperienceDistributionCharts } from '../../api/data/competence/competenceQueries'
import ChartCard from '../../components/charts/ChartCard'

const ExperienceDistributionCard = () => {
  const { data, error } = useExperienceDistributionCharts()
  return <ChartCard title="Erfaring" data={data} error={error} />
}

export default ExperienceDistributionCard
