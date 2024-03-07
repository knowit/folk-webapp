import { styled } from '@mui/material/styles'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { LayoutGroup, motion } from 'framer-motion'
import { Checkbox, FormControlLabel } from '@mui/material'
import {
  useAllCustomerData,
  useCustomerCards,
} from '../../../api/data/customer/customerQueries'
import { CustomerCardData } from '../../../api/data/customer/customerApiTypes'
import { CustomerData } from '../cards/CustomerCard'

export enum SortMethod {
  abc = 'abc',
  konsulenter = 'konsulenter',
}

const sortMethod = {
  [SortMethod.abc]: (a: CustomerCardData, b: CustomerCardData) =>
    a.customer.localeCompare(b.customer),
  [SortMethod.konsulenter]: (a: CustomerCardData, b: CustomerCardData) =>
    b.consultants - a.consultants,
}

interface Props {
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  selectedCustomerIds: string[]
  selectedSortMethod: SortMethod
  showCustomerHistory: boolean
}

const CustomerOverviewFilter = ({
  handleCheckboxChange,
  selectedCustomerIds,
  selectedSortMethod,
  showCustomerHistory,
}: Props) => {
  const customerCards = useCustomerCards()
  const customerData = useAllCustomerData().map(
    (cd): CustomerData => ({
      customer: cd.customer,
      consultants: 0,
      billedLastPeriod: 0,
      billedTotal: 0,
    })
  )
  const historicalCustomerData = customerData.filter(
    (cd) => !customerCards.find((cc) => cc.customer === cd.customer)
  )
  const populatedCustomerCards = [
    ...customerCards,
    ...(showCustomerHistory ? historicalCustomerData : []),
  ]
  console.log(populatedCustomerCards)
  const sortedSelectedCustomers = populatedCustomerCards
    .filter((cc) => selectedCustomerIds.includes(cc.customer))
    .sort(sortMethod[selectedSortMethod])
  const sortedUnselectedCustomers = populatedCustomerCards
    .filter((cc) => !selectedCustomerIds.includes(cc.customer))
    .sort(sortMethod[selectedSortMethod])

  console.log(sortedSelectedCustomers.length, sortedUnselectedCustomers.length)

  return (
    <ScrollableDiv>
      <SlimGridItemContent>
        <CheckboxFlexWrapper>
          <LayoutGroup>
            {sortedSelectedCustomers.map((customer) => (
              <motion.div
                layoutId={customer.customer}
                key={customer.customer}
                initial={false}
                transition={easingFunction}
              >
                <SlimFormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCustomerIds.includes(customer.customer)}
                      onChange={(event) =>
                        handleCheckboxChange(event, customer.customer)
                      }
                      name={customer.customer}
                    />
                  }
                  label={`${customer.customer} (${customer.consultants})`}
                  labelPlacement="start"
                  key={customer.customer}
                />
              </motion.div>
            ))}
            {sortedUnselectedCustomers.map((customer) => (
              <motion.div
                layoutId={customer.customer}
                key={customer.customer}
                initial={false}
                transition={easingFunction}
              >
                <SlimFormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCustomerIds?.includes(customer.customer)}
                      onChange={(event) =>
                        handleCheckboxChange(event, customer.customer)
                      }
                      name={customer.customer}
                    />
                  }
                  label={`${customer.customer} (${customer.consultants})`}
                  labelPlacement="start"
                  key={customer.customer}
                />
              </motion.div>
            ))}
          </LayoutGroup>
        </CheckboxFlexWrapper>
      </SlimGridItemContent>
    </ScrollableDiv>
  )
}

export default CustomerOverviewFilter

const easingFunction = { ease: [0.33, 0, 1, 0.62], duration: 1 }

const ScrollableDiv = styled('div')(() => ({
  overflowY: 'scroll',
  height: '100%',
}))

const CheckboxFlexWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: 324,
  maxHeight: 324,
}))

const SlimFormControlLabel = styled(FormControlLabel)({
  marginLeft: 0,
})

const SlimGridItemContent = styled(GridItemContent)({
  padding: '10px 15px',
})
