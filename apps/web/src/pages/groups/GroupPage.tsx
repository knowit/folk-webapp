import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import GroupCard from './cards/GroupCard'
import { amu } from './Arbeidsmiljoutvalg'
import { drift } from './Drift'
import { gruppeledere } from './Gruppeledere'
import { julebord } from './Julebord'
import { ledergruppa } from './Ledergruppa'
import { principals } from './Principals'
import { recruitment } from './Recruitment'
import { sales } from './Sales'
import { styret } from './Styret'
import { okonomi } from './Okonomi'

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
      <GroupCard members={amu} title={'Arbeidsmiljøutvalg'} />
      <GroupCard members={drift} title={'Drift'} />
      <GroupCard members={gruppeledere} title={'Gruppeledere'} />
      <GroupCard members={julebord} title={'Julebord'} />
      <GroupCard members={ledergruppa} title={'Ledergruppa'} />
      <GroupCard members={principals} title={'Principal engineers'} />
      <GroupCard members={recruitment} title={'Rekruttering'} />
      <GroupCard members={sales} title={'Salg og rådgivning'} />
      <GroupCard members={styret} title={'Styret'} />
      <GroupCard members={okonomi} title={'Økonomi'} />
    </Grid>
  )
}
