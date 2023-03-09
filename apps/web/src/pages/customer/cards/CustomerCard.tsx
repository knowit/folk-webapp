import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { OpenInNewStyled } from '../../../components/table/cells/ConsultantCell'

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
        <Box>Kundeansvarlig</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '33%' }}>
            Antall konsulenter:{' '}
            <Box sx={{ fontSize: 32, fontWeight: 800 }}>{consultants}</Box>
          </Box>
          <Box sx={{ width: '33%' }}>
            Fakturerte timer siste periode:{' '}
            <Box sx={{ fontSize: 32, fontWeight: 800 }}>{billedLastPeriod}</Box>
          </Box>
          <Box sx={{ width: '33%' }}>
            Totalt fakturerte timer:{' '}
            <Box sx={{ fontSize: 32, fontWeight: 800 }}>{billedTotal}</Box>
          </Box>
        </Box>
        {/*<Box>Fakturerte timer siste periode: {billedLastPeriod}</Box>
        <Box>Totalt fakturerte timer: {billedTotal}</Box>
        <Box>Kunde siden: -</Box>*/}
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard
