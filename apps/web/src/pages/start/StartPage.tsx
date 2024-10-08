import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import MarkdownContent from './MarkdownContent'

export default function StartPage() {
  const { trackPageView } = useMatomo()

  const [administrationMD, setAdministrationMD] = useState('')
  const [communicationMD, setCommunicationMD] = useState('')
  const [employmentMD, setEmploymentMD] = useState('')
  const [otherMD, setOtherMD] = useState('')

  useEffect(() => {
    fetch('/markdown/Administration.md')
      .then((response) => response.text())
      .then((text) => setAdministrationMD(text))
  }, [])

  useEffect(() => {
    fetch('/markdown/Communication.md')
      .then((response) => response.text())
      .then((text) => setCommunicationMD(text))
  }, [])

  useEffect(() => {
    fetch('/markdown/MyEmployment.md')
      .then((response) => response.text())
      .then((text) => setEmploymentMD(text))
  }, [])

  useEffect(() => {
    fetch('/markdown/Other.md')
      .then((response) => response.text())
      .then((text) => setOtherMD(text))
  }, [])

  useEffect(() => {
    trackPageView({
      documentTitle: 'Start',
    })
    pageTitle('Start')
  }, [trackPageView])

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <MarkdownContent title="Administrasjon" markdown={administrationMD} />
      <MarkdownContent title="Kommunikasjon" markdown={communicationMD} />
      <MarkdownContent title="Min ansettelse" markdown={employmentMD} />
      <MarkdownContent title="Annet" markdown={otherMD} />
    </Grid>
  )
}
