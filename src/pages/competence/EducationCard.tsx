import React from 'react'
import { useEducationCharts } from '../../api/data/competence/competenceQueries'
import ChartCard from '../../components/charts/ChartCard'

const EducationCard = () => {
  const { data, error } = useEducationCharts()
  return <ChartCard title="Utdannelse" data={data} error={error} />
}

export default EducationCard
