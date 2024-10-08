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
    { id: 'abr@knowit.no' },
    { id: 'asbjorn.gjerde-lund@knowit.no' },
    { id: 'atle.prange@knowit.no' },
    { id: 'hans.frisvold@knowit.no' },
    { id: 'jhg@knowit.no' },
    { id: 'jonas.gurrich@knowit.no' },
    { id: 'kai.eidissen@knowit.no' },
    { id: 'kristian.pihl@knowit.no' },
    { id: 'kristoffer.lundnes@knowit.no' },
    { id: 'lin@knowit.no' },
    { id: 'llu@knowit.no' },
    { id: 'margrete.iversen@knowit.no' },
    { id: 'torbjorn.moen@knowit.no' },
  ]

  const recruitment = [
    { id: 'daniel.horn@knowit.no' },
    { id: 'lin@knowit.no' },
    { id: 'tommi.venning@knowit.no' },
  ]

  const gruppeledere = [
    { id: 'abr@knowit.no' },
    { id: 'anders.pasche@knowit.no' },
    { id: 'anders.steen@knowit.no' },
    { id: 'christian.karlsson@knowit.no' },
    { id: 'christian.nyvoll@knowit.no' },
    { id: 'erik.lund@knowit.no' },
    { id: 'geinoh@knowit.no' },
    { id: 'hedda.dolva@knowit.no' },
    { id: 'hed@knowit.no' },
    { id: 'henning.lund-hanssen@knowit.no' },
    { id: 'hrj@knowit.no' },
    { id: 'joakim.lindgren@knowit.no' },
    { id: 'kak@knowit.no' },
    { id: 'klaus.stafto@knowit.no' },
    { id: 'lin@knowit.no' },
    { id: 'siv.brodsjomoen@knowit.no' },
    { id: 'sverre.bjorke@knowit.no' },
    { id: 'tormod.flesjo@knowit.no' },
    { id: 'zixuan.liu@knowit.no' },
  ]

  const julebord = [{ id: 'kristian.flock@knowit.no', role: 'Diktator' }]

  const styret = [
    { id: 'bha@knowit.no' },
    { id: 'kmk@knowit.no' },
    { id: 'mona.hvattum@knowit.no' },
    { id: 'snorre.finanger@knowit.no' },
    { id: 'trygve.bjornstad@knowit.no' },
  ]

  const amu = [
    { id: 'anders.steen@knowit.no', role: 'verneombud' },
    { id: 'eirik.osnes@knowit.no', role: 'ansattrepresentant' },
    { id: 'erik.lund@knowit.no', role: 'vara verneombud' },
    { id: 'even.johansen@knowit.no', role: 'vara' },
    { id: 'hrj@knowit.no', role: 'lederrepresentant' },
    { id: 'kmk@knowit.no', role: 'lederrepresentant' },
  ]

  const ledergruppa = [{ id: 'kmk@knowit.no' }]

  const okonomi = [{ id: 'kik@knowit.no' }]

  const drift = []

  useEffect(() => {
    trackPageView({
      documentTitle: 'Grupper',
    })
    pageTitle('Grupper')
  }, [trackPageView])

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <GroupCard members={principals} title={'Principal engineers'} />
      <GroupCard members={recruitment} title={'Rekruttering'} />
      <GroupCard members={gruppeledere} title={'Gruppeledere'} />
      <GroupCard members={sales} title={'Salg og rådgivning'} />
      <GroupCard members={julebord} title={'Julebord'} />
      <GroupCard members={ledergruppa} title={'Ledergruppa'} />
      <GroupCard members={amu} title={'Arbeidsmiljøutvalg'} />
      <GroupCard members={styret} title={'Styret'} />
      <GroupCard members={drift} title={'Drift'} />
      <GroupCard members={okonomi} title={'Økonomi'} />
    </Grid>
  )
}
