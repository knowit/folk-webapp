import { Box } from '@mui/material'
import React from 'react'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { styled } from '@mui/material/styles'
import { Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'
import { OpenIneNewIcon } from '../../../assets/Icons'

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

  return (
    <GridItem>
      {customerSpecificCard ? (
        <GridItemHeader title={'Fakturerte timer'} card={true}></GridItemHeader>
      ) : (
        <GridItemHeader title={customer} card={true}>
          <Link to={'/kunder/' + customer}>
            <OpenIneNewIcon />
          </Link>
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
        {customerSpecificCard ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <BoxInfo>
              Antall konsulenter:
              <BoxInfoNumbers>{consultants}</BoxInfoNumbers>
            </BoxInfo>
            <br />
            <BoxInfo>
              Fakturerte timer siste periode:
              <BoxInfoNumbers>
                {billedLastPeriod ? billedLastPeriod : '0'}
              </BoxInfoNumbers>
            </BoxInfo>
            <br />
            <BoxInfo>
              Totalt fakturerte timer:
              <BoxInfoNumbers>{billedTotalFixedNumber}</BoxInfoNumbers>
            </BoxInfo>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <BoxInfo>
              Antall konsulenter:
              <BoxInfoNumbers>{consultants}</BoxInfoNumbers>
            </BoxInfo>
            <br />
            <BoxInfo>
              Fakturerte timer siste periode:
              <BoxInfoNumbers>
                {billedLastPeriod ? billedLastPeriod : '0'}
              </BoxInfoNumbers>
            </BoxInfo>
            <br />
            <BoxInfo>
              Totalt fakturerte timer:
              <BoxInfoNumbers>{billedTotalFixedNumber}</BoxInfoNumbers>
            </BoxInfo>
          </Box>
        )}
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard
