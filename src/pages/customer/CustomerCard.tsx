import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core'
import { OpenInNew } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  GridItem,
  GridItemContent,
  GridItemHeader,
} from '../../components/GridItem'
import { OpenInNewStyled } from '../../data/components/table/cells/ConsultantCell'

interface CustomerCardProps {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  consultants,
  billedLastPeriod,
  billedTotal,
}) => {
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
