import React from 'react'
import { useFagEventsCharts } from '../../api/data/competence/competenceQueries'
import ChartCard from '../../components/charts/ChartCard'

const FagEventsCard = () => {
  const { data, error } = useFagEventsCharts()
  return (
    <ChartCard
      title="Fag og hendelser"
      description="Hver vertikal akse viser antall unike hendelser per måned fra Google kalenderne Knowit Events og Knowit Fagkalender."
      data={data}
      error={error}
    />
  )
}

export default FagEventsCard
