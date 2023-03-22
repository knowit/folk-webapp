import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { OpenInNewStyled } from '../../../components/table/cells/ConsultantCell'
import { styled } from '@material-ui/styles'

export type CustomerData = {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}

interface CustomerCardProps {
  data: CustomerData
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <BoxInfo>
            Antall konsulenter:
            <BoxInfoNumbers>{consultants}</BoxInfoNumbers>
          </BoxInfo>
          <BoxInfo>
            Fakturerte timer siste periode:
            <BoxInfoNumbers>{billedLastPeriod}</BoxInfoNumbers>
          </BoxInfo>
          <BoxInfo>
            Totalt fakturerte timer:
            <BoxInfoNumbers>{billedTotal}</BoxInfoNumbers>
          </BoxInfo>
        </Box>
      </GridItemContent>
    </GridItem>
  )
}

export default CustomerCard
