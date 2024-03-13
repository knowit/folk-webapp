import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { OpenInNewIcon } from '../../../assets/Icons'
import React from 'react'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { styled } from '@mui/material/styles'
import { Checkbox } from '@mui/material'
import { CustomerCardData } from '../../../api/data/customer/customerApiTypes'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

interface CustomerCardProps {
  data: CustomerCardData
  selectedCustomerIds: string[]
  handleCheckboxChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => void
  customerSpecificCard?: boolean
  vertical?: boolean
  selectedChartPeriod?: ChartPeriod
}
interface CustomerCardContent {
  customer: CustomerCardData
  selectedChartPeriod: ChartPeriod
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
  customer,
  selectedChartPeriod,
}) => {
  const billedTotalFixedNumber = Number(customer.billedTotal).toFixed(0)
  const consultants =
    selectedChartPeriod === ChartPeriod.WEEK
      ? customer.consultantsLastPeriod
      : customer.consultantsLastLongPeriod
  const billedLastPeriod = Number(
    selectedChartPeriod === ChartPeriod.WEEK
      ? customer.billedLastPeriod
      : customer.billedLastLongPeriod
  ).toFixed(1)

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
          <GridValue vertical>{billedTotalFixedNumber}</GridValue>
        </ComponentRoot>
        <ComponentRoot vertical>
          <GridHeadline>Kundeansvarlig:</GridHeadline>
          <CustomerFocus>{customer.accountManager || 'Ukjent'}</CustomerFocus>
        </ComponentRoot>
      </>
    )
  } else {
    return (
      <>
        <ComponentRoot>
          <GridStyled item xs={4}>
            <GridHeadline>Antall konsulenter siste periode</GridHeadline>
          </GridStyled>
          <GridStyled item xs={4}>
            <GridHeadline>Fakturerte timer siste periode</GridHeadline>
          </GridStyled>
          <GridStyled item xs={4}>
            <GridHeadline>Totalt fakturerte timer</GridHeadline>
          </GridStyled>
        </ComponentRoot>
        <ComponentRoot>
          <GridStyled item xs={4}>
            <GridValue>{consultants}</GridValue>
          </GridStyled>
          <GridStyled item xs={4}>
            <GridValue>{billedLastPeriod}</GridValue>
          </GridStyled>
          <GridStyled item xs={4}>
            <GridValue>{billedTotalFixedNumber}</GridValue>
          </GridStyled>
        </ComponentRoot>
        <ComponentRoot>
          <GridStyled item xs={12}>
            <GridHeadline>
              Kundeansvarlig:{' '}
              <CustomerFocus>
                {customer.accountManager || 'Ukjent'}
              </CustomerFocus>
            </GridHeadline>
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
  selectedChartPeriod = ChartPeriod.WEEK,
}) => {
  const { customer } = data

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
          customer={data}
          selectedChartPeriod={selectedChartPeriod}
        />
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard

const ComponentRoot = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'vertical',
})<{ vertical?: boolean }>(({ vertical }) => ({
  display: 'flex',
  flexDirection: vertical ? 'column' : 'row',
  justifyContent: vertical ? 'center' : 'space-between',
  textAlign: 'center',
}))

const GridValue = styled('p', {
  shouldForwardProp: (prop) => prop !== 'vertical',
})<{ vertical?: boolean }>(({ vertical }) => ({
  fontSize: 26,
  fontWeight: 700,
  margin: vertical ? 10 : 0,
}))

const GridStyled = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'end',
  flexDirection: 'column',
}))

const GridHeadline = styled('p')(() => ({
  margin: 5,
}))

const CustomerFocus = styled('p')({
  display: 'inline',
  margin: 5,
  fontWeight: 700,
})
