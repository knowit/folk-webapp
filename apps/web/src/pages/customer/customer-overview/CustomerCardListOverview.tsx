import CustomerCardList from './CustomerCardList'
import {
  useCustomerCards,
  useHoursBilledPerCustomerCharts,
} from '../../../api/data/customer/customerQueries'

interface Props {
  selectedCustomerIds: string[]
  showHistoricalData: boolean
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
}

const CustomerCardListOverview = ({
  selectedCustomerIds,
  showHistoricalData,
  handleCheckboxChange,
}: Props) => {
  const customersWithConsultants = useCustomerCards().map(
    (customerCard) => customerCard.customer
  )
  const { data } = useHoursBilledPerCustomerCharts()
  const historicalCustomers =
    data && showHistoricalData
      ? data?.data?.filter(
          ({ customer }) => !customersWithConsultants.includes(customer)
        )
      : []

  return (
    <CustomerCardList
      selectedCustomerIds={selectedCustomerIds}
      showHistoricalData={showHistoricalData}
      historicalCustomers={historicalCustomers}
      handleCheckboxChange={handleCheckboxChange}
    />
  )
}

export default CustomerCardListOverview
