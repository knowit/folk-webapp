import React, { useEffect } from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import { useHoursBilledPerCustomerCharts } from '../../../api/data/customer/customerQueries'

const HoursBilledPerCustomerCard = () => {
  const { data, error } = useHoursBilledPerCustomerCharts()
  useEffect(() => {
    console.log(data)
  })
  return (
    <ChartCard
      title="Timer brukt per kunde"
      description="Dataene er fra første registrering i UBW. Noen av dataene kan være justert i etterkant, og disse justeringene er ikke oppdatert her."
      data={data}
      error={error}
      showFilter={true}
    />
  )
}

export default HoursBilledPerCustomerCard
