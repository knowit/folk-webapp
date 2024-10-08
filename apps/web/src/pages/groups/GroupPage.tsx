import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import RecruitmentCard from './cards/RecruitmentCard'
import PrincipalCard from './cards/PrincipalCard'
import SalesCard from './cards/SalesCard'

export default function GroupPage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Grupper',
    })
    pageTitle('Grupper')
  }, [trackPageView])

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <SalesCard />
      <PrincipalCard />
      <RecruitmentCard />
    </Grid>
  )
}
