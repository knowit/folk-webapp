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
  handleCheckboxChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  customerSpecificCard?: boolean
}
const BoxInfo = styled(Box)({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
})

const BoxInfoNumbers = styled(Box)({
  fontSize: 32,
  fontWeight: 700,
  justifyContent: 'center',
  marginTop: '10px',
  marginBottom: '35px',
  display: 'flex',
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
})

const CustomerCard: React.FC<CustomerCardProps> = ({
  data,
  handleCheckboxChange,
  selectedCustomerIds,
  customerSpecificCard,
}) => {
  const { customer, consultants, billedLastPeriod, billedTotal } = data

  const billedTotalFixedNumber = Number.isInteger(billedTotal)
    ? billedTotal
    : billedTotal.toFixed(2)

  const sx = customerSpecificCard
    ? {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }
    : { display: 'flex', justifyContent: 'space-between' }

  return (
    <GridItem>
      {customerSpecificCard ? (
        <GridItemHeader title={'Fakturerte timer'} card={true}></GridItemHeader>
      ) : (
        <GridItemHeader title={customer} card={true} clickable={true}>
          <CheckboxWrapper>
            <Text>Vis kunde i graf</Text>
            <Checkbox
              checked={selectedCustomerIds.includes(customer)}
              onChange={(event) => handleCheckboxChange(event, customer)}
            />
          </CheckboxWrapper>
        </GridItemHeader>
      )}
      <GridItemContent>
        <Box sx={sx}>
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
