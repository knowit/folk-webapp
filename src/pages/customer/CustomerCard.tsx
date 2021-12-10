import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  GridItem,
  GridItemContent,
  GridItemHeader,
} from '../../components/GridItem'
import { OpenInNewStyled } from '../../data/components/table/cells/ConsultantCell'

export type CustomerData = {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}

interface CustomerCardProps {
  data: CustomerData
}

const CustomerCard: React.FC<CustomerCardProps> = ({ data }) => {
  const { customer, consultants, billedLastPeriod, billedTotal } = data
  return (
    <GridItem>
      <GridItemHeader title={customer}>
        <Link to={'#'}>
          <OpenInNewStyled />
        </Link>
      </GridItemHeader>
      <GridItemContent>
        <Box>Antall konsulenter: {consultants}</Box>
        <Box>Fakturerte timer siste periode: {billedLastPeriod}</Box>
        <Box>Totalt fakturerte timer: {billedTotal}</Box>
        <Box>Kunde siden: -</Box>
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard
