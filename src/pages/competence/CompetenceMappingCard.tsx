import React from 'react'
import { useCompetenceMappingCharts } from '../../api/data/competence/competenceQueries'
import ChartCard from '../../components/charts/ChartCard'

const CompetenceMappingCard = () => {
  const { data, error } = useCompetenceMappingCharts()
  return (
    <ChartCard
      title="Kompetansekartlegging"
      description="Grafen viser gjennomsnittlig score på kompetanse/motivasjon innenfor hver av hovedkategoriene. I tillegg vises gjennomsnittlig score for hver underkategori og forholdet mellom underkategoriene i samme hovedkategori."
      data={data}
      error={error}
    />
  )
}

export default CompetenceMappingCard
