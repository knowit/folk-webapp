import { styled } from '@mui/material/styles'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { LayoutGroup, motion } from 'framer-motion'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import { CustomerCardData } from '../../../api/data/customer/customerApiTypes'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

export enum SortMethod {
  abc = 'abc',
  konsulenter = 'konsulenter',
}

interface Props {
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  selectedCustomerIds: string[]
  selectedSortMethod: SortMethod
  showCustomerHistory: boolean
  selectedChartPeriod: ChartPeriod
}

const CustomerOverviewFilter = ({
  handleCheckboxChange,
  selectedCustomerIds,
  selectedSortMethod,
  showCustomerHistory,
  selectedChartPeriod,
}: Props) => {
  const customerCards = useCustomerCards()

  const filteredCustomerCards = customerCards

  const getConsultants = (customer: CustomerCardData) =>
    selectedChartPeriod === ChartPeriod.WEEK
      ? customer.consultantsLastPeriod
      : customer.consultantsLastLongPeriod

  const sortMethod = {
    [SortMethod.abc]: (a: CustomerCardData, b: CustomerCardData) =>
      a.customer.localeCompare(b.customer),
    [SortMethod.konsulenter]: (a: CustomerCardData, b: CustomerCardData) =>
      getConsultants(b) - getConsultants(a),
  }
  const sortedSelectedCustomers = filteredCustomerCards
    .filter((cc) => selectedCustomerIds.includes(cc.customer))
    .filter((cc) => showCustomerHistory || cc.consultantsLastPeriod > 0)
    .sort(sortMethod[selectedSortMethod])
  const sortedUnselectedCustomers = filteredCustomerCards
    .filter((cc) => !selectedCustomerIds.includes(cc.customer))
    .filter((cc) => showCustomerHistory || cc.consultantsLastPeriod > 0)
    .sort(sortMethod[selectedSortMethod])

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
                  label={`${customer.customer} (${getConsultants(customer)})`}
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
                  label={`${customer.customer} (${getConsultants(customer)})`}
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
