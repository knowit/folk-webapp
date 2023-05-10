import { Box } from '@mui/material'
import React from 'react'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { styled } from '@mui/material/styles'
import { Checkbox } from '@mui/material'

export type CustomerData = {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}

interface CustomerCardProps {
  data: CustomerData
  selectedCustomerIds: string[]
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
}
const BoxInfo = styled(Box)({
  width: '25%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
})

const BoxInfoNumbers = styled(Box)({
  fontSize: 32,
  fontWeight: 700,
})

const CheckboxWrapper = styled('div')({
  display: 'flex',
  width: '300px',
  justifyContent: 'flex-end',
})

const Text = styled('div')({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '40px',
  width: '97px',
})

const CustomerCard: React.FC<CustomerCardProps> = ({
  data,
  handleCheckboxChange,
  selectedCustomerIds,
}) => {
  const { customer, consultants, billedLastPeriod, billedTotal } = data

  const billedTotalFixedNumber = Number.isInteger(billedTotal)
    ? billedTotal
    : billedTotal.toFixed(1)

  return (
    <GridItem>
      <GridItemHeader title={customer} card={true}>
        <CheckboxWrapper>
          <Text>Vis kunde i graf</Text>
          <Checkbox
            checked={selectedCustomerIds.includes(customer)}
            onChange={(event) => handleCheckboxChange(event, customer)}
          />
        </CheckboxWrapper>
      </GridItemHeader>
      <GridItemContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <BoxInfo>
            Antall konsulenter:
            <BoxInfoNumbers>{consultants}</BoxInfoNumbers>
          </BoxInfo>
          <BoxInfo>
            Fakturerte timer siste periode:
            <BoxInfoNumbers>
              {billedLastPeriod ? billedLastPeriod : '0'}
            </BoxInfoNumbers>
          </BoxInfo>
          <BoxInfo>
            Totalt fakturerte timer:
            <BoxInfoNumbers>{billedTotalFixedNumber}</BoxInfoNumbers>
          </BoxInfo>
        </Box>
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard
