import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import GroupCard from './cards/GroupCard'

export default function GroupPage() {
  const { trackPageView } = useMatomo()

  const principals = [
    { id: 'alexander.royne-helgesen@knowit.no', role: 'frontend' },
    { id: 'christian.karlsson@knowit.no', role: 'design' },
    { id: 'gunnar.larsen@knowit.no', role: 'IoT og embedded systems' },
    { id: 'hd@knowit.no', role: 'arkitektur' },
    { id: 'kenneth.stigen@knowit.no', role: 'backend' },
    { id: 'llu@knowit.no', role: 'arkitektur' },
    { id: 'pal.de.vibe@knowit.no', role: 'data/ai' },
  ]

  const sales = [
    { id: 'hans.frisvold@knowit.no' },
    { id: 'jonas.gurrich@knowit.no' },
    { id: 'kai.eidissen@knowit.no' },
    { id: 'torbjorn.moen@knowit.no' },
  ]

  const recruitment = [
    { id: 'daniel.horn@knowit.no' },
    { id: 'lin@knowit.no' },
    { id: 'tommi.venning@knowit.no' },
  ]

  useEffect(() => {
    trackPageView({
      documentTitle: 'Grupper',
    })
    pageTitle('Grupper')
  }, [trackPageView])

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <GroupCard members={sales} title={'Salg'} />
      <GroupCard members={principals} title={'Principal engineers'} />
      <GroupCard members={recruitment} title={'Rekruttering'} />
    </Grid>
  )
}
