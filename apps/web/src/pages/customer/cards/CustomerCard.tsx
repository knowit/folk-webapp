import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { OpenInNewIcon } from '../../../assets/Icons'
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
  vertical?: boolean
}
interface CustomerCardContent {
  consultants: number
  billedLastPeriod: number
  billedTotal: number | string
  vertical?: boolean
}

const CheckboxWrapper = styled('div')({
  display: 'flex',
  width: 300,
  justifyContent: 'end',
  alignItems: 'center',
})

const Text = styled('label')({
  fontWeight: '400',
  fontSize: 14,
})

const LinkStyled = styled(Link)(() => ({
  display: 'flex',
}))

const CustomerCardContent: React.FC<CustomerCardContent> = ({
  vertical = false,
  consultants,
  billedLastPeriod,
  billedTotal,
}) => {
  const ComponentRoot = styled(Grid, {
    shouldForwardProp: (prop) => prop !== 'vertical',
  })<{ vertical?: boolean }>(({ vertical }) => ({
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    justifyContent: vertical ? 'center' : 'space-between',
    textAlign: 'center',
  }))

  const GridStyled = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'end',
    flexDirection: 'column',
  }))

  const GridHeadline = styled('p')(() => ({
    margin: 5,
  }))

  const GridValue = styled('p', {
    shouldForwardProp: (prop) => prop !== 'vertical',
  })<{ vertical?: boolean }>(({ vertical }) => ({
    fontSize: 32,
    fontWeight: 700,
    margin: vertical ? 10 : 0,
  }))

  if (vertical) {
    return (
      <>
        <ComponentRoot vertical>
          <GridHeadline>Antall konsulenter</GridHeadline>
          <GridValue vertical>{consultants}</GridValue>
        </ComponentRoot>
        <ComponentRoot vertical>
          <GridHeadline>Fakturerte timer siste periode</GridHeadline>
          <GridValue vertical>{billedLastPeriod}</GridValue>
        </ComponentRoot>
        <ComponentRoot vertical>
          <GridHeadline>Totalt fakturerte timer</GridHeadline>
          <GridValue vertical>{billedTotal}</GridValue>
        </ComponentRoot>
      </>
    )
  } else {
    return (
      <>
        <ComponentRoot>
          <GridStyled item xs={3}>
            <GridHeadline>Antall konsulenter</GridHeadline>
          </GridStyled>
          <GridStyled item xs={3}>
            <GridHeadline>Fakturerte timer siste periode</GridHeadline>
          </GridStyled>
          <GridStyled item xs={3}>
            <GridHeadline>Totalt fakturerte timer</GridHeadline>
          </GridStyled>
        </ComponentRoot>
        <ComponentRoot>
          <GridStyled item xs={3}>
            <GridValue>{consultants}</GridValue>
          </GridStyled>
          <GridStyled item xs={3}>
            <GridValue>{billedLastPeriod}</GridValue>
          </GridStyled>
          <GridStyled item xs={3}>
            <GridValue>{billedTotal}</GridValue>
          </GridStyled>
        </ComponentRoot>
      </>
    )
  }
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  data,
  handleCheckboxChange,
  selectedCustomerIds,
  customerSpecificCard,
  vertical = false,
}) => {
  const { customer, consultants, billedLastPeriod, billedTotal } = data

  const billedTotalFixedNumber = Number.isInteger(billedTotal)
    ? billedTotal
    : billedTotal.toFixed(2)

  return (
    <GridItem>
      <GridItemHeader
        title={customerSpecificCard ? 'Verdi' : customer}
        card={true}
        clickable={customerSpecificCard ? false : true}
      >
        {customerSpecificCard ? null : (
          <CheckboxWrapper>
            <Text htmlFor={`chk${customer}`}>Vis kunde i graf</Text>
            <Checkbox
              id={`chk${customer}`}
              checked={selectedCustomerIds.includes(customer)}
              onChange={(event) => handleCheckboxChange(event, customer)}
            />
            <LinkStyled to={`/kunder/${customer}`}>
              <OpenInNewIcon />
            </LinkStyled>
          </CheckboxWrapper>
        )}
      </GridItemHeader>
      <GridItemContent>
        <CustomerCardContent
          vertical={vertical}
          consultants={consultants}
          billedLastPeriod={billedLastPeriod}
          billedTotal={billedTotalFixedNumber}
        />
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard
