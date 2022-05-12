import React, { useEffect } from 'react'
import ChartCard from '../../../components/charts/ChartCard'
import {
  useHoursBilledPerCustomerCharts,
  useHoursBilledPerWeekCharts,
} from '../../../api/data/customer/customerQueries'
import { BarChartData } from 'server/routers/chartTypes'

const HoursBilledPerCustomerCard = () => {
  const { data: perCustomerData, error: perCustomerError } =
    useHoursBilledPerCustomerCharts()
  //Retrieve weekly data to properly filter total hours billed in chart
  const { data: weeklyData } = useHoursBilledPerWeekCharts()

  const actualData: BarChartData = {
    weeklyData: weeklyData,
    ...perCustomerData,
  }

  useEffect(() => {
    console.log(perCustomerData)
    console.log(actualData)
  })
  return (
    <ChartCard
      title="Timer brukt per kunde"
      description="Dataene er fra første registrering i UBW. Noen av dataene kan være justert i etterkant, og disse justeringene er ikke oppdatert her."
      data={actualData}
      error={perCustomerError}
      showFilter={true}
    />
  )
}

export default HoursBilledPerCustomerCard
