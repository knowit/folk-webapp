import CustomerCardList from './CustomerCardList'
import {
  useAllCustomerData,
  useCustomerCards,
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
  const historicalCustomers = useAllCustomerData().filter(
    (customerData) => !customersWithConsultants.includes(customerData.customer)
  )

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
